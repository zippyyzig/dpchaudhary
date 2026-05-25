'use client'

import ContentManager, { Field } from '@/components/admin/content-manager'

const fields: Field[] = [
  { key: 'title_en', label: 'Title (English)', type: 'text', required: true, placeholder: 'News article title', span: 'full' },
  { key: 'title_hi', label: 'Title (Hindi)', type: 'text', required: true, placeholder: 'समाचार शीर्षक', span: 'full' },
  { key: 'slug', label: 'Slug / URL Key', type: 'text', required: true, placeholder: 'news-article-slug' },
  { key: 'source', label: 'Source (optional)', type: 'text', placeholder: 'e.g. Times of India' },

  { key: 'content_en', label: 'Content (English)', type: 'textarea', placeholder: 'Write the full article in English...', span: 'full' },
  { key: 'content_hi', label: 'Content (Hindi)', type: 'textarea', placeholder: 'हिंदी में लेख लिखें...', span: 'full' },
  { key: 'image_url', label: 'Image URL', type: 'url', placeholder: 'https://example.com/image.jpg', span: 'full' },
  { key: 'published_at', label: 'Publish Date', type: 'date' },
  { key: 'is_published', label: 'Published', type: 'toggle' },
]

export default function AdminNewsPage() {
  return (
    <ContentManager
      title="News & Articles"
      subtitle="Manage bilingual news articles and blog posts"
      apiPath="/api/news"
      fields={fields}
      displayField="title_en"
      displayFieldHi="title_hi"
    />
  )
}
