import { PageId } from '../types';

export interface PageSEOMeta {
  id: PageId;
  path: string;
  title: string;
  description: string;
  breadcrumbName: string;
  keywords: string;
  faqs?: Array<{ question: string; answer: string }>;
}

export const PRODUCTION_DOMAIN = 'https://zaitoon-academy-5.vercel.app';

export const PAGES_SEO_METADATA: Record<PageId, PageSEOMeta> = {
  home: {
    id: 'home',
    path: '/',
    title: 'Zaitoon Roots Academy - Admissions 2026-27 | All World Degrees & Diplomas',
    description: 'Apply online for 2026-27 admissions at Zaitoon Roots Academy Islamabad. 120+ accredited BS, MS, PhD World Degrees, 80+ Professional Diplomas, 100% Merit Scholarships, and Global Distance Learning.',
    breadcrumbName: 'Home',
    keywords: 'Zaitoon Roots Academy, ZRA admissions 2026, university admissions 2026 Islamabad, all world degrees, BS artificial intelligence admissions, DPT admissions, BS computer science, professional diplomas 2026, 1 year IT diploma, online degree verification, 100% merit scholarship, distance learning university Pakistan, student hostels Islamabad',
    faqs: [
      {
        question: 'What academic programs are offered at Zaitoon Roots Academy in 2026?',
        answer: 'ZRA offers 120+ All The World Degrees (BS, MS, MPhil, PhD) and 80+ Professional Technical Diplomas across Computing, AI, Medical Lab Technology, Physical Therapy, Business, and Engineering.'
      },
      {
        question: 'How can students apply for 2026-27 admissions online?',
        answer: 'Applicants can submit their digital application directly via the ZRA Online Admissions Portal, upload documents, and generate their fee challan with automatic scholarship assessment.'
      },
      {
        question: 'Are degrees from Zaitoon Roots Academy recognized globally?',
        answer: 'Yes, our curricula comply with national HEC standards, WES international transcript equivalency, and ISO 9001 quality management benchmarks.'
      }
    ]
  },
  degrees: {
    id: 'degrees',
    path: '/degrees',
    title: "All World Degrees Directory 2026 | 120+ BS, MS, PhD Admissions | ZRA",
    description: 'Explore 120+ accredited undergraduate, graduate, and PhD degree programs for 2026 in Artificial Intelligence, Software Engineering, DPT, Cyber Security, Data Science, and Business at ZRA.',
    breadcrumbName: 'Degrees Directory',
    keywords: 'world degrees Pakistan 2026, BS computer science admission, BS artificial intelligence 2026, DPT physical therapy admission, MS data science, PhD research scholarships Islamabad, software engineering degree, accredited degrees Pakistan',
    faqs: [
      {
        question: 'Which degree programs are most in demand in 2026?',
        answer: 'BS Artificial Intelligence, BS Software Engineering, Doctor of Physical Therapy (DPT), and MS Data Science are among the highest enrolled programs at ZRA in 2026.'
      },
      {
        question: 'Can I study degree programs online via distance learning?',
        answer: 'Yes, ZRA offers hybrid and 100% distance-learning modes for students across Pakistan and international scholars in UAE, Saudi Arabia, and worldwide.'
      }
    ]
  },
  diplomas: {
    id: 'diplomas',
    path: '/diplomas',
    title: 'Professional Diplomas 2026 | 1-2 Year IT, Medical & AI Certifications | ZRA',
    description: 'Enroll in 80+ industry-recognized 1-year and 2-year professional diplomas in 2026. Practical labs in Cybersecurity, AI Prompt Engineering, Paramedical, and Full-Stack Development.',
    breadcrumbName: 'Professional Diplomas',
    keywords: 'professional diplomas 2026, 1 year IT diploma Pakistan, paramedical technology diploma, cybersecurity certification Islamabad, AI prompt engineering course, vocational training diplomas, fast-track diplomas ZRA',
    faqs: [
      {
        question: 'What is the duration of professional diplomas at ZRA?',
        answer: 'Diplomas range from 6-month fast-track executive certifications to 1-year and 2-year comprehensive professional diplomas with clinical and industry internships.'
      },
      {
        question: 'Are working professionals eligible for evening or weekend diploma classes?',
        answer: 'Yes, ZRA provides flexible weekend and evening batches along with live online distance-learning options tailored for working professionals.'
      }
    ]
  },
  admissions: {
    id: 'admissions',
    path: '/admissions',
    title: 'Online Admissions Portal 2026-27 | Apply Now & Merit Scholarships | ZRA',
    description: 'Admissions Open for Fall 2026 & Spring 2027. Instant 4-step digital application, automatic merit scholarship evaluation (up to 100%), and fee challan generator.',
    breadcrumbName: 'Admissions Portal',
    keywords: 'online admissions 2026, ZRA admission form 2026, apply online university Islamabad, merit scholarship calculator, fee challan download, admission eligibility criteria Pakistan',
    faqs: [
      {
        question: 'What documents are required for online admission?',
        answer: 'Scanned copies of Matric/O-Level, Intermediate/A-Level certificates, CNIC/B-Form, and passport-size photographs are required for digital submission.'
      },
      {
        question: 'Is there an application deadline for 2026-27 admissions?',
        answer: 'Fall 2026 early-bird applications close on October 15, 2026, and regular registrations remain open based on seat quotas per faculty.'
      }
    ]
  },
  'lms-portal': {
    id: 'lms-portal',
    path: '/lms-portal',
    title: 'Student LMS Portal 2026 | Lectures, Timetable & CGPA Calculator | ZRA',
    description: 'Official Student LMS portal for Zaitoon Roots Academy. Access digital lecture notes, semester timetable, assignments, attendance records, and interactive CGPA calculator.',
    breadcrumbName: 'Student LMS Portal',
    keywords: 'student LMS portal, ZRA student login, online lecture notes, CGPA calculator university, semester timetable, academic desk Islamabad'
  },
  'fee-scholarship': {
    id: 'fee-scholarship',
    path: '/fee-scholarship',
    title: 'Fee Structure & 100% Merit Scholarships 2026 | Tuition Calculator | ZRA',
    description: 'Transparent 2026 fee structure for all BS, MS, PhD degrees & diplomas. Calculate semester tuition, flexible 3-installment payment plans, and 100% merit & need scholarships.',
    breadcrumbName: 'Fee & Scholarships',
    keywords: 'university fee structure 2026, 100% merit scholarship Pakistan, scholarship calculator, affordable semester fee Islamabad, installment plans university tuition, financial aid'
  },
  faculty: {
    id: 'faculty',
    path: '/faculty',
    title: 'Distinguished Faculty & PhD Research Wing 2026 | ZRA',
    description: 'Meet 180+ distinguished PhD professors, clinical researchers, international visiting deans, and patent holders leading academics at Zaitoon Roots Academy.',
    breadcrumbName: 'Faculty & Research',
    keywords: 'university professors Islamabad, PhD faculty Pakistan, academic research deans, visiting international scholars, ZRA faculty directory'
  },
  calendar: {
    id: 'calendar',
    path: '/calendar',
    title: 'Academic Calendar 2026-27 | Exam Timetable & Semester Dates | ZRA',
    description: 'Official 2026-27 academic calendar: semester start dates, admission cutoffs, mid-term & final exam schedules, research symposiums, convocation, and official holidays.',
    breadcrumbName: 'Academic Calendar',
    keywords: 'academic calendar 2026, exam timetable university, semester dates 2026-2027, convocation dates Islamabad, admission deadlines'
  },
  verification: {
    id: 'verification',
    path: '/verification',
    title: 'Online Degree & Diploma Credential Verification | 24/7 QR Desk | ZRA',
    description: 'Instant official credential verification for degrees, transcripts, and diplomas issued by Zaitoon Roots Academy. Real-time roll number and QR code security check for employers.',
    breadcrumbName: 'Credential Verification',
    keywords: 'online degree verification Pakistan, verify student transcript online, diploma verification portal, QR credential check, employer verification desk'
  },
  library: {
    id: 'library',
    path: '/library',
    title: 'Digital E-Library 2026 | 50,000+ Books & Past Exam Papers | ZRA',
    description: 'Access the ZRA Central Digital E-Library with 50,000+ academic textbooks, IEEE/Springer journals, past semester papers, and doctoral research dissertations.',
    breadcrumbName: 'Digital Library',
    keywords: 'digital e-library Pakistan, past exam papers download, university textbooks online, academic research papers, free e-books portal'
  },
  placement: {
    id: 'placement',
    path: '/placement',
    title: 'Career Placement & Corporate Hiring Cell 2026 | Global Jobs | ZRA',
    description: 'Leading university placement cell partnering with 350+ top global employers. 94% graduate employment rate, paid corporate internships, and on-campus recruitment drives.',
    breadcrumbName: 'Career Placement',
    keywords: 'university placement cell Islamabad, campus recruitment 2026, software engineer internships, graduate job placement, corporate linkages Pakistan'
  },
  'campus-tour': {
    id: 'campus-tour',
    path: '/campus-tour',
    title: 'Campus Infrastructure & STEM Labs | Islamabad, Lahore, Dubai | ZRA',
    description: 'Take a virtual tour of smart campuses in Islamabad (H-12), Lahore, Karachi, and Dubai. Advanced robotics studios, clinical teaching hospital, and hostel residencies.',
    breadcrumbName: 'Campus Tour',
    keywords: 'university campus Islamabad Sector H-12, STEM laboratories, university hostels Islamabad, smart campus infrastructure, virtual campus tour'
  },
  accreditations: {
    id: 'accreditations',
    path: '/accreditations',
    title: 'Accreditations & International Affiliations 2026 | HEC & WES | ZRA',
    description: 'National and international academic recognitions: HEC curriculum compliance, WES transcript equivalency for immigration & study abroad, and ISO 9001 certified excellence.',
    breadcrumbName: 'Affiliations & Accreditations',
    keywords: 'HEC recognized degree Pakistan, WES evaluation degrees, ISO certified education institute, global credit transfers, international university affiliations'
  },
  'student-life': {
    id: 'student-life',
    path: '/student-life',
    title: 'Student Life, Clubs & Annual Sports Olympiad 2026 | ZRA',
    description: 'Vibrant campus life: Robotics Club, Model UN, Debating Society, Annual Sports Olympiad, cultural galas, and national student competitions at Zaitoon Roots Academy.',
    breadcrumbName: 'Student Life & Clubs',
    keywords: 'student life Islamabad, university debating society, robotics club Pakistan, annual sports olympiad, campus societies ZRA'
  },
  'distance-learning': {
    id: 'distance-learning',
    path: '/distance-learning',
    title: 'Distance Learning & Global Online Campus 2026 | 100% Online | ZRA',
    description: 'Study world-class BS, MS degrees and professional diplomas 100% online from anywhere in the world. Tailored for overseas students in UAE, Saudi Arabia, UK, and worldwide.',
    breadcrumbName: 'Distance Learning',
    keywords: 'distance learning university Pakistan 2026, study online degrees worldwide, overseas Pakistani online admissions, virtual university diplomas, online lectures'
  },
  'career-counselor': {
    id: 'career-counselor',
    path: '/career-counselor',
    title: 'AI Career Counselor 2026 | Free Degree & Diploma Matcher | ZRA',
    description: 'Interactive smart career counseling tool. Complete a 2-minute aptitude test to find the best degree or professional diploma program matched to your skills and salary goals.',
    breadcrumbName: 'AI Career Counselor',
    keywords: 'career guidance test online, degree finder aptitude test, free career counselor Islamabad, best degree after FSC ICS, career matching tool'
  },
  downloads: {
    id: 'downloads',
    path: '/downloads',
    title: 'Prospectus & Admission Downloads 2026-27 | PDF Challans & Syllabi | ZRA',
    description: 'Download the official 2026-27 university prospectus, admission forms in PDF, semester course outlines, scholarship application forms, and bank challans.',
    breadcrumbName: 'Downloads & Prospectus',
    keywords: 'download university prospectus 2026, admission form PDF download, syllabus outlines, scholarship form PDF, bank fee challan ZRA'
  },
  'news-events': {
    id: 'news-events',
    path: '/news-events',
    title: 'Academy News, Seminars & Convocation 2026 | Official Circulars | ZRA',
    description: 'Stay updated with latest campus announcements, international research conferences, convocation dates, student achievements, and academic circulars.',
    breadcrumbName: 'News & Events',
    keywords: 'ZRA convocation 2026, university announcements Islamabad, international research conferences, campus events circulars'
  },
  alumni: {
    id: 'alumni',
    path: '/alumni',
    title: 'Global Alumni Network & Hall of Fame | 25,000+ Graduates | ZRA',
    description: 'Connecting 25,000+ successful alumni leading organizations at Microsoft, Google, Amazon, Shaukat Khanum, and multinational enterprises across 42 countries.',
    breadcrumbName: 'Alumni Network',
    keywords: 'university alumni network, graduate success stories, ZRA alumni association, global alumni directory'
  },
  about: {
    id: 'about',
    path: '/about',
    title: 'About Zaitoon Roots Academy | 20+ Years Legacy & Leadership | ZRA',
    description: 'Established in 2004, Zaitoon Roots Academy is a pioneer of multidisciplinary higher education and vocational excellence. Discover our vision, leadership, and charter.',
    breadcrumbName: 'About Us',
    keywords: 'about Zaitoon Roots Academy, chancellor message, board of governors, university history Islamabad, educational excellence Pakistan'
  },
  research: {
    id: 'research',
    path: '/research',
    title: 'Research Innovations & Patents Wing 2026 | STEM Grants | ZRA',
    description: 'Pioneering scientific breakthroughs in AI Neural Networks, Oncology Drug Delivery, Quantum Cryptography, and CleanTech. International research funding and published patents.',
    breadcrumbName: 'Research & Innovations',
    keywords: 'university research labs Pakistan, AI neural networks research, oncology drug delivery, scientific patents Islamabad, international research grants'
  },
  'hostel-life': {
    id: 'hostel-life',
    path: '/hostel-life',
    title: 'Student Hostels & Residencies 2026 | Boys & Girls Accommodations | ZRA',
    description: 'Secure, modern hostel accommodation for male and female scholars. 24/7 security, uninterrupted power backup, high-speed fiber Wi-Fi, and hygienic mess dining.',
    breadcrumbName: 'Hostel & Residencies',
    keywords: 'student hostels Islamabad Sector H-12, boys hostel university, girls hostel Islamabad, secure student accommodation, hostel fee structure'
  },
  contact: {
    id: 'contact',
    path: '/contact',
    title: 'Contact Zaitoon Roots Academy | Admissions Helpline & WhatsApp 2026',
    description: 'Get in touch with Zaitoon Roots Academy admissions office. Campus addresses in Islamabad, Lahore, Karachi, and Dubai. Call or WhatsApp directly at 0344-7956085.',
    breadcrumbName: 'Contact & Campuses',
    keywords: 'contact Zaitoon Roots Academy, university admissions helpline Islamabad, campus address Sector H-12, admissions WhatsApp 03447956085, contact information'
  }
};

