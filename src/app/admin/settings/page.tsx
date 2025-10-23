'use client';

import { useState, useEffect, useCallback } from 'react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import toast from 'react-hot-toast';

// Simple Card components
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>{children}</div>
);

const CardBody: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const CardHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="px-6 py-4 border-b border-gray-200">{children}</div>
);

interface ColorInputProps {
  label: string;
  description?: string;
  value: string;
  onChange: (value: string) => void;
}

const ColorInput: React.FC<ColorInputProps> = ({ label, description, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-900 mb-1">{label}</label>
    {description && <p className="text-xs text-gray-600 mb-2">{description}</p>}
    <div className="flex gap-3">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-14 h-14 rounded-lg cursor-pointer border-2 border-gray-300"
      />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1"
        placeholder="#000000"
      />
    </div>
  </div>
);

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'header' | 'hero' | 'about' | 'gallery' | 'contact' | 'pages' | 'footer'>('general');
  const [formData, setFormData] = useState({
    // General Settings
    siteName: '',
    siteTagline: '',
    description: '',
    theme: 'light' as const,

    // Header/Navigation
    headerBgColor: '#ffffff',
    headerTextColor: '#1e293b',
    headerLogoUrl: '',

    // Hero Section
    heroTitle: '',
    heroSubtitle: '',
    heroBackgroundImage: '',
    heroBgColor: '',
    heroTitleColor: '#1e293b',
    heroTextColor: '#64748b',
    heroButtonBgColor: '#9333ea',
    heroButtonTextColor: '#ffffff',
    heroButtonStyle: 'filled',

    // About Section
    aboutTitle: '',
    aboutContent: '',
    aboutBgColor: '#ffffff',
    aboutTitleColor: '#1e293b',
    aboutTextColor: '#64748b',
    aboutBgImage: '',

    // Gallery Section
    galleryTitle: '',
    galleryBgColor: '#f8fafc',
    galleryTitleColor: '#1e293b',
    galleryTextColor: '#64748b',
    galleryCardBgColor: '#ffffff',

    // Contact Section
    contactTitle: '',
    contactContent: '',
    contactBgColor: '#ffffff',
    contactTitleColor: '#1e293b',
    contactTextColor: '#64748b',
    contactBgImage: '',
    contactButtonBgColor: '#9333ea',
    contactButtonTextColor: '#ffffff',

    // Pages Section
    pagesBgColor: '#ffffff',
    pagesTitleColor: '#1e293b',
    pagesTextColor: '#64748b',

    // Footer Section
    footerBgColor: '#64748b',
    footerTextColor: '#ffffff',
  });

  const fetchConfig = useCallback(async () => {
    try {
      const response = await fetch('/api/config');
      const data = await response.json();
      if (data.success && data.data) {
        setFormData({
          siteName: data.data.siteName || '',
          siteTagline: data.data.siteTagline || '',
          description: data.data.description || '',
          theme: data.data.theme || 'light',

          headerBgColor: data.data.headerBgColor || '#ffffff',
          headerTextColor: data.data.headerTextColor || '#1e293b',
          headerLogoUrl: data.data.headerLogoUrl || '',

          heroTitle: data.data.heroTitle || '',
          heroSubtitle: data.data.heroSubtitle || '',
          heroBackgroundImage: data.data.heroBackgroundImage || '',
          heroBgColor: data.data.heroBgColor || '',
          heroTitleColor: data.data.heroTitleColor || '#1e293b',
          heroTextColor: data.data.heroTextColor || '#64748b',
          heroButtonBgColor: data.data.heroButtonBgColor || '#9333ea',
          heroButtonTextColor: data.data.heroButtonTextColor || '#ffffff',
          heroButtonStyle: data.data.heroButtonStyle || 'filled',

          aboutTitle: data.data.aboutTitle || '',
          aboutContent: data.data.aboutContent || '',
          aboutBgColor: data.data.aboutBgColor || '#ffffff',
          aboutTitleColor: data.data.aboutTitleColor || '#1e293b',
          aboutTextColor: data.data.aboutTextColor || '#64748b',
          aboutBgImage: data.data.aboutBgImage || '',

          galleryTitle: data.data.galleryTitle || '',
          galleryBgColor: data.data.galleryBgColor || '#f8fafc',
          galleryTitleColor: data.data.galleryTitleColor || '#1e293b',
          galleryTextColor: data.data.galleryTextColor || '#64748b',
          galleryCardBgColor: data.data.galleryCardBgColor || '#ffffff',

          contactTitle: data.data.contactTitle || '',
          contactContent: data.data.contactContent || '',
          contactBgColor: data.data.contactBgColor || '#ffffff',
          contactTitleColor: data.data.contactTitleColor || '#1e293b',
          contactTextColor: data.data.contactTextColor || '#64748b',
          contactBgImage: data.data.contactBgImage || '',
          contactButtonBgColor: data.data.contactButtonBgColor || '#9333ea',
          contactButtonTextColor: data.data.contactButtonTextColor || '#ffffff',

          pagesBgColor: data.data.pagesBgColor || '#ffffff',
          pagesTitleColor: data.data.pagesTitleColor || '#1e293b',
          pagesTextColor: data.data.pagesTextColor || '#64748b',

          footerBgColor: data.data.footerBgColor || '#64748b',
          footerTextColor: data.data.footerTextColor || '#ffffff',
        });
      }
    } catch (error) {
      toast.error('Failed to fetch settings');
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.siteName.trim()) {
      toast.error('Site name is required');
      return;
    }

    try {
      setIsSaving(true);
      const response = await fetch('/api/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        toast.success('Settings saved successfully');
        // Refresh the page to apply changes
        window.location.reload();
      } else {
        toast.error(data.error || 'Failed to save settings');
      }
    } catch (error) {
      console.error('Settings error:', error);
      toast.error('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: 'general' as const, label: 'General' },
    { id: 'header' as const, label: 'Header' },
    { id: 'hero' as const, label: 'Hero' },
    { id: 'about' as const, label: 'About' },
    { id: 'gallery' as const, label: 'Gallery' },
    { id: 'contact' as const, label: 'Contact' },
    { id: 'pages' as const, label: 'Pages' },
    { id: 'footer' as const, label: 'Footer' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Site Settings</h1>
      <p className="text-gray-600 mb-8">Customize each section of your website with specific colors, text, and images</p>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-gray-200 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* General Settings Tab */}
      {activeTab === 'general' && (
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">General Settings</h2>
            <p className="text-sm text-gray-600 mt-1">Configure your site&apos;s basic information</p>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Site Name"
                value={formData.siteName}
                onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                placeholder="My Presentation Site"
                required
              />

              <Input
                label="Site Tagline"
                value={formData.siteTagline}
                onChange={(e) => setFormData({ ...formData, siteTagline: e.target.value })}
                placeholder="Your professional tagline"
              />

              <Textarea
                label="Site Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="A brief description of your site for SEO"
                rows={3}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Theme Mode</label>
                <select
                  value={formData.theme}
                  onChange={(e) => setFormData({ ...formData, theme: e.target.value as any })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="light">Light Mode</option>
                  <option value="dark">Dark Mode</option>
                  <option value="auto">Auto (System Preference)</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => fetchConfig()}
                  disabled={isSaving}
                >
                  Reset Changes
                </Button>
                <Button type="submit" className="flex-1" isLoading={isSaving} disabled={isSaving}>
                  Save Settings
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}

      {/* Header Section Tab */}
      {activeTab === 'header' && (
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">Header / Navigation Bar</h2>
            <p className="text-sm text-gray-600 mt-1">Customize the top navigation bar colors and logo</p>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ColorInput
                  label="Background Color"
                  description="Navigation bar background"
                  value={formData.headerBgColor}
                  onChange={(value) => setFormData({ ...formData, headerBgColor: value })}
                />
                <ColorInput
                  label="Text Color"
                  description="Navigation links and text color"
                  value={formData.headerTextColor}
                  onChange={(value) => setFormData({ ...formData, headerTextColor: value })}
                />
              </div>

              <Input
                label="Logo URL (Optional)"
                value={formData.headerLogoUrl}
                onChange={(e) => setFormData({ ...formData, headerLogoUrl: e.target.value })}
                placeholder="https://example.com/logo.png"
              />

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button type="button" variant="outline" className="flex-1" onClick={() => fetchConfig()} disabled={isSaving}>
                  Reset Changes
                </Button>
                <Button type="submit" className="flex-1" isLoading={isSaving} disabled={isSaving}>
                  Save Settings
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}

      {/* Hero Section Tab */}
      {activeTab === 'hero' && (
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">Hero Section</h2>
            <p className="text-sm text-gray-600 mt-1">The main section at the top of your homepage</p>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Hero Title"
                value={formData.heroTitle}
                onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                placeholder="Welcome to Your Professional Presentation"
              />

              <Textarea
                label="Hero Subtitle"
                value={formData.heroSubtitle}
                onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                placeholder="Showcase your work, share your story, and connect with your audience"
                rows={3}
              />

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Colors</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ColorInput
                    label="Background Color"
                    description="Hero section background (leave empty for image)"
                    value={formData.heroBgColor || '#ffffff'}
                    onChange={(value) => setFormData({ ...formData, heroBgColor: value })}
                  />
                  <ColorInput
                    label="Title Color"
                    description="Main hero title text color"
                    value={formData.heroTitleColor}
                    onChange={(value) => setFormData({ ...formData, heroTitleColor: value })}
                  />
                  <ColorInput
                    label="Subtitle Color"
                    description="Hero subtitle text color"
                    value={formData.heroTextColor}
                    onChange={(value) => setFormData({ ...formData, heroTextColor: value })}
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Buttons</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ColorInput
                    label="Button Background"
                    description="Call-to-action button background"
                    value={formData.heroButtonBgColor}
                    onChange={(value) => setFormData({ ...formData, heroButtonBgColor: value })}
                  />
                  <ColorInput
                    label="Button Text Color"
                    description="Text color on buttons"
                    value={formData.heroButtonTextColor}
                    onChange={(value) => setFormData({ ...formData, heroButtonTextColor: value })}
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Button Style</label>
                  <select
                    value={formData.heroButtonStyle}
                    onChange={(e) => setFormData({ ...formData, heroButtonStyle: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="filled">Filled (Solid background)</option>
                    <option value="outlined">Outlined (Border only)</option>
                  </select>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Background Image</h3>
                <Input
                  label="Background Image URL"
                  value={formData.heroBackgroundImage}
                  onChange={(e) => setFormData({ ...formData, heroBackgroundImage: e.target.value })}
                  placeholder="https://example.com/hero-background.jpg"
                  helperText="Leave empty for solid color background"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button type="button" variant="outline" className="flex-1" onClick={() => fetchConfig()} disabled={isSaving}>
                  Reset Changes
                </Button>
                <Button type="submit" className="flex-1" isLoading={isSaving} disabled={isSaving}>
                  Save Settings
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}

      {/* About Section Tab */}
      {activeTab === 'about' && (
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">About Section</h2>
            <p className="text-sm text-gray-600 mt-1">Tell your story and introduce yourself or your business</p>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Section Title"
                value={formData.aboutTitle}
                onChange={(e) => setFormData({ ...formData, aboutTitle: e.target.value })}
                placeholder="About Us"
              />

              <Textarea
                label="Content"
                value={formData.aboutContent}
                onChange={(e) => setFormData({ ...formData, aboutContent: e.target.value })}
                placeholder="Tell your story..."
                rows={5}
              />

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Colors</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ColorInput
                    label="Background Color"
                    description="Section background color"
                    value={formData.aboutBgColor}
                    onChange={(value) => setFormData({ ...formData, aboutBgColor: value })}
                  />
                  <ColorInput
                    label="Title Color"
                    description="Section title color"
                    value={formData.aboutTitleColor}
                    onChange={(value) => setFormData({ ...formData, aboutTitleColor: value })}
                  />
                  <ColorInput
                    label="Text Color"
                    description="Content text color"
                    value={formData.aboutTextColor}
                    onChange={(value) => setFormData({ ...formData, aboutTextColor: value })}
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Background Image</h3>
                <Input
                  label="Background Image URL"
                  value={formData.aboutBgImage}
                  onChange={(e) => setFormData({ ...formData, aboutBgImage: e.target.value })}
                  placeholder="https://example.com/about-bg.jpg"
                  helperText="Optional background image for the about section"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button type="button" variant="outline" className="flex-1" onClick={() => fetchConfig()} disabled={isSaving}>
                  Reset Changes
                </Button>
                <Button type="submit" className="flex-1" isLoading={isSaving} disabled={isSaving}>
                  Save Settings
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}

      {/* Gallery Section Tab */}
      {activeTab === 'gallery' && (
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">Gallery Section</h2>
            <p className="text-sm text-gray-600 mt-1">Showcase your work and images</p>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Section Title"
                value={formData.galleryTitle}
                onChange={(e) => setFormData({ ...formData, galleryTitle: e.target.value })}
                placeholder="Our Gallery"
              />

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Colors</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ColorInput
                    label="Background Color"
                    description="Section background color"
                    value={formData.galleryBgColor}
                    onChange={(value) => setFormData({ ...formData, galleryBgColor: value })}
                  />
                  <ColorInput
                    label="Title Color"
                    description="Section title color"
                    value={formData.galleryTitleColor}
                    onChange={(value) => setFormData({ ...formData, galleryTitleColor: value })}
                  />
                  <ColorInput
                    label="Text Color"
                    description="Image descriptions and text"
                    value={formData.galleryTextColor}
                    onChange={(value) => setFormData({ ...formData, galleryTextColor: value })}
                  />
                  <ColorInput
                    label="Card Background"
                    description="Individual gallery card background"
                    value={formData.galleryCardBgColor}
                    onChange={(value) => setFormData({ ...formData, galleryCardBgColor: value })}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button type="button" variant="outline" className="flex-1" onClick={() => fetchConfig()} disabled={isSaving}>
                  Reset Changes
                </Button>
                <Button type="submit" className="flex-1" isLoading={isSaving} disabled={isSaving}>
                  Save Settings
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}

      {/* Contact Section Tab */}
      {activeTab === 'contact' && (
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">Contact Section</h2>
            <p className="text-sm text-gray-600 mt-1">Contact form and call-to-action</p>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Section Title"
                value={formData.contactTitle}
                onChange={(e) => setFormData({ ...formData, contactTitle: e.target.value })}
                placeholder="Get in Touch"
              />

              <Textarea
                label="Intro Text"
                value={formData.contactContent}
                onChange={(e) => setFormData({ ...formData, contactContent: e.target.value })}
                placeholder="We would love to hear from you..."
                rows={3}
              />

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Colors</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ColorInput
                    label="Background Color"
                    description="Section background color"
                    value={formData.contactBgColor}
                    onChange={(value) => setFormData({ ...formData, contactBgColor: value })}
                  />
                  <ColorInput
                    label="Title Color"
                    description="Section title color"
                    value={formData.contactTitleColor}
                    onChange={(value) => setFormData({ ...formData, contactTitleColor: value })}
                  />
                  <ColorInput
                    label="Text Color"
                    description="Content text color"
                    value={formData.contactTextColor}
                    onChange={(value) => setFormData({ ...formData, contactTextColor: value })}
                  />
                  <ColorInput
                    label="Button Background"
                    description="Submit button background"
                    value={formData.contactButtonBgColor}
                    onChange={(value) => setFormData({ ...formData, contactButtonBgColor: value })}
                  />
                  <ColorInput
                    label="Button Text Color"
                    description="Submit button text color"
                    value={formData.contactButtonTextColor}
                    onChange={(value) => setFormData({ ...formData, contactButtonTextColor: value })}
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Background Image</h3>
                <Input
                  label="Background Image URL"
                  value={formData.contactBgImage}
                  onChange={(e) => setFormData({ ...formData, contactBgImage: e.target.value })}
                  placeholder="https://example.com/contact-bg.jpg"
                  helperText="Optional background image for the contact section"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button type="button" variant="outline" className="flex-1" onClick={() => fetchConfig()} disabled={isSaving}>
                  Reset Changes
                </Button>
                <Button type="submit" className="flex-1" isLoading={isSaving} disabled={isSaving}>
                  Save Settings
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}

      {/* Footer Section Tab */}
      {activeTab === 'footer' && (
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">Footer Section</h2>
            <p className="text-sm text-gray-600 mt-1">Bottom footer with site information</p>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ColorInput
                  label="Background Color"
                  description="Footer background color"
                  value={formData.footerBgColor}
                  onChange={(value) => setFormData({ ...formData, footerBgColor: value })}
                />
                <ColorInput
                  label="Text Color"
                  description="Footer text color"
                  value={formData.footerTextColor}
                  onChange={(value) => setFormData({ ...formData, footerTextColor: value })}
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button type="button" variant="outline" className="flex-1" onClick={() => fetchConfig()} disabled={isSaving}>
                  Reset Changes
                </Button>
                <Button type="submit" className="flex-1" isLoading={isSaving} disabled={isSaving}>
                  Save Settings
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}

      {/* Pages Section Tab */}
      {activeTab === 'pages' && (
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">Pages Section</h2>
            <p className="text-sm text-gray-600 mt-1">Customize colors for custom pages (created from Pages Management)</p>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Colors</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ColorInput
                    label="Background Color"
                    description="Page background color"
                    value={formData.pagesBgColor}
                    onChange={(value) => setFormData({ ...formData, pagesBgColor: value })}
                  />
                  <ColorInput
                    label="Title Color"
                    description="Page title color"
                    value={formData.pagesTitleColor}
                    onChange={(value) => setFormData({ ...formData, pagesTitleColor: value })}
                  />
                  <ColorInput
                    label="Text Color"
                    description="Page content text color"
                    value={formData.pagesTextColor}
                    onChange={(value) => setFormData({ ...formData, pagesTextColor: value })}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button type="button" variant="outline" className="flex-1" onClick={() => fetchConfig()} disabled={isSaving}>
                  Reset Changes
                </Button>
                <Button type="submit" className="flex-1" isLoading={isSaving} disabled={isSaving}>
                  Save Settings
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}
    </div>
  );
}

