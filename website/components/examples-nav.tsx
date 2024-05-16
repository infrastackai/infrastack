"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRightIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Cable, FileStack, Plug2, Sparkle, Sparkles, icons, } from "lucide-react"
import { Icons } from "@/components/icons"

const examples = [
  {
    name: "Smart Distributed Tracing",
    href: "#",
    code: "#",
  },
  // {
  //   name: "Live Graphs & Dynamic Dashboards",
  //   href: "/examples/dashboard",
  //   code: "https://github.com/shadcn/ui/tree/main/apps/www/app/examples/dashboard",
  //   icon: Icons.graph
  // },
  {
    name: "Actionable Insights",
    href: "#",
    code: "#",
    // icon: Icons.lightbulb
  },
  {
    name: "Observability Pipelines",
    href: "#",
    code: "#",
    icon: Cable
  },
  {
    name: "Domain Expert Copilots",
    href: "#",
    code: "#",
  },
  // {
  //   name: "Document-less Integration",
  //   href: "/examples/dashboard",
  //   code: "https://github.com/shadcn/ui/tree/main/apps/www/app/examples/dashboard",
  //   icon: FileStack
  // },
  // {
  //   name: "Dynamic Dashboards",
  //   href: "/examples/dashboard",
  //   code: "https://github.com/shadcn/ui/tree/main/apps/www/app/examples/dashboard",
  // },
  // {
  //   name: "",
  //   href: "/examples/cards",
  //   code: "https://github.com/shadcn/ui/tree/main/apps/www/app/examples/cards",
  // },
]

interface ExamplesNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ExamplesNav({ className, ...props }: ExamplesNavProps) {
  const pathname = usePathname()

  return (
    <div className="relative  hidden md:block">
      <ScrollArea className="whitespace-nowrap max-w-[600px] md:max-w-none lg:max-w-none">
        <div className={cn("mb-4 flex flex-row items-center", className)} {...props}>
          {examples.map((example, index) => (
            <div
              // href={"#"}
              key={example.href+""+ index}
              className={cn(
                "disabled  flex md:h-10 h-8 mr-2 items-center justify-center border border-zinc-800 shadow-inner rounded-full px-4 text-center text-sm md:text-base transition-colors hover:text-primary",
                pathname?.startsWith(example.href) ||
                  (index === 0 && pathname === "/")
                  ? " font-medium text-primary"
                  : "font-medium text-primary"
              )}
            >
              {!example.icon ? <Sparkles className="h-4" /> : <example.icon className="h-4 mr-[3px]" />} {example.name}
            </div>
            
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  )
}

interface ExampleCodeLinkProps {
  pathname: string | null
}

export function ExampleCodeLink({ pathname }: ExampleCodeLinkProps) {
  const example = examples.find((example) => pathname?.startsWith(example.href))

  if (!example?.code) {
    return null
  }

  return (
    <Link
      href={example?.code}
      target="_blank"
      rel="nofollow"
      className="absolute right-0 top-0 hidden items-center rounded-[0.5rem] text-sm font-medium md:flex"
    >
      View code
      <ArrowRightIcon className="ml-1 h-4 w-4" />
    </Link>
  )
}