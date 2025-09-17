"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useStock } from "@/contexts/stock-context"
import { Search, TrendingUp, TrendingDown } from "lucide-react"
import type { Stock } from "@/contexts/stock-context"

interface StockSearchProps {
  onStockSelect: (stock: Stock) => void
}

export function StockSearch({ onStockSelect }: StockSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [showResults, setShowResults] = useState(false)
  const { stocks, searchStock } = useStock()

  const filteredStocks = stocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSearch = () => {
    if (searchTerm.trim()) {
      const stock = searchStock(searchTerm.trim())
      if (stock) {
        onStockSelect(stock)
        setSearchTerm("")
        setShowResults(false)
      }
    }
  }

  const handleStockSelect = (stock: Stock) => {
    onStockSelect(stock)
    setSearchTerm("")
    setShowResults(false)
  }

  return (
    <div className="relative">
      <Card className="p-4 bg-card border-border">
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search stocks (e.g., AAPL, Apple)"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setShowResults(e.target.value.length > 0)
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="pl-10 bg-input border-border focus:ring-primary focus:border-primary"
            />
          </div>
          <Button onClick={handleSearch} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Search
          </Button>
        </div>

        {/* Search Results Dropdown */}
        {showResults && searchTerm && (
          <div className="absolute top-full left-0 right-0 z-10 mt-1">
            <Card className="bg-card border-border shadow-lg max-h-60 overflow-y-auto">
              {filteredStocks.length > 0 ? (
                <div className="p-2">
                  {filteredStocks.map((stock) => (
                    <button
                      key={stock.symbol}
                      onClick={() => handleStockSelect(stock)}
                      className="w-full p-3 text-left hover:bg-muted rounded-md transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-foreground">{stock.symbol}</div>
                          <div className="text-sm text-muted-foreground">{stock.name}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-foreground">${stock.price.toFixed(2)}</div>
                          <div
                            className={`text-sm flex items-center ${
                              stock.change >= 0 ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {stock.change >= 0 ? (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            ) : (
                              <TrendingDown className="h-3 w-3 mr-1" />
                            )}
                            {stock.changePercent.toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-muted-foreground">No stocks found</div>
              )}
            </Card>
          </div>
        )}
      </Card>
    </div>
  )
}
