import { EmailLogViewer } from "@/components/admin/email-log-viewer"

export const metadata = {
  title: 'Kontaktförfrågningar | Admin',
  description: 'Hantera inkomna kontaktförfrågningar',
}

export default function EmailLogPage() {
  return <EmailLogViewer />
}
