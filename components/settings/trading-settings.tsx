"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Bot, DollarSign, AlertTriangle } from "lucide-react"

interface TradingSettingsData {
  autoTradeEnabled: boolean
  stopLossPercentage: number
  takeProfitPercentage: number
  maxDailyLoss: number
  riskLevel: "conservative" | "moderate" | "aggressive"
  confirmTrades: boolean
}

export function TradingSettings() {
  const [settings, setSettings] = useState<TradingSettingsData>({
    autoTradeEnabled: false,
    stopLossPercentage: 5,
    takeProfitPercentage: 10,
    maxDailyLoss: 1000,
    riskLevel: "moderate",
    confirmTrades: true,
  })

  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem("tradingSettings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  const handleSave = async () => {
    setIsSaving(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    localStorage.setItem("tradingSettings", JSON.stringify(settings))
    setIsSaving(false)
    setSaved(true)

    setTimeout(() => setSaved(false), 2000)
  }

  const updateSetting = (key: keyof TradingSettingsData, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <Card className="bg-card border-border shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-foreground">
          <Settings className="h-5 w-5" />
          <span>Trading Settings</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Auto-Trade Toggle */}
        <div className="flex items-center justify-between p-3 sm:p-4 bg-muted rounded-lg">
          <div className="flex items-start sm:items-center space-x-3">
            <Bot className="h-5 w-5 text-primary mt-0.5 sm:mt-0" />
            <div className="flex-1">
              <Label htmlFor="auto-trade" className="text-sm sm:text-base font-medium text-foreground">
                Enable Auto-Trading
              </Label>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Automatically execute trades based on your criteria
              </p>
            </div>
          </div>
          <Switch
            id="auto-trade"
            checked={settings.autoTradeEnabled}
            onCheckedChange={(checked) => updateSetting("autoTradeEnabled", checked)}
          />
        </div>

        {/* Risk Management */}
        <div className="space-y-4">
          <h3 className="text-base sm:text-lg font-medium text-foreground flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>Risk Management</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stop-loss" className="text-sm font-medium text-foreground">
                Stop Loss Percentage
              </Label>
              <div className="relative">
                <Input
                  id="stop-loss"
                  type="number"
                  value={settings.stopLossPercentage}
                  onChange={(e) => updateSetting("stopLossPercentage", Number(e.target.value))}
                  className="bg-input border-border focus:ring-primary focus:border-primary pr-8"
                  min="1"
                  max="50"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">%</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="take-profit" className="text-sm font-medium text-foreground">
                Take Profit Percentage
              </Label>
              <div className="relative">
                <Input
                  id="take-profit"
                  type="number"
                  value={settings.takeProfitPercentage}
                  onChange={(e) => updateSetting("takeProfitPercentage", Number(e.target.value))}
                  className="bg-input border-border focus:ring-primary focus:border-primary pr-8"
                  min="1"
                  max="100"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="max-loss" className="text-sm font-medium text-foreground">
                Max Daily Loss
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="max-loss"
                  type="number"
                  value={settings.maxDailyLoss}
                  onChange={(e) => updateSetting("maxDailyLoss", Number(e.target.value))}
                  className="pl-10 bg-input border-border focus:ring-primary focus:border-primary"
                  min="100"
                  step="100"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="risk-level" className="text-sm font-medium text-foreground">
                Risk Level
              </Label>
              <Select value={settings.riskLevel} onValueChange={(value: any) => updateSetting("riskLevel", value)}>
                <SelectTrigger className="bg-input border-border focus:ring-primary focus:border-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conservative">Conservative</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="aggressive">Aggressive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Trade Confirmation */}
        <div className="flex items-center justify-between p-3 sm:p-4 bg-muted rounded-lg">
          <div className="flex-1">
            <Label htmlFor="confirm-trades" className="text-sm sm:text-base font-medium text-foreground">
              Require Trade Confirmation
            </Label>
            <p className="text-xs sm:text-sm text-muted-foreground">Show confirmation dialog before executing trades</p>
          </div>
          <Switch
            id="confirm-trades"
            checked={settings.confirmTrades}
            onCheckedChange={(checked) => updateSetting("confirmTrades", checked)}
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4 border-t border-border">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className={`w-full sm:w-auto ${saved ? "bg-green-600 hover:bg-green-700" : "bg-primary hover:bg-primary/90"} text-white`}
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
