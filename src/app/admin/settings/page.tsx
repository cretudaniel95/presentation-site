'use client';

import { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader } from '@/components/Card';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import toast from 'react-hot-toast';
import { SiteConfig } from '@/types';

export default function SettingsPage() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    siteName: '',
    siteTagline: '',
    description: '',
    primaryColor: '#9333ea',
    secondaryColor: '#64748b',
    theme: 'light' as const,
  });

  useEffect(() => {
    // TODO: Fetch site config from API
    setLoading(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      // TODO: Implement save endpoint
      toast.success('Settings saved successfully');
    } catch (error) {
      toast.error('Failed to save settings');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-secondary-900 mb-8">Site Settings</h1>

      {/* General Settings */}
      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-xl font-semibold text-secondary-900">General Settings</h2>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Site Name"
              value={formData.siteName}
              onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
              placeholder="My Presentation Site"
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
              placeholder="A brief description of your site"
              rows={4}
            />

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Primary Color
                </label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={formData.primaryColor}
                    onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                    className="w-12 h-12 rounded-lg cursor-pointer"
                  />
                  <Input
                    value={formData.primaryColor}
                    onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Secondary Color
                </label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={formData.secondaryColor}
                    onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                    className="w-12 h-12 rounded-lg cursor-pointer"
                  />
                  <Input
                    value={formData.secondaryColor}
                    onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">Theme</label>
              <select
                value={formData.theme}
                onChange={(e) => setFormData({ ...formData, theme: e.target.value as any })}
                className="w-full px-4 py-2.5 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto (System)</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4 border-t border-secondary-200">
              <Button variant="outline" className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1" isLoading={isSaving}>
                Save Settings
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader className="border-red-200">
          <h2 className="text-xl font-semibold text-red-900">Danger Zone</h2>
        </CardHeader>
        <CardBody>
          <p className="text-red-800 mb-4">
            These actions cannot be undone. Please proceed with caution.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
              Reset All Data
            </Button>
            <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
              Delete Site
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

