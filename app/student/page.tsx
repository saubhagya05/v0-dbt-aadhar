"use client"
import useSWR from "swr"
import { getStudentSnapshot } from "@/lib/mock-api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

const fetcher = () => getStudentSnapshot()

export default function StudentDashboard() {
  const { data, isLoading } = useSWR("student-snapshot", fetcher)
  const linked = data?.linked
  const seeded = data?.seeded
  const dbtEnabled = data?.dbtEnabled

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Hi, Ananya!</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Account Linkage</CardTitle>
          </CardHeader>
          <CardContent>
            <StatusPill ok={!!linked} okText="Linked" badText="Not Linked" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Aadhaar Seeding</CardTitle>
          </CardHeader>
          <CardContent>
            <StatusPill ok={!!seeded} okText="Seeded" badText="Not Seeded" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">DBT Enablement</CardTitle>
          </CardHeader>
          <CardContent>
            <StatusPill ok={!!dbtEnabled} okText="Enabled" badText="Not Enabled" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Next Steps</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            {isLoading ? (
              "Loading..."
            ) : data?.nextSteps?.length ? (
              <ul className="list-disc pl-5">
                {data?.nextSteps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            ) : (
              "All set!"
            )}
            <div className="mt-3">
              <Link href="/student/help">
                <Button size="sm" variant="secondary">
                  Guidance
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Scholarship readiness score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Progress value={data?.readinessScore ?? 0} className="w-64" />
            <span className="text-sm text-muted-foreground">{data?.readinessScore ?? 0}%</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Link href="/student/check">
            <Button>Check Now</Button>
          </Link>
          <Link href="/student/learn">
            <Button variant="secondary">View Tutorials</Button>
          </Link>
          <Link href="/student/quizzes">
            <Button variant="outline">Take Quiz</Button>
          </Link>
          <Link href="/student/chatbot">
            <Button variant="outline">Talk to Assistant</Button>
          </Link>
        </CardContent>
      </Card>

      <div aria-live="polite" className="sr-only">
        {isLoading ? "Loading student snapshot" : "Student snapshot loaded"}
      </div>
    </div>
  )
}

function StatusPill({ ok, okText, badText }: { ok: boolean; okText: string; badText: string }) {
  return (
    <span
      className={
        "inline-flex items-center rounded-full px-2 py-1 text-xs " +
        (ok ? "bg-emerald-500 text-white" : "bg-amber-500 text-white")
      }
    >
      {ok ? okText : badText}
    </span>
  )
}
