'use client';

import { useState, useEffect } from 'react';
import { SiteConfig } from '@/types';

export function useSiteConfig() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await fetch('/api/config');
      const data = await response.json();
      if (data.success && data.data) {
        setConfig(data.data);
        applyThemeToDocument(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch site config:', error);
    } finally {
      setLoading(false);
    }
  };

  return { config, loading };
}

function applyThemeToDocument(config: any) {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;

  if (config.theme === 'dark') {
    root.classList.add('dark');
  } else if (config.theme === 'light') {
    root.classList.remove('dark');
  } else if (config.theme === 'auto') {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }

  document.title = config.siteName;
}

