'use client'

import ContentManager, { Field } from '@/components/admin/content-manager'

const fields: Field[] = [
  { key: 'title_en', label: 'Title (English)', type: 'text', required: true, placeholder: 'Video title in English', span: 'full' },
  { key: 'title_hi', label: 'Title (Hindi)', type: 'text', required: true, placeholder: 'वीडियो शीर्षक हिंदी में', span: 'full' },
  { key: 'youtube_url', label: 'YouTube URL', type: 'url', required: true, placeholder: 'https://www.youtube.com/watch?v=...', span: 'full' },
  { key: 'thumbnail_url', label: 'Custom Thumbnail URL (optional)', type: 'url', placeholder: 'Leave blank to use YouTube thumbnail', span: 'full' },
  { key: 'description_en', label: 'Description (English)', type: 'textarea', placeholder: 'Brief description of the video...', span: 'full' },
  { key: 'description_hi', label: 'Description (Hindi)', type: 'textarea', placeholder: 'वीडियो का संक्षिप्त विवरण...', span: 'full' },
  { key: 'published_at', label: 'Publish Date', type: 'date' },
  { key: 'is_published', label: 'Published', type: 'toggle' },
]

export default function AdminVideosPage() {
  return (
    <ContentManager
      title="Videos"
      subtitle="Manage YouTube video links and descriptions"
      apiPath="/api/videos"
      fields={fields}
      displayField="title_en"
      displayFieldHi="title_hi"
    />
  )
}
