"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { DataFilters, type FilterState } from "@/components/data-filters"
import { DataExplorerTable } from "@/components/data-explorer-table"

export default function DataExplorerPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    status: "",
    region: "",
    dateRange: "",
  })

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-24 min-h-screen">
        <div className="max-w-full bg-background">
          <div className="px-6 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <DataFilters onFilterChange={setFilters} />
              </div>

              {/* Results Table */}
              <div className="lg:col-span-3">
                <DataExplorerTable filters={filters} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