/**
 * Maps a URL pathname to a PageId
 */
export function getPageIdFromPath(pathname: string): PageId {
  const cleanPath = pathname.replace(/\/$/, '') || '/';
  for (const page of Object.values(PAGES_SEO_METADATA)) {
    if (page.path === cleanPath) {
      return page.id;
    }
  }
  return 'home';
}

/**
 * Builds Schema.org BreadcrumbList structured data for a page
 */
export function buildBreadcrumbSchema(pageId: PageId) {
  const meta = PAGES_SEO_METADATA[pageId] || PAGES_SEO_METADATA.home;
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${PRODUCTION_DOMAIN}/`
    }
  ];

  if (pageId !== 'home') {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: meta.breadcrumbName,
      item: `${PRODUCTION_DOMAIN}${meta.path}`
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items
  };
}

/**
 * Builds Schema.org EducationalOrganization structured data
 */
export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${PRODUCTION_DOMAIN}/#organization`,
    name: 'Zaitoon Roots Academy',
    alternateName: 'ZRA',
    url: `${PRODUCTION_DOMAIN}/`,
    logo: `${PRODUCTION_DOMAIN}/favicon.svg`,
    image: `${PRODUCTION_DOMAIN}/og-image.svg`,
    description: 'Premier international academic institution offering All The World Degrees, Professional Diplomas, and Online Distance Learning.',
    email: 'info@zaitoonroots.edu',
    telephone: '+92-344-7956085',
    foundingDate: '2004',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Zaitoon Academic Boulevard, Sector H-12 / Park Road',
      addressLocality: 'Islamabad',
      addressRegion: 'Federal Capital',
      postalCode: '44000',
      addressCountry: 'PK'
    },
    location: [
      {
        '@type': 'Place',
        name: 'Islamabad Central Flagship Campus',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Zaitoon Academic Boulevard, Sector H-12 / Park Road',
          addressLocality: 'Islamabad',
          addressCountry: 'PK'
        }
      },
      {
        '@type': 'Place',
        name: 'Lahore Executive Campus',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Gulberg III, Main Boulevard',
          addressLocality: 'Lahore',
          addressCountry: 'PK'
        }
      },
      {
        '@type': 'Place',
        name: 'Karachi Coastal & Tech Campus',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Clifton Block 5 / Shahrah-e-Faisal',
          addressLocality: 'Karachi',
          addressCountry: 'PK'
        }
      },
      {
        '@type': 'Place',
        name: 'Dubai International Liaison Campus',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Dubai Knowledge Park, Block 12',
          addressLocality: 'Dubai',
          addressCountry: 'AE'
        }
      }
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+92-344-7956085',
        contactType: 'Admissions & Student Counseling Desk',
        availableLanguage: ['English', 'Urdu'],
        areaServed: ['PK', 'AE', 'GB', 'SA', 'Worldwide']
      }
    ]
  };
}

/**
 * Builds Schema.org WebSite structured data with SearchAction
 */
export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${PRODUCTION_DOMAIN}/#website`,
    url: `${PRODUCTION_DOMAIN}/`,
    name: 'Zaitoon Roots Academy',
    description: "Official Academic Portal for All The World's Degrees and Professional Diplomas",
    publisher: {
      '@id': `${PRODUCTION_DOMAIN}/#organization`
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${PRODUCTION_DOMAIN}/degrees?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    },
    inLanguage: ['en-US', 'ur-PK']
  };
}

/**
 * Builds Schema.org FAQPage structured data for a page if it contains FAQs
 */
export function buildPageFaqSchema(pageId: PageId) {
  const meta = PAGES_SEO_METADATA[pageId];
  if (!meta || !meta.faqs || meta.faqs.length === 0) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: meta.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}
