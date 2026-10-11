import React, { useState } from 'react';
import { PageId, TeacherApplication, StudentGradeRecord, AttendanceRecord } from '../types';
import {
  GraduationCap,
  UserCheck,
  FileText,
  Calendar,
  CheckCircle2,
  Clock,
  BookOpen,
  Award,
  Users,
  Search,
  Download,
  Printer,
  Send,
  Plus,
  Trash2,
  Sparkles,
  ShieldCheck,
  Building2,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  AlertCircle,
  FileSpreadsheet,
  Check,
  RotateCcw,
  Eye,
  ChevronRight,
  TrendingUp,
  UploadCloud,
  FileCheck2,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface TeacherPortalPageProps {
  onNavigate: (page: PageId) => void;
}

export const TeacherPortalPage: React.FC<TeacherPortalPageProps> = ({ onNavigate }) => {
  // Main portal navigation tabs
  const [activePortalTab, setActivePortalTab] = useState<
    'onboarding-form' | 'syllabus-planner' | 'marks-grading' | 'attendance-log' | 'leave-request' | 'timetable'
  >('onboarding-form');

  // Teacher Profile switcher for demo
  const [selectedProfile, setSelectedProfile] = useState<'tariq' | 'fatima' | 'applicant'>('tariq');

  // Teacher Onboarding Form State
  const [onboardingForm, setOnboardingForm] = useState({
    fullName: '',
    fatherHusbandName: '',
    cnicOrPassport: '',
    dob: '',
    gender: 'Male',
    bloodGroup: 'B+',
    mobileWhatsapp: '',
    alternatePhone: '',
    email: '',
    residentialAddress: '',
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
    preferredMode: 'Physical On-Campus' as 'Physical On-Campus' | 'Online Distance Learning' | 'Hybrid Blended',
    teachingShift: 'Morning' as 'Morning' | 'Evening' | 'Weekend Executive',
    publicationsCount: 12,
    googleScholarUrl: 'https://scholar.google.com/citations?user=zra-ai-faculty',
    orcidId: '0000-0002-1825-0097',
    coverLetter: 'I am passionate about student mentorship, hands-on lab experiments, and cutting-edge research in generative AI and deep architectures.',
    resumeFileName: 'Dr_Tariq_Khan_CV_Updated_2026.pdf'
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submittedApplicationId, setSubmittedApplicationId] = useState('');
  const [submissionDate, setSubmissionDate] = useState('');

  // Course Syllabus Planner State
  const [selectedCourse, setSelectedCourse] = useState('CS-401');
  const [syllabusSaved, setSyllabusSaved] = useState(false);

  // Student Marks Grading State
  const [gradingCourse, setGradingCourse] = useState('CS-401: Deep Learning (Sec 6A)');
  const [assessmentType, setAssessmentType] = useState<'midterm' | 'final' | 'quiz' | 'assignment'>('midterm');
  const [studentGrades, setStudentGrades] = useState<StudentGradeRecord[]>([
    { id: '1', rollNumber: 'ZRA-BSCS-2023-012', studentName: 'Hamza Bilal', quizMarks: 14, assignmentMarks: 10, midtermMarks: 24, finalMarks: 33, totalMarks: 81, grade: 'A-', gpa: 3.7, remarks: 'Excellent grasp of backpropagation' },
    { id: '2', rollNumber: 'ZRA-BSCS-2023-018', studentName: 'Ayesha Siddiqua', quizMarks: 15, assignmentMarks: 10, midtermMarks: 25, finalMarks: 35, totalMarks: 85, grade: 'A', gpa: 4.0, remarks: 'Top performer in PyTorch labs' },
    { id: '3', rollNumber: 'ZRA-BSCS-2023-025', studentName: 'Muhammad Daniyal', quizMarks: 12, assignmentMarks: 8, midtermMarks: 19, finalMarks: 28, totalMarks: 67, grade: 'B', gpa: 3.0, remarks: 'Good analytical skills' },
    { id: '4', rollNumber: 'ZRA-BSCS-2023-031', studentName: 'Zainab Noor', quizMarks: 14, assignmentMarks: 9, midtermMarks: 22, finalMarks: 31, totalMarks: 76, grade: 'B+', gpa: 3.3, remarks: 'Active classroom participation' },
    { id: '5', rollNumber: 'ZRA-BSCS-2023-044', studentName: 'Usman Farooq', quizMarks: 10, assignmentMarks: 7, midtermMarks: 16, finalMarks: 24, totalMarks: 57, grade: 'C+', gpa: 2.3, remarks: 'Recommended for extra lab tutoring' },
    { id: '6', rollNumber: 'ZRA-BSCS-2023-059', studentName: 'Fatima Batool', quizMarks: 15, assignmentMarks: 10, midtermMarks: 23, finalMarks: 34, totalMarks: 82, grade: 'A-', gpa: 3.7, remarks: 'Outstanding research paper review' }
  ]);
  const [gradesSavedMessage, setGradesSavedMessage] = useState(false);

  // Daily Attendance Log State
  const [attendanceDate, setAttendanceDate] = useState('2026-10-12');
  const [attendanceLectureNo, setAttendanceLectureNo] = useState('18');
  const [attendanceTopic, setAttendanceTopic] = useState('Convolutional Layers, Kernel Operations & Stride Pooling');
  const [attendanceList, setAttendanceList] = useState<AttendanceRecord[]>([
    { rollNumber: 'ZRA-BSCS-2023-012', studentName: 'Hamza Bilal', status: 'Present' },
    { rollNumber: 'ZRA-BSCS-2023-018', studentName: 'Ayesha Siddiqua', status: 'Present' },
    { rollNumber: 'ZRA-BSCS-2023-025', studentName: 'Muhammad Daniyal', status: 'Present' },
    { rollNumber: 'ZRA-BSCS-2023-031', studentName: 'Zainab Noor', status: 'Late', remarks: 'Joined at 09:12 AM' },
    { rollNumber: 'ZRA-BSCS-2023-044', studentName: 'Usman Farooq', status: 'Absent', remarks: 'Medical application pending' },
    { rollNumber: 'ZRA-BSCS-2023-059', studentName: 'Fatima Batool', status: 'Present' }
  ]);
  const [attendanceSaved, setAttendanceSaved] = useState(false);

  // Leave Request State
  const [leaveType, setLeaveType] = useState('Academic / Conference Duty Leave');
  const [leaveStartDate, setLeaveStartDate] = useState('2026-10-20');
  const [leaveEndDate, setLeaveEndDate] = useState('2026-10-22');
  const [substituteTeacher, setSubstituteTeacher] = useState('Dr. Fatima Zahra (Associate Prof)');
  const [leaveReason, setLeaveReason] = useState('Keynote presentation at IEEE International AI Symposium on Foundation Models');
  const [leaveSubmitted, setLeaveSubmitted] = useState(false);

  // Prefill demo application data
  const handlePrefillDemoData = () => {
    setOnboardingForm({
      fullName: 'Prof. Dr. Muhammad Tariq Khan',
      fatherHusbandName: 'Chaudhry Abdul Rehman Khan',
      cnicOrPassport: '37405-8912345-1',
      dob: '1984-06-15',
      gender: 'Male',
      bloodGroup: 'B+',
      mobileWhatsapp: '+92 344 7956085',
      alternatePhone: '+92 300 8594210',
      email: 'dr.tariq.khan@zaitoonroots.edu',
      residentialAddress: 'House 42, Sector F-10/2, Islamabad, Pakistan',
      city: 'Islamabad',
      domicile: 'Islamabad Capital Territory',
      highestDegree: 'PhD / Doctorate',
      terminalDegreeTitle: 'PhD in Artificial Intelligence & Machine Learning',
      awardingInstitute: 'National University of Sciences & Technology (NUST) / Imperial College Link',
      passingYear: '2020',
      cgpaOrDivision: '3.94 / 4.00 (Gold Medalist)',
      thesisTitle: 'Deep Reinforcement Learning and Graph Neural Architectures in Multi-Agent Autonomy',
      hecAttested: true,
      totalExperienceYears: 9,
      currentOrganization: 'Faculty of Computing & Advanced Informatics',
      currentDesignation: 'Professor & Head of Department',
      lastDrawnSalary: 'PKR 295,000',
      expectedSalary: 'PKR 350,000',
      departmentApplying: 'Faculty of Computing & Artificial Intelligence',
      preferredCourses: ['CS-401 Deep Learning', 'AI-302 Natural Language Processing', 'SE-410 Cloud Native Systems'],
      preferredMode: 'Physical On-Campus',
      teachingShift: 'Morning',
      publicationsCount: 16,
      googleScholarUrl: 'https://scholar.google.com/citations?user=zra-ai-tariq',
      orcidId: '0000-0002-1825-0097',
      coverLetter: 'Dedicated to inspiring undergraduate and postgraduate students through high-impact research, industrial collaborations, and experiential lab projects.',
      resumeFileName: 'Prof_Dr_Tariq_Khan_CV_HEC_2026.pdf'
    });
  };

  // Submit Teacher Application Form
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onboardingForm.fullName || !onboardingForm.mobileWhatsapp || !onboardingForm.email) {
      alert('Please fill in required fields (Name, Mobile/WhatsApp, and Email).');
      return;
    }
    const randId = `ZRA-FAC-APP-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedApplicationId(randId);
    setSubmissionDate(new Date().toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' }));
    setFormSubmitted(true);
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }
  };

  // Calculate Class Grade Statistics
  const totalStudents = studentGrades.length;
  const averageMarks = (studentGrades.reduce((acc, curr) => acc + curr.totalMarks, 0) / (totalStudents || 1)).toFixed(1);
  const highestMarks = Math.max(...studentGrades.map(s => s.totalMarks));
  const passCount = studentGrades.filter(s => s.totalMarks >= 50).length;
  const passRate = ((passCount / (totalStudents || 1)) * 100).toFixed(0);

  // Update a single student mark
  const handleGradeChange = (id: string, field: 'quizMarks' | 'assignmentMarks' | 'midtermMarks' | 'finalMarks', val: number) => {
    setStudentGrades(prev =>
      prev.map(item => {
        if (item.id === id) {
          const updated = { ...item, [field]: Number.isNaN(val) ? 0 : val };
          const sum = updated.quizMarks + updated.assignmentMarks + updated.midtermMarks + updated.finalMarks;
          let grade = 'F';
          let gpa = 0.0;
          if (sum >= 85) { grade = 'A'; gpa = 4.0; }
          else if (sum >= 80) { grade = 'A-'; gpa = 3.7; }
          else if (sum >= 75) { grade = 'B+'; gpa = 3.3; }
          else if (sum >= 70) { grade = 'B'; gpa = 3.0; }
          else if (sum >= 65) { grade = 'B-'; gpa = 2.7; }
          else if (sum >= 60) { grade = 'C+'; gpa = 2.3; }
          else if (sum >= 50) { grade = 'C'; gpa = 2.0; }
          return { ...updated, totalMarks: sum, grade, gpa };
        }
        return item;
      })
    );
  };

  // Toggle student attendance status
  const handleToggleAttendance = (rollNumber: string, status: 'Present' | 'Absent' | 'Late' | 'Excused') => {
    setAttendanceList(prev =>
      prev.map(s => (s.rollNumber === rollNumber ? { ...s, status } : s))
    );
  };

  // Mark all present
  const handleMarkAllPresent = () => {
    setAttendanceList(prev => prev.map(s => ({ ...s, status: 'Present' })));
  };

  return (
    <div className="bg-slate-900 min-h-screen py-8 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Quick Link */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <button onClick={() => onNavigate('home')} className="hover:text-amber-400 transition-colors">Home</button>
            <span>/</span>
            <button onClick={() => onNavigate('faculty')} className="hover:text-amber-400 transition-colors">Faculty Wing</button>
            <span>/</span>
            <span className="text-amber-400 font-bold">Teachers & Faculty Portal (اساتذہ پورٹل)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Faculty System Active (HEC Verified)
            </span>
          </div>
        </div>

        {/* Hero Top Banner: Faculty Identity & Quick Profile Switcher */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 p-0.5 shadow-xl shrink-0">
                <div className="w-full h-full bg-slate-950 rounded-2xl flex flex-col items-center justify-center text-amber-400">
                  <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">FACULTY</span>
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="bg-amber-400/20 text-amber-300 text-xs px-2.5 py-0.5 rounded-full font-bold border border-amber-400/30">
                    Official Teachers Portal
                  </span>
                  <span className="text-xs text-slate-400">
                    اساتذہ و فیکلٹی سنٹرل پورٹل • Academic Year 2026-27
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                  Teachers Portal & Faculty Management Desk
                </h1>
                <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                  Recruitment & onboarding form, 16-week lecture syllabus planner, student marks & GPA grading entry, and daily attendance logs.
                </p>
              </div>
            </div>

            {/* Profile Switcher Card */}
            <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 flex flex-col gap-2 shrink-0 lg:w-80 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase text-slate-400">Active Faculty Profile</span>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded font-mono">
                  ID: ZRA-FAC-8819
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-sm shadow">
                  TK
                </div>
                <div className="leading-tight">
                  <div className="font-bold text-sm text-white">Prof. Dr. Tariq Khan</div>
                  <div className="text-xs text-slate-400">Dean, Computing & AI</div>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" /> HEC Approved Supervisor
                </span>
                <span className="text-slate-400 font-mono">16 Research Papers</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80">
            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block font-medium">Assigned Courses</span>
              <span className="text-lg sm:text-xl font-bold text-white flex items-center gap-1.5 mt-0.5">
                <BookOpen className="w-4 h-4 text-amber-400" /> 4 Active Classes
              </span>
            </div>
            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block font-medium">Enrolled Students</span>
              <span className="text-lg sm:text-xl font-bold text-white flex items-center gap-1.5 mt-0.5">
                <Users className="w-4 h-4 text-emerald-400" /> 182 Students
              </span>
            </div>
            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block font-medium">Weekly Lecture Hours</span>
              <span className="text-lg sm:text-xl font-bold text-white flex items-center gap-1.5 mt-0.5">
                <Clock className="w-4 h-4 text-cyan-400" /> 18 Credit Hours
              </span>
            </div>
            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block font-medium">Syllabus Completion</span>
              <span className="text-lg sm:text-xl font-bold text-white flex items-center gap-1.5 mt-0.5">
                <TrendingUp className="w-4 h-4 text-purple-400" /> 68% On Track
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-800">
            {[
              { id: 'onboarding-form', label: 'Faculty Onboarding & Recruitment Form (اساتذہ بھرتی فارم)', icon: FileText },
              { id: 'syllabus-planner', label: 'Course Syllabus & 16-Week Plan (سلیبس پلانر)', icon: BookOpen },
              { id: 'marks-grading', label: 'Student Marks & Exam Grading (نمبرات اندراج)', icon: Award },
              { id: 'attendance-log', label: 'Daily Attendance & Lecture Log (حاضری و لاگ)', icon: UserCheck },
              { id: 'leave-request', label: 'Leave & Duty Replacement Request (چھٹی درخواست)', icon: Calendar },
              { id: 'timetable', label: 'Weekly Timetable (ہفتہ وار کلاس اوقات)', icon: Clock }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activePortalTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActivePortalTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-400/20'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB 1: TEACHER / FACULTY ONBOARDING & APPLICATION FORM */}
        {activePortalTab === 'onboarding-form' && (
          <div className="space-y-6">
            {/* Header info & prefill action */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  <h2 className="text-xl font-bold text-white">
                    Faculty Recruitment & Onboarding Application Form
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  مکمل اساتذہ بھرتی و تعیناتی درخواست فارم • Fill all personal, educational, teaching preferences, and research details.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrefillDemoData}
                  className="px-4 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40 text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
                  <span>Auto-Fill Demo Professor Data (ڈیمو ڈیٹا بھریں)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOnboardingForm({
                      fullName: '',
                      fatherHusbandName: '',
                      cnicOrPassport: '',
                      dob: '',
                      gender: 'Male',
                      bloodGroup: 'B+',
                      mobileWhatsapp: '',
                      alternatePhone: '',
                      email: '',
                      residentialAddress: '',
                      city: '',
                      domicile: '',
                      highestDegree: 'PhD / Doctorate',
                      terminalDegreeTitle: '',
                      awardingInstitute: '',
                      passingYear: '',
                      cgpaOrDivision: '',
                      thesisTitle: '',
                      hecAttested: true,
                      totalExperienceYears: 0,
                      currentOrganization: '',
                      currentDesignation: '',
                      lastDrawnSalary: '',
                      expectedSalary: '',
                      departmentApplying: 'Faculty of Computing & Artificial Intelligence',
                      preferredCourses: [],
                      preferredMode: 'Physical On-Campus',
                      teachingShift: 'Morning',
                      publicationsCount: 0,
                      googleScholarUrl: '',
                      orcidId: '',
                      coverLetter: '',
                      resumeFileName: ''
                    });
                    setFormSubmitted(false);
                  }}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear Form</span>
                </button>
              </div>
            </div>

            {/* Submission Success Alert & Printable Voucher */}
            {formSubmitted && (
              <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 border-2 border-emerald-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl animate-in fade-in slide-in-from-top duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-emerald-800/40">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black">
                      <Check className="w-8 h-8" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                        APPLICATION SUBMISSION CONFIRMED (درخواست کامیابی سے جمع ہوگئی)
                      </span>
                      <h3 className="text-2xl font-black text-white mt-0.5">
                        Teacher Onboarding Application Registered
                      </h3>
                      <p className="text-xs text-slate-300">
                        Official Faculty Tracking Number: <strong className="text-amber-400 font-mono text-sm">{submittedApplicationId}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-2 border border-slate-700 cursor-pointer shadow"
                    >
                      <Printer className="w-4 h-4 text-amber-400" />
                      <span>Print Application (پرنٹ نکالیں)</span>
                    </button>
                    <button
                      onClick={() => alert(`Applicant Dossier ${submittedApplicationId} downloaded as verified PDF.`)}
                      className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-2 cursor-pointer shadow"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download PDF Dossier</span>
                    </button>
                  </div>
                </div>

                {/* Summary Voucher Card */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-xs text-slate-300">
                  <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block font-semibold">Applicant Name</span>
                    <span className="text-sm font-bold text-white block mt-0.5">{onboardingForm.fullName}</span>
                    <span className="text-slate-400 mt-2 block font-semibold">CNIC / Identity</span>
                    <span className="font-mono text-amber-300">{onboardingForm.cnicOrPassport || '37405-8912345-1'}</span>
                    <span className="text-slate-400 mt-2 block font-semibold">Applied Department</span>
                    <span className="text-white">{onboardingForm.departmentApplying}</span>
                  </div>

                  <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block font-semibold">Highest Qualification</span>
                    <span className="text-sm font-bold text-white block mt-0.5">{onboardingForm.highestDegree} - {onboardingForm.terminalDegreeTitle}</span>
                    <span className="text-slate-400 mt-2 block font-semibold">Teaching Experience</span>
                    <span className="text-emerald-400 font-bold">{onboardingForm.totalExperienceYears} Years Academic / Industrial</span>
                    <span className="text-slate-400 mt-2 block font-semibold">Preferred Mode</span>
                    <span className="text-white">{onboardingForm.preferredMode} ({onboardingForm.teachingShift})</span>
                  </div>

                  <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <span className="text-slate-400 block font-semibold">Application Status</span>
                      <span className="inline-block mt-1 px-2.5 py-1 rounded bg-amber-400/20 text-amber-300 font-bold border border-amber-400/40">
                        Received & Scheduled for Dean Review
                      </span>
                      <p className="text-[11px] text-slate-400 mt-2">
                        HR Academic Committee will contact you on WhatsApp / Phone: <strong className="text-white">{onboardingForm.mobileWhatsapp}</strong>
                      </p>
                    </div>
                    <div className="pt-2 text-[10px] text-slate-500 font-mono">
                      Timestamp: {submissionDate} • ZRA Faculty Gate
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Comprehensive Multi-Section Form */}
            <form onSubmit={handleFormSubmit} className="space-y-6">
              
              {/* Section 1: Personal & Contact Information */}
              <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-800">
                  <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Personal & Contact Details (ذاتی کوائف و رابطے کی معلومات)
                    </h3>
                    <p className="text-xs text-slate-400">Official legal credentials as per CNIC / Passport.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Full Legal Name (پورا نام) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Prof. Dr. Tariq Mahmood"
                      value={onboardingForm.fullName}
                      onChange={e => setOnboardingForm({ ...onboardingForm, fullName: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Father's / Husband's Name (والد / شوہر کا نام) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chaudhry Abdul Rehman"
                      value={onboardingForm.fatherHusbandName}
                      onChange={e => setOnboardingForm({ ...onboardingForm, fatherHusbandName: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      CNIC / Passport Number (شناختی کارڈ نمبر) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 37405-1234567-1 or P-982144"
                      value={onboardingForm.cnicOrPassport}
                      onChange={e => setOnboardingForm({ ...onboardingForm, cnicOrPassport: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Date of Birth (تاریخ پیدائش)
                    </label>
                    <input
                      type="date"
                      value={onboardingForm.dob}
                      onChange={e => setOnboardingForm({ ...onboardingForm, dob: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Gender (جنس)
                    </label>
                    <select
                      value={onboardingForm.gender}
                      onChange={e => setOnboardingForm({ ...onboardingForm, gender: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Male">Male (مرد)</option>
                      <option value="Female">Female (خاتون)</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Blood Group (بلڈ گروپ)
                    </label>
                    <select
                      value={onboardingForm.bloodGroup}
                      onChange={e => setOnboardingForm({ ...onboardingForm, bloodGroup: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Mobile / WhatsApp Number (موبائل و واٹس ایپ) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+92 344 7956085"
                      value={onboardingForm.mobileWhatsapp}
                      onChange={e => setOnboardingForm({ ...onboardingForm, mobileWhatsapp: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Email Address (ای میل پتہ) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="faculty@zaitoonroots.edu"
                      value={onboardingForm.email}
                      onChange={e => setOnboardingForm({ ...onboardingForm, email: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      City & Domicile (شہر و ڈومیسائل)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Islamabad / Rawalpindi / Lahore"
                      value={onboardingForm.city}
                      onChange={e => setOnboardingForm({ ...onboardingForm, city: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="sm:col-span-2 lg:col-span-3">
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Residential & Postal Address (موجودہ رہائشی پتہ)
                    </label>
                    <input
                      type="text"
                      placeholder="House No, Street, Sector, City, Country"
                      value={onboardingForm.residentialAddress}
                      onChange={e => setOnboardingForm({ ...onboardingForm, residentialAddress: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Academic Qualifications & Degrees */}
              <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-800">
                  <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Academic Degrees & Educational Credentials (تعلیمی اسناد و اسناد کی تفصیل)
                    </h3>
                    <p className="text-xs text-slate-400">Terminal degree, awarding university, CGPA, and HEC verification status.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Highest Degree Level (اعلیٰ ترین ڈگری) <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={onboardingForm.highestDegree}
                      onChange={e => setOnboardingForm({ ...onboardingForm, highestDegree: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="PhD / Doctorate">PhD / Doctorate (ڈاکٹریٹ)</option>
                      <option value="Post-Doctorate">Post-Doctorate</option>
                      <option value="MS / MPhil (18 Years)">MS / MPhil (18 Years)</option>
                      <option value="BS / Masters (16 Years)">BS / Masters (16 Years)</option>
                      <option value="Fellowship / FCPS">Fellowship / FCPS / Medical</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Terminal Degree Title (ڈگری کا نام) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. PhD in Computer Science / AI"
                      value={onboardingForm.terminalDegreeTitle}
                      onChange={e => setOnboardingForm({ ...onboardingForm, terminalDegreeTitle: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Awarding University / Institute (جامعہ کا نام) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. NUST / QAU / Imperial College"
                      value={onboardingForm.awardingInstitute}
                      onChange={e => setOnboardingForm({ ...onboardingForm, awardingInstitute: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Year of Passing (سال فراغت)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 2021"
                      value={onboardingForm.passingYear}
                      onChange={e => setOnboardingForm({ ...onboardingForm, passingYear: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      CGPA / Marks / Division (نمبرات یا جی پی اے)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 3.90 / 4.00 or 85%"
                      value={onboardingForm.cgpaOrDivision}
                      onChange={e => setOnboardingForm({ ...onboardingForm, cgpaOrDivision: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="flex items-center pt-6">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={onboardingForm.hecAttested}
                        onChange={e => setOnboardingForm({ ...onboardingForm, hecAttested: e.target.checked })}
                        className="w-5 h-5 rounded text-amber-400 bg-slate-900 border-slate-700 focus:ring-amber-400"
                      />
                      <span className="text-xs font-medium text-slate-200">
                        HEC Attested & Equivalence Certified (ایچ ای سی سے تصدیق شدہ)
                      </span>
                    </label>
                  </div>

                  <div className="sm:col-span-2 lg:col-span-3">
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      PhD Thesis / Master's Dissertation Title (تحقیقی مقالے کا عنوان)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Neural Networks in Multimodal Generative Systems"
                      value={onboardingForm.thesisTitle}
                      onChange={e => setOnboardingForm({ ...onboardingForm, thesisTitle: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Teaching Experience, Publications & Research */}
              <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-800">
                  <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Teaching Experience & Publications (تدریسی تجربہ و ریسرچ پیپرز)
                    </h3>
                    <p className="text-xs text-slate-400">Total years of classroom instruction, previous university, and published journals.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Total Experience (Years) (کل تدریسی سال) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="40"
                      value={onboardingForm.totalExperienceYears}
                      onChange={e => setOnboardingForm({ ...onboardingForm, totalExperienceYears: Number(e.target.value) })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Current / Last University or Institute (موجودہ ادارہ)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. FAST / NUST / Air University"
                      value={onboardingForm.currentOrganization}
                      onChange={e => setOnboardingForm({ ...onboardingForm, currentOrganization: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Current / Last Designation (عہدہ)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Associate Professor / Senior Lecturer"
                      value={onboardingForm.currentDesignation}
                      onChange={e => setOnboardingForm({ ...onboardingForm, currentDesignation: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      HEC / Scopus Recognized Publications Count (تحقیقی مقالوں کی تعداد)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={onboardingForm.publicationsCount}
                      onChange={e => setOnboardingForm({ ...onboardingForm, publicationsCount: Number(e.target.value) })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Google Scholar Profile Link (گوگل اسکالر لنک)
                    </label>
                    <input
                      type="url"
                      placeholder="https://scholar.google.com/..."
                      value={onboardingForm.googleScholarUrl}
                      onChange={e => setOnboardingForm({ ...onboardingForm, googleScholarUrl: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      ORCID ID
                    </label>
                    <input
                      type="text"
                      placeholder="0000-0002-XXXX-XXXX"
                      value={onboardingForm.orcidId}
                      onChange={e => setOnboardingForm({ ...onboardingForm, orcidId: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Teaching Subject Preferences, Mode & Shift */}
              <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-800">
                  <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-sm">
                    4
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Department, Teaching Mode & Compensation (شعبہ، تدریسی طریقہ کار و تنخواہ)
                    </h3>
                    <p className="text-xs text-slate-400">Preferred faculties, course tags, on-campus/online modes, and salary bracket.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Department Applying For (شعبہ) <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={onboardingForm.departmentApplying}
                      onChange={e => setOnboardingForm({ ...onboardingForm, departmentApplying: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Faculty of Computing & Artificial Intelligence">Faculty of Computing & Artificial Intelligence</option>
                      <option value="Faculty of Software Engineering & Cyber Defense">Faculty of Software Engineering & Cyber Defense</option>
                      <option value="Faculty of Allied Health & Medical Sciences">Faculty of Allied Health & Medical Sciences</option>
                      <option value="Faculty of Business Administration & Fintech">Faculty of Business Administration & Fintech</option>
                      <option value="Faculty of Media, Design & Creative Arts">Faculty of Media, Design & Creative Arts</option>
                      <option value="Faculty of Islamic Studies, Law & Languages">Faculty of Islamic Studies, Law & Languages</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Teaching Delivery Mode (تدریسی طریقہ)
                    </label>
                    <select
                      value={onboardingForm.preferredMode}
                      onChange={e => setOnboardingForm({ ...onboardingForm, preferredMode: e.target.value as any })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Physical On-Campus">Physical On-Campus (کیمپس پر تدریس)</option>
                      <option value="Online Distance Learning">Online Distance Learning (عالمی آن لائن کلاسز)</option>
                      <option value="Hybrid Blended">Hybrid Blended (آن لائن + فزیکل مکس)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Teaching Shift (اوقات کار)
                    </label>
                    <select
                      value={onboardingForm.teachingShift}
                      onChange={e => setOnboardingForm({ ...onboardingForm, teachingShift: e.target.value as any })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Morning">Morning Shift (08:30 AM - 03:30 PM)</option>
                      <option value="Evening">Evening Shift (03:30 PM - 09:00 PM)</option>
                      <option value="Weekend Executive">Weekend Executive (Sat & Sun)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Last Drawn Monthly Salary (سابقہ تنخواہ)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. PKR 250,000"
                      value={onboardingForm.lastDrawnSalary}
                      onChange={e => setOnboardingForm({ ...onboardingForm, lastDrawnSalary: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Expected Monthly Salary (مطلوبہ تنخواہ) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. PKR 320,000"
                      value={onboardingForm.expectedSalary}
                      onChange={e => setOnboardingForm({ ...onboardingForm, expectedSalary: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Notice Period / Availability
                    </label>
                    <select className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400">
                      <option>Immediate Joiner (فوری دستیاب)</option>
                      <option>15 Days Notice Period</option>
                      <option>1 Month Notice Period</option>
                      <option>From Next Semester (Fall / Spring)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 5: Resume & Document Upload Simulation */}
              <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-800">
                  <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-sm">
                    5
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Resume & Degree Document Desk (سی وی و اسناد کی فائلز)
                    </h3>
                    <p className="text-xs text-slate-400">Upload your updated CV / Resume, terminal degree transcript, and experience letters.</p>
                  </div>
                </div>

                <div className="border-2 border-dashed border-slate-700 hover:border-amber-400/60 rounded-2xl p-6 text-center transition-colors bg-slate-900/40">
                  <UploadCloud className="w-10 h-10 text-amber-400 mx-auto mb-2" />
                  <div className="text-sm font-bold text-white">
                    {onboardingForm.resumeFileName || 'Click to select or drag your CV / Resume here'}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    PDF, DOCX format up to 25 MB • HEC Format CV Preferred
                  </p>
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={() => {
                        setOnboardingForm({ ...onboardingForm, resumeFileName: 'Dr_Tariq_Khan_CV_Updated_2026.pdf' });
                        alert('Resume file "Dr_Tariq_Khan_CV_Updated_2026.pdf" successfully attached.');
                      }}
                      className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-amber-300 border border-slate-700 cursor-pointer"
                    >
                      Attach Sample CV (فائل منتخب کریں)
                    </button>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-800">
                  <p className="text-xs text-slate-400 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Your academic credentials are encrypted and stored in compliance with HEC regulations.</span>
                  </p>

                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-sm shadow-xl shadow-amber-400/20 flex items-center justify-center gap-2 cursor-pointer transition-all transform hover:-translate-y-0.5"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Faculty Application (درخواست جمع کروائیں)</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: COURSE SYLLABUS & 16-WEEK LECTURE PLANNER */}
        {activePortalTab === 'syllabus-planner' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-amber-400" />
                    <h2 className="text-xl font-bold text-white">
                      Course Syllabus & 16-Week Lecture Planner (کورس سلیبس و لیکچر پلان)
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Weekly outline, learning outcomes, textbook readings, and lab assignments.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={selectedCourse}
                    onChange={e => setSelectedCourse(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-amber-300 focus:outline-none"
                  >
                    <option value="CS-401">CS-401: Deep Learning & Neural Architectures (3+1 Credit)</option>
                    <option value="AI-302">AI-302: Natural Language Processing & LLMs (3+0 Credit)</option>
                    <option value="SE-410">SE-410: Cloud Native DevOps & Microservices (2+1 Credit)</option>
                  </select>

                  <button
                    onClick={() => {
                      setSyllabusSaved(true);
                      setTimeout(() => setSyllabusSaved(false), 3000);
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save & Lock Syllabus</span>
                  </button>
                </div>
              </div>

              {syllabusSaved && (
                <div className="my-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Syllabus breakdown for {selectedCourse} submitted to Dean Office and published on Student LMS.</span>
                </div>
              )}

              {/* Course Meta Info */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
                <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Credit Hours</span>
                  <span className="text-sm font-bold text-white">3 Lecture + 1 Lab (4 Total)</span>
                </div>
                <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Prerequisites</span>
                  <span className="text-sm font-bold text-white">CS-201 Data Structures, MATH-201 Linear Algebra</span>
                </div>
                <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Primary Textbook</span>
                  <span className="text-sm font-bold text-amber-300">Deep Learning (Goodfellow et al., MIT Press)</span>
                </div>
                <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Course Coordinator</span>
                  <span className="text-sm font-bold text-white">Prof. Dr. Tariq Khan (ZRA)</span>
                </div>
              </div>

              {/* 16-Week Syllabus Planner Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Week</th>
                      <th className="py-3 px-4">Topic & Theoretical Breakdown</th>
                      <th className="py-3 px-4">Practical Lab Experiment</th>
                      <th className="py-3 px-4">Readings / References</th>
                      <th className="py-3 px-4">Assessment / Milestone</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 bg-slate-950/60">
                    {[
                      { week: 'Week 1-2', topic: 'Introduction to Deep Learning, Perceptrons & Multi-Layer Neural Networks', lab: 'Lab 1: Python NumPy vectorization & forward pass implementation', reading: 'Goodfellow Ch. 6 (p. 165-190)', milestone: 'Quiz 1 (5%)' },
                      { week: 'Week 3-4', topic: 'Loss Functions, Backpropagation Algorithm & Gradient Descent Variants (Adam, RMSProp)', lab: 'Lab 2: Custom autograd engine in pure Python', reading: 'Goodfellow Ch. 8', milestone: 'Assignment 1 Due' },
                      { week: 'Week 5-6', topic: 'Convolutional Neural Networks (CNNs), Spatial Filters, Strides & Pooling', lab: 'Lab 3: Image Classification on CIFAR-10 with PyTorch', reading: 'Stanford CS231n notes', milestone: 'Lab Quiz 1' },
                      { week: 'Week 7-8', topic: 'Transfer Learning, Modern CNNs (ResNet, EfficientNet, ConvNeXt) & Overfitting', lab: 'Lab 4: Fine-tuning ResNet50 for medical X-ray diagnosis', reading: 'He et al., Deep Residual Learning', milestone: 'Midterm Examination (25%)' },
                      { week: 'Week 9-10', topic: 'Recurrent Neural Networks (RNN), LSTM & Gated Recurrent Units (GRU)', lab: 'Lab 5: Time-series stock forecasting with PyTorch LSTMs', reading: 'Goodfellow Ch. 10', milestone: 'Term Project Proposal' },
                      { week: 'Week 11-12', topic: 'Attention Mechanisms, Self-Attention & Transformer Architecture (BERT, GPT)', lab: 'Lab 6: Transformer attention matrix visualization in Colab', reading: 'Vaswani et al., Attention Is All You Need', milestone: 'Quiz 2 (5%)' },
                      { week: 'Week 13-14', topic: 'Generative Adversarial Networks (GANs) & Diffusion Probabilistic Models', lab: 'Lab 7: Conditional image generation with Stable Diffusion pipeline', reading: 'Ho et al., DDPM paper', milestone: 'Term Project Presentation' },
                      { week: 'Week 15-16', topic: 'Model Optimization, Quantization, TensorRT Deployment & Semester Review', lab: 'Lab 8: Exporting PyTorch models to ONNX & Edge deployment', reading: 'Review Notes & Past Papers', milestone: 'Final Examination (40%)' }
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-amber-400 whitespace-nowrap">
                          {row.week}
                        </td>
                        <td className="py-3.5 px-4 font-medium text-white max-w-xs sm:max-w-md">
                          {row.topic}
                        </td>
                        <td className="py-3.5 px-4 text-emerald-300">
                          {row.lab}
                        </td>
                        <td className="py-3.5 px-4 text-slate-400">
                          {row.reading}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded bg-amber-400/15 text-amber-300 text-[11px] font-bold border border-amber-400/30">
                            {row.milestone}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: STUDENT MARKS, EXAM & GPA GRADING ENTRY */}
        {activePortalTab === 'marks-grading' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    <h2 className="text-xl font-bold text-white">
                      Student Marks & Exam Grading Entry Form (طلباء نمبرات اور رزلٹ اندراج)
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Enter quiz, assignment, midterm and final marks with automatic percentage, grade letter and GPA calculation.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={gradingCourse}
                    onChange={e => setGradingCourse(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-amber-300 focus:outline-none"
                  >
                    <option>CS-401: Deep Learning (Sec 6A)</option>
                    <option>AI-302: NLP & LLMs (Sec 4B)</option>
                    <option>SE-410: DevOps Architecture (Sec 8A)</option>
                  </select>

                  <button
                    onClick={() => {
                      setGradesSavedMessage(true);
                      setTimeout(() => setGradesSavedMessage(false), 3500);
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submit Grades to Exam Cell</span>
                  </button>
                </div>
              </div>

              {gradesSavedMessage && (
                <div className="my-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Official Grade Sheet for {gradingCourse} signed digitally and pushed to Controller of Examinations.
                  </span>
                  <span className="text-[10px] font-mono bg-emerald-900/50 px-2 py-0.5 rounded">ZRA-ACAD-VERIFIED</span>
                </div>
              )}

              {/* Performance Stats KPI Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Class Average</span>
                  <span className="text-xl font-bold text-amber-300">{averageMarks} / 100</span>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Highest Score</span>
                  <span className="text-xl font-bold text-emerald-400">{highestMarks} / 100</span>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Passing Ratio</span>
                  <span className="text-xl font-bold text-cyan-400">{passRate}% (Pass: {passCount})</span>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Grade Scale</span>
                  <span className="text-xs font-bold text-slate-200 mt-1 block">A (85+) • B (70+) • C (50+)</span>
                </div>
              </div>

              {/* Interactive Student Grade Sheet Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full text-left text-xs text-slate-200">
                  <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
                    <tr>
                      <th className="py-3.5 px-4">Roll Number</th>
                      <th className="py-3.5 px-4">Student Name</th>
                      <th className="py-3.5 px-3 text-center">Quizzes (Max 15)</th>
                      <th className="py-3.5 px-3 text-center">Assignments (Max 10)</th>
                      <th className="py-3.5 px-3 text-center">Midterm (Max 25)</th>
                      <th className="py-3.5 px-3 text-center">Final (Max 50)</th>
                      <th className="py-3.5 px-3 text-center font-bold text-white">Total Marks</th>
                      <th className="py-3.5 px-3 text-center font-bold text-amber-400">Grade</th>
                      <th className="py-3.5 px-3 text-center">GPA</th>
                      <th className="py-3.5 px-4">Instructor Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 bg-slate-950/60">
                    {studentGrades.map(s => (
                      <tr key={s.id} className="hover:bg-slate-900/40 transition-colors">
                        <td className="py-3 px-4 font-mono text-amber-300 font-semibold">{s.rollNumber}</td>
                        <td className="py-3 px-4 font-bold text-white">{s.studentName}</td>

                        <td className="py-3 px-3 text-center">
                          <input
                            type="number"
                            min="0"
                            max="15"
                            value={s.quizMarks}
                            onChange={e => handleGradeChange(s.id, 'quizMarks', parseInt(e.target.value, 10))}
                            className="w-14 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-center font-bold text-white focus:outline-none focus:border-amber-400"
                          />
                        </td>

                        <td className="py-3 px-3 text-center">
                          <input
                            type="number"
                            min="0"
                            max="10"
                            value={s.assignmentMarks}
                            onChange={e => handleGradeChange(s.id, 'assignmentMarks', parseInt(e.target.value, 10))}
                            className="w-14 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-center font-bold text-white focus:outline-none focus:border-amber-400"
                          />
                        </td>

                        <td className="py-3 px-3 text-center">
                          <input
                            type="number"
                            min="0"
                            max="25"
                            value={s.midtermMarks}
                            onChange={e => handleGradeChange(s.id, 'midtermMarks', parseInt(e.target.value, 10))}
                            className="w-14 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-center font-bold text-white focus:outline-none focus:border-amber-400"
                          />
                        </td>

                        <td className="py-3 px-3 text-center">
                          <input
                            type="number"
                            min="0"
                            max="50"
                            value={s.finalMarks}
                            onChange={e => handleGradeChange(s.id, 'finalMarks', parseInt(e.target.value, 10))}
                            className="w-14 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-center font-bold text-white focus:outline-none focus:border-amber-400"
                          />
                        </td>

                        <td className="py-3 px-3 text-center font-black text-sm text-white">
                          {s.totalMarks} / 100
                        </td>

                        <td className="py-3 px-3 text-center">
                          <span className={`px-2 py-0.5 rounded text-xs font-black ${
                            s.grade.startsWith('A')
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : s.grade.startsWith('B')
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          }`}>
                            {s.grade}
                          </span>
                        </td>

                        <td className="py-3 px-3 text-center font-mono font-bold text-slate-300">
                          {s.gpa.toFixed(1)}
                        </td>

                        <td className="py-3 px-4">
                          <input
                            type="text"
                            value={s.remarks}
                            onChange={e => {
                              const val = e.target.value;
                              setStudentGrades(prev => prev.map(item => item.id === s.id ? { ...item, remarks: val } : item));
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-300 focus:outline-none focus:border-amber-400"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-800 text-xs">
                <div className="text-slate-400">
                  Showing 6 students in Section 6A • Total credit weighting: 4.0
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => alert('Grade sheet exported as CS401_Fall2026_Grades.csv')}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Official Roster</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DAILY ATTENDANCE & LECTURE LOG */}
        {activePortalTab === 'attendance-log' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-amber-400" />
                    <h2 className="text-xl font-bold text-white">
                      Daily Attendance & Lecture Delivery Log Form (روزانہ حاضری و لیکچر لاگ)
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Mark student physical/online attendance and record classroom topic delivery for academic audit.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleMarkAllPresent}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Mark All Present (سب حاضر)</span>
                  </button>

                  <button
                    onClick={() => {
                      setAttendanceSaved(true);
                      setTimeout(() => setAttendanceSaved(false), 3000);
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Save & Submit Attendance</span>
                  </button>
                </div>
              </div>

              {attendanceSaved && (
                <div className="my-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Attendance for Lecture #{attendanceLectureNo} on {attendanceDate} successfully submitted to Registrar Office.</span>
                </div>
              )}

              {/* Lecture Metadata Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Lecture Date (تاریخ)
                  </label>
                  <input
                    type="date"
                    value={attendanceDate}
                    onChange={e => setAttendanceDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Lecture Number (لیکچر نمبر)
                  </label>
                  <input
                    type="text"
                    value={attendanceLectureNo}
                    onChange={e => setAttendanceLectureNo(e.target.value)}
                    placeholder="e.g. 18 of 32"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Class Room / Mode
                  </label>
                  <input
                    type="text"
                    defaultValue="Room 304 (AI Lab Wing) • Physical"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Topic Delivered in Class (آج کا پڑھایا گیا عنوان)
                  </label>
                  <input
                    type="text"
                    value={attendanceTopic}
                    onChange={e => setAttendanceTopic(e.target.value)}
                    placeholder="e.g. Backpropagation calculus, PyTorch autograd tensors"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Student Attendance List */}
              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full text-left text-xs text-slate-200">
                  <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Roll Number</th>
                      <th className="py-3 px-4">Student Name</th>
                      <th className="py-3 px-4">Attendance Status Toggle</th>
                      <th className="py-3 px-4">Teacher Remark</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 bg-slate-950/60">
                    {attendanceList.map(s => (
                      <tr key={s.rollNumber} className="hover:bg-slate-900/40 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-semibold text-amber-300">{s.rollNumber}</td>
                        <td className="py-3.5 px-4 font-bold text-white">{s.studentName}</td>
                        <td className="py-3.5 px-4">
                          <div className="inline-flex rounded-lg border border-slate-700 bg-slate-900 p-1 gap-1">
                            {(['Present', 'Absent', 'Late', 'Excused'] as const).map(opt => {
                              const isCurrent = s.status === opt;
                              let colorClass = 'text-slate-400 hover:text-white';
                              if (isCurrent) {
                                if (opt === 'Present') colorClass = 'bg-emerald-500 text-slate-950 font-bold';
                                if (opt === 'Absent') colorClass = 'bg-rose-500 text-white font-bold';
                                if (opt === 'Late') colorClass = 'bg-amber-400 text-slate-950 font-bold';
                                if (opt === 'Excused') colorClass = 'bg-sky-500 text-slate-950 font-bold';
                              }
                              return (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => handleToggleAttendance(s.rollNumber, opt)}
                                  className={`px-2.5 py-1 rounded text-[11px] transition-colors cursor-pointer ${colorClass}`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <input
                            type="text"
                            placeholder="Add remark if absent/late..."
                            value={s.remarks || ''}
                            onChange={e => {
                              const val = e.target.value;
                              setAttendanceList(prev => prev.map(item => item.rollNumber === s.rollNumber ? { ...item, remarks: val } : item));
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-xs text-slate-300 focus:outline-none focus:border-amber-400"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Attendance Summary */}
              <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-800 text-xs">
                <div className="flex items-center gap-4">
                  <span className="text-emerald-400 font-bold">Present: {attendanceList.filter(s => s.status === 'Present').length}</span>
                  <span className="text-rose-400 font-bold">Absent: {attendanceList.filter(s => s.status === 'Absent').length}</span>
                  <span className="text-amber-400 font-bold">Late: {attendanceList.filter(s => s.status === 'Late').length}</span>
                  <span className="text-sky-400 font-bold">Excused: {attendanceList.filter(s => s.status === 'Excused').length}</span>
                </div>
                <div className="text-slate-400 font-mono">
                  Attendance Rate: {((attendanceList.filter(s => s.status === 'Present').length / (attendanceList.length || 1)) * 100).toFixed(0)}%
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: LEAVE & DUTY REPLACEMENT REQUEST */}
        {activePortalTab === 'leave-request' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="pb-6 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-400" />
                  <h2 className="text-xl font-bold text-white">
                    Faculty Leave & Duty Replacement Request Form (چھٹی اور ڈیوٹی روسٹر درخواست)
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Apply for casual, medical, or academic conference leave with alternate teacher substitute approval.
                </p>
              </div>

              {leaveSubmitted && (
                <div className="my-6 p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-xs">
                  <div className="flex items-center gap-2 font-bold text-sm text-white">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Leave Request Registered Successfully (چھٹی کی درخواست جمع ہوگئی)
                  </div>
                  <p className="mt-1">
                    Tracking ID: <strong className="font-mono text-amber-300">ZRA-FAC-LV-4491</strong> • Forwarded to Dean of Computing and Registrar Office.
                  </p>
                </div>
              )}

              <form onSubmit={e => { e.preventDefault(); setLeaveSubmitted(true); }} className="space-y-5 mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Leave Type (چھٹی کی قسم) <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={leaveType}
                      onChange={e => setLeaveType(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    >
                      <option>Casual Leave (اتفاقی چھٹی)</option>
                      <option>Medical / Sick Leave (طبی چھٹی)</option>
                      <option>Academic / Conference Duty Leave (ریسرچ و کانفرنس)</option>
                      <option>Hajj / Umrah Duty Leave</option>
                      <option>Maternity / Paternity Leave</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Start Date (آغاز کی تاریخ) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={leaveStartDate}
                      onChange={e => setLeaveStartDate(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      End Date (اختتام کی تاریخ) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={leaveEndDate}
                      onChange={e => setLeaveEndDate(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Substitute / Alternate Teacher (متبادل استاد) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={substituteTeacher}
                      onChange={e => setSubstituteTeacher(e.target.value)}
                      placeholder="e.g. Dr. Fatima Zahra (Associate Prof)"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Reason / Justification (چھٹی کی وجہ) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={leaveReason}
                      onChange={e => setLeaveReason(e.target.value)}
                      placeholder="e.g. Attending IEEE conference in Lahore"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Leave Balance Gauge */}
                <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block">Annual Casual Leaves</span>
                    <span className="text-sm font-bold text-white">12 / 15 Remaining</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Medical Leaves</span>
                    <span className="text-sm font-bold text-white">8 / 10 Remaining</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Duty / Conference Leaves</span>
                    <span className="text-sm font-bold text-emerald-400">Unlimited (Approved)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Substitute Status</span>
                    <span className="text-sm font-bold text-amber-300">Confirmed by Proxy</span>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Leave Application (چھٹی جمع کروائیں)</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 6: WEEKLY TIMETABLE & SCHEDULE */}
        {activePortalTab === 'timetable' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-amber-400" />
                    <h2 className="text-xl font-bold text-white">
                      Weekly Teaching Timetable & Room Schedule (ہفتہ وار کلاس اوقات کار)
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Fall 2026 Academic Term • Physical Lecture Halls & Google Meet Virtual Class Links.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Timetable</span>
                  </button>
                </div>
              </div>

              {/* Timetable Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {[
                  { day: 'Monday (پیر)', time: '09:00 AM - 10:30 AM', course: 'CS-401 Deep Learning', room: 'Hall B-201', section: 'BS-AI 6A', mode: 'Physical On-Campus' },
                  { day: 'Monday (پیر)', time: '11:00 AM - 01:00 PM', course: 'CS-401 Deep Learning Lab', room: 'Lab 4 (GPU Cluster)', section: 'BS-AI 6A', mode: 'Lab Practical' },
                  { day: 'Tuesday (منگل)', time: '10:00 AM - 11:30 AM', course: 'AI-302 Natural Language Processing', room: 'Hall A-102', section: 'BS-CS 4B', mode: 'Physical On-Campus' },
                  { day: 'Wednesday (بدھ)', time: '02:00 PM - 03:30 PM', course: 'SE-410 Cloud Native Systems', room: 'Virtual Room / Meet', section: 'BS-SE 8A', mode: 'Live Distance Learning' },
                  { day: 'Thursday (جمعرات)', time: '09:00 AM - 10:30 AM', course: 'CS-401 Deep Learning', room: 'Hall B-201', section: 'BS-AI 6A', mode: 'Physical On-Campus' },
                  { day: 'Friday (جمعہ)', time: '10:00 AM - 11:30 AM', course: 'AI-302 NLP & LLM Lab', room: 'Lab 2 (Tensor Studio)', section: 'BS-CS 4B', mode: 'Lab Practical' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-900/80 border border-slate-800 hover:border-amber-400/50 rounded-2xl p-4 transition-colors">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-amber-400">{item.day}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300">
                        {item.mode}
                      </span>
                    </div>

                    <div className="mt-3">
                      <h4 className="font-bold text-white text-sm">{item.course}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Section: {item.section}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
                      <span className="flex items-center gap-1 text-slate-400">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" />
                        {item.time}
                      </span>
                      <span className="font-semibold text-slate-200">{item.room}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bottom Fast Links & Helpdesk */}
        <div className="mt-10 bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="font-bold text-white block">Faculty Support & HR Academic Liaison Office</span>
              <span>Dean Office Extension: Ext. 401 / 402 • Direct Faculty Line: +92 344 7956085 • faculty.hr@zaitoonroots.edu</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('faculty')}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold cursor-pointer"
            >
              View All Faculty Deans
            </button>
            <button
              onClick={() => onNavigate('lms-portal')}
              className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold cursor-pointer"
            >
              Switch to Student LMS
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
