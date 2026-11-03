import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = parseInt(process.env.PORT || '3000', 10);
const DATA_DIR = path.join(__dirname, 'data', 'db');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helper to load or initialize JSON file
function loadCollection<T>(fileName: string, defaultData: T[]): T[] {
  const filePath = path.join(DATA_DIR, fileName);
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), 'utf-8');
      return defaultData;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error(`Error loading collection ${fileName}:`, err);
    return defaultData;
  }
}

// Helper to save JSON file atomically
function saveCollection<T>(fileName: string, data: T[]): void {
  const filePath = path.join(DATA_DIR, fileName);
  const tempPath = `${filePath}.tmp`;
  try {
    fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempPath, filePath);
  } catch (err) {
    console.error(`Error saving collection ${fileName}:`, err);
  }
}

// Seed initial datasets
const INITIAL_ADMISSIONS = [
  {
    applicationId: 'ZR-2026-1049',
    applicantName: 'Muhammad Arham Khan',
    fatherName: 'Tariq Mehmood Khan',
    cnicOrBForm: '37405-8849201-3',
    email: 'arham.khan.pk@gmail.com',
    phone: '0300-5542190',
    selectedProgram: 'BS Artificial Intelligence (BS-AI)',
    programType: 'Degree',
    deliveryMode: 'On-Campus Physical',
    campusPreference: 'Islamabad Central Flagship Campus',
    previousEducation: 'F.Sc Pre-Engineering',
    percentageMarks: 88,
    address: 'House 42, Sector F-10/2, Islamabad',
    submissionDate: '2026-10-05 10:30 AM',
    status: 'Admission Offer Issued',
    challanNumber: 'CH-ZRA-902144',
    estimatedFee: 'Rs. 95,000 (30% Merit Scholarship Applied)',
    notes: 'Merit List #1 Qualified. Original documents verified.'
  },
  {
    applicationId: 'ZR-2026-1050',
    applicantName: 'Zainab Fatima',
    fatherName: 'Syed Qasim Ali',
    cnicOrBForm: '61101-7729104-6',
    email: 'zainab.fatima99@yahoo.com',
    phone: '0333-8819024',
    selectedProgram: 'Doctor of Physical Therapy (DPT)',
    programType: 'Degree',
    deliveryMode: 'On-Campus Physical',
    campusPreference: 'Lahore Executive Campus',
    previousEducation: 'F.Sc Pre-Medical',
    percentageMarks: 91,
    address: 'Gulberg III, Lahore',
    submissionDate: '2026-10-06 02:15 PM',
    status: 'Document Verification Pending',
    challanNumber: 'CH-ZRA-902145',
    estimatedFee: 'Rs. 135,000 (50% Chancellor Scholarship)',
    notes: 'Awaiting PMC / HEC equivalence certificate submission.'
  },
  {
    applicationId: 'ZR-2026-1051',
    applicantName: 'Daniyal Ahmed Sheikh',
    fatherName: 'Sheikh Muhammad Naveed',
    cnicOrBForm: '42201-6549210-9',
    email: 'daniyal.sheikh.dev@outlook.com',
    phone: '0345-9920156',
    selectedProgram: 'Diploma in Generative AI & Prompt Engineering',
    programType: 'Diploma',
    deliveryMode: '100% Online Live Classes (Global/Remote)',
    campusPreference: 'Karachi Waterfront Campus',
    previousEducation: 'Graduation in Commerce',
    percentageMarks: 76,
    address: 'Clifton Block 5, Karachi',
    submissionDate: '2026-10-07 09:40 AM',
    status: 'Application Submitted',
    challanNumber: 'CH-ZRA-902146',
    estimatedFee: 'Rs. 45,000',
    notes: 'Evening Live Zoom batch preference.'
  }
];

