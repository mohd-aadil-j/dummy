"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useStock } from "@/contexts/stock-context"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { BarChart3 } from "lucide-react"

export function PortfolioChart() {
  const { portfolio } = useStock()

  const chartData = portfolio.map((position) => ({
    name: position.symbol,
    value: position.quantity * position.currentPrice,
    quantity: position.quantity,
    avgPrice: position.avgPrice,
    currentPrice: position.currentPrice,
  }))

  const COLORS = ["#164e63", "#8b5cf6", "#3b82f6", "#34d399", "#fbbf24", "#ef4444"]

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground">{data.name}</p>
          <p className="text-sm text-muted-foreground">Value: ${data.value.toFixed(2)}</p>
          <p className="text-sm text-muted-foreground">Quantity: {data.quantity} shares</p>
          <p className="text-sm text-muted-foreground">Avg Price: ${data.avgPrice.toFixed(2)}</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="bg-card border-border shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-foreground">
          <BarChart3 className="h-5 w-5" />
          <span>Portfolio Allocation</span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {portfolio.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="space-y-3">
              <h3 className="font-medium text-foreground">Holdings Breakdown</h3>
              {chartData.map((item, index) => {
                const percentage = (item.value / chartData.reduce((sum, d) => sum + d.value, 0)) * 100
                return (
                  <div key={item.name} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <div>
                        <div className="font-medium text-foreground">{item.name}</div>
                        <div className="text-sm text-muted-foreground">{item.quantity} shares</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-foreground">${item.value.toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">{percentage.toFixed(1)}%</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No positions to display</p>
            <p className="text-sm text-muted-foreground">Start trading to see your portfolio allocation</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
