"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const trendData = [
  { month: "Jan", patients: 400, facilities: 240 },
  { month: "Feb", patients: 520, facilities: 280 },
  { month: "Mar", patients: 480, facilities: 290 },
  { month: "Apr", patients: 650, facilities: 320 },
  { month: "May", patients: 720, facilities: 350 },
  { month: "Jun", patients: 820, facilities: 380 },
]

export function ChartPanel() {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-6">Patient & Facility Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={trendData}>
          <defs>
            <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorFacilities" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#B3E5FC" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#B3E5FC" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
          <XAxis dataKey="month" stroke="#6B7280" />
          <YAxis stroke="#6B7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E0E0E0",
              borderRadius: "8px",
            }}
          />
          <Area
            type="monotone"
            dataKey="patients"
            stroke="#10B981"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorPatients)"
          />
          <Area
            type="monotone"
            dataKey="facilities"
            stroke="#B3E5FC"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorFacilities)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
