"use client"
import { useState } from "react"
import { chatReply } from "@/lib/mock-api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

type Msg = { role: "user" | "assistant"; content: string }

export default function ChatbotPage() {
  const [input, setInput] = useState("")
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "assistant", content: "Hi! Ask me about DBT, seeding, or verification." },
  ])
  const [loading, setLoading] = useState(false)

  async function send(p: string) {
    if (!p.trim()) return
    setMsgs((m) => [...m, { role: "user", content: p }])
    setInput("")
    setLoading(true)
    const r = await chatReply(p)
    setMsgs((m) => [...m, { role: "assistant", content: r.reply }])
    setLoading(false)
  }

  return (
    <div className="grid lg:grid-cols-[1fr] gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Assistant</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {["Why DBT failed?", "How to seed account?", "Where to verify?"].map((q) => (
              <Badge key={q} className="cursor-pointer" onClick={() => send(q)}>
                {q}
              </Badge>
            ))}
          </div>
          <div className="h-72 overflow-y-auto rounded-md border p-3 space-y-3 bg-background">
            {msgs.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : ""}>
                <span
                  className={
                    "inline-block rounded-lg px-3 py-2 text-sm " +
                    (m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted")
                  }
                >
                  {m.content}
                </span>
              </div>
            ))}
            {loading ? <p className="text-xs text-muted-foreground">Typing…</p> : null}
          </div>
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
          >
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." />
            <Button type="submit">Send</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
