"use client"
import useSWR from "swr"
import type React from "react"

import { getAdminCharts, getAdminKpis, listIssues } from "@/lib/mock-api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useMemo } from "react"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, ResponsiveContainer } from "recharts"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

export default function AdminOverview() {
  const { data: kpis } = useSWR("admin-kpis", () => getAdminKpis())
  const { data: charts } = useSWR("admin-charts", () => getAdminCharts())
  const { data: issues } = useSWR("issues", () => listIssues())
  const { toast } = useToast()
  const [q, setQ] = useState("")

  const filtered = useMemo(
    () =>
      (issues ?? []).filter((i) =>
        q ? [i.category, i.state, i.id].join(" ").toLowerCase().includes(q.toLowerCase()) : true,
      ),
    [issues, q],
  )

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Admin Overview</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Total Students Reached" value={kpis?.reached ?? 0} />
        <KpiCard title="% DBT-Ready" value={`${kpis?.dbtReadyPct ?? 0}%`} />
        <KpiCard title="Regions at Risk" value={kpis?.atRiskRegions ?? 0} />
        <KpiCard title="Avg Quiz Score" value={`${kpis?.avgQuiz ?? 0}%`} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Awareness Growth (last 12 weeks)</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={charts?.awareness ?? []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Top 5 States by Readiness</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts?.readinessByState ?? []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="state" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="pct" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-base">Recent Issues</CardTitle>
          <div className="flex items-center gap-2">
            <Input placeholder="Filter..." value={q} onChange={(e) => setQ(e.target.value)} className="w-40" />
            <Button
              onClick={() => toast({ title: "Report downloaded", description: "CSV download simulated (demo)." })}
              variant="outline"
            >
              Download Report (CSV)
            </Button>
            <Button
              onClick={() =>
                toast({ title: "Campaign launched", description: "Simulated awareness campaign created." })
              }
            >
              Launch Awareness Campaign
            </Button>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="py-2 pr-3">ID</th>
                <th className="py-2 pr-3">Category</th>
                <th className="py-2 pr-3">State</th>
                <th className="py-2 pr-3">Severity</th>
                <th className="py-2 pr-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered?.map((row) => (
                <tr key={row.id} className="border-t">
                  <td className="py-2 pr-3">{row.id}</td>
                  <td className="py-2 pr-3">{row.category}</td>
                  <td className="py-2 pr-3">{row.state}</td>
                  <td className="py-2 pr-3">
                    <Badge
                      className={
                        row.severity === "high"
                          ? "bg-red-500 text-white"
                          : row.severity === "med"
                            ? "bg-amber-500 text-white"
                            : "bg-emerald-500 text-white"
                      }
                    >
                      {row.severity}
                    </Badge>
                  </td>
                  <td className="py-2 pr-3">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!filtered?.length ? <p className="text-sm text-muted-foreground mt-3">No issues found.</p> : null}
        </CardContent>
      </Card>
    </div>
  )
}

function KpiCard({ title, value }: { title: string; value: React.ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold">{value}</div>
      </CardContent>
    </Card>
  )
}
