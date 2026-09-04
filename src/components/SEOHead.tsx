import React, { useEffect } from 'react';
import { PageId } from '../types';
import { PAGES_SEO_METADATA, PRODUCTION_DOMAIN, buildBreadcrumbSchema, buildPageFaqSchema } from '../data/seoData';

interface SEOHeadProps {
  currentPage: PageId;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ currentPage }) => {
  useEffect(() => {
    const meta = PAGES_SEO_METADATA[currentPage] || PAGES_SEO_METADATA.home;
    const pageUrl = meta.path === '/' ? `${PRODUCTION_DOMAIN}/` : `${PRODUCTION_DOMAIN}${meta.path}`;

    // 1. Update Document Title
    document.title = meta.title;

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
    let breadcrumbScript = document.getElementById('schema-page-breadcrumbs') as HTMLScriptElement | null;
    if (!breadcrumbScript) {
      breadcrumbScript = document.createElement('script');
      breadcrumbScript.id = 'schema-page-breadcrumbs';
      breadcrumbScript.type = 'application/ld+json';
      document.head.appendChild(breadcrumbScript);
    }
    breadcrumbScript.textContent = JSON.stringify(buildBreadcrumbSchema(currentPage));

    // 7. Update Dynamic Page FAQ Schema
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
  }, [currentPage]);

  return null;
};
