const delay = (min = 800, max = 1200) =>
  new Promise((res) => setTimeout(res, Math.floor(Math.random() * (max - min + 1)) + min))

const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]

export const listBanks = (): string[] => [
  "State Bank of India (SBI)",
  "Punjab National Bank (PNB)",
  "Bank of Baroda (BoB)",
  "HDFC Bank",
  "ICICI Bank",
  "Canara Bank",
]

function randomStatuses() {
  const linked = Math.random() < 0.6
  const seeded = linked && Math.random() < 0.45
  const dbtEnabled = seeded && Math.random() < 0.35
  return { linked, seeded, dbtEnabled }
}

export async function getStudentSnapshot() {
  await delay()
  const { linked, seeded, dbtEnabled } = randomStatuses()
  const nextSteps: string[] = []
  if (!linked) nextSteps.push("Link Aadhaar with your bank")
  if (linked && !seeded) nextSteps.push("Seed Aadhaar with NPCI via your bank")
  if (seeded && !dbtEnabled) nextSteps.push("Enable DBT mapping at bank/NPCI")
  const readinessScore = Math.floor(Math.random() * 50) + (dbtEnabled ? 40 : seeded ? 30 : linked ? 20 : 10)
  return { linked, seeded, dbtEnabled, readinessScore, nextSteps }
}

export async function checkStatus(aadhaar: string, bank: string) {
  await delay()
  const { linked, seeded, dbtEnabled } = randomStatuses()
  const reasons: string[] = []
  if (linked && !seeded) reasons.push("Aadhaar not seeded at NPCI")
  if (seeded && !dbtEnabled) reasons.push("DBT mapping not enabled by bank")
  if (!linked) reasons.push("Aadhaar not linked with bank")
  return { linked, seeded, dbtEnabled, reasons: reasons.length ? reasons : undefined }
}

export async function chatReply(prompt: string) {
  await delay(400, 700)
  const p = prompt.toLowerCase()
  let reply =
    "To receive DBT, ensure your Aadhaar is linked to your bank account, seeded with NPCI, and DBT mapping is enabled."
  if (p.includes("why") && (p.includes("fail") || p.includes("failed"))) {
    reply =
      "Common DBT failures: Aadhaar not seeded with NPCI, bank account inactive, or mismatch in KYC details. Verify seeding and DBT mapping at your bank."
  } else if (p.includes("seed")) {
    reply =
      "Aadhaar seeding maps your Aadhaar to your bank account via NPCI. Visit your bank (or use net banking) and request Aadhaar seeding."
  } else if (p.includes("where") && (p.includes("verify") || p.includes("check"))) {
    reply = "Use your bank’s channels or NPCI mapper via bank to verify Aadhaar seeding and DBT status."
  }
  return { reply }
}

export async function getAdminKpis() {
  await delay()
  return {
    reached: 25000 + Math.floor(Math.random() * 20000),
    dbtReadyPct: Math.floor(30 + Math.random() * 50),
    atRiskRegions: 3 + Math.floor(Math.random() * 6),
    avgQuiz: Math.floor(50 + Math.random() * 35),
  }
}

export async function getAdminCharts() {
  await delay()
  const awareness = Array.from({ length: 12 }).map((_, i) => ({
    week: `W${i + 1}`,
    value: 20 + Math.floor(i * 5 + Math.random() * 10),
  }))
  const states = ["MH", "UP", "KA", "TN", "RJ", "GJ", "BR"]
  const readinessByState = states
    .map((s) => ({ state: s, pct: Math.floor(20 + Math.random() * 70) }))
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 5)
  return { awareness, readinessByState }
}

export type IssueCategory = "KYC" | "Seeding" | "DBT Failure"
export type IssueSeverity = "low" | "med" | "high"

export async function listIssues() {
  await delay()
  const cats: IssueCategory[] = ["KYC", "Seeding", "DBT Failure"]
  const sevs: IssueSeverity[] = ["low", "med", "high"]
  const states = ["MH", "UP", "KA", "TN", "RJ", "GJ", "BR", "MP", "DL", "WB"]
  const now = Date.now()
  return Array.from({ length: 10 }).map((_, i) => ({
    id: `ISS-${1000 + i}`,
    category: pick(cats),
    state: pick(states),
    severity: pick(sevs),
    date: new Date(now - i * 86400000).toISOString().slice(0, 10),
  }))
}
