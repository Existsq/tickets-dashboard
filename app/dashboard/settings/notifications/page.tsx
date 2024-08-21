import { Separator } from "@/components/ui/separator"
import { NotificationsForm } from "./notifications-form"

export default function SettingsNotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Email Notifications</h3>
        <p className="text-sm text-muted-foreground">
          Configure how you receive e-mail.
        </p>
      </div>
      <Separator />
      <NotificationsForm />
    </div>
  )
}
