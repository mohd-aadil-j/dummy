"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useStock } from "@/contexts/stock-context"
import { ShoppingCart, TrendingDown, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import type { Stock } from "@/contexts/stock-context"

interface TradeModalProps {
  isOpen: boolean
  onClose: () => void
  stock: Stock
  type: "buy" | "sell"
}

export function TradeModal({ isOpen, onClose, stock, type }: TradeModalProps) {
  const [quantity, setQuantity] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { buyStock, sellStock, portfolio } = useStock()

  const existingPosition = portfolio.find((p) => p.symbol === stock.symbol)
  const maxSellQuantity = existingPosition?.quantity || 0

  const handleTrade = async () => {
    const qty = Number.parseInt(quantity)
    if (!qty || qty <= 0) return

    if (type === "sell" && qty > maxSellQuantity) return

    setIsLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (type === "buy") {
      buyStock(stock.symbol, qty, stock.price)
    } else {
      sellStock(stock.symbol, qty, stock.price)
    }

    setIsLoading(false)
    setQuantity("")
    onClose()
  }

  const totalValue = (Number.parseInt(quantity) || 0) * stock.price

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-foreground">
            {type === "buy" ? <ShoppingCart className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
            <span>
              {type === "buy" ? "Buy" : "Sell"} {stock.symbol}
            </span>
          </DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {/* Stock Info */}
          <div className="p-3 bg-muted rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium text-foreground">{stock.name}</div>
                <div className="text-sm text-muted-foreground">{stock.symbol}</div>
              </div>
              <div className="text-right">
                <div className="font-medium text-foreground">${stock.price.toFixed(2)}</div>
                <div className={`text-sm ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {stock.change >= 0 ? "+" : ""}
                  {stock.changePercent.toFixed(2)}%
                </div>
              </div>
            </div>
          </div>

          {/* Quantity Input */}
          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-sm font-medium text-foreground">
              Quantity
            </Label>
            <Input
              id="quantity"
              type="number"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="bg-input border-border focus:ring-primary focus:border-primary"
              min="1"
              max={type === "sell" ? maxSellQuantity : undefined}
            />
            {type === "sell" && (
              <div className="text-sm text-muted-foreground">Available to sell: {maxSellQuantity} shares</div>
            )}
          </div>

          {/* Order Summary */}
          {quantity && Number.parseInt(quantity) > 0 && (
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground mb-2">Order Summary</div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm">Quantity:</span>
                  <span className="text-sm font-medium">{quantity} shares</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Price per share:</span>
                  <span className="text-sm font-medium">${stock.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-1">
                  <span className="text-sm font-medium">Total:</span>
                  <span className="text-sm font-medium">${totalValue.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Warning for sell orders */}
          {type === "sell" && Number.parseInt(quantity) > maxSellQuantity && (
            <div className="flex items-center space-x-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <span className="text-sm text-destructive">Insufficient shares to sell</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent" disabled={isLoading}>
              Cancel
            </Button>
            <Button
              onClick={handleTrade}
              disabled={
                !quantity ||
                Number.parseInt(quantity) <= 0 ||
                (type === "sell" && Number.parseInt(quantity) > maxSellQuantity) ||
                isLoading
              }
              className={`flex-1 ${
                type === "buy" ? "bg-green-600 hover:bg-green-700 text-white" : "bg-red-600 hover:bg-red-700 text-white"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                `${type === "buy" ? "Buy" : "Sell"} ${stock.symbol}`
              )}
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