const INITIAL_TREASURY = [
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
    date: '2026-10-05 11:20 AM',
    status: 'Completed',
    notes: 'Semester 1 Advance Tuition Cleared',
    purpose: 'Tuition Fee Deposit'
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
    date: '2026-10-06 12:45 PM',
    status: 'Pending Verification',
    notes: 'Merit Scholarship 50% Tuition Fee Refund',
    purpose: 'Scholarship Stipend Refund'
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
    date: '2026-10-06 01:15 PM',
    status: 'Completed',
    notes: 'Physical Therapy DPT Admission Challan',
    purpose: 'Admission Fee'
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
    date: '2026-10-07 02:00 PM',
    status: 'Pending Verification',
    notes: 'AI Neural Lab Research Paper Bounty',
    purpose: 'Faculty Honorarium'
  }
];

const INITIAL_CONTACTS = [
  {
    id: 'CNT-501',
    name: 'Kamran Akmal',
    email: 'kamran.akmal@edu.pk',
    phone: '0321-9988776',
    subject: 'Equivalence & HEC Recognition Query',
    message: 'Can I transfer my 3rd semester BS Computer Science credits from another university to Zaitoon Roots Academy?',
    status: 'Replied',
    createdAt: '2026-10-04 11:15 AM',
    notes: 'Transferred to Academic Registrar office.'
  },
  {
    id: 'CNT-502',
    name: 'Sobia Batool',
    email: 'sobia.batool@gmail.com',
    phone: '0315-4422119',
    subject: 'Hostel Accommodation for Female Students',
    message: 'Please provide monthly fee and security details for female hostel at Islamabad Campus.',
    status: 'New',
    createdAt: '2026-10-07 09:05 AM',
    notes: 'Pending hostel warden response.'
  }
];

const INITIAL_FACULTY = [
  {
    applicationId: 'FAC-2026-081',
    fullName: 'Dr. Tariq Mahmood Khan',
    fatherHusbandName: 'Mehmood Ahmed',
    cnicOrPassport: '37405-1928374-1',
    dob: '1984-06-12',
    gender: 'Male',
    bloodGroup: 'B+',
    mobileWhatsapp: '0344-7956085',
    alternatePhone: '051-9284710',
    email: 'tariq.mahmood@zra.edu.pk',
    address: 'Street 9, Sector G-11/3, Islamabad',
    city: 'Islamabad',
    domicile: 'Islamabad Capital Territory',
    highestDegree: 'PhD / Doctorate',
    terminalDegreeTitle: 'PhD in Artificial Intelligence',
    awardingInstitute: 'National University of Sciences & Technology (NUST)',
    passingYear: '2021',
    cgpaOrDivision: '3.92 / 4.00 (First Division)',
    thesisTitle: 'Deep Reinforcement Learning in Multi-Agent Autonomous Navigation',
    hecAttested: true,
    totalExperienceYears: 8,
    currentOrganization: 'FAST National University / AI Tech Hub',
    currentDesignation: 'Associate Professor / Lead AI Scientist',
    lastDrawnSalary: 'PKR 285,000',
    expectedSalary: 'PKR 350,000',
    departmentApplying: 'Faculty of Computing & Artificial Intelligence',
    preferredCourses: ['CS-401 Deep Learning', 'AI-302 Neural Networks', 'SE-410 DevOps & Cloud'],
    preferredMode: 'Physical On-Campus',
    teachingShift: 'Morning',
    publicationsCount: 12,
    googleScholarUrl: 'https://scholar.google.com/citations?user=zra-ai-faculty',
    orcidId: '0000-0002-1825-0097',
    resumeFileName: 'Dr_Tariq_Khan_CV_Updated_2026.pdf',
    submissionDate: '2026-10-02 04:30 PM',
    status: 'Shortlisted for Interview'
  }
];

