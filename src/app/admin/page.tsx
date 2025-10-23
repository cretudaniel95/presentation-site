'use client';

import { useRouter } from 'next/navigation';
import { BarChart3, Users, FileText, Image as ImageIcon } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();

  const stats = [
    { label: 'Total Pages', value: '5', icon: FileText, color: 'bg-blue-100 text-blue-600' },
    { label: 'Gallery Items', value: '24', icon: ImageIcon, color: 'bg-purple-100 text-purple-600' },
    { label: 'Messages', value: '12', icon: Users, color: 'bg-green-100 text-green-600' },
    { label: 'Views', value: '1.2K', icon: BarChart3, color: 'bg-orange-100 text-orange-600' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-secondary-900 mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-lg shadow p-6">
              <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <p className="text-secondary-600 text-sm mb-2">{stat.label}</p>
              <p className="text-2xl font-bold text-secondary-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-secondary-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => router.push('/admin/pages')}
            className="px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
          >
            Add New Page
          </button>
          <button
            onClick={() => router.push('/admin/gallery')}
            className="px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
          >
            Upload Gallery Image
          </button>
          <button
            onClick={() => router.push('/admin/messages')}
            className="px-4 py-3 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition font-medium"
          >
            View Messages
          </button>
          <button
            onClick={() => router.push('/admin/settings')}
            className="px-4 py-3 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition font-medium"
          >
            Site Settings
          </button>
        </div>
      </div>
    </div>
  );
}

