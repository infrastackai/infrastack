import Link from "next/link"
import { ArrowRightIcon } from "@radix-ui/react-icons"

import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export function Announcement() {
  return (
    <div
      // href="#"
      className="z-[60] inline-flex items-center justify-center border dark:border-zinc-800 rounded-lg  px-3 py-1 text-xs  md:text-sm font-medium"
    >
      {<span className="relative flex h-3 w-3">
        {<span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75`}></span>}
        {<span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>}
      </span>}
      {/* <span className="sm:hidden">New components and more.</span> */}
      <span className="ml-3">Events Processed Last 30 Days: </span>
      {/* <Separator className="mx-2 h-4 w-[1px] border-zinc-800" orientation="vertical" />{" "} */}
      <span className="inline ml-2 text-green-500">
        500M+
      </span>
      {/* <Separator className="mx-2 h-4 w-[1px] border-zinc-800" orientation="vertical" />{" "} */}

      {/* <div className="p-0  pr-2  text-[12px] rounded-xl text-yellow-500">Closed Beta</div> */}

      {/* <ArrowRightIcon className="ml-1 h-4 w-4" /> */}
    </div>
  )
}