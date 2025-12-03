"use client"

interface DataRow {
  id: string
  faskes: string
  patients: number
  status: "active" | "inactive"
  lastUpdate: string
}

const sampleData: DataRow[] = [
  { id: "1", faskes: "Puskesmas Central", patients: 1240, status: "active", lastUpdate: "2 hours ago" },
  { id: "2", faskes: "Clinic North", patients: 890, status: "active", lastUpdate: "30 mins ago" },
  { id: "3", faskes: "Medical Center South", patients: 1560, status: "active", lastUpdate: "1 hour ago" },
  { id: "4", faskes: "Health Post East", patients: 320, status: "inactive", lastUpdate: "12 hours ago" },
  { id: "5", faskes: "Facility West", patients: 750, status: "active", lastUpdate: "15 mins ago" },
]

export function DataTable() {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-6">Faskes Overview</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Facility Name</th>
              <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Patients</th>
              <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Last Update</th>
            </tr>
          </thead>
          <tbody>
            {sampleData.map((row) => (
              <tr key={row.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="py-3 px-4 font-medium text-foreground">{row.faskes}</td>
                <td className="py-3 px-4 text-foreground">{row.patients}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      row.status === "active" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-muted-foreground">{row.lastUpdate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
