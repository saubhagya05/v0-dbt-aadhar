"use client"
import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

const qs = [
  { q: "DBT stands for?", options: ["Direct Benefit Transfer", "Digital Banking Tool"], a: 0 },
  { q: "Aadhaar seeding is done via?", options: ["NPCI mapper", "UPI app only"], a: 0 },
  { q: "DBT requires:", options: ["Link + Seed + Enable mapping", "Only UPI ID"], a: 0 },
  { q: "If DBT fails, first check:", options: ["Aadhaar seeding", "Phone battery"], a: 0 },
  { q: "Aadhaar-linked means:", options: ["KYC done at bank", "DBT enabled"], a: 0 },
  { q: "Verification after changes:", options: ["Wait 48 hours then check", "Immediate always"], a: 0 },
  { q: "Common issue:", options: ["KYC mismatch", "No such thing"], a: 0 },
  { q: "Where to verify status?", options: ["Bank channels", "Random website"], a: 0 },
]

export default function QuizzesPage() {
  const { toast } = useToast()
  const [answers, setAnswers] = useState<number[]>(Array(qs.length).fill(-1))
  const score = useMemo(() => answers.filter((a, i) => a === qs[i].a).length, [answers])

  function submit() {
    toast({ title: "Submitted", description: `You scored ${score}/${qs.length}.` })
  }
  function retake() {
    setAnswers(Array(qs.length).fill(-1))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Micro-Quiz</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Answer all questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {qs.map((item, i) => (
            <div key={i} className="space-y-2">
              <p className="text-sm font-medium">
                {i + 1}. {item.q}
              </p>
              <RadioGroup
                value={String(answers[i])}
                onValueChange={(v) =>
                  setAnswers((prev) => {
                    const next = [...prev]
                    next[i] = Number(v)
                    return next
                  })
                }
              >
                {item.options.map((opt, oi) => (
                  <div key={oi} className="flex items-center space-x-2">
                    <RadioGroupItem id={`q${i}-${oi}`} value={String(oi)} />
                    <Label htmlFor={`q${i}-${oi}`} className="text-sm">
                      {opt}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
          <div className="flex gap-2">
            <Button onClick={submit}>Submit</Button>
            <Button variant="secondary" onClick={retake}>
              Retake
            </Button>
            <Button
              variant="outline"
              onClick={() => toast({ title: "Shared", description: "Awareness shared (demo)." })}
            >
              Share awareness
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
