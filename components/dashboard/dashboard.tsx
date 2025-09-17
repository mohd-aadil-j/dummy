"use client"

import { useState } from "react"
import { StockSearch } from "./stock-search"
import { StockCard } from "./stock-card"
import { PortfolioOverview } from "./portfolio-overview"
import { QuickActions } from "./quick-actions"
import { MarketOverview } from "./market-overview"
import { useStock } from "@/contexts/stock-context"
import { motion } from "framer-motion"

export function Dashboard() {
  const { stocks } = useStock()
  const [selectedStock, setSelectedStock] = useState(stocks[0])

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-montserrat font-black text-foreground mb-2">Trading Dashboard</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Monitor markets, manage your portfolio, and execute trades
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mb-6 sm:mb-8"
        >
          <StockSearch onStockSelect={setSelectedStock} />
        </motion.div>

        {/* Main Grid - Enhanced mobile responsiveness with better card stacking */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Selected Stock Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="lg:col-span-2 order-1"
          >
            <StockCard stock={selectedStock} />
          </motion.div>

          {/* Quick Actions - Reordered for better mobile flow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="order-2 lg:order-2"
          >
            <QuickActions selectedStock={selectedStock} />
          </motion.div>
        </div>

        {/* Portfolio and Market Overview - Better mobile stacking */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="order-1"
          >
            <PortfolioOverview />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="order-2"
          >
            <MarketOverview stocks={stocks} onStockSelect={setSelectedStock} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
