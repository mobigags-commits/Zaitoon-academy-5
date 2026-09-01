import { PageInfo, FacultyMember, VerificationRecord, NewsEventItem, LibraryBook, AlumniRecord } from '../types';

export const PAGES_MANIFEST: PageInfo[] = [
  {
    id: 'home',
    pageNumber: 1,
    title: 'Home & Welcome Hub',
    urduTitle: 'مرکزی صفحہ و تعارف',
    subtitle: 'Grand Entrance, Academic Highlights, Virtual Tour & Live Admission Desk',
    category: 'Core',
    icon: 'Home'
  },
  {
    id: 'degrees',
    pageNumber: 2,
    title: "All The World's Degrees Directory",
    urduTitle: 'تمام عالمی ڈگریاں (All The World Degrees)',
    subtitle: 'Undergraduate, Postgraduate, Engineering, Medicine, CS, AI, Law & Arts',
    category: 'Academics',
    icon: 'GraduationCap'
  },
  {
    id: 'diplomas',
    pageNumber: 3,
    title: "All The World's Professional Diplomas",
    urduTitle: 'تمام عالمی پروفیشنل ڈپلوماز و سرٹیفکیٹس',
    subtitle: 'Industry-Ready 1-2 Year Diplomas & Fast-Track Executive Certifications',
    category: 'Academics',
    icon: 'Award'
  },
  {
    id: 'admissions',
    pageNumber: 4,
    title: 'Online Admissions Portal',
    urduTitle: 'آن لائن داخلہ فارم و فیس چالان',
    subtitle: '4-Step Interactive Digital Application, Document Desk & Application Tracking',
    category: 'Admissions & Fees',
    icon: 'FileSpreadsheet'
  },
  {
    id: 'lms-portal',
    pageNumber: 5,
    title: 'Student Academic Portal (LMS)',
    urduTitle: 'طلباء پورٹل و لرننگ مینجمنٹ سسٹم',
    subtitle: 'Course Lectures, Timetable, CGPA Calculator, Attendance & Assignments',
    category: 'Student Services',
    icon: 'LayoutDashboard'
  },
  {
    id: 'fee-scholarship',
    pageNumber: 6,
    title: 'Fee Structure & Scholarships',
    urduTitle: 'فیس کا ڈھانچہ و وظائف کیلکولیٹر',
    subtitle: 'Semester Fee Calculator, Installment Plans & 100% Merit Financial Aid',
    category: 'Admissions & Fees',
    icon: 'Calculator'
  },
  {
    id: 'faculty',
    pageNumber: 7,
    title: 'Faculty & Research Wing',
    urduTitle: 'اساتذہ کرام و ریسرچ ڈیپارٹمنٹ',
    subtitle: 'Distinguished PhD Deans, Global Visiting Scholars & Published Research',
    category: 'Institution',
    icon: 'Users'
  },
  {
    id: 'calendar',
    pageNumber: 8,
    title: 'Academic Calendar & Exams',
    urduTitle: 'تعلیمی کیلنڈر و امتحانات شیڈول',
    subtitle: 'Semester Timelines, Midterms, Finals, Project Submissions & Holidays',
    category: 'Academics',
    icon: 'Calendar'
  },
  {
    id: 'verification',
    pageNumber: 9,
    title: 'Online Credential Verification',
    urduTitle: 'ڈگری و ڈپلوما آن لائن تصدیق',
    subtitle: 'Instant Certificate Verification System with QR Validation & Roll Lookup',
    category: 'Student Services',
    icon: 'ShieldCheck'
  },
  {
    id: 'library',
    pageNumber: 10,
    title: 'Digital E-Library & Papers',
    urduTitle: 'ڈیجیٹل ای لائبریری و ریسرچ پیپرز',
    subtitle: '50,000+ E-Books, Past Examination Papers & Research Journals Repository',
    category: 'Student Services',
    icon: 'BookOpen'
  },
  {
    id: 'placement',
    pageNumber: 11,
    title: 'Career Placement & Internships',
    urduTitle: 'ملازمتوں کے مواقع و انٹرن شپ سیل',
    subtitle: 'Corporate Liaison with Top Global Employers & High-Package Hiring Drives',
    category: 'Student Services',
    icon: 'Briefcase'
  },
  {
    id: 'campus-tour',
    pageNumber: 12,
    title: 'Global Campus Infrastructure',
    urduTitle: 'کیمپس کی سہولیات و لیبارٹریاں',
    subtitle: 'Modern STEM Labs, Robotics Studios, Sports Arena, Hostels & Auditoriums',
    category: 'Institution',
    icon: 'Building2'
  },
  {
    id: 'accreditations',
    pageNumber: 13,
    title: 'International Affiliations',
    urduTitle: 'بین الاقوامی الحاق و تسلیم شدہ اسناد',
    subtitle: 'HEC, WES, ISO 9001 Certified, UNESCO Linkages & Global Credit Transfers',
    category: 'Institution',
    icon: 'CheckCircle2'
  },
  {
    id: 'student-life',
    pageNumber: 14,
    title: 'Student Life, Clubs & Sports',
    urduTitle: 'طلباء کی سرگرمیاں، سوسائٹیز و کھیل',
    subtitle: 'Robotics Society, Debating Club, Sports Olympiad & Model United Nations',
    category: 'Student Services',
    icon: 'Compass'
  },
  {
    id: 'distance-learning',
    pageNumber: 15,
    title: 'Distance & Global Online Campus',
    urduTitle: 'آن لائن و فاصلاتی نظامِ تعلیم',
    subtitle: '100% Online Study Worldwide, Flexible Timings & International Student Base',
    category: 'Academics',
    icon: 'Globe'
  },
  {
    id: 'career-counselor',
    pageNumber: 16,
    title: 'AI Career Path & Program Matcher',
    urduTitle: 'سمارٹ کیریئر کونسلر و رہنمائی',
    subtitle: 'Interactive Aptitude Test & Tailored Degree/Diploma Decision Engine',
    category: 'Academics',
    icon: 'Sparkles'
  },
  {
    id: 'downloads',
    pageNumber: 17,
    title: 'Downloads & Prospectus Hub',
    urduTitle: 'پراسپیکٹس، فارمز و نصاب ڈاؤن لوڈز',
    subtitle: '2026-27 Prospectus, Admission Brochures, Migration Forms & Course Syllabi',
    category: 'Student Services',
    icon: 'Download'
  },
  {
    id: 'news-events',
    pageNumber: 18,
    title: 'News, Events & Convocation',
    urduTitle: 'خبریں، سیمینارز و سالانہ کانووکیشن',
    subtitle: 'Grand Convocation Ceremony, International Symposia & Campus Circulars',
    category: 'Core',
    icon: 'Bell'
  },
  {
    id: 'alumni',
    pageNumber: 19,
    title: 'Alumni Network & Hall of Fame',
    urduTitle: 'سابقہ طلباء نیٹ ورک و کامیابی کی کہانیاں',
    subtitle: 'Alumni Working at Google, Microsoft, Aramco & Global Enterprise Leaders',
    category: 'Institution',
    icon: 'Trophy'
  },
  {
    id: 'about',
    pageNumber: 20,
    title: 'About ZRA & Institutional Leadership',
    urduTitle: 'تعارف زیتون روٹس اکیڈمی و قیادت',
    subtitle: 'Chancellor Message, Board of Governors & 20+ Years Educational Legacy',
    category: 'Institution',
    icon: 'Building'
  },
  {
    id: 'research',
    pageNumber: 21,
    title: 'Research Innovations & Patents Wing',
    urduTitle: 'ریسرچ انوویشنز و پیٹنٹس ونگ',
    subtitle: 'AI Neural Labs, Oncology Drug Delivery, Quantum Cryptography & CleanTech',
    category: 'Academics',
    icon: 'Microscope'
  },
  {
    id: 'hostel-life',
    pageNumber: 22,
    title: 'Modern Student Hostels & Residencies',
    urduTitle: 'ہاسٹل و طلبہ کی رہائش',
    subtitle: 'Separate Boys & Girls Hostels, Nutritious Dining & High-Speed Fiber Wi-Fi',
    category: 'Student Services',
    icon: 'Home'
  },
  {
    id: 'contact',
    pageNumber: 23,
    title: 'Contact Us, Campuses & Helpdesk',
    urduTitle: 'رابطہ، کیمپس ایڈریس و کسٹمر سپورٹ',
    subtitle: 'Islamabad Main Campus, Lahore, Karachi, Dubai & 24/7 Student Helpline',
    category: 'Core',
    icon: 'PhoneCall'
  }
];

