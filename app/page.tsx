import TopNav from "@/components/top-nav"
import DemoBanner from "@/components/demo-banner"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Page() {
  return (
    <main>
      <TopNav />
      <DemoBanner />
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-pretty text-3xl md:text-4xl font-semibold">
              AadhaarConnect — Understand, Verify, Enable DBT
            </h1>
            <p className="mt-3 text-muted-foreground text-balance">
              A guided demo to learn the difference between Aadhaar-linked, Aadhaar-seeded, and DBT-enabled accounts—and
              how to become DBT-ready.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/student">
                <Button>Try Student Demo</Button>
              </Link>
              <Link href="/admin">
                <Button variant="secondary">View Admin Demo</Button>
              </Link>
              <a href="#how">
                <Button variant="outline">How it works</Button>
              </a>
            </div>
            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              {[
                { title: "Learn", desc: "Basics and differences" },
                { title: "Check Status", desc: "Linked / Seeded / DBT" },
                { title: "Get DBT-Ready", desc: "Guided next steps" },
              ].map((s) => (
                <Card key={s.title}>
                  <CardHeader>
                    <CardTitle className="text-base">{s.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">{s.desc}</CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div aria-hidden className="rounded-2xl border bg-card p-6">
            <img
              src= "./aadhaar-1.svg"
              alt="Illustration of smartphone showing DBT status check"
              className="w-full rounded-xl"
            />
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Aadhaar-linked</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">KYC link with bank.</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Aadhaar-seeded</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">Bank maps Aadhaar with NPCI.</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">DBT-enabled</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">Eligible to receive benefits.</CardContent>
          </Card>
        </div>

        <div id="how" className="mt-12">
          <h2 className="text-xl font-semibold mb-4">How it Works</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {["Link Aadhaar with bank", "Seed with NPCI", "Enable DBT mapping"].map((step, i) => (
              <Card key={step}>
                <CardHeader>
                  <CardTitle className="text-base">Step {i + 1}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{step}</CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">FAQ</h2>
          <Accordion type="single" collapsible className="w-full">
            {[
              ["What is DBT?", "Direct Benefit Transfer (DBT) allows direct credit of benefits to your bank account."],
              ["Is this real?", "No. This is a prototype demo; all data is mocked."],
              ["Do you store my data?", "No personal data is processed or stored."],
              ["How do I get DBT-ready?", "Link Aadhaar, seed with NPCI, and enable DBT mapping via your bank."],
            ].map(([q, a], i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left">{q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <p className="mt-10 text-xs text-muted-foreground">Prototype for SIH’25 — all data mocked.</p>
      </section>
    </main>
  )
}
