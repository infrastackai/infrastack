"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "./ui/button"
import { ChevronRight } from "lucide-react"

// @ts-ignore
// import { Element, scroller, animateScroll as scroll } from 'react-scroll';

export function MainNav() {
  const pathname = usePathname()

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="mr-4 hidden md:flex h-16 w-full">
      <nav className="flex flex-row items-center gap-6 text-base w-full mr-6 ml-6">
        <div className="grow flex space-x-6 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.infrastack className="h-8 w-8 drop-shadow-1" />
            <span className="hidden font-semibold text-lg sm:inline-block">
              {siteConfig.name}
            </span>
          </Link>
          <Link
            href="/pricing"
            className={cn(
              "hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block uppercase font-semibold"
            )}
          >
            Pricing
          </Link>
          <Link
            href="https://docs.infrastack.ai"
            target="_blank"
            className={cn(
              "hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block uppercase font-semibold"
            )}
          >
            Docs
          </Link>
          <Link
            href="https://docs.infrastack.ai/blog"
            target="_blank"
            className={cn(
              "hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block uppercase font-semibold"
            )}
          >
            Blog
          </Link>
        </div>
        <div className="flex flex-row space-x-4 items-center">
          <Link
            href="/company"
            className={cn(
              "transition-colors hover:text-foreground/80 uppercase font-semibold",
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
              "transition-colors hover:text-foreground/80 uppercase font-semibold",
              pathname?.startsWith("/examples")
                ? "text-foreground"
                : "text-foreground/60"
            )}
          >
            Careers
          </Link>
          <Link
            href={"https://app.infrastack.ai"}
            target="_blank"
            rel="noreferrer"
          >
            <div
              className={cn(
                buttonVariants({
                  variant: "outline",
                }),
                "px-0 pl-4 pr-4 bg-infrastack"
              )}
            >
              Login
            </div>
          </Link>
          <Link
            href={"https://app.infrastack.ai"}
            target="_blank"
            rel="noreferrer"
          >
            <div
              className={cn(
                buttonVariants({
                  variant: "secondary",
                }),
                "px-0 pl-4 pr-4 bg-indigo-600 hover:bg-indigo-800"
              )}
            >
              Start Free Trial
              <ChevronRight className="h-4 w-4 inline ml-1" />
            </div>
          </Link>
          {/* <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
          >
            <div
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
                "w-9 px-0"
              )}
            >
              <Icons.gitHub className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </div>
          </Link>
          <Link
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noreferrer"
          >
            <div
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
                "w-9 px-0"
              )}
            >
              <Icons.twitter className="h-3 w-3 fill-current" />
              <span className="sr-only">Twitter</span>
            </div>
          </Link> */}
          {/* <Link
            href={siteConfig.links.discord}
            target="_blank"
            rel="noreferrer"
          >
            <div
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
                "w-9 px-0"
              )}
            >
              <Icons.discord className="h-3 w-3 fill-current" />
              <span className="sr-only">Discord</span>
            </div>
          </Link> */}
        </div>
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
        {/* <div
          // href="/company"
          className={cn(
            "transition-colors hover:text-foreground/80 disabled",
            pathname?.startsWith("/enterprise")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          For Enterprise
        </div> */}
      </nav>
    </div >
  )
}