export const FACULTY_MEMBERS: FacultyMember[] = [
  {
    id: 'fac-1',
    name: 'Prof. Dr. Tariq Mahmood Zaitoon',
    designation: 'Rector & Vice Chancellor',
    department: 'Executive Leadership & AI Sciences',
    qualification: 'PhD in Computer Science (Imperial College London), PostDoc (MIT)',
    specialization: 'Artificial Intelligence, Deep Neural Networks, Autonomous Systems',
    experience: '26+ Years in Global Higher Education',
    email: 'rector@zaitoonroots.edu',
    publicationsCount: 84,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'fac-2',
    name: 'Prof. Dr. Aisha Batool Al-Hashmi',
    designation: 'Dean, Faculty of Medical & Health Sciences',
    department: 'Medical Education & Human Anatomy',
    qualification: 'MBBS, FCPS, PhD in Clinical Rehabilitation (Oxford University)',
    specialization: 'Clinical Neuro-anatomy, Regenerative Medicine',
    experience: '22+ Years in Tertiary Hospitals & Academia',
    email: 'aisha.hashmi@zaitoonroots.edu',
    publicationsCount: 62,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'fac-3',
    name: 'Prof. Engr. Salman Rafiq Khan',
    designation: 'Dean, Faculty of Engineering & Aerospace',
    department: 'Aerospace & Mechatronics Engineering',
    qualification: 'PhD in Aerospace Propulsion (TUM Germany), PE',
    specialization: 'Propulsion Systems, Wind Tunnel Testing, Robotics Kinematics',
    experience: '19+ Years in Defense Aerospace & Research',
    email: 'salman.rafiq@zaitoonroots.edu',
    publicationsCount: 47,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'fac-4',
    name: 'Dr. Mariam Farooq Qureshi',
    designation: 'Chairperson, Department of Cyber Security & AI',
    department: 'Computer Science & AI',
    qualification: 'PhD in Cyber Defense (National University of Singapore)',
    specialization: 'Zero-Trust Architecture, Digital Forensics, Quantum Encryption',
    experience: '15+ Years in Enterprise Cyber Defense',
    email: 'mariam.qureshi@zaitoonroots.edu',
    publicationsCount: 39,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'fac-5',
    name: 'Barrister Daniyal Ahmed Siddiqui',
    designation: 'Dean, Faculty of Law & Shariah Jurisprudence',
    department: 'Law & International Arbitration',
    qualification: 'LLM (Harvard Law School), Barrister-at-Law (Lincoln’s Inn, UK)',
    specialization: 'International Trade Law, Constitutional Law, Commercial Arbitration',
    experience: '18+ Years at Supreme Court Bar & International Tribunals',
    email: 'daniyal.siddiqui@zaitoonroots.edu',
    publicationsCount: 28,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'fac-6',
    name: 'Dr. Farhana Yasmin Malik',
    designation: 'Director, Faculty of Business & Financial Technology',
    department: 'Business & Management Sciences',
    qualification: 'PhD in Quantitative Finance (LSE, London), CFA Charterholder',
    specialization: 'Fintech Disruption, Algorithmic Risk Analytics, Corporate Governance',
    experience: '17+ Years in Wall Street & Corporate Academia',
    email: 'farhana.malik@zaitoonroots.edu',
    publicationsCount: 51,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80'
  }
];

