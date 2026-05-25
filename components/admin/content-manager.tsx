'use client'

import { useState } from 'react'
import useSWR from 'swr'
import { Plus, Pencil, Trash2, Eye, EyeOff, Search, X } from 'lucide-react'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export interface Field {
  key: string
  label: string
  type: 'text' | 'textarea' | 'url' | 'toggle' | 'number' | 'date' | 'select'
  options?: { value: string; label: string }[]
  required?: boolean
  placeholder?: string
  span?: 'full' | 'half'
}

interface ContentManagerProps {
  title: string
  apiPath: string
  fields: Field[]
  displayField: string
  displayFieldHi?: string
  subtitle?: string
}

export default function ContentManager({
  title,
  apiPath,
  fields,
  displayField,
  displayFieldHi,
  subtitle,
}: ContentManagerProps) {
  const { data, mutate, isLoading } = useSWR<Record<string, unknown>[]>(apiPath, fetcher)
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null)
  const [creating, setCreating] = useState(false)
  const [search, setSearch] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const emptyForm: Record<string, unknown> = {}
  fields.forEach((f) => {
    emptyForm[f.key] = f.type === 'toggle' ? true : f.type === 'number' ? 0 : ''
  })

  const [form, setForm] = useState<Record<string, unknown>>(emptyForm)

  const openCreate = () => {
    setForm({ ...emptyForm })
    setEditing(null)
    setCreating(true)
  }

  const openEdit = (item: Record<string, unknown>) => {
    setForm({ ...item })
    setEditing(item)
    setCreating(true)
  }

  const closeForm = () => {
    setCreating(false)
    setEditing(null)
    setForm({ ...emptyForm })
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const method = editing ? 'PUT' : 'POST'
      const id = editing?.id as string | undefined
      const url = editing && id ? `${apiPath}/${id}` : apiPath
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error(await res.text())
      await mutate()
      closeForm()
    } catch (err) {
      alert(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${apiPath}/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error(await res.text())
      await mutate()
      setDeleteConfirm(null)
    } catch (err) {
      alert(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }

  const togglePublish = async (item: Record<string, unknown>) => {
  const publishKey = fields.find((f) => f.key === 'published' || f.key === 'active' || f.key === 'is_published' || f.key === 'is_active')?.key
    if (!publishKey) return
    await fetch(`${apiPath}/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...item, [publishKey]: !item[publishKey] }),
    })
    await mutate()
  }

  const filteredData = (data ?? []).filter((item) => {
    if (!search) return true
    const val = String(item[displayField] ?? '').toLowerCase()
    return val.includes(search.toLowerCase())
  })

    const publishKey = fields.find((f) => f.key === 'published' || f.key === 'active' || f.key === 'is_published' || f.key === 'is_active')?.key

  return (
    <div className="p-6 md:p-8 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">{title}</h1>
          {subtitle && <p className="text-[oklch(0.55_0.03_75)] text-sm mt-0.5">{subtitle}</p>}
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 bg-primary hover:bg-[oklch(0.55_0.19_44)] text-white font-semibold px-4 py-2.5 rounded-lg transition-all shadow-md text-sm"
        >
          <Plus className="w-4 h-4" /> Add New
        </button>
      </div>

      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(0.5_0.03_75)]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-full bg-[oklch(0.2_0.04_50)] border border-[oklch(0.28_0.04_50)] text-white rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all placeholder:text-[oklch(0.45_0.03_75)]"
        />
      </div>

      <div className="bg-[oklch(0.17_0.04_50)] border border-[oklch(0.25_0.04_50)] rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-[oklch(0.55_0.03_75)] text-sm">Loading...</div>
        ) : !filteredData.length ? (
          <div className="p-8 text-center">
            <p className="text-[oklch(0.55_0.03_75)] text-sm">No items found.</p>
            <button onClick={openCreate} className="text-primary text-sm hover:underline mt-2 inline-block">
              Create your first item
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[oklch(0.25_0.04_50)]">
                  <th className="text-left px-5 py-3 text-[oklch(0.55_0.03_75)] font-medium text-xs uppercase tracking-wider">Title</th>
                  {displayFieldHi && (
                    <th className="text-left px-5 py-3 text-[oklch(0.55_0.03_75)] font-medium text-xs uppercase tracking-wider hidden md:table-cell">Hindi Title</th>
                  )}
                  {publishKey && (
                    <th className="text-left px-5 py-3 text-[oklch(0.55_0.03_75)] font-medium text-xs uppercase tracking-wider">Status</th>
                  )}
                  <th className="text-right px-5 py-3 text-[oklch(0.55_0.03_75)] font-medium text-xs uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={String(item.id)} className="border-b border-[oklch(0.22_0.04_50)] last:border-0 hover:bg-[oklch(0.2_0.04_50)] transition-colors">
                    <td className="px-5 py-3.5 text-white font-medium max-w-xs">
                      <p className="truncate">{String(item[displayField] ?? '—')}</p>
                    </td>
                    {displayFieldHi && (
                      <td className="px-5 py-3.5 text-[oklch(0.65_0.03_75)] hidden md:table-cell max-w-xs">
                        <p className="truncate">{String(item[displayFieldHi] ?? '—')}</p>
                      </td>
                    )}
                    {publishKey && (
                      <td className="px-5 py-3.5">
                        <button
                          onClick={() => togglePublish(item)}
                          className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${
                            item[publishKey]
                              ? 'bg-[oklch(0.7_0.15_160)/0.15] text-[oklch(0.7_0.15_160)]'
                              : 'bg-[oklch(0.55_0.03_75)/0.1] text-[oklch(0.55_0.03_75)]'
                          }`}
                        >
                          {item[publishKey] ? (
                            <><Eye className="w-3 h-3" /> Published</>
                          ) : (
                            <><EyeOff className="w-3 h-3" /> Draft</>
                          )}
                        </button>
                      </td>
                    )}
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg text-[oklch(0.6_0.03_75)] hover:text-white hover:bg-[oklch(0.28_0.04_50)] transition-all" title="Edit">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        {deleteConfirm === String(item.id) ? (
                          <div className="flex items-center gap-1.5">
                            <button onClick={() => handleDelete(String(item.id))} className="text-xs font-medium text-[oklch(0.7_0.2_27)] hover:underline">Confirm</button>
                            <button onClick={() => setDeleteConfirm(null)} className="text-xs text-[oklch(0.55_0.03_75)] hover:text-white">Cancel</button>
                          </div>
                        ) : (
                          <button onClick={() => setDeleteConfirm(String(item.id))} className="p-1.5 rounded-lg text-[oklch(0.6_0.03_75)] hover:text-[oklch(0.7_0.2_27)] hover:bg-destructive/10 transition-all" title="Delete">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {creating && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-[oklch(0.2_0.04_50)] border border-[oklch(0.3_0.04_50)] rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-[oklch(0.28_0.04_50)] shrink-0">
              <h2 className="text-white font-serif font-semibold">{editing ? 'Edit Item' : 'Create New'}</h2>
              <button onClick={closeForm} className="text-[oklch(0.55_0.03_75)] hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 p-5">
              <div className="grid grid-cols-2 gap-4">
                {fields.map((field) => (
                  <div
                    key={field.key}
                    className={field.span === 'full' || field.type === 'textarea' ? 'col-span-2' : 'col-span-2 md:col-span-1'}
                  >
                    <label className="block text-[oklch(0.75_0.03_75)] text-sm font-medium mb-1.5">
                      {field.label}{field.required && <span className="text-primary ml-1">*</span>}
                    </label>

                    {field.type === 'textarea' ? (
                      <textarea
                        value={String(form[field.key] ?? '')}
                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                        rows={4}
                        placeholder={field.placeholder}
                        className="w-full bg-[oklch(0.15_0.03_50)] border border-[oklch(0.3_0.04_50)] text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all resize-none placeholder:text-[oklch(0.4_0.03_75)]"
                      />
                    ) : field.type === 'toggle' ? (
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, [field.key]: !form[field.key] })}
                        className={`relative w-12 h-6 rounded-full transition-colors ${form[field.key] ? 'bg-primary' : 'bg-[oklch(0.35_0.04_50)]'}`}
                      >
                        <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${form[field.key] ? 'translate-x-6' : ''}`} />
                      </button>
                    ) : field.type === 'select' ? (
                      <select
                        value={String(form[field.key] ?? '')}
                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                        className="w-full bg-[oklch(0.15_0.03_50)] border border-[oklch(0.3_0.04_50)] text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                      >
                        <option value="">Select...</option>
                        {field.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        value={String(form[field.key] ?? '')}
                        onChange={(e) => setForm({ ...form, [field.key]: field.type === 'number' ? Number(e.target.value) : e.target.value })}
                        placeholder={field.placeholder}
                        className="w-full bg-[oklch(0.15_0.03_50)] border border-[oklch(0.3_0.04_50)] text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all placeholder:text-[oklch(0.4_0.03_75)]"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 border-t border-[oklch(0.28_0.04_50)] flex justify-end gap-3 shrink-0">
              <button onClick={closeForm} className="px-5 py-2.5 rounded-lg border border-[oklch(0.35_0.04_50)] text-[oklch(0.7_0.03_75)] hover:text-white hover:border-[oklch(0.45_0.04_50)] text-sm font-medium transition-all">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2.5 rounded-lg bg-primary hover:bg-[oklch(0.55_0.19_44)] text-white text-sm font-semibold flex items-center gap-2 transition-all disabled:opacity-60"
              >
                {saving && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                {editing ? 'Save Changes' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
