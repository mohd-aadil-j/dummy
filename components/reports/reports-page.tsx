"use client"

import { ProfitLossChart } from "./profit-loss-chart"
import { ActivityLog } from "./activity-log"
import { ReportsSummary } from "./reports-summary"
import { motion } from "framer-motion"

export function ReportsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-montserrat font-black text-foreground mb-2">Reports & Analytics</h1>
          <p className="text-muted-foreground">Track your trading performance and analyze your activity</p>
        </motion.div>

        {/* Reports Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mb-8"
        >
          <ReportsSummary />
        </motion.div>

        {/* Profit/Loss Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mb-8"
        >
          <ProfitLossChart />
        </motion.div>

        {/* Activity Log */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <ActivityLog />
        </motion.div>
      </div>
    </div>
  )
}
