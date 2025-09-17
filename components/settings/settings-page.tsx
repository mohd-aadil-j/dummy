"use client"

import { TradingSettings } from "./trading-settings"
import { NotificationSettings } from "./notification-settings"
import { AccountSettings } from "./account-settings"
import { motion } from "framer-motion"

export function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-montserrat font-black text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your trading preferences and account settings</p>
        </motion.div>

        <div className="space-y-8">
          {/* Trading Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <TradingSettings />
          </motion.div>

          {/* Notification Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <NotificationSettings />
          </motion.div>

          {/* Account Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <AccountSettings />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
