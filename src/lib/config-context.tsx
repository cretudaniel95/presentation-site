'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { SiteConfig } from '@/types';

interface ConfigContextType {
  config: SiteConfig | null;
  loading: boolean;
  refreshConfig: () => Promise<void>;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshConfig = async () => {
    try {
      const response = await fetch('/api/config');
      const data = await response.json();
      if (data.success && data.data) {
        setConfig(data.data);
        applyTheme(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch config:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshConfig();
  }, []);

  return (
    <ConfigContext.Provider value={{ config, loading, refreshConfig }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
}

function applyTheme(config: SiteConfig) {
  // Apply theme preference
  const root = document.documentElement;

  if (config.theme === 'dark') {
    root.classList.add('dark');
  } else if (config.theme === 'light') {
    root.classList.remove('dark');
  } else if (config.theme === 'auto') {
    // Auto detect based on system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }

  // Update document title and meta tags
  document.title = config.siteName;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription && config.description) {
    metaDescription.setAttribute('content', config.description);
  }
}

