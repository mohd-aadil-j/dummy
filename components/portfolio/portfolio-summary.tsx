"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useStock } from "@/contexts/stock-context"
import { TrendingUp, TrendingDown, DollarSign, PieChart, Target } from "lucide-react"
import { motion } from "framer-motion"

export function PortfolioSummary() {
  const { portfolio } = useStock()

  const totalValue = portfolio.reduce((sum, position) => sum + position.quantity * position.currentPrice, 0)
  const totalCost = portfolio.reduce((sum, position) => sum + position.quantity * position.avgPrice, 0)
  const totalGainLoss = totalValue - totalCost
  const totalGainLossPercent = totalCost > 0 ? (totalGainLoss / totalCost) * 100 : 0

  const summaryCards = [
    {
      title: "Total Value",
      value: `$${totalValue.toFixed(2)}`,
      icon: DollarSign,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Total Gain/Loss",
      value: `${totalGainLoss >= 0 ? "+" : ""}$${totalGainLoss.toFixed(2)}`,
      icon: totalGainLoss >= 0 ? TrendingUp : TrendingDown,
      color: totalGainLoss >= 0 ? "text-green-600" : "text-red-600",
      bgColor: totalGainLoss >= 0 ? "bg-green-100" : "bg-red-100",
      subtitle: `${totalGainLoss >= 0 ? "+" : ""}${totalGainLossPercent.toFixed(2)}%`,
    },
    {
      title: "Total Cost",
      value: `$${totalCost.toFixed(2)}`,
      icon: Target,
      color: "text-muted-foreground",
      bgColor: "bg-muted",
    },
    {
      title: "Positions",
      value: portfolio.length.toString(),
      icon: PieChart,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
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
                  {card.subtitle && <p className={`text-sm ${card.color}`}>{card.subtitle}</p>}
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
