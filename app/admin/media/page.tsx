import { MediaLibrary } from "@/components/admin/media-library"

export const metadata = {
  title: 'Mediabibliotek | Admin',
  description: 'Hantera bilder och filer för webbplatsen',
}

export default function MediaPage() {
  return <MediaLibrary />
}