const INITIAL_VERIFICATIONS = [
  {
    verificationId: 'VER-2026-881',
    studentName: 'Ali Raza',
    fatherName: 'Muhammad Raza',
    rollNumber: 'ZRA-2022-CS-041',
    programName: 'BS Computer Science',
    programType: 'Degree',
    session: '2022 - 2026',
    cgpaOrGrade: '3.84 / 4.00 (Gold Medalist)',
    issueDate: 'August 14, 2026',
    status: 'Verified & Genuine',
    campus: 'Islamabad Central Flagship Campus',
    transcriptSerial: 'ZRA-TR-998241'
  },
  {
    verificationId: 'VER-2026-882',
    studentName: 'Maria Bibi',
    fatherName: 'Muhammad Aslam',
    rollNumber: 'ZRA-2023-AI-018',
    programName: 'BS Artificial Intelligence',
    programType: 'Degree',
    session: '2023 - 2027',
    cgpaOrGrade: '3.76 / 4.00',
    issueDate: 'September 10, 2026',
    status: 'Verified & Genuine',
    campus: 'Lahore Executive Campus',
    transcriptSerial: 'ZRA-TR-998242'
  }
];

const INITIAL_AUDIT_LOGS = [
  {
    id: 'LOG-1001',
    timestamp: '2026-10-07 08:30:15',
    action: 'System Boot & Permanent JSON Database Initialized',
    actor: 'System Daemon',
    module: 'Security',
    status: 'Success',
    details: 'Database tables verified in /data/db/*.json with atomic write locks.'
  },
  {
    id: 'LOG-1002',
    timestamp: '2026-10-07 09:15:22',
    action: 'Admission Offer Generation',
    actor: 'Registrar General',
    module: 'Admissions',
    status: 'Success',
    details: 'Application ZR-2026-1049 approved with 30% merit scholarship waiver.'
  }
];

