-- Banners table
CREATE TABLE IF NOT EXISTS public.banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT NOT NULL,
  title_hi TEXT NOT NULL,
  subtitle_en TEXT,
  subtitle_hi TEXT,
  image_url TEXT NOT NULL,
  link TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active banners" ON public.banners
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Service role can manage banners" ON public.banners
  FOR ALL USING (TRUE) WITH CHECK (TRUE);

-- Posts table
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT NOT NULL,
  title_hi TEXT NOT NULL,
  content_en TEXT NOT NULL,
  content_hi TEXT NOT NULL,
  excerpt_en TEXT,
  excerpt_hi TEXT,
  image_url TEXT,
  slug TEXT UNIQUE NOT NULL,
  category TEXT DEFAULT 'general',
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published posts" ON public.posts
  FOR SELECT USING (is_published = TRUE);

CREATE POLICY "Service role can manage posts" ON public.posts
  FOR ALL USING (TRUE) WITH CHECK (TRUE);

-- News / Articles table
CREATE TABLE IF NOT EXISTS public.news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT NOT NULL,
  title_hi TEXT NOT NULL,
  content_en TEXT NOT NULL,
  content_hi TEXT NOT NULL,
  excerpt_en TEXT,
  excerpt_hi TEXT,
  image_url TEXT,
  slug TEXT UNIQUE NOT NULL,
  source TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published news" ON public.news
  FOR SELECT USING (is_published = TRUE);

CREATE POLICY "Service role can manage news" ON public.news
  FOR ALL USING (TRUE) WITH CHECK (TRUE);

-- Videos table
CREATE TABLE IF NOT EXISTS public.videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT NOT NULL,
  title_hi TEXT NOT NULL,
  description_en TEXT,
  description_hi TEXT,
  youtube_url TEXT NOT NULL,
  thumbnail_url TEXT,
  category TEXT DEFAULT 'general',
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published videos" ON public.videos
  FOR SELECT USING (is_published = TRUE);

CREATE POLICY "Service role can manage videos" ON public.videos
  FOR ALL USING (TRUE) WITH CHECK (TRUE);
