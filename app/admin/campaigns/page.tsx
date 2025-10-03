"use client"
import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Badge } from "@/components/ui/badge"

type Campaign = {
  id: string
  title: string
  region: string[]
  channels: string[]
  language: string
  start: string
  end: string
  status: "Scheduled" | "Running" | "Completed"
}

const REGIONS = ["MH", "UP", "KA", "TN", "RJ", "GJ", "BR", "MP", "DL", "WB"]
const CHANNELS = ["School committee", "PTA", "Gram Panchayat notice board"]
const LANGUAGES = ["EN", "HI"]

export default function CampaignsPage() {
  const [title, setTitle] = useState("")
  const [region, setRegion] = useState<string[]>([])
  const [channels, setChannels] = useState<string[]>([])
  const [language, setLanguage] = useState("EN")
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [rows, setRows] = useState<Campaign[]>([])
  const projection = useMemo(
    () =>
      Array.from({ length: 8 }).map((_, i) => ({
        week: `W${i + 1}`,
        reach: 100 + i * 50 + Math.floor(Math.random() * 80),
      })),
    [title, region.length, channels.length, language, start, end],
  )

  function simulate() {
    const id = `CMP-${1000 + rows.length}`
    setRows((r) => [
      ...r,
      {
        id,
        title: title || "Untitled campaign",
        region: region.length ? region : ["MH"],
        channels: channels.length ? channels : ["PTA"],
        language,
        start: start || "2025-01-01",
        end: end || "2025-01-15",
        status: "Scheduled",
      },
    ])
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Campaigns</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Create campaign</CardTitle>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Awareness Drive" />
          </div>
          <div className="space-y-2">
            <Label>Target region</Label>
            <div className="flex flex-wrap gap-2">
              {REGIONS.map((r) => (
                <Badge
                  key={r}
                  variant={region.includes(r) ? "default" : "secondary"}
                  className="cursor-pointer"
                  onClick={() => setRegion((prev) => (prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]))}
                >
                  {r}
                </Badge>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Channels</Label>
            <div className="flex flex-wrap gap-2">
              {CHANNELS.map((c) => (
                <Badge
                  key={c}
                  variant={channels.includes(c) ? "default" : "secondary"}
                  className="cursor-pointer"
                  onClick={() => setChannels((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]))}
                >
                  {c}
                </Badge>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((l) => (
                  <SelectItem key={l} value={l}>
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Start</Label>
            <Input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>End</Label>
            <Input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
          </div>
          <div className="col-span-full">
            <Button onClick={simulate}>Simulate Campaign</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Projected Reach</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={projection}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="reach" stroke="hsl(var(--primary))" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Past campaigns</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="py-2 pr-3">ID</th>
                <th className="py-2 pr-3">Title</th>
                <th className="py-2 pr-3">Regions</th>
                <th className="py-2 pr-3">Channels</th>
                <th className="py-2 pr-3">Language</th>
                <th className="py-2 pr-3">Dates</th>
                <th className="py-2 pr-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="py-2 pr-3">{r.id}</td>
                  <td className="py-2 pr-3">{r.title}</td>
                  <td className="py-2 pr-3">{r.region.join(", ")}</td>
                  <td className="py-2 pr-3">{r.channels.join(", ")}</td>
                  <td className="py-2 pr-3">{r.language}</td>
                  <td className="py-2 pr-3">
                    {r.start} → {r.end}
                  </td>
                  <td className="py-2 pr-3">
                    <Badge>{r.status}</Badge>
                  </td>
                </tr>
              ))}
              {!rows.length ? (
                <tr>
                  <td colSpan={7} className="py-3 text-muted-foreground">
                    No campaigns yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
