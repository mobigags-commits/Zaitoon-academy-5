import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { QuickSearchModal } from './components/QuickSearchModal';
import { LiveChatWidget } from './components/LiveChatWidget';

// 20 Pages
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
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'degrees':
        return <DegreesPage onNavigate={setCurrentPage} />;
      case 'diplomas':
        return <DiplomasPage onNavigate={setCurrentPage} />;
      case 'admissions':
        return <AdmissionsPage onNavigate={setCurrentPage} />;
      case 'lms-portal':
        return <LMSPortalPage onNavigate={setCurrentPage} />;
      case 'fee-scholarship':
        return <FeeScholarshipPage onNavigate={setCurrentPage} />;
      case 'faculty':
        return <FacultyPage onNavigate={setCurrentPage} />;
      case 'calendar':
        return <AcademicCalendarPage onNavigate={setCurrentPage} />;
      case 'verification':
        return <VerificationPage onNavigate={setCurrentPage} />;
      case 'library':
        return <LibraryPage onNavigate={setCurrentPage} />;
      case 'placement':
        return <PlacementPage onNavigate={setCurrentPage} />;
      case 'campus-tour':
        return <CampusTourPage onNavigate={setCurrentPage} />;
      case 'accreditations':
        return <AffiliationsPage onNavigate={setCurrentPage} />;
      case 'student-life':
        return <StudentLifePage onNavigate={setCurrentPage} />;
      case 'distance-learning':
        return <DistanceLearningPage onNavigate={setCurrentPage} />;
      case 'career-counselor':
        return <CareerCounselorPage onNavigate={setCurrentPage} />;
      case 'downloads':
        return <DownloadsPage onNavigate={setCurrentPage} />;
      case 'news-events':
        return <NewsEventsPage onNavigate={setCurrentPage} />;
      case 'alumni':
        return <AlumniPage onNavigate={setCurrentPage} />;
      case 'contact':
        return <ContactPage onNavigate={setCurrentPage} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 font-sans selection:bg-red-500 selection:text-white">
      {/* Universal Top Navigation Header with 20-Page Selector */}
      <Header
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Active Page View */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Universal Global Footer */}
      <Footer onNavigate={setCurrentPage} />

      {/* Quick Search Spotlight Modal */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={setCurrentPage}
      />

      {/* Interactive AI Admission Counselor Widget */}
      <LiveChatWidget onNavigate={setCurrentPage} />
    </div>
  );
}
