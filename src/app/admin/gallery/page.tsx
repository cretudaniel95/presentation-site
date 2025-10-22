'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Eye, EyeOff } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/Card';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import Modal from '@/components/Modal';
import toast from 'react-hot-toast';
import { GalleryImage } from '@/types';

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    imageAlt: '',
    category: 'general',
    order: 0,
    published: false,
  });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/gallery');
      const data = await response.json();
      if (data.success) {
        setImages(data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch gallery images');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Image added successfully');
        setImages([...images, data.data]);
        resetForm();
        setIsModalOpen(false);
      } else {
        toast.error(data.error || 'Failed to add image');
      }
    } catch (error) {
      toast.error('An error occurred');
      console.error(error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      imageAlt: '',
      category: 'general',
      order: 0,
      published: false,
    });
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    
    try {
      // TODO: Implement delete endpoint
      toast.success('Image deleted successfully');
      setImages(images.filter((img) => img.id !== id));
    } catch (error) {
      toast.error('Failed to delete image');
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-secondary-900">Gallery Management</h1>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Image
        </Button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <Card key={image.id}>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-100 to-secondary-100 h-48 flex items-center justify-center">
                {image.imageUrl ? (
                  <img
                    src={image.imageUrl}
                    alt={image.imageAlt || image.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p className="text-secondary-500">No image</p>
                )}
              </div>
              <div className="absolute top-2 right-2 flex gap-2">
                {image.published ? (
                  <Eye className="w-5 h-5 text-green-500 bg-white rounded-full p-1" />
                ) : (
                  <EyeOff className="w-5 h-5 text-gray-500 bg-white rounded-full p-1" />
                )}
              </div>
            </div>
            <CardBody>
              <h3 className="font-semibold text-secondary-900 mb-2">{image.title}</h3>
              <p className="text-sm text-secondary-600 mb-4">{image.description}</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 flex items-center justify-center gap-2 text-red-600 border-red-600 hover:bg-red-50"
                  onClick={() => handleDelete(image.id)}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {images.length === 0 && !loading && (
        <Card>
          <CardBody className="text-center py-12">
            <p className="text-secondary-600 mb-4">No gallery images yet</p>
            <Button onClick={() => setIsModalOpen(true)}>Add Your First Image</Button>
          </CardBody>
        </Card>
      )}

      {/* Add/Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Gallery Image" size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
          />
          <Input
            label="Image URL"
            type="url"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            required
          />
          <Input
            label="Alt Text"
            value={formData.imageAlt}
            onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })}
          />
          <Input
            label="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />
          <Input
            label="Order"
            type="number"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
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
              {editingId ? 'Update' : 'Add'} Image
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

