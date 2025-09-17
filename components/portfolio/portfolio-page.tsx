"use client"

import { PortfolioTable } from "./portfolio-table"
import { PortfolioSummary } from "./portfolio-summary"
import { PortfolioChart } from "./portfolio-chart"
import { motion } from "framer-motion"

export function PortfolioPage() {
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
          <h1 className="text-3xl font-montserrat font-black text-foreground mb-2">Portfolio</h1>
          <p className="text-muted-foreground">Track your investments and performance</p>
        </motion.div>

        {/* Portfolio Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mb-8"
        >
          <PortfolioSummary />
        </motion.div>

        {/* Portfolio Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mb-8"
        >
          <PortfolioChart />
        </motion.div>

        {/* Portfolio Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <PortfolioTable />
        </motion.div>
      </div>
    </div>
  )
}
