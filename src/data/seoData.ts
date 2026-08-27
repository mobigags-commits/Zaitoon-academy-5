import { PageId } from '../types';

export interface PageSEOMeta {
  id: PageId;
  path: string;
  title: string;
  description: string;
  breadcrumbName: string;
  keywords: string;
}

export const PRODUCTION_DOMAIN = 'https://zaitoon-academy-5.vercel.app';

export const PAGES_SEO_METADATA: Record<PageId, PageSEOMeta> = {
  home: {
    id: 'home',
    path: '/',
    title: 'Zaitoon Roots Academy - Higher Education & Diplomas',
    description: 'Official academic portal for Zaitoon Roots Academy offering undergraduate degrees, doctoral research, professional diplomas, and online distance learning.',
    breadcrumbName: 'Home',
    keywords: 'Zaitoon Roots Academy, ZRA, higher education, degrees, professional diplomas, online admissions, Pakistan academy, distance learning'
  },
  degrees: {
    id: 'degrees',
    path: '/degrees',
    title: "All World Degrees Directory | Zaitoon Roots Academy",
    description: 'Explore 120+ undergraduate, graduate, and PhD degree programs across Artificial Intelligence, Health Sciences, Engineering, Business, and Arts.',
    breadcrumbName: 'Degrees Directory',
    keywords: 'world degrees, BS degrees, MS programs, PhD research, computer science, medical sciences, engineering degrees, Zaitoon Roots Academy'
  },
  diplomas: {
    id: 'diplomas',
    path: '/diplomas',
    title: 'Professional Diplomas & Certs | Zaitoon Roots Academy',
    description: 'Industry-recognized 1-2 year professional diplomas and fast-track executive certifications with hands-on technical labs and global credit transfers.',
    breadcrumbName: 'Professional Diplomas',
    keywords: 'professional diplomas, IT certifications, paramedical diplomas, cybersecurity, AI diplomas, vocational training, ZRA'
  },
  admissions: {
    id: 'admissions',
    path: '/admissions',
    title: 'Online Admissions Portal 2026-27 | Zaitoon Roots Academy',
    description: 'Apply online for Fall 2026 and Spring 2027 admissions with automatic merit scholarship evaluation, document verification, and digital application tracking.',
    breadcrumbName: 'Admissions Portal',
    keywords: 'online admissions, admission form, merit scholarship, ZRA admissions 2026, fee challan, application tracking'
  },
  'lms-portal': {
    id: 'lms-portal',
    path: '/lms-portal',
    title: 'Student LMS Portal & Academic Desk | Zaitoon Roots Academy',
    description: 'Centralized learning management system for ZRA students to access online lecture notes, academic schedules, CGPA calculator, and assignments.',
    breadcrumbName: 'Student LMS Portal',
    keywords: 'student LMS, learning management system, lecture notes, student portal, CGPA calculator, timetable'
  },
  'fee-scholarship': {
    id: 'fee-scholarship',
    path: '/fee-scholarship',
    title: 'Fee Structure & Merit Scholarships | Zaitoon Roots Academy',
    description: 'Transparent semester fee calculator, flexible installment plans, and 100% need & merit-based scholarships for deserving undergraduate & diploma scholars.',
    breadcrumbName: 'Fee & Scholarships',
    keywords: 'fee structure, scholarship calculator, merit scholarship, financial aid, installment plans, tuition fees'
  },
  faculty: {
    id: 'faculty',
    path: '/faculty',
    title: 'Distinguished Faculty & Research Wing | ZRA',
    description: 'Meet distinguished PhD professors, clinical specialists, research deans, and visiting international faculty at Zaitoon Roots Academy.',
    breadcrumbName: 'Faculty & Research',
    keywords: 'university faculty, PhD professors, research deans, academic scholars, faculty directory, ZRA professors'
  },
  calendar: {
    id: 'calendar',
    path: '/calendar',
    title: 'Academic Calendar & Exam Dates | Zaitoon Roots Academy',
    description: 'Semester timelines, admission deadlines, mid-term examinations, final evaluations, convocation dates, and official academic holidays.',
    breadcrumbName: 'Academic Calendar',
    keywords: 'academic calendar, exam schedule, semester dates, convocation date, holiday list, ZRA schedule'
  },
  verification: {
    id: 'verification',
    path: '/verification',
    title: 'Online Credential & Degree Verification | ZRA',
    description: 'Instant online verification system for degrees, transcripts, diplomas, and certificates issued by Zaitoon Roots Academy with QR code validation.',
    breadcrumbName: 'Credential Verification',
    keywords: 'degree verification, diploma verification, certificate validation, QR verification, student transcript check'
  },
  library: {
    id: 'library',
    path: '/library',
    title: 'Digital E-Library & Research Journals | ZRA',
    description: 'Access 50,000+ academic e-books, international research papers, past exam papers, and scientific journal databases at the ZRA central library.',
    breadcrumbName: 'Digital Library',
    keywords: 'digital library, e-books, past exam papers, research journals, academic repository, ZRA library'
  },
  placement: {
    id: 'placement',
    path: '/placement',
    title: 'Career Placement & Corporate Internships | ZRA',
    description: 'Corporate liaison office connecting Zaitoon Roots Academy graduates with top global employers, paid internships, and campus recruitment drives.',
    breadcrumbName: 'Career Placement',
    keywords: 'career placement, internships, job placement, corporate hiring, career development, employer network'
  },
  'campus-tour': {
    id: 'campus-tour',
    path: '/campus-tour',
    title: 'Campus Infrastructure & STEM Labs | ZRA',
    description: 'Virtual tour of smart campuses in Islamabad, Lahore, Karachi, and Dubai featuring state-of-the-art AI labs, teaching hospital, and student facilities.',
    breadcrumbName: 'Campus Tour',
    keywords: 'campus infrastructure, STEM laboratories, university campus Islamabad, teaching hospital, robotics lab'
  },
  accreditations: {
    id: 'accreditations',
    path: '/accreditations',
    title: 'International Affiliations & Accreditations | ZRA',
    description: 'Global recognition, HEC compliance, WES international credit transfers, ISO 9001 certified quality standards, and UNESCO academic linkages.',
    breadcrumbName: 'Affiliations & Accreditations',
    keywords: 'HEC recognition, WES evaluation, ISO certified education, international affiliations, credit transfer'
  },
  'student-life': {
    id: 'student-life',
    path: '/student-life',
    title: 'Student Life, Clubs & Sports Olympiad | ZRA',
    description: 'Discover student societies, robotics club, debating teams, annual sports olympiad, cultural festivals, and community outreach programs at ZRA.',
    breadcrumbName: 'Student Life & Clubs',
    keywords: 'student life, university clubs, robotics society, sports olympiad, campus societies, student activities'
  },
  'distance-learning': {
    id: 'distance-learning',
    path: '/distance-learning',
    title: 'Global Distance Learning & Online Campus | ZRA',
    description: '100% online degrees and professional diplomas worldwide with interactive live lectures, recorded class archives, and LMS portal access.',
    breadcrumbName: 'Distance Learning',
    keywords: 'distance learning, online degrees, global online education, virtual classes, distance education Pakistan'
  },
  'career-counselor': {
    id: 'career-counselor',
    path: '/career-counselor',
    title: 'AI Career Path & Degree Matcher | ZRA',
    description: 'Interactive AI-powered academic counseling tool to discover degree programs and career paths tailored to your aptitude, skills, and aspirations.',
    breadcrumbName: 'AI Career Counselor',
    keywords: 'career counseling, AI program matcher, degree finder, aptitude test, academic guidance'
  },
  downloads: {
    id: 'downloads',
    path: '/downloads',
    title: 'Prospectus & Application Downloads | ZRA',
    description: 'Download official 2026-27 university prospectus, admission forms, semester syllabi, scholarship guidelines, and fee challans in PDF format.',
    breadcrumbName: 'Downloads & Prospectus',
    keywords: 'download prospectus, admission form PDF, course syllabus, scholarship form, challan form download'
  },
  'news-events': {
    id: 'news-events',
    path: '/news-events',
    title: 'Academy News, Seminars & Convocation | ZRA',
    description: 'Latest university announcements, research symposia, campus circulars, convocation ceremonies, and academic workshops at Zaitoon Roots Academy.',
    breadcrumbName: 'News & Events',
    keywords: 'university news, convocation 2026, academic seminars, campus events, notifications'
  },
  alumni: {
    id: 'alumni',
    path: '/alumni',
    title: 'Global Alumni Network & Hall of Fame | ZRA',
    description: 'Celebrating 25,000+ Zaitoon Roots Academy graduates working at leading international organizations, tech giants, healthcare centers, and enterprises.',
    breadcrumbName: 'Alumni Network',
    keywords: 'alumni network, ZRA alumni, graduate success, alumni hall of fame, career achievements'
  },
  about: {
    id: 'about',
    path: '/about',
    title: 'About Zaitoon Roots Academy & Leadership | ZRA',
    description: 'Founded in 2004, Zaitoon Roots Academy is dedicated to multidisciplinary higher education, ethical leadership, and global academic excellence.',
    breadcrumbName: 'About Us',
    keywords: 'about Zaitoon Roots Academy, institutional vision, chancellor message, higher education history'
  },
  contact: {
    id: 'contact',
    path: '/contact',
    title: 'Contact Us & Campuses Helpline | ZRA',
    description: 'Contact Zaitoon Roots Academy Islamabad, Lahore, Karachi, and Dubai campuses. 24/7 student admission helpline and direct WhatsApp desk.',
    breadcrumbName: 'Contact & Campuses',
    keywords: 'contact Zaitoon Roots Academy, campus helpline, admissions office, Islamabad campus address, WhatsApp inquiry'
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
    inLanguage: ['en-US', 'ur-PK']
  };
}
