export type PageId =
  | 'home'
  | 'degrees'
  | 'diplomas'
  | 'admissions'
  | 'lms-portal'
  | 'fee-scholarship'
  | 'faculty'
  | 'calendar'
  | 'verification'
  | 'library'
  | 'placement'
  | 'campus-tour'
  | 'accreditations'
  | 'student-life'
  | 'distance-learning'
  | 'career-counselor'
  | 'downloads'
  | 'news-events'
  | 'alumni'
  | 'contact';

export interface PageInfo {
  id: PageId;
  pageNumber: number;
  title: string;
  urduTitle: string;
  subtitle: string;
  category: 'Core' | 'Academics' | 'Admissions & Fees' | 'Student Services' | 'Institution';
  icon: string;
}

export type DegreeLevel =
  | 'Undergraduate'
  | 'Postgraduate'
  | 'Doctorate'
  | 'Associate'
  | 'Executive'
  | string;

export interface DegreeProgram {
  id: string;
  title: string;
  code: string;
  level: DegreeLevel;
  faculty: string;
  duration: string;
  credits: number;
  eligibility: string;
  careerProspects: string[];
  description: string;
  semesterFee: string;
  mode: string;
  onlineAvailable: boolean;
  onlineClassSchedule: string;
  classDeliveryModes: string[];
  alphabetLetter: string;
  highlights: string[];
}

export type DiplomaCategory =
  | 'Information Technology & AI'
  | 'Business & Finance'
  | 'Healthcare & Paramedical'
  | 'Engineering & Industrial'
  | 'Creative Arts & Media'
  | 'Languages & Linguistics'
  | 'Vocational & Management'
  | string;

export interface DiplomaProgram {
  id: string;
  title: string;
  code: string;
  duration: string;
  category: DiplomaCategory;
  level: string;
  totalFee: string;
  eligibility: string;
  skillsGained: string[];
  description: string;
  alphabetLetter: string;
  careerRoles: string[];
  certificationBody: string;
  onlineAvailable: boolean;
  onlineClassSchedule: string;
  classDeliveryModes: string[];
}

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  qualification: string;
  specialization: string;
  experience: string;
  email: string;
  publicationsCount: number;
  image: string;
}

export interface VerificationRecord {
  verificationId: string;
  studentName: string;
  fatherName: string;
  rollNumber: string;
  programName: string;
  programType: 'Degree' | 'Diploma';
  session: string;
  cgpaOrGrade: string;
  issueDate: string;
  status: 'Verified & Genuine' | 'Under Review' | 'Not Found';
  campus: string;
  transcriptSerial: string;
}

export interface NewsEventItem {
  id: string;
  title: string;
  urduTitle?: string;
  date: string;
  category: 'News' | 'Event' | 'Notice' | 'Convocation' | 'Workshop';
  summary: string;
  image: string;
  featured?: boolean;
}

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  subject: string;
  isbn: string;
  type: 'E-Book' | 'Research Paper' | 'Lecture Notes' | 'Past Paper';
  downloads: number;
  pages: number;
  format: string;
}

export interface AlumniRecord {
  id: string;
  name: string;
  degree: string;
  batch: string;
  currentRole: string;
  company: string;
  country: string;
  testimonial: string;
  image: string;
}

export interface AdmissionApplication {
  applicationId: string;
  applicantName: string;
  fatherName: string;
  cnicOrBForm: string;
  email: string;
  phone: string;
  selectedProgram: string;
  programType: 'Degree' | 'Diploma';
  deliveryMode: '100% Online Live Classes (Global/Remote)' | 'On-Campus Physical' | 'Hybrid Blended';
  onlineTimezonePreference?: string;
  campusPreference: string;
  previousEducation: string;
  percentageMarks: number;
  address: string;
  submissionDate: string;
  status: 'Application Submitted' | 'Document Verification Pending' | 'Test Scheduled' | 'Admission Offer Issued';
  challanNumber: string;
  estimatedFee: string;
}
