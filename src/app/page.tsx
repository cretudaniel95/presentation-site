'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSiteConfig } from '@/hooks/useSiteConfig';

export default function Home() {
  const { config, loading } = useSiteConfig();
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const imagesPerPage = 9;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch('/api/gallery?published=true');
        const data = await response.json();
        if (data.success) {
          setGalleryImages(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch gallery:', error);
      }
    };
    fetchGallery();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;

      if (e.key === 'Escape') {
        setSelectedImage(null);
      } else if (e.key === 'ArrowRight') {
        navigateImage(1);
      } else if (e.key === 'ArrowLeft') {
        navigateImage(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImage]);

  const navigateImage = (direction: number) => {
    if (!selectedImage) return;

    const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
    const newIndex = (currentIndex + direction + galleryImages.length) % galleryImages.length;
    setSelectedImage(galleryImages[newIndex]);
  };

  const totalPages = Math.ceil(galleryImages.length / imagesPerPage);
  const startIndex = (currentPage - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  const currentImages = galleryImages.slice(startIndex, endIndex);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Message sent successfully! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '', phone: '' });
      } else {
        toast.error(data.error || 'Failed to send message');
      }
    } catch (error) {
      toast.error('Failed to send message');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav
        className="sticky top-0 z-50 backdrop-blur-md border-b border-gray-200"
        style={{
          backgroundColor: config?.headerBgColor ? config.headerBgColor + 'CC' : 'rgba(255, 255, 255, 0.8)',
          color: config?.headerTextColor || '#1e293b'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              {config?.headerLogoUrl ? (
                <Image src={config.headerLogoUrl} alt="Logo" width={32} height={32} className="w-8 h-8" />
              ) : (
                <Sparkles className="w-6 h-6" style={{ color: config?.headerTextColor || '#1e293b' }} />
              )}
              <span className="font-bold text-lg" style={{ color: config?.headerTextColor || '#1e293b' }}>
                {config?.siteName || 'Presentation'}
              </span>
            </div>
            {config?.siteTagline && (
              <span className="text-xs ml-8" style={{ color: config?.headerTextColor || '#64748b', opacity: 0.7 }}>
                {config.siteTagline}
              </span>
            )}
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="#about"
              className="hover:opacity-70 transition"
              style={{ color: config?.headerTextColor || '#64748b' }}
            >
              About
            </Link>
            <Link
              href="#gallery"
              className="hover:opacity-70 transition"
              style={{ color: config?.headerTextColor || '#64748b' }}
            >
              Gallery
            </Link>
            <Link
              href="#contact"
              className="hover:opacity-70 transition"
              style={{ color: config?.headerTextColor || '#64748b' }}
            >
              Contact
            </Link>
            <Link
              href="/admin"
              className="px-4 py-2 rounded-lg hover:opacity-90 transition"
              style={{
                backgroundColor: config?.heroButtonBgColor || '#9333ea',
                color: config?.heroButtonTextColor || '#ffffff'
              }}
            >
              Admin
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32"
        style={{
          backgroundImage: config?.heroBackgroundImage ? `url(${config.heroBackgroundImage})` : undefined,
          backgroundColor: config?.heroBgColor || 'transparent',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="text-center animate-fade-in-up">
          <h1
            className="text-4xl md:text-6xl font-bold mb-6"
            style={{ color: config?.heroTitleColor || '#1e293b' }}
          >
            {config?.heroTitle || 'Welcome to Your Professional Presentation'}
          </h1>
          <p
            className="text-xl mb-8 max-w-2xl mx-auto"
            style={{ color: config?.heroTextColor || '#64748b' }}
          >
            {config?.heroSubtitle || 'Showcase your work, share your story, and connect with your audience in a beautiful, modern way.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#gallery"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg hover:opacity-90 transition font-medium"
              style={{
                backgroundColor: config?.heroButtonBgColor || '#9333ea',
                color: config?.heroButtonTextColor || '#ffffff'
              }}
            >
              View Gallery
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg hover:opacity-90 transition font-medium"
              style={{
                backgroundColor: config?.heroButtonBgColor || '#9333ea',
                color: config?.heroButtonTextColor || '#ffffff'
              }}
            >
              Get in Touch
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20"
        style={{
          backgroundColor: config?.aboutBgColor || '#ffffff',
          backgroundImage: config?.aboutBgImage ? `url(${config.aboutBgImage})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            style={{ color: config?.aboutTitleColor || '#1e293b' }}
          >
            {config?.aboutTitle || 'About Us'}
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p
                className="text-lg mb-6"
                style={{ color: config?.aboutTextColor || '#64748b' }}
              >
                {config?.aboutContent || 'We are dedicated to providing exceptional services and creating memorable experiences.'}
              </p>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 font-medium hover:opacity-80 transition"
                style={{ color: config?.aboutTitleColor || '#9333ea' }}
              >
                Learn more <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-gradient-to-br rounded-lg h-64 flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#e0e7ff' }}>
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
                alt="Featured work"
                width={600}
                height={400}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        id="gallery"
        className="py-20"
        style={{ backgroundColor: config?.galleryBgColor || '#f8fafc' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            style={{ color: config?.galleryTitleColor || '#1e293b' }}
          >
            {config?.galleryTitle || 'Our Gallery'}
          </h2>
          {galleryImages.length > 0 ? (
            <>
              <div className="grid md:grid-cols-3 gap-8">
                {currentImages.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer"
                    style={{ backgroundColor: config?.galleryCardBgColor || '#ffffff' }}
                    onClick={() => setSelectedImage(item)}
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.imageAlt || item.title}
                      width={500}
                      height={400}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="p-6">
                      <h3
                        className="font-semibold mb-2"
                        style={{ color: config?.galleryTitleColor || '#1e293b' }}
                      >
                        {item.title}
                      </h3>
                      {item.description && (
                        <p
                          className="text-sm"
                          style={{ color: config?.galleryTextColor || '#64748b' }}
                        >
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
                    style={{
                      borderColor: config?.galleryTitleColor || '#9333ea',
                      color: config?.galleryTextColor || '#1e293b'
                    }}
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg transition ${
                        currentPage === page 
                          ? '' 
                          : 'border hover:bg-gray-100'
                      }`}
                      style={
                        currentPage === page
                          ? {
                              backgroundColor: config?.heroButtonBgColor || '#9333ea',
                              color: config?.heroButtonTextColor || '#ffffff'
                            }
                          : {
                              borderColor: config?.galleryTitleColor || '#9333ea',
                              color: config?.galleryTextColor || '#1e293b'
                            }
                      }
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
                    style={{
                      borderColor: config?.galleryTitleColor || '#9333ea',
                      color: config?.galleryTextColor || '#1e293b'
                    }}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p
                className="mb-4"
                style={{ color: config?.galleryTextColor || '#64748b' }}
              >
                No gallery images yet. Add some from the admin panel!
              </p>
              <Link
                href="/admin/gallery"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg hover:opacity-90 transition"
                style={{
                  backgroundColor: config?.heroButtonBgColor || '#9333ea',
                  color: config?.heroButtonTextColor || '#ffffff'
                }}
              >
                Go to Gallery Management
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition z-10"
            aria-label="Close"
          >
            ×
          </button>

          {galleryImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); navigateImage(-1); }}
                className="absolute left-4 text-white text-6xl hover:text-gray-300 transition z-10"
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); navigateImage(1); }}
                className="absolute right-4 text-white text-6xl hover:text-gray-300 transition z-10"
                aria-label="Next image"
              >
                ›
              </button>
            </>
          )}

          <div className="max-w-7xl max-h-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage.imageUrl}
              alt={selectedImage.imageAlt || selectedImage.title}
              width={1920}
              height={1080}
              className="max-w-full max-h-[85vh] object-contain"
            />
            <div className="mt-4 text-center">
              <h3 className="text-white text-2xl font-semibold mb-2">{selectedImage.title}</h3>
              {selectedImage.description && (
                <p className="text-gray-300 text-lg">{selectedImage.description}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20"
        style={{
          backgroundColor: config?.contactBgColor || '#ffffff',
          backgroundImage: config?.contactBgImage ? `url(${config.contactBgImage})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl md:text-4xl font-bold mb-6 text-center"
            style={{ color: config?.contactTitleColor || '#1e293b' }}
          >
            {config?.contactTitle || 'Get in Touch'}
          </h2>
          <p
            className="text-center mb-12"
            style={{ color: config?.contactTextColor || '#64748b' }}
          >
            {config?.contactContent || 'We would love to hear from you. Send us a message!'}
          </p>
          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition"
                style={{
                  '--tw-ring-color': config?.contactButtonBgColor || '#9333ea',
                  color: config?.contactTextColor || '#1e293b'
                } as any}
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition"
                style={{
                  '--tw-ring-color': config?.contactButtonBgColor || '#9333ea',
                  color: config?.contactTextColor || '#1e293b'
                } as any}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition"
                style={{
                  '--tw-ring-color': config?.contactButtonBgColor || '#9333ea',
                  color: config?.contactTextColor || '#1e293b'
                } as any}
              />
              <input
                type="tel"
                placeholder="Your Phone (Optional)"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition"
                style={{
                  '--tw-ring-color': config?.contactButtonBgColor || '#9333ea',
                  color: config?.contactTextColor || '#1e293b'
                } as any}
              />
            </div>
            <textarea
              placeholder="Your Message"
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition"
              style={{
                '--tw-ring-color': config?.contactButtonBgColor || '#9333ea',
                color: config?.contactTextColor || '#1e293b'
              } as any}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-3 rounded-lg hover:opacity-90 transition font-medium disabled:opacity-50"
              style={{
                backgroundColor: config?.contactButtonBgColor || '#9333ea',
                color: config?.contactButtonTextColor || '#ffffff'
              }}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-12"
        style={{
          backgroundColor: config?.footerBgColor || '#64748b',
          color: config?.footerTextColor || '#ffffff'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl font-bold mb-2">{config?.siteName || 'Presentation Site'}</h3>
          {config?.description && (
            <p className="opacity-80 mb-4 max-w-2xl mx-auto">{config.description}</p>
          )}
          <p className="opacity-80">
            &copy; 2024 {config?.siteName || 'Presentation Site'}. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

