"use client"
import { useMemo, useState } from "react"
import useSWR from "swr"
import { getStudentSnapshot } from "@/lib/mock-api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const steps = [
  { id: 1, title: "Link Aadhaar to bank" },
  { id: 2, title: "Seed with NPCI" },
  { id: 3, title: "Verify DBT mapping" },
  { id: 4, title: "Common issues & escalation" },
]

export default function HelpPage() {
  const { data } = useSWR("student-snapshot", () => getStudentSnapshot())
  const [active, setActive] = useState(1)
  const [open, setOpen] = useState(false)
  const personalized = useMemo(() => {
    const rec: string[] = []
    if (!data?.linked) rec.push("Visit bank to link Aadhaar with account")
    if (data?.linked && !data?.seeded) rec.push("Request Aadhaar seeding with NPCI at bank")
    if (data?.seeded && !data?.dbtEnabled) rec.push("Ask to enable DBT mapping; verify after 48h")
    if (!rec.length) rec.push("All steps completed. You're DBT-ready!")
    return rec
  }, [data])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Guided Steps</h1>
      <div className="grid md:grid-cols-4 gap-4">
        {steps.map((s) => (
          <Card key={s.id} className={active === s.id ? "border-primary" : ""}>
            <CardHeader>
              <CardTitle className="text-sm">{s.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
                Do it now
              </Button>
              <Button size="sm" onClick={() => setActive((a) => Math.min(a + 1, steps.length))}>
                {active > s.id ? "Done" : active === s.id ? "Mark complete" : "Next"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button variant="secondary" onClick={() => setOpen(true)}>
        Generate Personalized Checklist
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Checklist</DialogTitle>
          </DialogHeader>
          <ul className="list-disc pl-5 text-sm space-y-1">
            {personalized.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>

      <div className="rounded-md border p-3 text-sm bg-muted/50">
        What is DBT? Direct Benefit Transfer credits benefits directly to your bank account.
      </div>
    </div>
  )
}
