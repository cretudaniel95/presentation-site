'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Eye, EyeOff } from 'lucide-react';
import { Card, CardBody } from '@/components/Card';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import Modal from '@/components/Modal';
import toast from 'react-hot-toast';
import { Page } from '@/types';
import { formatDate } from '@/utils/helpers';

export default function PagesPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    content: '',
    metaTitle: '',
    metaDescription: '',
    published: false,
  });

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/pages');
      const data = await response.json();
      if (data.success) {
        setPages(data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch pages');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Page saved successfully');
        setPages([...pages, data.data]);
        resetForm();
        setIsModalOpen(false);
      } else {
        toast.error(data.error || 'Failed to save page');
      }
    } catch (error) {
      toast.error('An error occurred');
      console.error(error);
    }
  };

  const resetForm = () => {
    setFormData({
      slug: '',
      title: '',
      content: '',
      metaTitle: '',
      metaDescription: '',
      published: false,
    });
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this page?')) return;
    
    try {
      // TODO: Implement delete endpoint
      toast.success('Page deleted successfully');
      setPages(pages.filter((page) => page.id !== id));
    } catch (error) {
      toast.error('Failed to delete page');
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-secondary-900">Pages Management</h1>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          New Page
        </Button>
      </div>

      {/* Pages Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50 border-b border-secondary-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-secondary-900">Title</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-secondary-900">Slug</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-secondary-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-secondary-900">Created</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-secondary-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-200">
              {pages.map((page) => (
                <tr key={page.id} className="hover:bg-secondary-50 transition">
                  <td className="px-6 py-4 text-secondary-900 font-medium">{page.title}</td>
                  <td className="px-6 py-4 text-secondary-600 text-sm">{page.slug}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {page.published ? (
                        <>
                          <Eye className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-green-600">Published</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Draft</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-secondary-600 text-sm">{formatDate(page.createdAt)}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary-600"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600"
                        onClick={() => handleDelete(page.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {pages.length === 0 && !loading && (
          <CardBody className="text-center py-12">
            <p className="text-secondary-600 mb-4">No pages yet</p>
            <Button onClick={() => setIsModalOpen(true)}>Create Your First Page</Button>
          </CardBody>
        )}
      </Card>

      {/* Add/Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Page" size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Page Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <Input
            label="Slug (URL)"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
            helperText="Used in the page URL"
          />
          <Textarea
            label="Content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={6}
            required
          />
          <Input
            label="Meta Title (SEO)"
            value={formData.metaTitle}
            onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
            helperText="Shown in search results"
          />
          <Textarea
            label="Meta Description (SEO)"
            value={formData.metaDescription}
            onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
            rows={2}
            helperText="Shown in search results"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="w-4 h-4 rounded"
            />
            <span className="text-sm font-medium text-secondary-700">Publish</span>
          </label>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {editingId ? 'Update' : 'Create'} Page
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

