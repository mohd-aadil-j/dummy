"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react"
import { motion } from "framer-motion"
import type { Stock } from "@/contexts/stock-context"

interface MarketOverviewProps {
  stocks: Stock[]
  onStockSelect: (stock: Stock) => void
}

export function MarketOverview({ stocks, onStockSelect }: MarketOverviewProps) {
  return (
    <Card className="bg-card border-border shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-foreground">
          <BarChart3 className="h-5 w-5" />
          <span>Market Overview</span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {stocks.map((stock, index) => (
            <motion.div
              key={stock.symbol}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Button
                variant="ghost"
                onClick={() => onStockSelect(stock)}
                className="w-full p-3 h-auto justify-between hover:bg-muted"
              >
                <div className="text-left">
                  <div className="font-medium text-foreground">{stock.symbol}</div>
                  <div className="text-sm text-muted-foreground">{stock.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-foreground">${stock.price.toFixed(2)}</div>
                  <div className={`text-sm flex items-center ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {stock.change >= 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {stock.change >= 0 ? "+" : ""}
                    {stock.changePercent.toFixed(2)}%
                  </div>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
