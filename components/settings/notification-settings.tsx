"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Mail, Smartphone, TrendingUp, AlertCircle } from "lucide-react"

interface NotificationSettingsData {
  emailNotifications: boolean
  pushNotifications: boolean
  smsNotifications: boolean
  priceAlerts: boolean
  tradeConfirmations: boolean
  marketNews: boolean
  portfolioUpdates: boolean
  frequency: "immediate" | "hourly" | "daily"
}

export function NotificationSettings() {
  const [settings, setSettings] = useState<NotificationSettingsData>({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    priceAlerts: true,
    tradeConfirmations: true,
    marketNews: false,
    portfolioUpdates: true,
    frequency: "immediate",
  })

  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem("notificationSettings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  const handleSave = async () => {
    setIsSaving(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    localStorage.setItem("notificationSettings", JSON.stringify(settings))
    setIsSaving(false)
    setSaved(true)

    setTimeout(() => setSaved(false), 2000)
  }

  const updateSetting = (key: keyof NotificationSettingsData, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const notificationTypes = [
    {
      key: "priceAlerts" as const,
      title: "Price Alerts",
      description: "Get notified when stocks reach your target prices",
      icon: TrendingUp,
    },
    {
      key: "tradeConfirmations" as const,
      title: "Trade Confirmations",
      description: "Receive confirmations for all buy and sell orders",
      icon: AlertCircle,
    },
    {
      key: "portfolioUpdates" as const,
      title: "Portfolio Updates",
      description: "Daily summaries of your portfolio performance",
      icon: Bell,
    },
    {
      key: "marketNews" as const,
      title: "Market News",
      description: "Breaking news and market updates",
      icon: Bell,
    },
  ]

  return (
    <Card className="bg-card border-border shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-foreground">
          <Bell className="h-5 w-5" />
          <span>Notification Settings</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Notification Channels */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Notification Channels</h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <Label htmlFor="email-notifications" className="text-base font-medium text-foreground">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
              </div>
              <Switch
                id="email-notifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => updateSetting("emailNotifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <Smartphone className="h-5 w-5 text-primary" />
                <div>
                  <Label htmlFor="push-notifications" className="text-base font-medium text-foreground">
                    Push Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
                </div>
              </div>
              <Switch
                id="push-notifications"
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => updateSetting("pushNotifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <Smartphone className="h-5 w-5 text-primary" />
                <div>
                  <Label htmlFor="sms-notifications" className="text-base font-medium text-foreground">
                    SMS Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via text message</p>
                </div>
              </div>
              <Switch
                id="sms-notifications"
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => updateSetting("smsNotifications", checked)}
              />
            </div>
          </div>
        </div>

        {/* Notification Types */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Notification Types</h3>

          <div className="space-y-3">
            {notificationTypes.map((type) => (
              <div key={type.key} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <type.icon className="h-5 w-5 text-primary" />
                  <div>
                    <Label htmlFor={type.key} className="text-base font-medium text-foreground">
                      {type.title}
                    </Label>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                  </div>
                </div>
                <Switch
                  id={type.key}
                  checked={settings[type.key]}
                  onCheckedChange={(checked) => updateSetting(type.key, checked)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Notification Frequency */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Notification Frequency</h3>

          <div className="space-y-2">
            <Label htmlFor="frequency" className="text-sm font-medium text-foreground">
              How often would you like to receive notifications?
            </Label>
            <Select value={settings.frequency} onValueChange={(value: any) => updateSetting("frequency", value)}>
              <SelectTrigger className="bg-input border-border focus:ring-primary focus:border-primary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Immediate</SelectItem>
                <SelectItem value="hourly">Hourly Summary</SelectItem>
                <SelectItem value="daily">Daily Summary</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4 border-t border-border">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className={`${saved ? "bg-green-600 hover:bg-green-700" : "bg-primary hover:bg-primary/90"} text-white`}
          >
            {isSaving ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Saving...</span>
              </div>
            ) : saved ? (
              "Saved!"
            ) : (
              "Save Settings"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
