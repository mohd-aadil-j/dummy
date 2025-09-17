"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useStock } from "@/contexts/stock-context"
import { TrendingUp, TrendingDown, Table, ShoppingCart, Minus } from "lucide-react"
import { useState } from "react"
import { TradeModal } from "@/components/dashboard/trade-modal"
import { motion } from "framer-motion"

export function PortfolioTable() {
  const { portfolio, stocks } = useStock()
  const [selectedStock, setSelectedStock] = useState<any>(null)
  const [showBuyModal, setShowBuyModal] = useState(false)
  const [showSellModal, setShowSellModal] = useState(false)

  const handleTrade = (symbol: string, type: "buy" | "sell") => {
    const stock = stocks.find((s) => s.symbol === symbol)
    if (stock) {
      setSelectedStock(stock)
      if (type === "buy") {
        setShowBuyModal(true)
      } else {
        setShowSellModal(true)
      }
    }
  }

  return (
    <>
      <Card className="bg-card border-border shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-foreground">
            <Table className="h-5 w-5" />
            <span>Holdings</span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          {portfolio.length > 0 ? (
            <>
              <div className="block sm:hidden space-y-4">
                {portfolio.map((position, index) => {
                  const marketValue = position.quantity * position.currentPrice
                  const totalCost = position.quantity * position.avgPrice
                  const gainLoss = marketValue - totalCost
                  const gainLossPercent = (gainLoss / totalCost) * 100

                  return (
                    <motion.div
                      key={position.symbol}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 bg-muted rounded-lg space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-foreground text-lg">{position.symbol}</div>
                        <div className="text-right">
                          <div className="font-medium text-foreground">${marketValue.toFixed(2)}</div>
                          <div className="text-sm text-muted-foreground">{position.quantity} shares</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Avg Price</div>
                          <div className="text-foreground">${position.avgPrice.toFixed(2)}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Current</div>
                          <div className="text-foreground">${position.currentPrice.toFixed(2)}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className={`font-medium ${gainLoss >= 0 ? "text-green-600" : "text-red-600"}`}>
                          <div className="flex items-center">
                            {gainLoss >= 0 ? (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            ) : (
                              <TrendingDown className="h-3 w-3 mr-1" />
                            )}
                            {gainLoss >= 0 ? "+" : ""}${gainLoss.toFixed(2)}
                          </div>
                          <div className="text-sm">
                            {gainLoss >= 0 ? "+" : ""}
                            {gainLossPercent.toFixed(2)}%
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleTrade(position.symbol, "buy")}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <ShoppingCart className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleTrade(position.symbol, "sell")}
                            className="border-red-600 text-red-600 hover:bg-red-50"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Desktop table layout */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Symbol</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Quantity</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Avg Price</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Current Price</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Market Value</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Gain/Loss</th>
                      <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {portfolio.map((position, index) => {
                      const marketValue = position.quantity * position.currentPrice
                      const totalCost = position.quantity * position.avgPrice
                      const gainLoss = marketValue - totalCost
                      const gainLossPercent = (gainLoss / totalCost) * 100

                      return (
                        <motion.tr
                          key={position.symbol}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="border-b border-border hover:bg-muted/50"
                        >
                          <td className="py-4 px-2">
                            <div className="font-medium text-foreground">{position.symbol}</div>
                          </td>
                          <td className="py-4 px-2 text-right">
                            <div className="text-foreground">{position.quantity}</div>
                          </td>
                          <td className="py-4 px-2 text-right">
                            <div className="text-foreground">${position.avgPrice.toFixed(2)}</div>
                          </td>
                          <td className="py-4 px-2 text-right">
                            <div className="text-foreground">${position.currentPrice.toFixed(2)}</div>
                          </td>
                          <td className="py-4 px-2 text-right">
                            <div className="font-medium text-foreground">${marketValue.toFixed(2)}</div>
                          </td>
                          <td className="py-4 px-2 text-right">
                            <div className={`font-medium ${gainLoss >= 0 ? "text-green-600" : "text-red-600"}`}>
                              <div className="flex items-center justify-end">
                                {gainLoss >= 0 ? (
                                  <TrendingUp className="h-3 w-3 mr-1" />
                                ) : (
                                  <TrendingDown className="h-3 w-3 mr-1" />
                                )}
                                {gainLoss >= 0 ? "+" : ""}${gainLoss.toFixed(2)}
                              </div>
                              <div className="text-sm">
                                {gainLoss >= 0 ? "+" : ""}
                                {gainLossPercent.toFixed(2)}%
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-2">
                            <div className="flex items-center justify-center space-x-2">
                              <Button
                                size="sm"
                                onClick={() => handleTrade(position.symbol, "buy")}
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                <ShoppingCart className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleTrade(position.symbol, "sell")}
                                className="border-red-600 text-red-600 hover:bg-red-50"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                            </div>
                          </td>
                        </motion.tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <Table className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No holdings yet</p>
              <p className="text-sm text-muted-foreground">Start trading to see your positions here</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Trade Modals */}
      {selectedStock && (
        <>
          <TradeModal isOpen={showBuyModal} onClose={() => setShowBuyModal(false)} stock={selectedStock} type="buy" />
          <TradeModal
            isOpen={showSellModal}
            onClose={() => setShowSellModal(false)}
            stock={selectedStock}
            type="sell"
          />
        </>
      )}
    </>
  )
}
