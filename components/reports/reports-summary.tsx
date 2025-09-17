"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useStock } from "@/contexts/stock-context"
import { TrendingUp, TrendingDown, Activity, Calendar } from "lucide-react"
import { motion } from "framer-motion"

export function ReportsSummary() {
  const { portfolio, transactions } = useStock()

  const totalValue = portfolio.reduce((sum, position) => sum + position.quantity * position.currentPrice, 0)
  const totalCost = portfolio.reduce((sum, position) => sum + position.quantity * position.avgPrice, 0)
  const totalGainLoss = totalValue - totalCost

  const totalBuyTransactions = transactions.filter((t) => t.type === "buy").length
  const totalSellTransactions = transactions.filter((t) => t.type === "sell").length
  const totalTrades = totalBuyTransactions + totalSellTransactions

  const totalVolume = transactions.reduce((sum, t) => sum + t.quantity * t.price, 0)

  const summaryCards = [
    {
      title: "Total P&L",
      value: `${totalGainLoss >= 0 ? "+" : ""}$${totalGainLoss.toFixed(2)}`,
      icon: totalGainLoss >= 0 ? TrendingUp : TrendingDown,
      color: totalGainLoss >= 0 ? "text-green-600" : "text-red-600",
      bgColor: totalGainLoss >= 0 ? "bg-green-100" : "bg-red-100",
      subtitle: `${((totalGainLoss / (totalCost || 1)) * 100).toFixed(2)}% return`,
    },
    {
      title: "Total Trades",
      value: totalTrades.toString(),
      icon: Activity,
      color: "text-primary",
      bgColor: "bg-primary/10",
      subtitle: `${totalBuyTransactions} buys, ${totalSellTransactions} sells`,
    },
    {
      title: "Trading Volume",
      value: `$${totalVolume.toFixed(0)}`,
      icon: TrendingUp,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      subtitle: "Total transaction value",
    },
    {
      title: "Active Days",
      value: new Set(transactions.map((t) => t.timestamp.toDateString())).size.toString(),
      icon: Calendar,
      color: "text-muted-foreground",
      bgColor: "bg-muted",
      subtitle: "Days with trading activity",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {summaryCards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="bg-card border-border shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{card.title}</p>
                  <p className={`text-2xl font-montserrat font-bold ${card.color}`}>{card.value}</p>
                  <p className={`text-sm ${card.color}`}>{card.subtitle}</p>
                </div>
                <div className={`p-3 rounded-full ${card.bgColor}`}>
                  <card.icon className={`h-6 w-6 ${card.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
