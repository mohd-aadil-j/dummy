"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, TrendingDown, DollarSign } from "lucide-react"
import { TradeModal } from "./trade-modal"
import type { Stock } from "@/contexts/stock-context"

interface QuickActionsProps {
  selectedStock: Stock
}

export function QuickActions({ selectedStock }: QuickActionsProps) {
  const [showBuyModal, setShowBuyModal] = useState(false)
  const [showSellModal, setShowSellModal] = useState(false)

  return (
    <>
      <Card className="bg-card border-border shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-foreground">
            <DollarSign className="h-5 w-5" />
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Current Stock Info */}
          <div className="p-3 bg-muted rounded-lg">
            <div className="text-sm text-muted-foreground">Selected Stock</div>
            <div className="font-medium text-foreground">
              {selectedStock.symbol} - ${selectedStock.price.toFixed(2)}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button onClick={() => setShowBuyModal(true)} className="w-full bg-green-600 hover:bg-green-700 text-white">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Buy {selectedStock.symbol}
            </Button>

            <Button
              onClick={() => setShowSellModal(true)}
              variant="outline"
              className="w-full border-red-600 text-red-600 hover:bg-red-50"
            >
              <TrendingDown className="h-4 w-4 mr-2" />
              Sell {selectedStock.symbol}
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="pt-4 border-t border-border">
            <div className="text-sm text-muted-foreground mb-2">Today's Performance</div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Change:</span>
              <span className={`text-sm font-medium ${selectedStock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                {selectedStock.change >= 0 ? "+" : ""}
                {selectedStock.change.toFixed(2)} ({selectedStock.changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trade Modals */}
      <TradeModal isOpen={showBuyModal} onClose={() => setShowBuyModal(false)} stock={selectedStock} type="buy" />

      <TradeModal isOpen={showSellModal} onClose={() => setShowSellModal(false)} stock={selectedStock} type="sell" />
    </>
  )
}
