import React, { useEffect } from 'react';
import { PageId } from '../types';
import {
  PAGES_SEO_METADATA,
  PRODUCTION_DOMAIN,
  buildBreadcrumbSchema,
  buildPageFaqSchema,
  buildPageSpecializedSchema
} from '../data/seoData';

interface SEOHeadProps {
  currentPage: PageId;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ currentPage }) => {
  useEffect(() => {
    // Helper to update or create a meta tag
    const setMetaTag = (attrName: 'name' | 'property', attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Helper to remove an element if it exists
    const removeElement = (selector: string) => {
      const el = document.querySelector(selector);
      if (el) el.remove();
    };

    // Handle 404 Page Not Found state
    if (currentPage === 'not-found') {
      document.title = '404 - Page Not Found | Zaitoon Roots Academy';

      // CRITICAL for Google Search Console & SEO: Prevent Soft 404 indexing
      setMetaTag('name', 'robots', 'noindex, follow');
      setMetaTag('name', 'description', 'The requested academic page could not be found on the Zaitoon Roots Academy portal. Explore degree programs, diplomas, admissions, or contact our 24/7 helpdesk.');

      // Remove canonical tag on 404 to avoid duplicate or misleading canonical warnings
      removeElement('link[rel="canonical"]');

      // Remove dynamic schemas on 404
      removeElement('#schema-page-breadcrumbs');
      removeElement('#schema-page-faq');
      removeElement('#schema-page-specialized');
      return;
    }

    // Normal Valid Pages: Ensure indexable and structured
    setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    const meta = PAGES_SEO_METADATA[currentPage] || PAGES_SEO_METADATA.home;
    const pageUrl = meta.path === '/' ? `${PRODUCTION_DOMAIN}/` : `${PRODUCTION_DOMAIN}${meta.path}`;

    // 1. Update Document Title
    document.title = meta.title;

    // 2. Update Primary Meta Description & Keywords
    setMetaTag('name', 'description', meta.description);
    setMetaTag('name', 'keywords', meta.keywords);

    // 3. Update Canonical Tag
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = pageUrl;

    // 4. Update Open Graph Meta
    setMetaTag('property', 'og:title', meta.title);
    setMetaTag('property', 'og:description', meta.description);
    setMetaTag('property', 'og:url', pageUrl);

    // 5. Update Twitter Meta
    setMetaTag('name', 'twitter:title', meta.title);
    setMetaTag('name', 'twitter:description', meta.description);
    setMetaTag('name', 'twitter:url', pageUrl);

    // 6. Update Dynamic Page Breadcrumb Schema
    const breadcrumbSchema = buildBreadcrumbSchema(currentPage);
    let breadcrumbScript = document.getElementById('schema-page-breadcrumbs') as HTMLScriptElement | null;
    if (breadcrumbSchema) {
      if (!breadcrumbScript) {
        breadcrumbScript = document.createElement('script');
        breadcrumbScript.id = 'schema-page-breadcrumbs';
        breadcrumbScript.type = 'application/ld+json';
        document.head.appendChild(breadcrumbScript);
      }
      breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);
    } else if (breadcrumbScript) {
      breadcrumbScript.remove();
    }

    // 7. Update Dynamic Page FAQ Schema (AEO)
    const faqSchema = buildPageFaqSchema(currentPage);
    let faqScript = document.getElementById('schema-page-faq') as HTMLScriptElement | null;
    if (faqSchema) {
      if (!faqScript) {
        faqScript = document.createElement('script');
        faqScript.id = 'schema-page-faq';
        faqScript.type = 'application/ld+json';
        document.head.appendChild(faqScript);
      }
      faqScript.textContent = JSON.stringify(faqSchema);
    } else if (faqScript) {
      faqScript.remove();
    }

    // 8. Update Specialized Page Schema (Courses / Educational Programs / Contact Page) for AEO & Rich Snippets
    const specializedSchema = buildPageSpecializedSchema(currentPage);
    let specializedScript = document.getElementById('schema-page-specialized') as HTMLScriptElement | null;
    if (specializedSchema) {
      if (!specializedScript) {
        specializedScript = document.createElement('script');
        specializedScript.id = 'schema-page-specialized';
        specializedScript.type = 'application/ld+json';
        document.head.appendChild(specializedScript);
      }
      specializedScript.textContent = JSON.stringify(specializedSchema);
    } else if (specializedScript) {
      specializedScript.remove();
    }
  }, [currentPage]);

  return null;
};
