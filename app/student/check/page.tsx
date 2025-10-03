"use client"
import { useState } from "react"
import type React from "react"

import { checkStatus, listBanks } from "@/lib/mock-api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

export default function CheckStatusPage() {
  const [aadhaar, setAadhaar] = useState("")
  const [bank, setBank] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Awaited<ReturnType<typeof checkStatus>> | null>(null)
  const { toast } = useToast()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    const r = await checkStatus(aadhaar, bank)
    setResult(r)
    setLoading(false)
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Check DBT Status</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="grid gap-4">
            <div>
              <Label htmlFor="aadhaar">Aadhaar Number</Label>
              <Input
                id="aadhaar"
                value={aadhaar}
                onChange={(e) => setAadhaar(maskAadhaar(e.target.value))}
                placeholder="####-####-####"
                inputMode="numeric"
                pattern="\d{4}-\d{4}-\d{4}"
                aria-describedby="no-validate"
              />
              <p id="no-validate" className="text-xs text-muted-foreground mt-1">
                Demo only. Input is treated as plain text.
              </p>
            </div>
            <div>
              <Label>Bank</Label>
              <Select onValueChange={setBank}>
                <SelectTrigger>
                  <SelectValue placeholder="Select bank" />
                </SelectTrigger>
                <SelectContent>
                  {listBanks().map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Checking..." : "Check Status"}
            </Button>
          </form>
          <Button
            variant="outline"
            className="mt-3 bg-transparent"
            onClick={() => toast({ title: "Demo only", description: "Guidance PDF download simulated." })}
          >
            Download Guidance PDF
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Results</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Row label="Aadhaar Linked?" ok={result.linked} />
            <Row label="Aadhaar Seeded (NPCI)?" ok={result.seeded} />
            <Row label="DBT Enabled?" ok={result.dbtEnabled} />
            {result.reasons?.length ? (
              <div className="text-sm text-muted-foreground">
                <span className="font-medium">Notes:</span>
                <ul className="list-disc pl-5">
                  {result.reasons.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {!result.dbtEnabled && (result.linked || result.seeded) ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary">View Steps to Enable</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Steps to Enable DBT</DialogTitle>
                  </DialogHeader>
                  <ol className="list-decimal pl-5 text-sm space-y-1">
                    <li>Visit your bank branch or net banking portal</li>
                    <li>Request Aadhaar seeding with NPCI mapper</li>
                    <li>Enable DBT mapping for scholarship credits</li>
                    <li>Verify status after 48 hours</li>
                  </ol>
                </DialogContent>
              </Dialog>
            ) : result.dbtEnabled ? (
              <Card className="border-emerald-300 bg-emerald-50">
                <CardContent className="p-4 text-sm">You’re DBT-ready for scholarships.</CardContent>
              </Card>
            ) : null}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function Row({ label, ok }: { label: string; ok: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{label}</span>
      <Badge className={ok ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"}>{ok ? "Yes" : "No"}</Badge>
    </div>
  )
}

function maskAadhaar(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 12)
  const parts = d.match(/.{1,4}/g) ?? []
  return parts.join("-")
}
