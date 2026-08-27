import React, { useState, useEffect, useCallback } from 'react';
import { PageId } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { QuickSearchModal } from './components/QuickSearchModal';
import { LiveChatWidget } from './components/LiveChatWidget';
import { SEOHead } from './components/SEOHead';
import { getPageIdFromPath, PAGES_SEO_METADATA } from './data/seoData';

// 20+ Pages
import { HomePage } from './pages/HomePage';
import { DegreesPage } from './pages/DegreesPage';
import { DiplomasPage } from './pages/DiplomasPage';
import { AdmissionsPage } from './pages/AdmissionsPage';
import { LMSPortalPage } from './pages/LMSPortalPage';
import { FeeScholarshipPage } from './pages/FeeScholarshipPage';
import { FacultyPage } from './pages/FacultyPage';
import { AcademicCalendarPage } from './pages/AcademicCalendarPage';
import { VerificationPage } from './pages/VerificationPage';
import { LibraryPage } from './pages/LibraryPage';
import { PlacementPage } from './pages/PlacementPage';
import { CampusTourPage } from './pages/CampusTourPage';
import { AffiliationsPage } from './pages/AffiliationsPage';
import { StudentLifePage } from './pages/StudentLifePage';
import { DistanceLearningPage } from './pages/DistanceLearningPage';
import { CareerCounselorPage } from './pages/CareerCounselorPage';
import { DownloadsPage } from './pages/DownloadsPage';
import { NewsEventsPage } from './pages/NewsEventsPage';
import { AlumniPage } from './pages/AlumniPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    if (typeof window !== 'undefined') {
      return getPageIdFromPath(window.location.pathname);
    }
    return 'home';
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Sync state with browser history (back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      const pageId = getPageIdFromPath(window.location.pathname);
      setCurrentPage(pageId);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Safe navigation handler that updates URL pathname and scrolls to top
  const handleNavigate = useCallback((pageId: PageId) => {
    setCurrentPage(pageId);
    const targetMeta = PAGES_SEO_METADATA[pageId] || PAGES_SEO_METADATA.home;
    const targetPath = targetMeta.path;
    if (typeof window !== 'undefined' && window.location.pathname !== targetPath) {
      window.history.pushState({ pageId }, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'degrees':
        return <DegreesPage onNavigate={handleNavigate} />;
      case 'diplomas':
        return <DiplomasPage onNavigate={handleNavigate} />;
      case 'admissions':
        return <AdmissionsPage onNavigate={handleNavigate} />;
      case 'lms-portal':
        return <LMSPortalPage onNavigate={handleNavigate} />;
      case 'fee-scholarship':
        return <FeeScholarshipPage onNavigate={handleNavigate} />;
      case 'faculty':
        return <FacultyPage onNavigate={handleNavigate} />;
      case 'calendar':
        return <AcademicCalendarPage onNavigate={handleNavigate} />;
      case 'verification':
        return <VerificationPage onNavigate={handleNavigate} />;
      case 'library':
        return <LibraryPage onNavigate={handleNavigate} />;
      case 'placement':
        return <PlacementPage onNavigate={handleNavigate} />;
      case 'campus-tour':
        return <CampusTourPage onNavigate={handleNavigate} />;
      case 'accreditations':
        return <AffiliationsPage onNavigate={handleNavigate} />;
      case 'student-life':
        return <StudentLifePage onNavigate={handleNavigate} />;
      case 'distance-learning':
        return <DistanceLearningPage onNavigate={handleNavigate} />;
      case 'career-counselor':
        return <CareerCounselorPage onNavigate={handleNavigate} />;
      case 'downloads':
        return <DownloadsPage onNavigate={handleNavigate} />;
      case 'news-events':
        return <NewsEventsPage onNavigate={handleNavigate} />;
      case 'alumni':
        return <AlumniPage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 font-sans selection:bg-red-500 selection:text-white">
      {/* Dynamic SEO Meta, Canonicals, OpenGraph, Twitter & Breadcrumbs */}
      <SEOHead currentPage={currentPage} />

      {/* Universal Top Navigation Header with 20-Page Selector */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Active Page View */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Universal Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Quick Search Spotlight Modal */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Interactive AI Admission Counselor Widget */}
      <LiveChatWidget onNavigate={handleNavigate} />
    </div>
  );
}
