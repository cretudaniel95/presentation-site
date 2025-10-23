'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useSiteConfig } from '@/hooks/useSiteConfig';

interface PageData {
  id: string;
  slug: string;
  title: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default function DynamicPage() {
  const params = useParams();
  const { config, loading: configLoading } = useSiteConfig();
  const [page, setPage] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      if (!params.slug) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/pages?slug=${params.slug}`);
        const data = await response.json();

        if (data.success && data.data && data.data.length > 0) {
          const pageData = data.data[0];

          // Check if page is published
          if (!pageData.published) {
            setError('Page not found');
            return;
          }

          setPage(pageData);

          // Update page title
          if (pageData.metaTitle) {
            document.title = pageData.metaTitle;
          } else {
            document.title = `${pageData.title} - ${config?.siteName || 'Presentation Site'}`;
          }
        } else {
          setError('Page not found');
        }
      } catch (err) {
        console.error('Failed to fetch page:', err);
        setError('Failed to load page');
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [params.slug, config]);

  if (loading || configLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Page not found</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: config?.pagesBgColor || '#ffffff',
        color: config?.pagesTextColor || '#1e293b',
      }}
    >
      {/* Header Navigation */}
      <nav
        className="sticky top-0 z-50 backdrop-blur-md border-b border-gray-200"
        style={{
          backgroundColor: config?.headerBgColor ? config.headerBgColor + 'CC' : 'rgba(255, 255, 255, 0.8)',
          color: config?.headerTextColor || '#1e293b'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-70 transition"
            style={{ color: config?.headerTextColor || '#1e293b' }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">{config?.siteName || 'Home'}</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/#about"
              className="hover:opacity-70 transition"
              style={{ color: config?.headerTextColor || '#64748b' }}
            >
              About
            </Link>
            <Link
              href="/#gallery"
              className="hover:opacity-70 transition"
              style={{ color: config?.headerTextColor || '#64748b' }}
            >
              Gallery
            </Link>
            <Link
              href="/#contact"
              className="hover:opacity-70 transition"
              style={{ color: config?.headerTextColor || '#64748b' }}
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <article>
          <h1
            className="text-4xl md:text-5xl font-bold mb-8"
            style={{ color: config?.pagesTitleColor || '#1e293b' }}
          >
            {page.title}
          </h1>
          <div
            className="prose prose-lg max-w-none"
            style={{ color: config?.pagesTextColor || '#64748b' }}
            dangerouslySetInnerHTML={{ __html: page.content.replace(/\n/g, '<br />') }}
          />
        </article>
      </main>

      {/* Footer */}
      <footer
        className="py-12 mt-16"
        style={{
          backgroundColor: config?.footerBgColor || '#64748b',
          color: config?.footerTextColor || '#ffffff'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="opacity-80">
            &copy; 2024 {config?.siteName || 'Presentation Site'}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

