"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useStock } from "@/contexts/stock-context"
import { Activity, ShoppingCart, TrendingDown, Clock } from "lucide-react"
import { motion } from "framer-motion"

export function ActivityLog() {
  const { transactions } = useStock()

  const sortedTransactions = [...transactions].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="bg-card border-border shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-foreground">
          <Activity className="h-5 w-5" />
          <span>Trading Activity</span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {sortedTransactions.length > 0 ? (
          <div className="space-y-4">
            {sortedTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-2 rounded-full ${
                      transaction.type === "buy" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    }`}
                  >
                    {transaction.type === "buy" ? (
                      <ShoppingCart className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-foreground">
                        {transaction.type === "buy" ? "Bought" : "Sold"} {transaction.quantity} shares of{" "}
                        {transaction.symbol}
                      </span>
                      <Badge
                        variant={transaction.type === "buy" ? "default" : "secondary"}
                        className={
                          transaction.type === "buy"
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-red-600 text-white hover:bg-red-700"
                        }
                      >
                        {transaction.type.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                      <span>@ ${transaction.price.toFixed(2)} per share</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>
                          {formatDate(transaction.timestamp)} at {formatTime(transaction.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-medium text-foreground">
                    ${(transaction.quantity * transaction.price).toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Value</div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No trading activity yet</p>
            <p className="text-sm text-muted-foreground">Your buy and sell transactions will appear here</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
