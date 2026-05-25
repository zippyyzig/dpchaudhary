'use client'

import ContentManager, { Field } from '@/components/admin/content-manager'

const fields: Field[] = [
  { key: 'title_en', label: 'Title (English)', type: 'text', required: true, placeholder: 'Banner headline in English', span: 'full' },
  { key: 'title_hi', label: 'Title (Hindi)', type: 'text', required: true, placeholder: 'बैनर शीर्षक हिंदी में', span: 'full' },
  { key: 'subtitle_en', label: 'Subtitle (English)', type: 'text', placeholder: 'Supporting text in English', span: 'full' },
  { key: 'subtitle_hi', label: 'Subtitle (Hindi)', type: 'text', placeholder: 'उपशीर्षक हिंदी में', span: 'full' },
  { key: 'image_url', label: 'Banner Image URL', type: 'url', required: true, placeholder: 'https://example.com/banner.jpg', span: 'full' },
  { key: 'link', label: 'CTA Link URL (optional)', type: 'url', placeholder: 'https://...', span: 'full' },
  { key: 'sort_order', label: 'Sort Order', type: 'number', placeholder: '1' },
  { key: 'is_active', label: 'Active', type: 'toggle' },
]

export default function AdminBannersPage() {
  return (
    <ContentManager
      title="Banners"
      subtitle="Manage homepage banner slides — use sort order to control display sequence"
      apiPath="/api/banners"
      fields={fields}
      displayField="title_en"
      displayFieldHi="title_hi"
    />
  )
}