async function startServer() {
  const app = express();

  // Middleware
  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ extended: true, limit: '20mb' }));

  // Security Headers
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });

  // REST API: Health Check
  app.get('/api/health', (req: Request, res: Response) => {
    const admissions = loadCollection('admissions.json', INITIAL_ADMISSIONS);
    const treasury = loadCollection('treasury.json', INITIAL_TREASURY);
    const contacts = loadCollection('contacts.json', INITIAL_CONTACTS);
    const faculty = loadCollection('faculty.json', INITIAL_FACULTY);

    res.json({
      status: 'online',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
      database: {
        engine: 'Permanent File-Backed JSON DB (Atomic Persistence)',
        location: DATA_DIR,
        records: {
          admissions: admissions.length,
          treasury: treasury.length,
          contacts: contacts.length,
          faculty: faculty.length
        }
      }
    });
  });

  // REST API: Admin Authentication
  app.post('/api/auth/login', (req: Request, res: Response) => {
    const { pin } = req.body;
    if (pin === 'zra-admin-2026' || pin === 'admin' || pin === '03447956085') {
      const session = {
        isAuthenticated: true,
        role: 'Super Admin',
        adminName: 'Chief Chancellor & Administrator',
        loginTime: new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' }),
        token: `zra-auth-token-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
      };

      // Log to audit log
      const logs = loadCollection('audit_logs.json', INITIAL_AUDIT_LOGS);
      logs.unshift({
        id: `LOG-${Date.now()}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        action: 'Executive Admin Login',
        actor: 'Super Admin',
        module: 'Security',
        status: 'Success',
        details: `Successful authenticated login session generated.`
      });
      saveCollection('audit_logs.json', logs);

      res.json({ success: true, session });
    } else {
      res.status(401).json({ success: false, message: 'Invalid Admin Security PIN. Access Denied.' });
    }
  });

  // REST API: Admissions CRUD
  app.get('/api/admissions', (req: Request, res: Response) => {
    const data = loadCollection('admissions.json', INITIAL_ADMISSIONS);
    res.json({ success: true, count: data.length, data });
  });

  app.post('/api/admissions', (req: Request, res: Response) => {
    try {
      const appData = req.body;
      if (!appData.applicantName || !appData.phone) {
        return res.status(400).json({ success: false, message: 'Applicant name and phone number are required.' });
      }

      const currentList = loadCollection('admissions.json', INITIAL_ADMISSIONS);
      const newId = appData.applicationId || `ZR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const newChallan = appData.challanNumber || `CH-ZRA-${Math.floor(100000 + Math.random() * 900000)}`;

      const newRecord = {
        ...appData,
        applicationId: newId,
        challanNumber: newChallan,
        submissionDate: appData.submissionDate || new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' }),
        status: appData.status || 'Application Submitted'
      };

      currentList.unshift(newRecord);
      saveCollection('admissions.json', currentList);

      // Audit log
      const logs = loadCollection('audit_logs.json', INITIAL_AUDIT_LOGS);
      logs.unshift({
        id: `LOG-${Date.now()}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        action: 'New Admission Submitted',
        actor: appData.applicantName,
        module: 'Admissions',
        status: 'Success',
        details: `Application ${newId} submitted for ${appData.selectedProgram || 'Program'}.`
      });
      saveCollection('audit_logs.json', logs);

      res.status(201).json({ success: true, data: newRecord });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.put('/api/admissions/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;
    const currentList = loadCollection('admissions.json', INITIAL_ADMISSIONS);
    const index = currentList.findIndex((item: any) => item.applicationId === id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Record not found.' });
    }

    currentList[index] = { ...currentList[index], ...updates };
    saveCollection('admissions.json', currentList);

    // Audit log
    const logs = loadCollection('audit_logs.json', INITIAL_AUDIT_LOGS);
    logs.unshift({
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      action: 'Admission Record Updated',
      actor: 'Super Admin',
      module: 'Admissions',
      status: 'Success',
      details: `Record ${id} updated to status: ${updates.status || 'Modified'}.`
    });
    saveCollection('audit_logs.json', logs);

    res.json({ success: true, data: currentList[index] });
  });

  app.delete('/api/admissions/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    let currentList = loadCollection('admissions.json', INITIAL_ADMISSIONS);
    const initialLen = currentList.length;
    currentList = currentList.filter((item: any) => item.applicationId !== id);

    if (currentList.length === initialLen) {
      return res.status(404).json({ success: false, message: 'Record not found.' });
    }

    saveCollection('admissions.json', currentList);
    res.json({ success: true, message: `Admission record ${id} successfully removed.` });
  });

  // REST API: Treasury & Financial Transactions CRUD
  app.get('/api/treasury', (req: Request, res: Response) => {
    const data = loadCollection('treasury.json', INITIAL_TREASURY);
    res.json({ success: true, count: data.length, data });
  });

  app.post('/api/treasury', (req: Request, res: Response) => {
    try {
      const txnData = req.body;
      const currentList = loadCollection('treasury.json', INITIAL_TREASURY);
      const newId = txnData.id || `TXN-${Math.floor(10000 + Math.random() * 90000)}`;

      const newRecord = {
        ...txnData,
        id: newId,
        date: txnData.date || new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' }),
        status: txnData.status || (txnData.type === 'deposit' ? 'Completed' : 'Pending Verification')
      };

      currentList.unshift(newRecord);
      saveCollection('treasury.json', currentList);

      // Audit log
      const logs = loadCollection('audit_logs.json', INITIAL_AUDIT_LOGS);
      logs.unshift({
        id: `LOG-${Date.now()}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        action: `Treasury ${txnData.type === 'withdraw' ? 'Withdrawal Request' : 'Deposit Recorded'}`,
        actor: txnData.studentName || txnData.accountTitle || 'Desk Officer',
        module: 'Treasury',
        status: 'Success',
        details: `Amount PKR ${Number(txnData.amount).toLocaleString()} via ${txnData.gateway || 'Direct Gateway'}`
      });
      saveCollection('audit_logs.json', logs);

      res.status(201).json({ success: true, data: newRecord });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.put('/api/treasury/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;
    const currentList = loadCollection('treasury.json', INITIAL_TREASURY);
    const index = currentList.findIndex((item: any) => item.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Transaction not found.' });
    }

    currentList[index] = { ...currentList[index], ...updates };
    saveCollection('treasury.json', currentList);

    res.json({ success: true, data: currentList[index] });
  });

  app.delete('/api/treasury/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    let currentList = loadCollection('treasury.json', INITIAL_TREASURY);
    const initialLen = currentList.length;
    currentList = currentList.filter((item: any) => item.id !== id);

    if (currentList.length === initialLen) {
      return res.status(404).json({ success: false, message: 'Transaction not found.' });
    }

    saveCollection('treasury.json', currentList);
    res.json({ success: true, message: `Transaction ${id} deleted.` });
  });

  // REST API: Contacts / Inquiries CRUD
  app.get('/api/contacts', (req: Request, res: Response) => {
    const data = loadCollection('contacts.json', INITIAL_CONTACTS);
    res.json({ success: true, count: data.length, data });
  });

  app.post('/api/contacts', (req: Request, res: Response) => {
    try {
      const contactData = req.body;
      const currentList = loadCollection('contacts.json', INITIAL_CONTACTS);
      const newId = `CNT-${Math.floor(100 + Math.random() * 900)}`;

      const newRecord = {
        ...contactData,
        id: newId,
        status: 'New',
        createdAt: new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' })
      };

      currentList.unshift(newRecord);
      saveCollection('contacts.json', currentList);

      res.status(201).json({ success: true, data: newRecord });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.patch('/api/contacts/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, notes } = req.body;
    const currentList = loadCollection('contacts.json', INITIAL_CONTACTS);
    const index = currentList.findIndex((item: any) => item.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Inquiry not found.' });
    }

    if (status) currentList[index].status = status;
    if (notes !== undefined) currentList[index].notes = notes;
    saveCollection('contacts.json', currentList);

    res.json({ success: true, data: currentList[index] });
  });

  app.delete('/api/contacts/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    let currentList = loadCollection('contacts.json', INITIAL_CONTACTS);
    currentList = currentList.filter((item: any) => item.id !== id);
    saveCollection('contacts.json', currentList);
    res.json({ success: true, message: 'Inquiry removed.' });
  });

  // REST API: Faculty Onboarding CRUD
  app.get('/api/faculty', (req: Request, res: Response) => {
    const data = loadCollection('faculty.json', INITIAL_FACULTY);
    res.json({ success: true, count: data.length, data });
  });

  app.post('/api/faculty', (req: Request, res: Response) => {
    try {
      const facData = req.body;
      const currentList = loadCollection('faculty.json', INITIAL_FACULTY);
      const newId = `FAC-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;

      const newRecord = {
        ...facData,
        applicationId: newId,
        submissionDate: facData.submissionDate || new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' }),
        status: facData.status || 'Received & In Review'
      };

      currentList.unshift(newRecord);
      saveCollection('faculty.json', currentList);

      res.status(201).json({ success: true, data: newRecord });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.put('/api/faculty/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;
    const currentList = loadCollection('faculty.json', INITIAL_FACULTY);
    const index = currentList.findIndex((item: any) => item.applicationId === id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Faculty application not found.' });
    }

    currentList[index] = { ...currentList[index], ...updates };
    saveCollection('faculty.json', currentList);

    res.json({ success: true, data: currentList[index] });
  });

  app.delete('/api/faculty/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    let currentList = loadCollection('faculty.json', INITIAL_FACULTY);
    currentList = currentList.filter((item: any) => item.applicationId !== id);
    saveCollection('faculty.json', currentList);
    res.json({ success: true, message: 'Faculty record removed.' });
  });

  // REST API: Degree Verification CRUD
  app.get('/api/verifications', (req: Request, res: Response) => {
    const data = loadCollection('verifications.json', INITIAL_VERIFICATIONS);
    res.json({ success: true, count: data.length, data });
  });

  app.post('/api/verifications', (req: Request, res: Response) => {
    const verData = req.body;
    const currentList = loadCollection('verifications.json', INITIAL_VERIFICATIONS);
    const newId = `VER-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;

    const newRecord = {
      ...verData,
      verificationId: newId,
      status: verData.status || 'Verified & Genuine'
    };

    currentList.unshift(newRecord);
    saveCollection('verifications.json', currentList);
    res.status(201).json({ success: true, data: newRecord });
  });

  // REST API: System Audit Logs
  app.get('/api/audit-logs', (req: Request, res: Response) => {
    const logs = loadCollection('audit_logs.json', INITIAL_AUDIT_LOGS);
    res.json({ success: true, data: logs });
  });

  // REST API: Comprehensive Executive Stats
  app.get('/api/stats', (req: Request, res: Response) => {
    const admissions = loadCollection('admissions.json', INITIAL_ADMISSIONS);
    const treasury = loadCollection('treasury.json', INITIAL_TREASURY);
    const contacts = loadCollection('contacts.json', INITIAL_CONTACTS);
    const faculty = loadCollection('faculty.json', INITIAL_FACULTY);

    const totalDeposits = treasury
      .filter((t: any) => t.type === 'deposit' || t.type === 'tuition_fee')
      .reduce((sum: number, t: any) => sum + (Number(t.amount) || 0), 0);

    const totalWithdrawals = treasury
      .filter((t: any) => t.type === 'withdraw')
      .reduce((sum: number, t: any) => sum + (Number(t.amount) || 0), 0);

    const pendingAdmissions = admissions.filter((a: any) => a.status !== 'Admission Offer Issued').length;
    const pendingWithdrawals = treasury.filter((t: any) => t.type === 'withdraw' && t.status === 'Pending Verification').length;

    res.json({
      success: true,
      stats: {
        totalAdmissions: admissions.length,
        pendingAdmissions,
        totalFacultyApplicants: faculty.length,
        totalInquiries: contacts.length,
        treasury: {
          totalDepositedPkr: totalDeposits,
          totalWithdrawnPkr: totalWithdrawals,
          netBalancePkr: totalDeposits - totalWithdrawals,
          pendingWithdrawalsCount: pendingWithdrawals
        }
      }
    });
  });

  // REST API: Export Collection as CSV
  app.get('/api/export-csv/:collection', (req: Request, res: Response) => {
    const { collection } = req.params;
    let data: any[] = [];
    let filename = `${collection}_export_${Date.now()}.csv`;

    switch (collection) {
      case 'admissions':
        data = loadCollection('admissions.json', INITIAL_ADMISSIONS);
        break;
      case 'treasury':
        data = loadCollection('treasury.json', INITIAL_TREASURY);
        break;
      case 'contacts':
        data = loadCollection('contacts.json', INITIAL_CONTACTS);
        break;
      case 'faculty':
        data = loadCollection('faculty.json', INITIAL_FACULTY);
        break;
      case 'verifications':
        data = loadCollection('verifications.json', INITIAL_VERIFICATIONS);
        break;
      default:
        return res.status(400).send('Invalid collection name.');
    }

    if (!data.length) {
      return res.status(200).send('No records found.');
    }

    // Generate CSV string
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','),
      ...data.map((row) =>
        headers
          .map((fieldName) => {
            let val = row[fieldName];
            if (val === undefined || val === null) val = '';
            if (typeof val === 'object') val = JSON.stringify(val);
            val = String(val).replace(/"/g, '""');
            return `"${val}"`;
          })
          .join(',')
      )
    ];

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(csvRows.join('\r\n'));
  });

  // Vite Integration: Dev vs Production
  const isProduction = process.env.NODE_ENV === 'production';
  const distPath = path.join(__dirname, 'dist');

  if (isProduction && fs.existsSync(distPath)) {
    console.log('Serving production static build from:', distPath);
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    console.log('Initializing Vite middleware mode in development...');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ZRA High-Performance Full-Stack Server running on port ${PORT}`);
    console.log(`Database storage active at: ${DATA_DIR}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal Server Error:', err);
  process.exit(1);
});
