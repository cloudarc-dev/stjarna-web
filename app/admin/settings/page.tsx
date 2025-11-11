import { SiteSettings } from "@/components/admin/site-settings"

export const metadata = {
  title: 'Webbplatsinställningar | Admin',
  description: 'Hantera företagsinformation och inställningar',
}

export default function SettingsPage() {
  return <SiteSettings />
}
