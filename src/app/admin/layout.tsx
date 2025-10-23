'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, LogOut, Settings, Image, FileText, MessageSquare, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('admin_user');
      localStorage.removeItem('is_authenticated');
      router.push('/admin/login');
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gray-900 text-white transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          {sidebarOpen && <h1 className="font-bold text-lg">Admin Panel</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-800 rounded-lg"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <SidebarLink href="/admin" icon={LayoutDashboard} label="Dashboard" open={sidebarOpen} />
          <SidebarLink href="/admin/pages" icon={FileText} label="Pages" open={sidebarOpen} />
          <SidebarLink href="/admin/gallery" icon={Image} label="Gallery" open={sidebarOpen} />
          <SidebarLink href="/admin/settings" icon={Settings} label="Settings" open={sidebarOpen} />
          <SidebarLink
            href="/admin/messages"
            icon={MessageSquare}
            label="Messages"
            open={sidebarOpen}
          />
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-white">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}

function SidebarLink({
  href,
  icon: Icon,
  label,
  open,
}: {
  href: string;
  icon: any;
  label: string;
  open: boolean;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition"
    >
      <Icon className="w-5 h-5" />
      {open && <span>{label}</span>}
    </Link>
  );
}
