"use client"
import Link from "next/link"
import { LayoutDashboard, BadgeCheck, BookOpen, Bot, HelpCircle } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Sidebar({ variant = "student" }: { variant?: "student" | "admin" }) {
  const [open, setOpen] = useState(true)
  const base =
    variant === "student"
      ? [
          { href: "/student", label: "Dashboard", icon: LayoutDashboard },
          { href: "/student/check", label: "Check DBT Status", icon: BadgeCheck },
          { href: "/student/learn", label: "Learn", icon: BookOpen },
          { href: "/student/quizzes", label: "Quizzes", icon: BadgeCheck },
          { href: "/student/chatbot", label: "Chatbot", icon: Bot },
          { href: "/student/help", label: "Help", icon: HelpCircle },
        ]
      : [
          { href: "/admin", label: "Overview", icon: LayoutDashboard },
          { href: "/admin/campaigns", label: "Campaigns", icon: BadgeCheck },
        ]

  return (
    <aside className={cn("border-r bg-background transition-all", open ? "w-60" : "w-14")}>
      <div className="p-2 flex items-center justify-between">
        <span className={cn("text-sm font-medium px-2", !open && "sr-only")}>
          {variant === "student" ? "Student" : "Admin"}
        </span>
        <Button size="icon" variant="ghost" aria-label="Toggle sidebar" onClick={() => setOpen((o) => !o)}>
          {open ? "<" : ">"}
        </Button>
      </div>
      <nav className="px-2 py-2 grid gap-1">
        {base.map((i) => (
          <Link key={i.href} href={i.href} className="group">
            <div className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-muted">
              <i.icon className="h-4 w-4" />
              <span className={cn("text-sm", !open && "sr-only")}>{i.label}</span>
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
