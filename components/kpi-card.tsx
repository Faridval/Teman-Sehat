import type { ReactNode } from "react"
import { TrendingUp } from "lucide-react"

interface KPICardProps {
  title: string
  value: string | number
  change?: number
  icon?: ReactNode
  description?: string
}

export function KPICard({ title, value, change, icon, description }: KPICardProps) {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-soft border border-border hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <h3 className="text-3xl font-bold text-foreground mt-2">{value}</h3>
        </div>
        {icon && <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">{icon}</div>}
      </div>

      {change !== undefined && (
        <div className="flex items-center gap-2 text-sm">
          <TrendingUp className="w-4 h-4 text-primary" />
          <span className="text-primary font-medium">
            {change > 0 ? "+" : ""}
            {change}% from last month
          </span>
        </div>
      )}

      {description && <p className="text-xs text-muted-foreground mt-3">{description}</p>}

      <div className="h-1 bg-gradient-to-r from-secondary to-primary rounded-full mt-4"></div>
    </div>
  )
}
