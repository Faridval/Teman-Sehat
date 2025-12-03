"use client"

import { useState } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"
import type { FilterState } from "./data-filters"

interface ExplorerRow {
  id: string
  facility: string
  region: string
  patients: number
  staff: number
  status: "active" | "inactive" | "maintenance"
  lastUpdate: string
  efficiency: number
}

const allData: ExplorerRow[] = [
  {
    id: "1",
    facility: "Puskesmas Central Jakarta",
    region: "Jakarta",
    patients: 1240,
    staff: 45,
    status: "active",
    lastUpdate: "2024-01-15",
    efficiency: 92,
  },
  {
    id: "2",
    facility: "Clinic North Jakarta",
    region: "Jakarta",
    patients: 890,
    staff: 32,
    status: "active",
    lastUpdate: "2024-01-15",
    efficiency: 85,
  },
  {
    id: "3",
    facility: "Medical Center Bandung",
    region: "Bandung",
    patients: 1560,
    staff: 58,
    status: "active",
    lastUpdate: "2024-01-14",
    efficiency: 88,
  },
  {
    id: "4",
    facility: "Health Post Surabaya",
    region: "Surabaya",
    patients: 320,
    staff: 12,
    status: "inactive",
    lastUpdate: "2024-01-10",
    efficiency: 45,
  },
  {
    id: "5",
    facility: "Facility West Medan",
    region: "Medan",
    patients: 750,
    staff: 28,
    status: "active",
    lastUpdate: "2024-01-15",
    efficiency: 79,
  },
  {
    id: "6",
    facility: "Wellness Center Yogyakarta",
    region: "Yogyakarta",
    patients: 920,
    staff: 35,
    status: "maintenance",
    lastUpdate: "2024-01-12",
    efficiency: 65,
  },
]

type SortKey = keyof ExplorerRow
type SortOrder = "asc" | "desc"

interface ExplorerTableProps {
  filters: FilterState
}

export function DataExplorerTable({ filters }: ExplorerTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("facility")
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredData = allData.filter((row) => {
    const matchesSearch = !filters.search || row.facility.toLowerCase().includes(filters.search.toLowerCase())
    const matchesStatus = !filters.status || row.status === filters.status
    const matchesRegion = !filters.region || row.region === filters.region
    return matchesSearch && matchesStatus && matchesRegion
  })

  const sortedData = [...filteredData].sort((a, b) => {
    const aVal = a[sortKey]
    const bVal = b[sortKey]

    if (typeof aVal === "string") {
      return sortOrder === "asc" ? aVal.localeCompare(bVal as string) : (bVal as string).localeCompare(aVal)
    }

    return sortOrder === "asc" ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number)
  })

  const paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const totalPages = Math.ceil(sortedData.length / itemsPerPage)

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortOrder("asc")
    }
    setCurrentPage(1)
  }

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) return <div className="w-4 h-4" />
    return sortOrder === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
  }

  return (
    <div className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Facilities ({sortedData.length})</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted/50">
            <tr>
              {[
                { key: "facility" as const, label: "Facility Name" },
                { key: "region" as const, label: "Region" },
                { key: "patients" as const, label: "Patients" },
                { key: "staff" as const, label: "Staff" },
                { key: "status" as const, label: "Status" },
                { key: "efficiency" as const, label: "Efficiency" },
              ].map((col) => (
                <th key={col.key} className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort(col.key)}
                    className="flex items-center gap-2 font-semibold text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {col.label}
                    <SortIcon column={col.key} />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row) => (
              <tr key={row.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-medium text-foreground">{row.facility}</td>
                <td className="px-6 py-4 text-foreground">{row.region}</td>
                <td className="px-6 py-4 text-foreground">{row.patients}</td>
                <td className="px-6 py-4 text-foreground">{row.staff}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      row.status === "active"
                        ? "bg-primary/10 text-primary"
                        : row.status === "maintenance"
                          ? "bg-secondary/10 text-secondary"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-secondary to-primary rounded-full"
                        style={{ width: `${row.efficiency}%` }}
                      />
                    </div>
                    <span className="text-foreground font-medium">{row.efficiency}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-border flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted disabled:opacity-50 transition-colors"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted disabled:opacity-50 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
