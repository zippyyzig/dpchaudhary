'use client'

import ContentManager, { Field } from '@/components/admin/content-manager'

const fields: Field[] = [
  { key: 'title_en', label: 'Title (English)', type: 'text', required: true, placeholder: 'Post title in English', span: 'full' },
  { key: 'title_hi', label: 'Title (Hindi)', type: 'text', required: true, placeholder: 'पोस्ट शीर्षक हिंदी में', span: 'full' },
  { key: 'slug', label: 'Slug / URL Key', type: 'text', required: true, placeholder: 'post-url-slug' },
  { key: 'category', label: 'Post Type', type: 'select', options: [
    { value: 'update', label: 'Update' },
    { value: 'achievement', label: 'Achievement' },
    { value: 'initiative', label: 'Initiative' },
    { value: 'speech', label: 'Speech' },
  ]},
  { key: 'content_en', label: 'Content (English)', type: 'textarea', placeholder: 'Write post content in English...', span: 'full' },
  { key: 'content_hi', label: 'Content (Hindi)', type: 'textarea', placeholder: 'हिंदी में पोस्ट लिखें...', span: 'full' },
  { key: 'image_url', label: 'Image URL', type: 'url', placeholder: 'https://example.com/image.jpg', span: 'full' },
  { key: 'published_at', label: 'Publish Date', type: 'date' },
  { key: 'is_published', label: 'Published', type: 'toggle' },
]

export default function AdminPostsPage() {
  return (
    <ContentManager
      title="Posts"
      subtitle="Create and manage public posts, updates, and announcements"
      apiPath="/api/posts"
      fields={fields}
      displayField="title_en"
      displayFieldHi="title_hi"
    />
  )
}
