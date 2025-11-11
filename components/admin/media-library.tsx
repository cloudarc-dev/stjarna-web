"use client"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Upload, Trash2, Copy, Check, Folder, Image as ImageIcon, File, Search, X } from "lucide-react"

interface MediaFile {
  name: string
  id: string
  created_at: string
  updated_at: string
  last_accessed_at: string
  metadata: {
    size: number
    mimetype: string
  }
  publicUrl: string
}

export function MediaLibrary() {
  const [files, setFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selectedFolder, setSelectedFolder] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState("")
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchFiles()
  }, [selectedFolder])

  const fetchFiles = async () => {
    try {
      setLoading(true)
      const url = selectedFolder
        ? `/api/admin/media?folder=${selectedFolder}`
        : '/api/admin/media'

      const response = await fetch(url)
      if (!response.ok) throw new Error('Failed to fetch files')
      const data = await response.json()
      setFiles(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      const formData = new FormData()
      formData.append('file', file)
      if (selectedFolder) {
        formData.append('folder', selectedFolder)
      }

      const response = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Failed to upload file')

      await fetchFiles()
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to upload')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (filePath: string) => {
    if (!confirm('Är du säker på att du vill ta bort denna fil?')) return

    try {
      const response = await fetch(`/api/admin/media?path=${encodeURIComponent(filePath)}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete file')

      await fetchFiles()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete')
    }
  }

  const copyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
      setCopiedUrl(url)
      setTimeout(() => setCopiedUrl(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const getFileIcon = (mimetype: string) => {
    if (mimetype.startsWith('image/')) return <ImageIcon className="w-5 h-5" />
    return <File className="w-5 h-5" />
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Mediabibliotek</h2>
            <p className="text-muted-foreground mt-1">
              Hantera bilder och filer ({filteredFiles.length} filer)
            </p>
          </div>
        <div className="flex gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleUpload}
            className="hidden"
            accept="image/*,application/pdf"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            {uploading ? 'Laddar upp...' : 'Ladda upp fil'}
          </button>
        </div>
      </div>

      {/* Folder Filter & Search */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Sök filer..."
            className="w-full pl-10 pr-10 py-2 rounded-lg border border-border bg-background"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>
        <select
          value={selectedFolder}
          onChange={(e) => setSelectedFolder(e.target.value)}
          className="px-4 py-2 rounded-lg border border-border bg-background"
        >
          <option value="">Alla mappar</option>
          <option value="images">Bilder</option>
          <option value="documents">Dokument</option>
          <option value="logos">Logotyper</option>
        </select>
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredFiles.map((file) => (
          <motion.div
            key={file.id}
            layout
            className="bg-card border border-border rounded-xl overflow-hidden group"
          >
            {/* File Preview */}
            <div className="aspect-square bg-accent flex items-center justify-center relative overflow-hidden">
              {file.metadata.mimetype.startsWith('image/') ? (
                <img
                  src={file.publicUrl}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-muted-foreground">
                  {getFileIcon(file.metadata.mimetype)}
                </div>
              )}

              {/* Hover Actions */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => copyUrl(file.publicUrl)}
                  className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  title="Kopiera URL"
                >
                  {copiedUrl === file.publicUrl ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => handleDelete(file.name)}
                  className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                  title="Ta bort"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* File Info */}
            <div className="p-3">
              <p className="text-sm font-medium truncate" title={file.name}>
                {file.name}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatFileSize(file.metadata.size)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

        {filteredFiles.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Upload className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Inga filer än. Ladda upp en fil för att komma igång.</p>
          </div>
        )}
      </div>
    </div>
  )
}
