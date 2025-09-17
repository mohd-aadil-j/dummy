"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface Stock {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
}

export interface Portfolio {
  symbol: string
  quantity: number
  avgPrice: number
  currentPrice: number
}

export interface Transaction {
  id: string
  symbol: string
  type: "buy" | "sell"
  quantity: number
  price: number
  timestamp: Date
}

interface StockContextType {
  stocks: Stock[]
  portfolio: Portfolio[]
  transactions: Transaction[]
  searchStock: (symbol: string) => Stock | null
  buyStock: (symbol: string, quantity: number, price: number) => void
  sellStock: (symbol: string, quantity: number, price: number) => void
  isLoading: boolean
}

const StockContext = createContext<StockContextType | undefined>(undefined)

// Mock stock data
const mockStocks: Stock[] = [
  { symbol: "AAPL", name: "Apple Inc.", price: 175.43, change: 2.15, changePercent: 1.24 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 142.56, change: -1.23, changePercent: -0.85 },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 378.85, change: 5.67, changePercent: 1.52 },
  { symbol: "TSLA", name: "Tesla Inc.", price: 248.42, change: -3.21, changePercent: -1.27 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 145.86, change: 0.95, changePercent: 0.66 },
]

export function StockProvider({ children }: { children: React.ReactNode }) {
  const [stocks] = useState<Stock[]>(mockStocks)
  const [portfolio, setPortfolio] = useState<Portfolio[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Load saved data from localStorage
    const savedPortfolio = localStorage.getItem("portfolio")
    const savedTransactions = localStorage.getItem("transactions")

    if (savedPortfolio) {
      setPortfolio(JSON.parse(savedPortfolio))
    }
    if (savedTransactions) {
      const parsedTransactions = JSON.parse(savedTransactions)
      // Convert timestamp strings back to Date objects
      const transactionsWithDates = parsedTransactions.map((t: any) => ({
        ...t,
        timestamp: new Date(t.timestamp),
      }))
      setTransactions(transactionsWithDates)
    }
  }, [])

  const searchStock = (symbol: string): Stock | null => {
    return stocks.find((stock) => stock.symbol.toLowerCase() === symbol.toLowerCase()) || null
  }

  const buyStock = (symbol: string, quantity: number, price: number) => {
    // Update portfolio
    const existingPosition = portfolio.find((p) => p.symbol === symbol)
    let newPortfolio: Portfolio[]

    if (existingPosition) {
      const totalQuantity = existingPosition.quantity + quantity
      const newAvgPrice = (existingPosition.avgPrice * existingPosition.quantity + price * quantity) / totalQuantity

      newPortfolio = portfolio.map((p) =>
        p.symbol === symbol ? { ...p, quantity: totalQuantity, avgPrice: newAvgPrice, currentPrice: price } : p,
      )
    } else {
      newPortfolio = [...portfolio, { symbol, quantity, avgPrice: price, currentPrice: price }]
    }

    setPortfolio(newPortfolio)
    localStorage.setItem("portfolio", JSON.stringify(newPortfolio))

    // Add transaction
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      symbol,
      type: "buy",
      quantity,
      price,
      timestamp: new Date(),
    }

    const newTransactions = [newTransaction, ...transactions]
    setTransactions(newTransactions)
    localStorage.setItem("transactions", JSON.stringify(newTransactions))
  }

  const sellStock = (symbol: string, quantity: number, price: number) => {
    const existingPosition = portfolio.find((p) => p.symbol === symbol)
    if (!existingPosition || existingPosition.quantity < quantity) return

    // Update portfolio
    const newQuantity = existingPosition.quantity - quantity
    let newPortfolio: Portfolio[]

    if (newQuantity === 0) {
      newPortfolio = portfolio.filter((p) => p.symbol !== symbol)
    } else {
      newPortfolio = portfolio.map((p) =>
        p.symbol === symbol ? { ...p, quantity: newQuantity, currentPrice: price } : p,
      )
    }

    setPortfolio(newPortfolio)
    localStorage.setItem("portfolio", JSON.stringify(newPortfolio))

    // Add transaction
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      symbol,
      type: "sell",
      quantity,
      price,
      timestamp: new Date(),
    }

    const newTransactions = [newTransaction, ...transactions]
    setTransactions(newTransactions)
    localStorage.setItem("transactions", JSON.stringify(newTransactions))
  }

  return (
    <StockContext.Provider
      value={{
        stocks,
        portfolio,
        transactions,
        searchStock,
        buyStock,
        sellStock,
        isLoading,
      }}
    >
      {children}
    </StockContext.Provider>
  )
}

export function useStock() {
  const context = useContext(StockContext)
  if (context === undefined) {
    throw new Error("useStock must be used within a StockProvider")
  }
  return context
}
