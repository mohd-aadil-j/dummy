"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useStock } from "@/contexts/stock-context"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp } from "lucide-react"
import { useMemo } from "react"

export function ProfitLossChart() {
  const { transactions, portfolio } = useStock()

  const chartData = useMemo(() => {
    if (transactions.length === 0) return []

    // Generate mock historical data for demonstration
    const data = []
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 30) // Last 30 days

    let cumulativePL = 0

    for (let i = 0; i <= 30; i++) {
      const date = new Date(startDate)
      date.setDate(date.getDate() + i)

      // Simulate some profit/loss variation
      const dailyChange = (Math.random() - 0.5) * 200 // Random change between -100 and +100
      cumulativePL += dailyChange

      data.push({
        date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        pnl: cumulativePL,
        dailyChange: dailyChange,
      })
    }

    return data
  }, [transactions])

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground">{label}</p>
          <p className={`text-sm ${data.pnl >= 0 ? "text-green-600" : "text-red-600"}`}>P&L: ${data.pnl.toFixed(2)}</p>
          <p className={`text-sm ${data.dailyChange >= 0 ? "text-green-600" : "text-red-600"}`}>
            Daily Change: {data.dailyChange >= 0 ? "+" : ""}${data.dailyChange.toFixed(2)}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="bg-card border-border shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-foreground">
          <TrendingUp className="h-5 w-5" />
          <span>Profit & Loss Over Time</span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {chartData.length > 0 ? (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="pnl"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-center py-12">
            <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No trading data available</p>
            <p className="text-sm text-muted-foreground">Start trading to see your P&L chart</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
