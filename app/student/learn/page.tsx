"use client"
import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Progress } from "@/components/ui/progress"

const modules = [
  { id: 1, title: "What is DBT?", bullets: ["Direct Benefit Transfer", "Bank credit of benefits"] },
  { id: 2, title: "Linking Aadhaar", bullets: ["KYC with bank", "Update details if needed"] },
  { id: 3, title: "Seeding with NPCI", bullets: ["Mapper connects Aadhaar", "Bank handles seeding"] },
  { id: 4, title: "Enable DBT mapping", bullets: ["Ask bank to enable", "Verify after 48h"] },
  { id: 5, title: "Common issues", bullets: ["Name mismatch", "Inactive account"] },
  { id: 6, title: "Where to verify", bullets: ["Bank channels", "NPCI via bank"] },
]

export default function LearnPage() {
  const [open, setOpen] = useState<null | number>(null)
  const [read, setRead] = useState<number[]>([])
  const progress = useMemo(() => Math.round((read.length / modules.length) * 100), [read.length])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Learning Modules</h1>
        <div className="mt-2 flex items-center gap-3">
          <Progress value={progress} className="w-64" />
          <span className="text-sm text-muted-foreground">{progress}% complete</span>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((m) => (
          <Card key={m.id}>
            <CardHeader>
              <CardTitle className="text-base">{m.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <ul className="list-disc pl-5">
                {m.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <div className="mt-3 flex items-center gap-2">
                <Button size="sm" onClick={() => setOpen(m.id)}>
                  Open
                </Button>
                <Button
                  size="sm"
                  variant={read.includes(m.id) ? "secondary" : "outline"}
                  onClick={() => setRead((r) => (r.includes(m.id) ? r : [...r, m.id]))}
                >
                  {read.includes(m.id) ? "Marked" : "Mark as read"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Sheet open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <SheetContent side="right" className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>{modules.find((m) => m.id === open)?.title}</SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-3 text-sm">
            <p>Short overview with key points and an illustrative infographic.</p>
            <img
              src={"/placeholder.svg?height=180&width=480&query=informative%20infographic"}
              alt="Illustrative infographic"
              className="rounded-md border"
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
