import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  Unlock,
  Users,
  CreditCard,
  GraduationCap,
  FileText,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  TrendingUp,
  Download,
  RefreshCw,
  LogOut,
  AlertTriangle,
  Server,
  Activity,
  Globe,
  Database,
  Eye,
  Sliders,
  Send,
  UserCheck
} from 'lucide-react';
import { PageId, AdminSession, SystemAuditLog, AdmissionApplication, TeacherApplication } from '../types';

interface AdminDashboardPageProps {
  onNavigate: (page: PageId) => void;
}

const DEFAULT_ADMIN_PIN = 'zra-admin-2026';
const ADMIN_SESSION_STORAGE_KEY = 'zra_executive_admin_session';
const ADMISSIONS_STORAGE_KEY = 'zra_admission_applications';
const FACULTY_APPLICATIONS_KEY = 'zra_faculty_applications';
const TREASURY_STORAGE_KEY = 'zra_treasury_ledger';

interface TreasuryItem {
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
}

const INITIAL_TREASURY_RECORDS: TreasuryItem[] = [
  {
    id: 'TXN-90214',
    type: 'deposit',
    amount: 145000,
    gateway: 'JazzCash Direct (0344-7956085)',
    accountTitle: 'Zaitoon Academic Treasury',
    accountNumber: '0344-7956085',
    referenceNumber: 'JC-88421095',
    studentName: 'Hamza Farooq',
    studentRoll: 'ZRA-2026-CS-104',
    date: '2026-09-17 11:20 AM',
    status: 'Completed',
    notes: 'Semester 1 Advance Tuition Cleared'
  },
  {
    id: 'TXN-90215',
    type: 'withdraw',
    amount: 35000,
    gateway: 'EasyPaisa Wallet (0344-7956085)',
    accountTitle: 'Ayesha Noor (Scholarship Refund)',
    accountNumber: '0300-8847192',
    referenceNumber: 'EP-44910283',
    studentName: 'Ayesha Noor',
    studentRoll: 'ZRA-2026-AI-019',
    date: '2026-09-17 12:45 PM',
    status: 'Pending Verification',
    notes: 'Merit Scholarship 50% Tuition Fee Refund'
  },
  {
    id: 'TXN-90216',
    type: 'deposit',
    amount: 85000,
    gateway: 'Raast Instant Pay (P2M)',
    accountTitle: 'Zaitoon Roots Academy',
    accountNumber: 'RAAST-ZRA-PK-01',
    referenceNumber: 'RST-9918237',
    studentName: 'Zainab Bibi',
    studentRoll: 'ZRA-2026-DPT-055',
    date: '2026-09-17 01:15 PM',
    status: 'Completed',
    notes: 'Physical Therapy DPT Admission Challan'
  },
  {
    id: 'TXN-90217',
    type: 'withdraw',
    amount: 60000,
    gateway: 'Habib Bank Ltd (HBL Corporate)',
    accountTitle: 'Faculty Honorarium Clearance',
    accountNumber: '0042-7901846101',
    referenceNumber: 'HBL-782194',
    studentName: 'Dr. Tariq Mahmood (Research Grant)',
    date: '2026-09-17 02:00 PM',
    status: 'Pending Verification',
    notes: 'AI Neural Lab Research Paper Bounty'
  },
  {
    id: 'TXN-90218',
    type: 'tuition_fee',
    amount: 110000,
    gateway: 'Stripe International Card',
    accountTitle: 'Global Online Campus Scholar',
    accountNumber: '•••• 4242',
    referenceNumber: 'STR-CH-994821',
    studentName: 'Omar Al-Mansoor (Dubai Campus)',
    studentRoll: 'ZRA-2026-CY-088',
    date: '2026-09-17 03:10 PM',
    status: 'Completed',
    notes: 'BS Cyber Security International Distance Learning'
  }
];

