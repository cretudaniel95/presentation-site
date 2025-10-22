'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { Menu, LogOut, Settings, Image, FileText, MessageSquare } from 'lucide-react';
import { useState } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-secondary-100">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-secondary-900 text-white transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 border-b border-secondary-800 flex items-center justify-between">
          {sidebarOpen && <h1 className="font-bold text-lg">Admin Panel</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-secondary-800 rounded-lg"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <SidebarLink href="/admin" icon={Settings} label="Dashboard" open={sidebarOpen} />
          <SidebarLink href="/admin/pages" icon={FileText} label="Pages" open={sidebarOpen} />
          <SidebarLink href="/admin/gallery" icon={Image} label="Gallery" open={sidebarOpen} />
          <SidebarLink
            href="/admin/messages"
            icon={MessageSquare}
            label="Messages"
            open={sidebarOpen}
          />
        </nav>

        <div className="p-4 border-t border-secondary-800">
          <button className="w-full flex items-center gap-3 px-4 py-2 text-secondary-300 hover:bg-secondary-800 rounded-lg transition">
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
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
      className="flex items-center gap-3 px-4 py-2 text-secondary-300 hover:bg-secondary-800 rounded-lg transition"
    >
      <Icon className="w-5 h-5" />
      {open && <span>{label}</span>}
    </Link>
  );
}
