'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Plus, Edit2, Trash2, Eye, EyeOff, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import Modal from '@/components/Modal';
import toast from 'react-hot-toast';
import { GalleryImage } from '@/types';

const ITEMS_PER_PAGE = 9;

// Simple Card components
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>{children}</div>
);

const CardBody: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    imageAlt: '',
    category: 'general',
    order: 0,
    published: true,
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

    if (!formData.title.trim() || !formData.imageUrl.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const url = editingId ? `/api/gallery/${editingId}` : '/api/gallery';
      const method = editingId ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        toast.success(editingId ? 'Image updated successfully' : 'Image added successfully');
        resetForm();
        setIsModalOpen(false);
        await fetchImages();
      } else {
        toast.error(data.error || 'Failed to save image');
      }
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('An error occurred while saving the image');
    } finally {
      setIsSubmitting(false);
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
      published: true,
    });
    setEditingId(null);
  };

  const handleEdit = (image: GalleryImage) => {
    setEditingId(image.id);
    setFormData({
      title: image.title,
      description: image.description || '',
      imageUrl: image.imageUrl,
      imageAlt: image.imageAlt || '',
      category: image.category,
      order: image.order,
      published: image.published,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Image deleted successfully');
        setImages(images.filter((img) => img.id !== id));
        // Reset to page 1 if current page becomes empty
        const totalPages = Math.ceil((images.length - 1) / ITEMS_PER_PAGE);
        if (currentPage > totalPages && totalPages > 0) {
          setCurrentPage(totalPages);
        }
      } else {
        toast.error(data.error || 'Failed to delete image');
      }
    } catch (error) {
      toast.error('Failed to delete image');
      console.error(error);
    }
  };

  const togglePublished = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !currentStatus }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success(currentStatus ? 'Image unpublished' : 'Image published');
        setImages(images.map(img =>
          img.id === id ? { ...img, published: !currentStatus } : img
        ));
      } else {
        toast.error(data.error || 'Failed to update image');
      }
    } catch (error) {
      toast.error('Failed to update image');
      console.error(error);
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(images.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentImages = images.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
          <p className="text-gray-600 mt-2">
            Showing {startIndex + 1}-{Math.min(endIndex, images.length)} of {images.length} images
          </p>
        </div>
        <Button onClick={() => { resetForm(); setIsModalOpen(true); }} className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Image
        </Button>
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading gallery...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentImages.map((image) => (
              <Card key={image.id}>
                <div className="relative">
                  <div className="bg-gradient-to-br from-purple-100 to-gray-100 h-48 flex items-center justify-center overflow-hidden">
                    {image.imageUrl ? (
                      <Image
                        src={image.imageUrl}
                        alt={image.imageAlt || image.title}
                        width={300}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <p className="text-gray-500">No image</p>
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
                  <h3 className="font-semibold text-gray-900 mb-2">{image.title}</h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{image.description || 'No description'}</p>
                  <p className="text-xs text-gray-500 mb-4">Category: {image.category}</p>
                  <div className="flex gap-2 mb-3">
                    <Button
                      variant={image.published ? "outline" : "primary"}
                      size="sm"
                      className="flex-1 flex items-center justify-center gap-2"
                      onClick={() => togglePublished(image.id, image.published)}
                    >
                      {image.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      {image.published ? 'Unpublish' : 'Publish'}
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 flex items-center justify-center gap-2"
                      onClick={() => handleEdit(image)}
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

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // Show first page, last page, current page, and pages around current
                  const showPage =
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1);

                  const showEllipsis =
                    (page === currentPage - 2 && currentPage > 3) ||
                    (page === currentPage + 2 && currentPage < totalPages - 2);

                  if (showEllipsis) {
                    return <span key={page} className="px-3 py-2 text-gray-500">...</span>;
                  }

                  if (!showPage) return null;

                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? "primary" : "outline"}
                      size="sm"
                      onClick={() => goToPage(page)}
                      className="min-w-[40px]"
                    >
                      {page}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </>
      )}

      {images.length === 0 && !loading && (
        <Card>
          <CardBody className="text-center py-12">
            <p className="text-gray-600 mb-4">No gallery images yet</p>
            <Button onClick={() => { resetForm(); setIsModalOpen(true); }}>Add Your First Image</Button>
          </CardBody>
        </Card>
      )}

      {/* Add/Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); resetForm(); }} title={editingId ? "Edit Gallery Image" : "Add Gallery Image"} size="lg">
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
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
          />
          <div className="border-t pt-4 mt-4">
            <label className="flex items-center gap-3 p-4 border-2 border-purple-300 rounded-lg bg-purple-50 cursor-pointer hover:bg-purple-100 transition">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-5 h-5 rounded text-purple-600"
              />
              <div>
                <span className="text-base font-semibold text-gray-900 block">Publish Image</span>
                <span className="text-sm text-gray-600">Make this image visible on the website</span>
              </div>
            </label>
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => { resetForm(); setIsModalOpen(false); }}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              {editingId ? 'Update' : 'Add'} Image
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

