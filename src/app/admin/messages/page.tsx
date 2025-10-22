'use client';

import { useState, useEffect } from 'react';
import { Trash2, Mail, Phone, Calendar } from 'lucide-react';
import { Card, CardBody } from '@/components/Card';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import toast from 'react-hot-toast';
import { ContactMessage } from '@/types';
import { formatDate } from '@/utils/helpers';

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/contact');
      const data = await response.json();
      if (data.success) {
        setMessages(data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch messages');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    
    try {
      // TODO: Implement delete endpoint
      toast.success('Message deleted successfully');
      setMessages(messages.filter((msg) => msg.id !== id));
    } catch (error) {
      toast.error('Failed to delete message');
      console.error(error);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      // TODO: Implement mark as read endpoint
      setMessages(
        messages.map((msg) =>
          msg.id === id ? { ...msg, read: true } : msg
        )
      );
      toast.success('Message marked as read');
    } catch (error) {
      toast.error('Failed to update message');
      console.error(error);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary-900">Contact Messages</h1>
        <p className="text-secondary-600 mt-2">
          {messages.filter((m) => !m.read).length} unread messages
        </p>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {messages.map((message) => (
          <Card key={message.id} className={message.read ? 'opacity-75' : ''}>
            <CardBody>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-secondary-900">{message.name}</h3>
                    {!message.read && (
                      <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-secondary-600 font-medium mb-3">{message.subject}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-secondary-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {message.email}
                    </div>
                    {message.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {message.phone}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(message.createdAt)}
                    </div>
                  </div>

                  <p className="text-secondary-700 line-clamp-2">{message.message}</p>
                </div>

                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewMessage(message)}
                  >
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-600 hover:bg-red-50"
                    onClick={() => handleDelete(message.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {messages.length === 0 && !loading && (
        <Card>
          <CardBody className="text-center py-12">
            <p className="text-secondary-600">No messages yet</p>
          </CardBody>
        </Card>
      )}

      {/* Message Detail Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Message Details"
        size="lg"
      >
        {selectedMessage && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-secondary-600 mb-1">From</h3>
              <p className="text-lg font-semibold text-secondary-900">{selectedMessage.name}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold text-secondary-600 mb-1">Email</h3>
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="text-primary-600 hover:text-primary-700"
                >
                  {selectedMessage.email}
                </a>
              </div>
              {selectedMessage.phone && (
                <div>
                  <h3 className="text-sm font-semibold text-secondary-600 mb-1">Phone</h3>
                  <a
                    href={`tel:${selectedMessage.phone}`}
                    className="text-primary-600 hover:text-primary-700"
                  >
                    {selectedMessage.phone}
                  </a>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-sm font-semibold text-secondary-600 mb-1">Subject</h3>
              <p className="text-secondary-900">{selectedMessage.subject}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-secondary-600 mb-1">Message</h3>
              <p className="text-secondary-900 whitespace-pre-wrap">{selectedMessage.message}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-secondary-600 mb-1">Received</h3>
              <p className="text-secondary-900">{formatDate(selectedMessage.createdAt)}</p>
            </div>

            <div className="flex gap-3 pt-4 border-t border-secondary-200">
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="flex-1"
              >
                Close
              </Button>
              {!selectedMessage.read && (
                <Button
                  onClick={() => {
                    handleMarkAsRead(selectedMessage.id);
                    setIsModalOpen(false);
                  }}
                  className="flex-1"
                >
                  Mark as Read
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

