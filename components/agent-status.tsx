"use client"

import { CheckCircle2, Clock, Zap } from "lucide-react"

interface AgentStatusProps {
  agents: Array<{
    name: string
    status: "pending" | "processing" | "complete"
    details?: string
  }>
}

export function AgentStatus({ agents }: AgentStatusProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-soft border border-border h-fit sticky top-24">
      <h3 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
        <Zap className="w-5 h-5 text-primary" />
        Agent Processing
      </h3>

      <div className="space-y-3">
        {agents.map((agent, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className="mt-1">
              {agent.status === "complete" && <CheckCircle2 className="w-5 h-5 text-green-500" />}
              {agent.status === "processing" && <Clock className="w-5 h-5 text-primary animate-spin" />}
              {agent.status === "pending" && <div className="w-5 h-5 rounded-full border-2 border-muted" />}
            </div>
            <div className="flex-1">
              <p
                className={`text-sm font-semibold ${
                  agent.status === "complete" ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {agent.name}
              </p>
              {agent.details && <p className="text-xs text-muted-foreground mt-1">{agent.details}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