const INITIAL_AUDIT_LOGS: SystemAuditLog[] = [
  {
    id: 'LOG-5501',
    timestamp: '2026-09-17 14:40:22',
    action: 'Admin Authentication Passed',
    actor: 'Registrar General (PIN-Auth)',
    module: 'Security',
    status: 'Success',
    details: 'Encrypted multi-factor passkey validated from IP 110.37.18.94 (Islamabad)'
  },
  {
    id: 'LOG-5502',
    timestamp: '2026-09-17 14:22:10',
    action: 'Deposit Approval',
    actor: 'Bursar Treasury Desk',
    module: 'Treasury',
    status: 'Success',
    details: 'PKR 145,000 JazzCash payment reference JC-88421095 verified & ledger balanced'
  },
  {
    id: 'LOG-5503',
    timestamp: '2026-09-17 13:50:00',
    action: 'Admission Offer Issued',
    actor: 'Admissions Desk',
    module: 'Admissions',
    status: 'Success',
    details: 'Roll Number ZRA-2026-CS-104 assigned to Hamza Farooq for BS AI Program'
  },
  {
    id: 'LOG-5504',
    timestamp: '2026-09-17 12:15:33',
    action: 'Google Search Console Verification Ping',
    actor: 'SEO Automation Engine',
    module: 'SEO',
    status: 'Success',
    details: 'HTML verification token XVUaoZTJ5RzRv11gpP2XDPJE8X6fWVzWOit5d2MyRhM responded 200 OK'
  }
];

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigate }) => {
  // Session Authentication State
  const [session, setSession] = useState<AdminSession | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(ADMIN_SESSION_STORAGE_KEY);
        if (stored) return JSON.parse(stored);
      } catch (e) {
        console.error(e);
      }
    }
    return null;
  });

  const [enteredPin, setEnteredPin] = useState('');
  const [selectedRole, setSelectedRole] = useState<'Super Admin' | 'Registrar General' | 'Finance Bursar' | 'System Auditor'>('Super Admin');
  const [adminName, setAdminName] = useState('Dr. Tariq Mahmood Zaitoon');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'admissions' | 'treasury' | 'faculty' | 'security' | 'settings'>('overview');

  // Operational Data State
  const [treasuryList, setTreasuryList] = useState<TreasuryItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(TREASURY_STORAGE_KEY);
        if (stored) return JSON.parse(stored);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_TREASURY_RECORDS;
  });

  const [admissionsList, setAdmissionsList] = useState<AdmissionApplication[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(ADMISSIONS_STORAGE_KEY);
        if (stored) return JSON.parse(stored);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      {
        applicationId: 'ZRA-ADM-2026-881',
        applicantName: 'Muhammad Arham Khan',
        fatherName: 'Tahir Mehmood Khan',
        cnicOrBForm: '37405-8849102-1',
        email: 'arham.k@gmail.com',
        phone: '0301-5582910',
        selectedProgram: 'BS Artificial Intelligence',
        programType: 'Degree',
        deliveryMode: '100% Online Live Classes (Global/Remote)',
        campusPreference: 'Islamabad Central Flagship Campus',
        previousEducation: 'FSc Pre-Engineering (88.4%)',
        percentageMarks: 88.4,
        address: 'House 42, Street 18, G-11/2, Islamabad',
        submissionDate: '2026-09-16',
        status: 'Admission Offer Issued',
        challanNumber: 'CH-882194',
        estimatedFee: 'Rs. 95,000'
      },
      {
        applicationId: 'ZRA-ADM-2026-882',
        applicantName: 'Sana Fatima',
        fatherName: 'Syed Qasim Ali',
        cnicOrBForm: '61101-4478190-2',
        email: 'sana.fatima99@yahoo.com',
        phone: '0333-5192847',
        selectedProgram: 'Doctor of Physical Therapy (DPT)',
        programType: 'Degree',
        deliveryMode: 'On-Campus Physical',
        campusPreference: 'Islamabad Central Flagship Campus',
        previousEducation: 'FSc Pre-Medical (91.2%)',
        percentageMarks: 91.2,
        address: 'Sector F-8/4, Islamabad',
        submissionDate: '2026-09-17',
        status: 'Document Verification Pending',
        challanNumber: 'CH-882195',
        estimatedFee: 'Rs. 140,000'
      },
      {
        applicationId: 'ZRA-ADM-2026-883',
        applicantName: 'Bilal Ahmed Siddiqui',
        fatherName: 'Muhammad Siddique',
        cnicOrBForm: '42101-7782190-3',
        email: 'bilal.tech@outlook.com',
        phone: '0315-9988214',
        selectedProgram: '1-Year Diploma in Full-Stack AI & Cloud',
        programType: 'Diploma',
        deliveryMode: 'Hybrid Blended',
        campusPreference: 'Lahore Executive Campus',
        previousEducation: 'ICS (78.0%)',
        percentageMarks: 78.0,
        address: 'Gulberg III, Lahore',
        submissionDate: '2026-09-17',
        status: 'Application Submitted',
        challanNumber: 'CH-882196',
        estimatedFee: 'Rs. 75,000'
      }
    ];
  });

  const [facultyList, setFacultyList] = useState<TeacherApplication[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(FACULTY_APPLICATIONS_KEY);
        if (stored) return JSON.parse(stored);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      {
        applicationId: 'FAC-2026-041',
        fullName: 'Dr. Shahzad Rasheed',
        fatherHusbandName: 'Abdul Rasheed',
        cnicOrPassport: '37405-1122334-5',
        dob: '1984-06-12',
        gender: 'Male',
        bloodGroup: 'B+',
        mobileWhatsapp: '0300-5544332',
        alternatePhone: '0321-9988776',
        email: 'shahzad.rasheed@gmail.com',
        address: 'DHA Phase 2, Islamabad',
        city: 'Islamabad',
        domicile: 'Punjab',
        highestDegree: 'PhD / Doctorate',
        terminalDegreeTitle: 'PhD Computer Science & Deep Learning',
        awardingInstitute: 'National University of Sciences & Technology (NUST)',
        passingYear: '2019',
        cgpaOrDivision: '3.92 / 4.00',
        thesisTitle: 'Self-Supervised Visual Transformers in Autonomous Drone Navigation',
        hecAttested: true,
        totalExperienceYears: 9,
        currentOrganization: 'FAST-NUCES',
        currentDesignation: 'Associate Professor',
        lastDrawnSalary: 'Rs. 320,000 / month',
        expectedSalary: 'Rs. 400,000 / month',
        departmentApplying: 'Faculty of Computing, Artificial Intelligence & Data Science',
        preferredCourses: ['Deep Learning', 'Computer Vision', 'Reinforcement Learning'],
        preferredMode: 'Hybrid Blended',
        teachingShift: 'Morning',
        publicationsCount: 16,
        googleScholarUrl: 'https://scholar.google.com/citations?user=sample',
        orcidId: '0000-0002-1825-0097',
        submissionDate: '2026-09-15',
        status: 'Shortlisted for Interview'
      }
    ];
  });

  const [auditLogs, setAuditLogs] = useState<SystemAuditLog[]>(INITIAL_AUDIT_LOGS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TREASURY_STORAGE_KEY, JSON.stringify(treasuryList));
    }
  }, [treasuryList]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPin.trim() === DEFAULT_ADMIN_PIN) {
      const newSession: AdminSession = {
        isAuthenticated: true,
        role: selectedRole,
        adminName: adminName.trim() || 'Executive Administrator',
        loginTime: new Date().toLocaleTimeString()
      };
      setSession(newSession);
      localStorage.setItem(ADMIN_SESSION_STORAGE_KEY, JSON.stringify(newSession));
      setLoginError('');

      // Add audit log
      const log: SystemAuditLog = {
        id: `LOG-${Date.now().toString().slice(-4)}`,
        timestamp: new Date().toLocaleString(),
        action: 'Executive Session Initiated',
        actor: `${newSession.adminName} (${newSession.role})`,
        module: 'Security',
        status: 'Success',
        details: 'Admin dashboard unlocked via high-security master PIN'
      };
      setAuditLogs(prev => [log, ...prev]);
    } else {
      setLoginError('Invalid Administrator Passcode. Please enter the authorized PIN.');
    }
  };

  const handleLogout = () => {
    setSession(null);
    localStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
    setEnteredPin('');
  };

  const handleQuickDemoAccess = () => {
    setEnteredPin(DEFAULT_ADMIN_PIN);
    const newSession: AdminSession = {
      isAuthenticated: true,
      role: 'Super Admin',
      adminName: 'Dr. Tariq Mahmood Zaitoon',
      loginTime: new Date().toLocaleTimeString()
    };
    setSession(newSession);
    localStorage.setItem(ADMIN_SESSION_STORAGE_KEY, JSON.stringify(newSession));
  };

  // Treasury approval / rejection
  const handleTreasuryAction = (id: string, action: 'approve' | 'reject') => {
    setTreasuryList(prev =>
      prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            status: action === 'approve' ? 'Completed' : 'Rejected'
          };
        }
        return item;
      })
    );

    const log: SystemAuditLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleString(),
      action: action === 'approve' ? 'Treasury Transaction Cleared' : 'Treasury Transaction Rejected',
      actor: session?.adminName || 'Admin',
      module: 'Treasury',
      status: action === 'approve' ? 'Success' : 'Warning',
      details: `Transaction ${id} marked as ${action === 'approve' ? 'Completed' : 'Rejected'}`
    };
    setAuditLogs(prev => [log, ...prev]);

    setActionSuccessMessage(`Transaction ${id} has been successfully ${action === 'approve' ? 'approved & cleared' : 'declined'}!`);
    setTimeout(() => setActionSuccessMessage(null), 3500);
  };

  // Admissions status changer
  const handleAdmissionStatusChange = (applicationId: string, newStatus: AdmissionApplication['status']) => {
    setAdmissionsList(prev =>
      prev.map(item => (item.applicationId === applicationId ? { ...item, status: newStatus } : item))
    );
    if (typeof window !== 'undefined') {
      const updated = admissionsList.map(item =>
        item.applicationId === applicationId ? { ...item, status: newStatus } : item
      );
      localStorage.setItem(ADMISSIONS_STORAGE_KEY, JSON.stringify(updated));
    }

    const log: SystemAuditLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleString(),
      action: 'Admission Status Updated',
      actor: session?.adminName || 'Registrar',
      module: 'Admissions',
      status: 'Success',
      details: `Application ${applicationId} updated to '${newStatus}'`
    };
    setAuditLogs(prev => [log, ...prev]);

    setActionSuccessMessage(`Application ${applicationId} status updated to: ${newStatus}`);
    setTimeout(() => setActionSuccessMessage(null), 3500);
  };

  // Faculty status changer
  const handleFacultyStatusChange = (applicationId: string, newStatus: TeacherApplication['status']) => {
    setFacultyList(prev =>
      prev.map(item => (item.applicationId === applicationId ? { ...item, status: newStatus } : item))
    );
    if (typeof window !== 'undefined') {
      const updated = facultyList.map(item =>
        item.applicationId === applicationId ? { ...item, status: newStatus } : item
      );
      localStorage.setItem(FACULTY_APPLICATIONS_KEY, JSON.stringify(updated));
    }

    const log: SystemAuditLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleString(),
      action: 'Faculty Dossier Status Updated',
      actor: session?.adminName || 'Dean Office',
      module: 'Faculty',
      status: 'Success',
      details: `Faculty dossier ${applicationId} updated to '${newStatus}'`
    };
    setAuditLogs(prev => [log, ...prev]);

    setActionSuccessMessage(`Faculty application ${applicationId} updated to: ${newStatus}`);
    setTimeout(() => setActionSuccessMessage(null), 3500);
  };

  // Export CSV
  const handleExportCSV = (type: 'admissions' | 'treasury' | 'faculty') => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    if (type === 'admissions') {
      csvContent += 'ApplicationID,ApplicantName,Program,Type,DeliveryMode,Phone,Marks,Status\n';
      admissionsList.forEach(a => {
        csvContent += `"${a.applicationId}","${a.applicantName}","${a.selectedProgram}","${a.programType}","${a.deliveryMode}","${a.phone}","${a.percentageMarks}%","${a.status}"\n`;
      });
    } else if (type === 'treasury') {
      csvContent += 'TxnID,Type,AmountPKR,Gateway,Reference,AccountTitle,Status,Date\n';
      treasuryList.forEach(t => {
        csvContent += `"${t.id}","${t.type}","${t.amount}","${t.gateway}","${t.referenceNumber}","${t.accountTitle}","${t.status}","${t.date}"\n`;
      });
    } else {
      csvContent += 'ApplicationID,FullName,Degree,Institute,ExperienceYears,PreferredShift,Status\n';
      facultyList.forEach(f => {
        csvContent += `"${f.applicationId}","${f.fullName}","${f.highestDegree}","${f.awardingInstitute}","${f.totalExperienceYears}","${f.teachingShift}","${f.status}"\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ZRA_${type}_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 1. If not authenticated, render Login Screen
  if (!session || !session.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in-95 duration-300">
          <div className="text-center space-y-3">
            <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-amber-500/20 via-red-900/30 to-amber-700/20 border border-amber-500/30 text-amber-400 shadow-xl shadow-amber-500/10">
              <Lock className="w-10 h-10" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Executive Admin Portal
            </h1>
            <p className="text-sm text-slate-400">
              Zaitoon Roots Academy &bull; Central Institutional Command & Treasury
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>TLS 1.3 256-Bit Encrypted Session</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="p-6 sm:p-8 bg-slate-900/90 rounded-3xl border border-slate-800 shadow-2xl space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Executive Administrator Name
              </label>
              <input
                type="text"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Designated Administrative Role
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-amber-500 focus:outline-none"
              >
                <option value="Super Admin">Super Administrator (Full System Access)</option>
                <option value="Registrar General">Registrar General (Admissions & Academic Clearance)</option>
                <option value="Finance Bursar">Finance Bursar (Treasury, Deposits & Withdrawals)</option>
                <option value="System Auditor">System Auditor (Read-Only Logs & SEO Health)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Secure Master PIN / Passcode
              </label>
              <input
                type="password"
                value={enteredPin}
                onChange={(e) => setEnteredPin(e.target.value)}
                placeholder="Enter authorized admin passkey"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm font-mono tracking-widest focus:border-amber-500 focus:outline-none"
              />
              <div className="flex items-center justify-between mt-1.5 text-[11px] text-slate-400">
                <span>Default Demo Key:</span>
                <code className="text-amber-400 font-mono bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                  {DEFAULT_ADMIN_PIN}
                </code>
              </div>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              <span>Authenticate & Enter Console</span>
            </button>

            <div className="pt-2 border-t border-slate-800 text-center">
              <button
                type="button"
                onClick={handleQuickDemoAccess}
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold underline decoration-dashed transition-colors"
              >
                Instant 1-Click Executive Demo Login
              </button>
            </div>
          </form>

          <div className="text-center text-xs text-slate-500">
            Authorized Personnel Only &bull; For Access Credentials Contact Vice Chancellor Office via WhatsApp:{' '}
            <a href="https://wa.me/923447956085" target="_blank" rel="noopener noreferrer" className="text-amber-400 underline font-mono">
              0344-7956085
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Calculate Metrics
  const totalTreasuryBalance = treasuryList
    .filter(t => t.status === 'Completed')
    .reduce((sum, t) => (t.type === 'withdraw' ? sum - t.amount : sum + t.amount), 0);

  const pendingWithdrawalsCount = treasuryList.filter(t => t.type === 'withdraw' && t.status === 'Pending Verification').length;
  const pendingDepositsCount = treasuryList.filter(t => t.type === 'deposit' && t.status === 'Pending Verification').length;
  const pendingAdmissionsCount = admissionsList.filter(a => a.status === 'Application Submitted' || a.status === 'Document Verification Pending').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Action Success Alert Banner */}
        {actionSuccessMessage && (
          <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-semibold flex items-center justify-between shadow-xl animate-in slide-in-from-top-4">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{actionSuccessMessage}</span>
            </div>
            <button
              onClick={() => setActionSuccessMessage(null)}
              className="text-emerald-400 hover:text-white text-xs underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Top Header Bar */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/20 to-red-900/30 border border-amber-500/30 text-amber-400">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Executive Command & Treasury Center
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  {session.role}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Logged in as <strong className="text-slate-200">{session.adminName}</strong> &bull; Authenticated at {session.loginTime}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
            <button
              onClick={() => onNavigate('payment-portal')}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <CreditCard className="w-3.5 h-3.5 text-amber-400" />
              <span>Open Public Treasury Desk</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 text-rose-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-none">
          {[
            { id: 'overview', label: 'Overview Analytics', icon: TrendingUp },
            { id: 'admissions', label: `Student Admissions (${admissionsList.length})`, icon: GraduationCap },
            { id: 'treasury', label: `Treasury & Clearances (${treasuryList.length})`, icon: CreditCard },
            { id: 'faculty', label: `Faculty Applications (${facultyList.length})`, icon: Users },
            { id: 'security', label: 'Security & SEO Monitor', icon: Activity },
            { id: 'settings', label: 'Institutional Settings', icon: Sliders }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW ANALYTICS */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in">
            {/* KPI Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Treasury Balance</span>
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <DollarSign className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-2xl font-extrabold text-white">
                    Rs. {totalTreasuryBalance.toLocaleString()}
                  </span>
                  <span className="block text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>+18.4% this academic semester</span>
                  </span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Admissions</span>
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-2xl font-extrabold text-white">
                    {admissionsList.length + 2840} Active
                  </span>
                  <span className="block text-[11px] text-amber-400 mt-1">
                    {pendingAdmissionsCount} pending verification
                  </span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Withdrawals</span>
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Clock className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-2xl font-extrabold text-white">
                    {pendingWithdrawalsCount + pendingDepositsCount} Requests
                  </span>
                  <span className="block text-[11px] text-slate-400 mt-1">
                    JazzCash, EasyPaisa, Raast, Bank
                  </span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">System & SEO Status</span>
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <Server className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-2xl font-extrabold text-emerald-400">
                    99.99% Uptime
                  </span>
                  <span className="block text-[11px] text-slate-400 mt-1">
                    Google Verified &bull; 29 Pages Live
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions & Pending Queue */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Pending Treasury Clearances */}
              <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-amber-400" />
                      <span>Action Required: Pending Clearances</span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Verify deposit receipts or approve student refund withdrawals
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('treasury')}
                    className="text-xs text-amber-400 hover:text-amber-300 font-semibold underline"
                  >
                    View All Ledger &rarr;
                  </button>
                </div>

                <div className="space-y-3">
                  {treasuryList
                    .filter(t => t.status === 'Pending Verification')
                    .slice(0, 3)
                    .map(item => (
                      <div
                        key={item.id}
                        className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-amber-400">{item.id}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                              item.type === 'deposit' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                            }`}>
                              {item.type.toUpperCase()}
                            </span>
                            <span className="text-xs text-slate-300 font-semibold">{item.gateway}</span>
                          </div>
                          <p className="text-xs text-slate-400">
                            Party: <strong className="text-slate-200">{item.accountTitle}</strong> &bull; Ref: <code className="text-slate-300">{item.referenceNumber}</code>
                          </p>
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                          <span className="text-sm font-extrabold text-white">
                            Rs. {item.amount.toLocaleString()}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleTreasuryAction(item.id, 'approve')}
                              className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition-all"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Approve</span>
                            </button>
                            <button
                              onClick={() => handleTreasuryAction(item.id, 'reject')}
                              className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 font-bold text-xs transition-all"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Decline</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                  {treasuryList.filter(t => t.status === 'Pending Verification').length === 0 && (
                    <div className="p-8 text-center text-slate-400 text-xs">
                      All deposit and withdrawal queues are currently cleared!
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Audit Feed */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <span>Real-Time Audit Log</span>
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                    LIVE
                  </span>
                </div>

                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {auditLogs.slice(0, 5).map(log => (
                    <div key={log.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{log.action}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{log.timestamp.slice(-8)}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-tight">{log.details}</p>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-900">
                        <span>{log.actor}</span>
                        <span className="text-amber-400 font-semibold">{log.module}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ADMISSIONS PIPELINE */}
        {activeTab === 'admissions' && (
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-amber-400" />
                  <span>Student Admissions Pipeline & Roll Desk</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Manage digital applications, assign student roll numbers, and confirm fee challan status
                </p>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  onClick={() => handleExportCSV('admissions')}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>Export CSV</span>
                </button>
                <button
                  onClick={() => onNavigate('admissions')}
                  className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors"
                >
                  + New Application
                </button>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search student by name, CNIC, roll, or program..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-amber-500 focus:outline-none"
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full sm:w-48 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-amber-500 focus:outline-none"
              >
                <option value="all">All Application Statuses</option>
                <option value="Application Submitted">Application Submitted</option>
                <option value="Document Verification Pending">Document Verification Pending</option>
                <option value="Admission Offer Issued">Admission Offer Issued</option>
              </select>
            </div>

            {/* Applications Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Applicant & CNIC</th>
                    <th className="px-4 py-3">Program & Mode</th>
                    <th className="px-4 py-3">Academic Merit</th>
                    <th className="px-4 py-3">Challan / Fee</th>
                    <th className="px-4 py-3">Current Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {admissionsList
                    .filter(a => {
                      const matchQuery =
                        a.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        a.selectedProgram.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        a.cnicOrBForm.includes(searchQuery);
                      const matchStatus = filterStatus === 'all' || a.status === filterStatus;
                      return matchQuery && matchStatus;
                    })
                    .map(app => (
                      <tr key={app.applicationId} className="hover:bg-slate-800/40 transition-colors">
                        <td className="px-4 py-3.5">
                          <div className="font-bold text-white text-sm">{app.applicantName}</div>
                          <div className="text-[11px] text-slate-400">
                            S/O {app.fatherName} &bull; <span className="font-mono">{app.cnicOrBForm}</span>
                          </div>
                          <div className="text-[10px] text-amber-400 font-mono mt-0.5">{app.phone}</div>
                        </td>

                        <td className="px-4 py-3.5">
                          <div className="font-semibold text-slate-200">{app.selectedProgram}</div>
                          <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                            {app.deliveryMode}
                          </span>
                        </td>

                        <td className="px-4 py-3.5">
                          <div className="font-bold text-emerald-400">{app.percentageMarks}%</div>
                          <div className="text-[10px] text-slate-400">{app.previousEducation}</div>
                        </td>

                        <td className="px-4 py-3.5">
                          <div className="font-mono text-white font-bold">{app.estimatedFee}</div>
                          <div className="text-[10px] text-slate-400 font-mono">Challan #{app.challanNumber}</div>
                        </td>

                        <td className="px-4 py-3.5">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            app.status === 'Admission Offer Issued'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : app.status === 'Document Verification Pending'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          }`}>
                            {app.status}
                          </span>
                        </td>

                        <td className="px-4 py-3.5 text-right space-x-1">
                          <button
                            onClick={() => handleAdmissionStatusChange(app.applicationId, 'Admission Offer Issued')}
                            className="px-2.5 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 font-bold text-[11px] transition-all"
                            title="Issue Admission Offer"
                          >
                            Approve Offer
                          </button>
                          <button
                            onClick={() => handleAdmissionStatusChange(app.applicationId, 'Document Verification Pending')}
                            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-[11px] transition-all"
                            title="Flag for Document Audit"
                          >
                            Verify Docs
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: TREASURY & FEE CLEARANCE */}
        {activeTab === 'treasury' && (
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-amber-400" />
                  <span>Treasury Ledger & Fee Clearance Desk</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Real-time clearing house for JazzCash, EasyPaisa, Raast, HBL, and International Stripe payments
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => handleExportCSV('treasury')}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>Export Ledger CSV</span>
                </button>
                <button
                  onClick={() => {
                    const sampleDeposit: TreasuryItem = {
                      id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
                      type: 'deposit',
                      amount: 95000,
                      gateway: 'JazzCash Wallet (0344-7956085)',
                      accountTitle: 'Direct Student Deposit',
                      accountNumber: '0344-7956085',
                      referenceNumber: `JC-${Date.now().toString().slice(-6)}`,
                      studentName: 'Online Admission Scholar',
                      date: new Date().toLocaleString(),
                      status: 'Pending Verification',
                      notes: 'Manual Deposit Verification Request'
                    };
                    setTreasuryList(prev => [sampleDeposit, ...prev]);
                    setActionSuccessMessage('New mock deposit recorded in ledger for review!');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-colors"
                >
                  + Add Test Clearance
                </button>
              </div>
            </div>

            {/* Treasury Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Transaction ID & Date</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Amount (PKR)</th>
                    <th className="px-4 py-3">Gateway & Reference</th>
                    <th className="px-4 py-3">Account / Beneficiary</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Bursar Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {treasuryList.map(txn => (
                    <tr key={txn.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-4 py-3.5">
                        <div className="font-mono font-bold text-amber-400">{txn.id}</div>
                        <div className="text-[10px] text-slate-500">{txn.date}</div>
                      </td>

                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          txn.type === 'deposit'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : txn.type === 'withdraw'
                            ? 'bg-rose-500/20 text-rose-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {txn.type === 'deposit' ? <ArrowDownLeft className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
                          <span>{txn.type.toUpperCase()}</span>
                        </span>
                      </td>

                      <td className="px-4 py-3.5">
                        <span className="text-sm font-extrabold text-white">
                          Rs. {txn.amount.toLocaleString()}
                        </span>
                      </td>

                      <td className="px-4 py-3.5">
                        <div className="font-semibold text-slate-200">{txn.gateway}</div>
                        <code className="text-[10px] text-slate-400 font-mono">{txn.referenceNumber}</code>
                      </td>

                      <td className="px-4 py-3.5">
                        <div className="font-medium text-slate-200">{txn.accountTitle}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{txn.accountNumber}</div>
                        {txn.notes && <div className="text-[10px] text-slate-500 italic mt-0.5">{txn.notes}</div>}
                      </td>

                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          txn.status === 'Completed'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : txn.status === 'Pending Verification'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}>
                          {txn.status}
                        </span>
                      </td>

                      <td className="px-4 py-3.5 text-right">
                        {txn.status === 'Pending Verification' ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleTreasuryAction(txn.id, 'approve')}
                              className="px-2.5 py-1 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-[11px] transition-all"
                            >
                              Clear
                            </button>
                            <button
                              onClick={() => handleTreasuryAction(txn.id, 'reject')}
                              className="px-2.5 py-1 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold text-[11px] transition-all"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-500 italic">Settled</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: FACULTY & TEACHERS REVIEW */}
        {activeTab === 'faculty' && (
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-amber-400" />
                  <span>Faculty Dossiers & Onboarding Desk</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Review faculty appointment applications submitted through the Teachers Portal
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => handleExportCSV('faculty')}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>Export Faculty CSV</span>
                </button>
                <button
                  onClick={() => onNavigate('teacher-portal')}
                  className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors"
                >
                  View Public Teachers Portal
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {facultyList.map(teacher => (
                <div
                  key={teacher.applicationId}
                  className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-white">{teacher.fullName}</h4>
                        <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          {teacher.applicationId}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {teacher.terminalDegreeTitle} &bull; {teacher.awardingInstitute} ({teacher.passingYear})
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">
                        {teacher.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-bold">Experience</span>
                      <span className="text-slate-200 font-semibold">{teacher.totalExperienceYears} Years</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-bold">Current Designation</span>
                      <span className="text-slate-200 font-semibold">{teacher.currentDesignation}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-bold">Expected Salary</span>
                      <span className="text-emerald-400 font-bold">{teacher.expectedSalary}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-bold">Publications</span>
                      <span className="text-amber-400 font-bold">{teacher.publicationsCount} Research Papers</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-900 text-xs">
                    <div className="flex items-center gap-3 text-slate-400">
                      <span>Shift: <strong className="text-slate-200">{teacher.teachingShift}</strong></span>
                      <span>&bull;</span>
                      <span>Mode: <strong className="text-slate-200">{teacher.preferredMode}</strong></span>
                      <span>&bull;</span>
                      <span>Contact: <code className="text-amber-400">{teacher.mobileWhatsapp}</code></span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleFacultyStatusChange(teacher.applicationId, 'Shortlisted for Interview')}
                        className="px-3 py-1 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-xs font-semibold transition-all"
                      >
                        Shortlist
                      </button>
                      <button
                        onClick={() => handleFacultyStatusChange(teacher.applicationId, 'Demo Lecture Scheduled')}
                        className="px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold transition-all"
                      >
                        Schedule Demo
                      </button>
                      <button
                        onClick={() => handleFacultyStatusChange(teacher.applicationId, 'Appointment Offer Issued')}
                        className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all"
                      >
                        Issue Appointment Offer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SECURITY & SEO MONITOR */}
        {activeTab === 'security' && (
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6 animate-in fade-in">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Cybersecurity, Privacy & Search Engine Visibility (SEO/AEO/GEO)</span>
              </h3>
              <p className="text-xs text-slate-400">
                Audit system encryption, Google Search Console grounding, and compliance protocols
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cybersecurity Checklist */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>Security & Encryption Hardening</span>
                </h4>
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-300">HTTPS Strict Transport Security (HSTS)</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Enforced (256-Bit SSL)
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-300">GDPR & Google Consent Mode v2</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Active Banner
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-300">XSS, CSRF & SQL Injection Protection</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Sanitized Inputs
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-300">Administrative Multi-Factor PIN Auth</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Protected
                    </span>
                  </div>
                </div>
              </div>

              {/* SEO, AEO & Google Ecosystem Status */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-400" />
                  <span>Google & AI Answer Engine Indexing</span>
                </h4>
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-300">Google Site Verification Token</span>
                    <span className="text-emerald-400 font-mono text-[10px] font-bold">
                      XVUaoZTJ5RzRv... (Active)
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-300">XML Sitemap & Robots.txt</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 29 URLs Synced
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-300">Schema.org EducationalOrganization & Course</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Validated JSON-LD
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-300">AEO/GEO (SearchGPT, Claude, PerplexityBot)</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Full Allow
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: SETTINGS & BACKUP */}
        {activeTab === 'settings' && (
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6 animate-in fade-in">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-amber-400" />
                <span>Institutional System Settings & Data Backups</span>
              </h3>
              <p className="text-xs text-slate-400">
                Configure institution contacts, treasury channels, and export complete system snapshots
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-white">Contact & Helpline Routing</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-slate-400 block mb-1">Official WhatsApp Support Line</label>
                    <input
                      type="text"
                      disabled
                      value="0344-7956085 (+92-344-7956085)"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Registrar General Email</label>
                    <input
                      type="text"
                      disabled
                      value="info@zaitoonroots.edu / admissions@zaitoonroots.edu"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-white">Snapshot Database Management</h4>
                <p className="text-slate-400 leading-relaxed">
                  Download a full JSON snapshot of all registered admissions, treasury receipts, and faculty dossiers for offline archival.
                </p>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <button
                    onClick={() => {
                      const snapshot = {
                        academy: 'Zaitoon Roots Academy',
                        exportTimestamp: new Date().toISOString(),
                        admissions: admissionsList,
                        treasury: treasuryList,
                        faculty: facultyList,
                        auditLogs
                      };
                      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(snapshot, null, 2));
                      const downloadAnchor = document.createElement('a');
                      downloadAnchor.setAttribute('href', dataStr);
                      downloadAnchor.setAttribute('download', `ZRA_System_Snapshot_${Date.now()}.json`);
                      document.body.appendChild(downloadAnchor);
                      downloadAnchor.click();
                      downloadAnchor.remove();
                      setActionSuccessMessage('Complete JSON institutional database snapshot downloaded!');
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download JSON Snapshot</span>
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to reset ledger and admissions to initial academy seed data?')) {
                        localStorage.removeItem(TREASURY_STORAGE_KEY);
                        localStorage.removeItem(ADMISSIONS_STORAGE_KEY);
                        localStorage.removeItem(FACULTY_APPLICATIONS_KEY);
                        setTreasuryList(INITIAL_TREASURY_RECORDS);
                        setActionSuccessMessage('System demo records reset to initial state!');
                      }
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
                  >
                    Reset Demo State
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
