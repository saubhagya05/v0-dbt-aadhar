import type React from "react"
import TopNav from "@/components/top-nav"
import DemoBanner from "@/components/demo-banner"
import { Sidebar } from "@/components/sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col">
      <TopNav />
      <DemoBanner />
      <div className="flex flex-1">
        <Sidebar variant="admin" />
        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-4 py-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