export const VERIFIED_RECORDS: VerificationRecord[] = [
  {
    verificationId: 'ZRA-2025-DEG-8910',
    studentName: 'Muhammad Hamza Bilal',
    fatherName: 'Bilal Ahmad Khan',
    rollNumber: 'ZRA-BSCS-2021-042',
    programName: 'Bachelor of Science in Computer Science (BS CS)',
    programType: 'Degree',
    session: '2021 - 2025',
    cgpaOrGrade: '3.91 / 4.00 (Gold Medalist)',
    issueDate: 'July 15, 2025',
    status: 'Verified & Genuine',
    campus: 'Islamabad Main Campus',
    transcriptSerial: 'TR-ISB-2025-9981'
  },
  {
    verificationId: 'ZRA-2025-DIP-7140',
    studentName: 'Syeda Fatima Zahra',
    fatherName: 'Syed Murtaza Ali',
    rollNumber: 'ZRA-CYB-2024-118',
    programName: 'Advanced Diploma in Cyber Security, Ethical Hacking & SOC Defense',
    programType: 'Diploma',
    session: '2024 - 2025',
    cgpaOrGrade: 'Grade A+ (94%)',
    issueDate: 'October 10, 2025',
    status: 'Verified & Genuine',
    campus: 'Lahore Executive Campus',
    transcriptSerial: 'TR-LHR-2025-3412'
  },
  {
    verificationId: 'ZRA-2026-DEG-4421',
    studentName: 'Zainab Noor Al-Balooshi',
    fatherName: 'Rashid Al-Balooshi',
    rollNumber: 'ZRA-BBA-2022-095',
    programName: 'Bachelor of Business Administration (BBA Hons)',
    programType: 'Degree',
    session: '2022 - 2026',
    cgpaOrGrade: '3.84 / 4.00',
    issueDate: 'January 20, 2026',
    status: 'Verified & Genuine',
    campus: 'Dubai Global Campus',
    transcriptSerial: 'TR-DXB-2026-1029'
  },
  {
    verificationId: 'ZRA-2025-DIP-3329',
    studentName: 'Osama Bin Khalid',
    fatherName: 'Khalid Mehmood',
    rollNumber: 'ZRA-AI-2024-007',
    programName: 'Executive Diploma in Artificial Intelligence & Generative AI Prompt Engineering',
    programType: 'Diploma',
    session: '2024 - 2025',
    cgpaOrGrade: 'Grade A (89%)',
    issueDate: 'November 28, 2025',
    status: 'Verified & Genuine',
    campus: 'Karachi City Campus',
    transcriptSerial: 'TR-KHI-2025-7801'
  }
];

