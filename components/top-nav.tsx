"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { IndianRupee, GraduationCap, Shield } from "lucide-react"
import { useState } from "react"

export default function TopNav() {
  const [lang, setLang] = useState<"EN" | "HI">("EN")
  const t = (en: string, hi: string) => (lang === "EN" ? en : hi)

  return (
    <header className="w-full border-b bg-background">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div aria-hidden className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
            <IndianRupee className="h-5 w-5" />
          </div>
          <span className="font-semibold text-lg">{t("AadhaarConnect", "आधारकनेक्ट")}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          <Link href="/student">
            <Button variant="ghost" className="gap-2">
              <GraduationCap className="h-4 w-4" />
              {t("Student Demo", "छात्र डेमो")}
            </Button>
          </Link>
          <Link href="/admin">
            <Button variant="ghost" className="gap-2">
              <Shield className="h-4 w-4" />
              {t("Admin Demo", "एडमिन डेमो")}
            </Button>
          </Link>
          <Link href="/legal">
            <Button variant="ghost">{t("Legal", "कानूनी")}</Button>
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLang((p) => (p === "EN" ? "HI" : "EN"))}
            aria-label="Toggle language"
          >
            {lang}
          </Button>
        </div>
      </div>
    </header>
  )
}
