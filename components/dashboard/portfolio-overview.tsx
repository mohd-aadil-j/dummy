"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useStock } from "@/contexts/stock-context"
import { PieChart, TrendingUp, TrendingDown, Wallet } from "lucide-react"
import { motion } from "framer-motion"

export function PortfolioOverview() {
  const { portfolio } = useStock()

  const totalValue = portfolio.reduce((sum, position) => sum + position.quantity * position.currentPrice, 0)
  const totalCost = portfolio.reduce((sum, position) => sum + position.quantity * position.avgPrice, 0)
  const totalGainLoss = totalValue - totalCost
  const totalGainLossPercent = totalCost > 0 ? (totalGainLoss / totalCost) * 100 : 0

  return (
    <Card className="bg-card border-border shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-foreground">
          <Wallet className="h-5 w-5" />
          <span>Portfolio Overview</span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {portfolio.length > 0 ? (
          <div className="space-y-4">
            {/* Portfolio Summary */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground">Total Value</div>
                <div className="text-xl font-montserrat font-bold text-foreground">${totalValue.toFixed(2)}</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground">Total Gain/Loss</div>
                <div
                  className={`text-xl font-montserrat font-bold flex items-center ${
                    totalGainLoss >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {totalGainLoss >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {totalGainLoss >= 0 ? "+" : ""}${totalGainLoss.toFixed(2)}
                </div>
                <div className={`text-sm ${totalGainLoss >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {totalGainLoss >= 0 ? "+" : ""}
                  {totalGainLossPercent.toFixed(2)}%
                </div>
              </div>
            </div>

            {/* Holdings List */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-foreground">Holdings</div>
              {portfolio.map((position) => {
                const gainLoss = (position.currentPrice - position.avgPrice) * position.quantity
                const gainLossPercent = ((position.currentPrice - position.avgPrice) / position.avgPrice) * 100

                return (
                  <motion.div
                    key={position.symbol}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div>
                      <div className="font-medium text-foreground">{position.symbol}</div>
                      <div className="text-sm text-muted-foreground">
                        {position.quantity} shares @ ${position.avgPrice.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-foreground">
                        ${(position.quantity * position.currentPrice).toFixed(2)}
                      </div>
                      <div className={`text-sm ${gainLoss >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {gainLoss >= 0 ? "+" : ""}${gainLoss.toFixed(2)} ({gainLoss >= 0 ? "+" : ""}
                        {gainLossPercent.toFixed(2)}%)
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <PieChart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No positions yet</p>
            <p className="text-sm text-muted-foreground">Start trading to build your portfolio</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