export const NEWS_EVENTS_DATA: NewsEventItem[] = [
  {
    id: 'news-1',
    title: 'Admissions Open for Fall 2026 / Spring 2027 Across All A-Z Degrees & Diplomas',
    urduTitle: 'فال 2026 اور بہار 2027 کے تمام ڈگری و ڈپلوما پروگرامز میں آن لائن داخلے جاری ہیں',
    date: 'August 14, 2026',
    category: 'Notice',
    summary: 'Zaitoon Roots Academy announces international admissions open with up to 100% Merit Scholarships and flexible installment options for eligible applicants worldwide.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80',
    featured: true
  },
  {
    id: 'news-2',
    title: '14th Grand Annual Convocation: Over 2,400 Graduates Awarded World-Class Degrees',
    urduTitle: '14واں سالانہ کانووکیشن: 2400 سے زائد طلباء میں ڈگریاں اور گولڈ میڈلز تقسیم',
    date: 'August 02, 2026',
    category: 'Convocation',
    summary: 'The grand ceremony was graced by international education delegates, ambassadors, and notable corporate CEOs honoring top performers.',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&auto=format&fit=crop&q=80',
    featured: true
  },
  {
    id: 'news-3',
    title: 'Zaitoon Roots Inks Historic Credit Transfer Agreement with Top UK & Canadian Universities',
    urduTitle: 'برطانیہ اور کینیڈا کی معروف یونیورسٹیوں کے ساتھ طلباء کے کریڈٹ ٹرانسفر کے تاریخی معاہدے',
    date: 'July 24, 2026',
    category: 'News',
    summary: 'Enrolled students in BS Computer Science, Engineering, and Business can now smoothly transfer 2 years of credits directly to partner UK/Canadian institutions.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'news-4',
    title: 'International Hackathon & AI Innovation Expo 2026 Hosted at STEM Arena',
    urduTitle: 'زیتون روٹس اکیڈمی کے زیرِ اہتمام انٹرنیشنل ہیکاتھون اور مصنوعی ذہانت نمائش',
    date: 'July 10, 2026',
    category: 'Event',
    summary: 'Over 120 tech teams from 18 nations showcased autonomous drones, generative medical agents, and sustainable clean-tech prototypes.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80'
  }
];

