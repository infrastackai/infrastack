"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Badge } from "@/components/ui/badge"

// @ts-ignore
// import { Element, scroller, animateScroll as scroll } from 'react-scroll';

export function MainNav() {
  const pathname = usePathname()

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.infrastack className="h-6 w-6 drop-shadow-1" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        {/* <Link
          href="#"
          onClick={() => {
            const el = document.getElementById("featuresContainerId")
            if (el) {
              el.scrollIntoView({ block: "start", behavior: "smooth" })
            }
          }}
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/docs" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Features
        </Link> */}
      {/* <Link
          href="/docs/components"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/docs/components")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Use Cases
        </Link> */}
      <Link
        href="/company"
        className={cn(
          "transition-colors hover:text-foreground/80",
          pathname?.startsWith("/company")
            ? "text-foreground"
            : "text-foreground/60"
        )}
      >
        Company
      </Link>
      <Link
        href="https://www.linkedin.com/company/infrastack-ai/jobs"
        target="_blank"
        className={cn(
          "transition-colors hover:text-foreground/80",
          pathname?.startsWith("/examples")
            ? "text-foreground"
            : "text-foreground/60"
        )}
      >
        Careers
      </Link>
      <Link
        href="https://medium.com/@ayged/introducing-the-new-era-of-ai-first-developer-driven-observability-e9b5c0b8542d"
        target="_blank"
        className={cn(
          "hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block"
        )}
      >
        Blog
      </Link>
    </nav>
    </div >
  )
}