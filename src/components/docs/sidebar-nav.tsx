"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function SidebarNav({
  items,
}: {
  items: {
    title: string
    items: {
      title: string
      href: string
    }[]
  }[]
}) {
  const pathname = usePathname()

  return (
    <div className="space-y-6">
      {items.map((section) => (
        <div key={section.title} className="space-y-2">
          <h4 className="font-medium">{section.title}</h4>
          <ul className="space-y-1">
            {section.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "block rounded-md px-2 py-1 text-sm transition-colors hover:text-primary",
                    pathname === item.href
                      ? "font-medium text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}