export const LIBRARY_BOOKS: LibraryBook[] = [
  {
    id: 'bk-1',
    title: 'Artificial Intelligence: A Modern Approach (4th Global Ed.)',
    author: 'Stuart Russell, Peter Norvig',
    subject: 'Computer Science & AI',
    isbn: '978-0134610993',
    type: 'E-Book',
    downloads: 14200,
    pages: 1152,
    format: 'PDF / Interactive Reader'
  },
  {
    id: 'bk-2',
    title: 'Guyton and Hall Textbook of Medical Physiology (14th Ed.)',
    author: 'John E. Hall, Michael E. Hall',
    subject: 'Medical & Health Sciences',
    isbn: '978-0323597128',
    type: 'E-Book',
    downloads: 18900,
    pages: 1150,
    format: 'PDF / High-Res Plates'
  },
  {
    id: 'bk-3',
    title: 'Fundamentals of Aerodynamics & Flight Mechanics',
    author: 'John D. Anderson Jr.',
    subject: 'Aerospace Engineering',
    isbn: '978-1259129919',
    type: 'E-Book',
    downloads: 8700,
    pages: 1104,
    format: 'PDF / Simulation Code'
  },
  {
    id: 'bk-4',
    title: 'Corporate Finance & Valuation Strategies for Global Markets',
    author: 'Aswath Damodaran',
    subject: 'Business & Management',
    isbn: '978-1118130735',
    type: 'Lecture Notes',
    downloads: 9400,
    pages: 640,
    format: 'PDF / Excel Models'
  },
  {
    id: 'bk-5',
    title: 'Past 5-Year Solved Examination Papers & Answer Keys (All Semesters)',
    author: 'Zaitoon Academic Examination Board',
    subject: 'All Disciplines',
    isbn: 'ZRA-PAP-2025-ALL',
    type: 'Past Paper',
    downloads: 45200,
    pages: 820,
    format: 'Complete PDF Bundle'
  },
  {
    id: 'bk-6',
    title: 'Deep Residual Learning for Large-Scale Visual Recognition (Research Paper)',
    author: 'ZRA Research Team in Collaboration with IEEE',
    subject: 'Computer Science & AI',
    isbn: 'IEEE-ZRA-2026-99',
    type: 'Research Paper',
    downloads: 12100,
    pages: 18,
    format: 'PDF / LaTeX'
  }
];

export const ALUMNI_STORIES: AlumniRecord[] = [
  {
    id: 'alm-1',
    name: 'Engr. Haris Arshad',
    degree: 'BS Artificial Intelligence, Class of 2022',
    batch: '2018-2022',
    currentRole: 'Staff Machine Learning Engineer',
    company: 'Google Cloud (London, UK)',
    country: 'United Kingdom',
    testimonial: 'Zaitoon Roots Academy provided me with rigorous mathematical foundations and world-class GPU clusters. The mentorship from distinguished PhD faculty prepared me directly for competitive Silicon Valley engineering challenges.',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'alm-2',
    name: 'Dr. Fatima Tariq Gillani',
    degree: 'Doctor of Physical Therapy (DPT), Class of 2021',
    batch: '2016-2021',
    currentRole: 'Consultant Clinical Neuro-Physiotherapist',
    company: 'King Faisal Specialist Hospital (Riyadh)',
    country: 'Saudi Arabia',
    testimonial: 'The hands-on hospital rotations and five years of clinical immersion at Zaitoon Teaching Hospital gave me the confidence to pass international clinical licensing examinations on my first attempt.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'alm-3',
    name: 'Bilal Hassan Siddiqui',
    degree: 'BBA Hons (Fintech Specialization), Class of 2023',
    batch: '2019-2023',
    currentRole: 'VP of Product Innovation',
    company: 'Emirates NBD Digital Banking (Dubai)',
    country: 'United Arab Emirates',
    testimonial: 'The entrepreneurship incubation center and case studies at Zaitoon Roots gave us real business acumen. Today, our fintech solutions process millions of daily transactions across the GCC.',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80'
  }
];

