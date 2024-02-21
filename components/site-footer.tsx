import { siteConfig } from "@/config/site"
import { ArrowUp, ArrowUpRight, Circle, CircleDot, Heart } from "lucide-react"
import { Badge } from "./ui/badge"
import { Icons } from "./icons"
import Link from "next/link"
import TalkToOurFounderButton from "./talk-to-our-founder"


export function SiteFooter() {

  return (
    <footer className="py-6 md:px-8 md:py-0 mb-12 md:mb-32 mt-12 md:mt-20">
      <div className="container flex flex-col items-center justify-center gap-4 md:h-24 ">
        <div>
          <Icons.infrastack className="h-12 w-12 fill-current" />
        </div>
        <div>
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground">
            © 2024 InfraStack AI, Inc.
            <br></br>
            Build with<Heart className="inline fill-red-400 text-red-400 h-4" />in San Francisco, CA.
            <br></br>
            <a href="mailto:hello@infrastack.ai" className="text-indigo-500">hello@infrastack.ai</a>
            {/* <a
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
          </a> */}
          </p>
        </div>
        <div className="flex md:flex-row flex-col space-y-1 md:space-y-0 items-center justify-center md:space-x-4">
          <div className="p-0 m-0">
            <TalkToOurFounderButton />
          </div>
          <Link href={"/infrastack-ai-privacy-policy.pdf"} target="_blank">
            <p className="text-zinc-600 text-sm md:text-base">Privacy Policy <ArrowUpRight className="inline h-4 w-4 fill-current" /></p>
          </Link>
          <Link href={"/infrastack-ai-terms-of-conditions.pdf"} target="_blank">
            <p className="text-zinc-600 text-sm md:text-base">Terms of Service <ArrowUpRight className="inline h-4 w-4 fill-current" /></p>
          </Link>
        </div>
        <div className="mt-2">
          <Badge className="text-center w-28 cursor-pointer dark:hover:bg-emerald-900 bg-emerald-950 text-green-400 text-sm md:text-md font-normal"><CircleDot className="text-green-400 h-[14px] fill-green-400 mr-[6px]" />Healthy</Badge>
        </div>
      </div>
    </footer>
  )
}
