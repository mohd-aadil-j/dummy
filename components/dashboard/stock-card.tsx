"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"
import type { Stock } from "@/contexts/stock-context"

interface StockCardProps {
  stock: Stock
}

export function StockCard({ stock }: StockCardProps) {
  const isPositive = stock.change >= 0

  return (
    <Card className="bg-card border-border shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div>
            <CardTitle className="text-xl sm:text-2xl font-montserrat font-bold text-foreground">
              {stock.symbol}
            </CardTitle>
            <p className="text-sm sm:text-base text-muted-foreground">{stock.name}</p>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-2xl sm:text-3xl font-montserrat font-black text-foreground">
              ${stock.price.toFixed(2)}
            </div>
            <div className={`flex items-center sm:justify-end ${isPositive ? "text-green-600" : "text-red-600"}`}>
              {isPositive ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
              <span className="font-medium text-sm sm:text-base">
                {isPositive ? "+" : ""}
                {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Price Chart Placeholder */}
        <div className="bg-muted rounded-lg p-4 sm:p-6 mb-4">
          <div className="flex items-center justify-center h-24 sm:h-32">
            <div className="text-center">
              <Activity className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-xs sm:text-sm text-muted-foreground">Price chart coming soon</p>
            </div>
          </div>
        </div>

        {/* Stock Stats - Better mobile grid layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="text-center p-2 sm:p-3 bg-muted rounded-lg">
            <div className="text-xs sm:text-sm text-muted-foreground">Day High</div>
            <div className="font-medium text-sm sm:text-base text-foreground">
              ${(stock.price + Math.abs(stock.change) * 1.5).toFixed(2)}
            </div>
          </div>
          <div className="text-center p-2 sm:p-3 bg-muted rounded-lg">
            <div className="text-xs sm:text-sm text-muted-foreground">Day Low</div>
            <div className="font-medium text-sm sm:text-base text-foreground">
              ${(stock.price - Math.abs(stock.change) * 1.2).toFixed(2)}
            </div>
          </div>
          <div className="text-center p-2 sm:p-3 bg-muted rounded-lg">
            <div className="text-xs sm:text-sm text-muted-foreground">Volume</div>
            <div className="font-medium text-sm sm:text-base text-foreground">
              {(Math.random() * 10 + 1).toFixed(1)}M
            </div>
          </div>
          <div className="text-center p-2 sm:p-3 bg-muted rounded-lg">
            <div className="text-xs sm:text-sm text-muted-foreground">Market Cap</div>
            <div className="font-medium text-sm sm:text-base text-foreground">
              ${(Math.random() * 1000 + 100).toFixed(0)}B
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
