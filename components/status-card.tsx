import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

export function StatusCard({
  title,
  icon,
  status,
  description,
}: {
  title: string
  icon?: ReactNode
  status: "success" | "warn" | "danger"
  description?: string
}) {
  const label = status === "success" ? "Okay" : status === "warn" ? "Action Needed" : "Issue"
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <Badge
          className={cn(
            "text-xs",
            status === "success" && "bg-emerald-500 text-white",
            status === "warn" && "bg-amber-500 text-white",
            status === "danger" && "bg-red-500 text-white",
          )}
        >
          {label}
        </Badge>
        {description ? <p className="mt-2 text-sm text-muted-foreground">{description}</p> : null}
      </CardContent>
    </Card>
  )
}
