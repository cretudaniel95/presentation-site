import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { ConfigProvider } from '@/lib/config-context';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Presentation Site',
  description: 'Professional presentation website',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
        <ConfigProvider>
          {children}
        </ConfigProvider>
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  );
}
