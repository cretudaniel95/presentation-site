-- Add new section-specific color and content fields to SiteConfig

-- Header/Navigation Section
ALTER TABLE site_configs ADD COLUMN IF NOT EXISTS header_bg_color VARCHAR(7) DEFAULT '#ffffff';
ALTER TABLE site_configs ADD COLUMN IF NOT EXISTS header_text_color VARCHAR(7) DEFAULT '#1e293b';
ALTER TABLE site_configs ADD COLUMN IF NOT EXISTS header_logo_url TEXT;

-- Hero Section
ALTER TABLE site_configs ADD COLUMN IF NOT EXISTS hero_bg_color VARCHAR(7);
ALTER TABLE site_configs ADD COLUMN IF NOT EXISTS hero_title_color VARCHAR(7) DEFAULT '#1e293b';
ALTER TABLE site_configs ADD COLUMN IF NOT EXISTS hero_text_color VARCHAR(7) DEFAULT '#64748b';
ALTER TABLE site_configs ADD COLUMN IF NOT EXISTS hero_button_bg_color VARCHAR(7) DEFAULT '#9333ea';
ALTER TABLE site_configs ADD COLUMN IF NOT EXISTS hero_button_text_color VARCHAR(7) DEFAULT '#ffffff';
ALTER TABLE site_configs ADD COLUMN IF NOT EXISTS hero_button_style VARCHAR(20) DEFAULT 'filled';

-- About Section
ALTER TABLE site_configs ADD COLUMN IF NOT EXISTS about_bg_color VARCHAR(7) DEFAULT '#ffffff';
ALTER TABLE site_configs ADD COLUMN IF NOT EXISTS about_title_color VARCHAR(7) DEFAULT '#1e293b';
ALTER TABLE site_configs ADD COLUMN IF NOT EXISTS about_text_color VARCHAR(7) DEFAULT '#64748b';
ALTER TABLE site_configs ADD COLUMN IF NOT EXISTS about_bg_image TEXT;

-- Gallery Section
ALTER TABLE site_configs ADD COLUMN IF NOT EXISTS gallery_bg_color VARCHAR(7) DEFAULT '#f8fafc';
ALTER TABLE site_configs ADD COLUMN IF NOT EXISTS gallery_title_color VARCHAR(7) DEFAULT '#1e293b';
ALTER TABLE site_configs ADD COLUMN IF NOT EXISTS gallery_text_color VARCHAR(7) DEFAULT '#64748b';
ALTER TABLE site_configs ADD COLUMN IF NOT EXISTS gallery_card_bg_color VARCHAR(7) DEFAULT '#ffffff';

-- Contact Section
ALTER TABLE site_configs ADD COLUMN IF NOT EXISTS contact_bg_color VARCHAR(7) DEFAULT '#ffffff';
ALTER TABLE site_configs ADD COLUMN IF NOT EXISTS contact_title_color VARCHAR(7) DEFAULT '#1e293b';
ALTER TABLE site_configs ADD COLUMN IF NOT EXISTS contact_text_color VARCHAR(7) DEFAULT '#64748b';
ALTER TABLE site_configs ADD COLUMN IF NOT EXISTS contact_bg_image TEXT;
ALTER TABLE site_configs ADD COLUMN IF NOT EXISTS contact_button_bg_color VARCHAR(7) DEFAULT '#9333ea';
ALTER TABLE site_configs ADD COLUMN IF NOT EXISTS contact_button_text_color VARCHAR(7) DEFAULT '#ffffff';

-- Footer Section
ALTER TABLE site_configs ADD COLUMN IF NOT EXISTS footer_bg_color VARCHAR(7) DEFAULT '#64748b';
ALTER TABLE site_configs ADD COLUMN IF NOT EXISTS footer_text_color VARCHAR(7) DEFAULT '#ffffff';