export const ACADEMIC_CALENDAR_DATES = [
  { term: 'Fall Semester 2026', event: 'Online Admission Application Submissions Open', date: 'August 01, 2026', status: 'Active' },
  { term: 'Fall Semester 2026', event: 'Merit & Scholarship Entry Test (Phase I)', date: 'September 10, 2026', status: 'Upcoming' },
  { term: 'Fall Semester 2026', event: 'First Merit List Display & Fee Submission Deadline', date: 'September 18, 2026', status: 'Upcoming' },
  { term: 'Fall Semester 2026', event: 'Orientation Ceremony & Commencement of Classes', date: 'October 01, 2026', status: 'Upcoming' },
  { term: 'Fall Semester 2026', event: 'Mid-Term Examinations Week', date: 'November 23 - 28, 2026', status: 'Scheduled' },
  { term: 'Fall Semester 2026', event: 'Final Examinations & Project Evaluations', date: 'January 18 - 30, 2027', status: 'Scheduled' },
  { term: 'Spring Semester 2027', event: 'Spring Admissions Open & Classes Start', date: 'February 15, 2027', status: 'Scheduled' },
  { term: 'Annual 2027', event: '15th Grand Convocation Ceremony', date: 'May 12, 2027', status: 'Scheduled' }
];

export const CAMPUS_LOCATIONS = [
  {
    id: 'main-isb',
    name: 'Islamabad Central Flagship Campus',
    type: 'Main University Campus & Research Complex',
    address: 'Zaitoon Academic Boulevard, Sector H-12 / Park Road, Islamabad, Pakistan',
    phone: '+92 51 8892000 / WhatsApp: +92 344 7956085',
    email: 'info.isb@zaitoonroots.edu',
    highlights: ['50-Acre Smart Campus', '700-Bed Teaching Hospital', 'Central E-Library & Olympiad Sports']
  },
  {
    id: 'lhr-exec',
    name: 'Lahore Executive Campus',
    type: 'Executive Business & Tech Center',
    address: 'Gulberg III, Main Boulevard (Adjacent to MM Alam Road), Lahore, Pakistan',
    phone: '+92 42 35789000',
    email: 'info.lhr@zaitoonroots.edu',
    highlights: ['Fintech Labs', 'Digital Arts Studio', 'Corporate Boardrooms']
  },
  {
    id: 'khi-city',
    name: 'Karachi Coastal & Tech Campus',
    type: 'IT, Cyber & Maritime Studies Wing',
    address: 'Clifton Block 5 / Shahrah-e-Faisal, Karachi, Pakistan',
    phone: '+92 21 34567890',
    email: 'info.khi@zaitoonroots.edu',
    highlights: ['Cyber Defense War-Room', 'Maritime Logistics Hub', 'Incubation Center']
  },
  {
    id: 'dxb-intl',
    name: 'Dubai International Liaison Campus',
    type: 'GCC & Global Student Services Wing',
    address: 'Dubai Knowledge Park, Block 12, Dubai, United Arab Emirates',
    phone: '+971 4 390 1234',
    email: 'dubai@zaitoonroots.edu',
    highlights: ['UAE Credit Transfer Wing', 'Executive Master Residencies', 'Middle East Placement Desk']
  },
  {
    id: 'uk-desk',
    name: 'London Academic Liaison Office',
    type: 'European University Partnerships & Affiliations',
    address: 'High Holborn, London WC1V 6BX, United Kingdom',
    phone: '+44 20 7946 0991',
    email: 'london@zaitoonroots.edu',
    highlights: ['UK Credit Evaluation', 'WES Facilitation', 'Global Research Exchange']
  }
];
