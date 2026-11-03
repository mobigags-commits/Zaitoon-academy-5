import { AdmissionApplication, TeacherApplication, VerificationRecord } from '../types';

export interface TreasuryItem {
  id: string;
  type: 'deposit' | 'withdraw' | 'tuition_fee';
  amount: number;
  gateway: string;
  accountTitle: string;
  accountNumber: string;
  referenceNumber: string;
  studentName?: string;
  studentRoll?: string;
  date: string;
  status: 'Completed' | 'Pending Verification' | 'Rejected';
  notes?: string;
  purpose?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'New' | 'Replied';
  createdAt: string;
  notes?: string;
}

export interface DashboardStats {
  totalAdmissions: number;
  pendingAdmissions: number;
  totalFacultyApplicants: number;
  totalInquiries: number;
  treasury: {
    totalDepositedPkr: number;
    totalWithdrawnPkr: number;
    netBalancePkr: number;
    pendingWithdrawalsCount: number;
  };
}

class ApiClient {
  private baseUrl = '';

  // Generic Request Helper
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const res = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(options?.headers || {})
        }
      });

      if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        throw new Error(errorBody.message || `HTTP ${res.status}: ${res.statusText}`);
      }

      return await res.json();
    } catch (err: any) {
      console.warn(`[ApiClient] Call to ${endpoint} failed, falling back to local storage if available:`, err.message);
      throw err;
    }
  }

  // Health
  async getHealth() {
    return this.request<{ status: string; uptimeSeconds: number; database: any }>('/api/health');
  }

  // Admin Auth
  async loginAdmin(pin: string) {
    return this.request<{ success: boolean; session: any }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ pin })
    });
  }

  // Admissions
  async getAdmissions(): Promise<AdmissionApplication[]> {
    try {
      const res = await this.request<{ success: boolean; data: AdmissionApplication[] }>('/api/admissions');
      if (res.data) {
        localStorage.setItem('zra_admission_applications', JSON.stringify(res.data));
        return res.data;
      }
    } catch {
      // Local fallback
      const saved = localStorage.getItem('zra_admission_applications');
      if (saved) return JSON.parse(saved);
    }
    return [];
  }

  async createAdmission(data: Partial<AdmissionApplication>): Promise<AdmissionApplication> {
    try {
      const res = await this.request<{ success: boolean; data: AdmissionApplication }>('/api/admissions', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      // Update local storage cache
      const current = await this.getAdmissions();
      const updated = [res.data, ...current.filter((x) => x.applicationId !== res.data.applicationId)];
      localStorage.setItem('zra_admission_applications', JSON.stringify(updated));
      return res.data;
    } catch (err) {
      // Offline fallback
      const fallbackId = `ZR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const fallbackRecord: AdmissionApplication = {
        applicationId: data.applicationId || fallbackId,
        applicantName: data.applicantName || 'Applicant',
        fatherName: data.fatherName || '',
        cnicOrBForm: data.cnicOrBForm || '',
        email: data.email || '',
        phone: data.phone || '',
        selectedProgram: data.selectedProgram || '',
        programType: data.programType || 'Degree',
        deliveryMode: data.deliveryMode || 'On-Campus Physical',
        campusPreference: data.campusPreference || 'Islamabad Central Flagship Campus',
        previousEducation: data.previousEducation || '',
        percentageMarks: data.percentageMarks || 75,
        address: data.address || '',
        submissionDate: new Date().toLocaleString(),
        status: 'Application Submitted',
        challanNumber: data.challanNumber || `CH-ZRA-${Math.floor(100000 + Math.random() * 900000)}`,
        estimatedFee: data.estimatedFee || 'Rs. 90,000'
      };
      const saved = localStorage.getItem('zra_admission_applications');
      const list = saved ? JSON.parse(saved) : [];
      list.unshift(fallbackRecord);
      localStorage.setItem('zra_admission_applications', JSON.stringify(list));
      return fallbackRecord;
    }
  }

  async updateAdmission(id: string, updates: Partial<AdmissionApplication>): Promise<AdmissionApplication> {
    const res = await this.request<{ success: boolean; data: AdmissionApplication }>(`/api/admissions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
    return res.data;
  }

  async deleteAdmission(id: string): Promise<boolean> {
    await this.request<{ success: boolean }>(`/api/admissions/${id}`, {
      method: 'DELETE'
    });
    return true;
  }

  // Treasury (Deposits / Withdrawals)
  async getTreasury(): Promise<TreasuryItem[]> {
    try {
      const res = await this.request<{ success: boolean; data: TreasuryItem[] }>('/api/treasury');
      if (res.data) {
        localStorage.setItem('zra_treasury_ledger', JSON.stringify(res.data));
        return res.data;
      }
    } catch {
      const saved = localStorage.getItem('zra_treasury_ledger');
      if (saved) return JSON.parse(saved);
    }
    return [];
  }

  async createTransaction(data: Partial<TreasuryItem>): Promise<TreasuryItem> {
    try {
      const res = await this.request<{ success: boolean; data: TreasuryItem }>('/api/treasury', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      const current = await this.getTreasury();
      const updated = [res.data, ...current.filter((x) => x.id !== res.data.id)];
      localStorage.setItem('zra_treasury_ledger', JSON.stringify(updated));
      return res.data;
    } catch {
      const fallbackId = `TXN-${Math.floor(10000 + Math.random() * 90000)}`;
      const fallbackRecord: TreasuryItem = {
        id: fallbackId,
        type: data.type || 'deposit',
        amount: data.amount || 0,
        gateway: data.gateway || 'JazzCash Direct (0344-7956085)',
        accountTitle: data.accountTitle || 'Direct Client',
        accountNumber: data.accountNumber || '0344-7956085',
        referenceNumber: data.referenceNumber || `REF-${Math.floor(100000 + Math.random() * 900000)}`,
        studentName: data.studentName || '',
        studentRoll: data.studentRoll || '',
        date: new Date().toLocaleString(),
        status: data.type === 'deposit' ? 'Completed' : 'Pending Verification',
        notes: data.notes || '',
        purpose: data.purpose || ''
      };
      const saved = localStorage.getItem('zra_treasury_ledger');
      const list = saved ? JSON.parse(saved) : [];
      list.unshift(fallbackRecord);
      localStorage.setItem('zra_treasury_ledger', JSON.stringify(list));
      return fallbackRecord;
    }
  }

  async updateTransaction(id: string, updates: Partial<TreasuryItem>): Promise<TreasuryItem> {
    const res = await this.request<{ success: boolean; data: TreasuryItem }>(`/api/treasury/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
    return res.data;
  }

  async deleteTransaction(id: string): Promise<boolean> {
    await this.request<{ success: boolean }>(`/api/treasury/${id}`, {
      method: 'DELETE'
    });
    return true;
  }

  // Contacts
  async getContacts(): Promise<ContactMessage[]> {
    try {
      const res = await this.request<{ success: boolean; data: ContactMessage[] }>('/api/contacts');
      return res.data;
    } catch {
      return [];
    }
  }

  async createContact(data: { name: string; email: string; phone: string; subject: string; message: string }) {
    return this.request<{ success: boolean; data: ContactMessage }>('/api/contacts', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async updateContactStatus(id: string, status: 'New' | 'Replied', notes?: string) {
    return this.request<{ success: boolean; data: ContactMessage }>(`/api/contacts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status, notes })
    });
  }

  async deleteContact(id: string) {
    return this.request<{ success: boolean }>(`/api/contacts/${id}`, {
      method: 'DELETE'
    });
  }

  // Faculty Onboarding
  async getFaculty(): Promise<TeacherApplication[]> {
    try {
      const res = await this.request<{ success: boolean; data: TeacherApplication[] }>('/api/faculty');
      if (res.data) {
        localStorage.setItem('zra_faculty_applications', JSON.stringify(res.data));
        return res.data;
      }
    } catch {
      const saved = localStorage.getItem('zra_faculty_applications');
      if (saved) return JSON.parse(saved);
    }
    return [];
  }

  async createFaculty(data: Partial<TeacherApplication>): Promise<TeacherApplication> {
    try {
      const res = await this.request<{ success: boolean; data: TeacherApplication }>('/api/faculty', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      return res.data;
    } catch {
      const fallbackId = `FAC-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
      const fallbackRecord: any = {
        ...data,
        applicationId: fallbackId,
        submissionDate: new Date().toLocaleString(),
        status: 'Received & In Review'
      };
      const saved = localStorage.getItem('zra_faculty_applications');
      const list = saved ? JSON.parse(saved) : [];
      list.unshift(fallbackRecord);
      localStorage.setItem('zra_faculty_applications', JSON.stringify(list));
      return fallbackRecord;
    }
  }

  async updateFaculty(id: string, updates: Partial<TeacherApplication>): Promise<TeacherApplication> {
    const res = await this.request<{ success: boolean; data: TeacherApplication }>(`/api/faculty/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
    return res.data;
  }

  async deleteFaculty(id: string): Promise<boolean> {
    await this.request<{ success: boolean }>(`/api/faculty/${id}`, {
      method: 'DELETE'
    });
    return true;
  }

  // Verifications
  async getVerifications(): Promise<VerificationRecord[]> {
    try {
      const res = await this.request<{ success: boolean; data: VerificationRecord[] }>('/api/verifications');
      return res.data;
    } catch {
      return [];
    }
  }

  async createVerification(data: Partial<VerificationRecord>) {
    return this.request<{ success: boolean; data: VerificationRecord }>('/api/verifications', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  // Dashboard Stats
  async getStats(): Promise<DashboardStats> {
    const res = await this.request<{ success: boolean; stats: DashboardStats }>('/api/stats');
    return res.stats;
  }

  // Export CSV Helper
  getExportUrl(collection: 'admissions' | 'treasury' | 'contacts' | 'faculty' | 'verifications') {
    return `/api/export-csv/${collection}`;
  }
}

export const apiClient = new ApiClient();
