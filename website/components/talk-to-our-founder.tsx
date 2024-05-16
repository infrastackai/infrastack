'use client'
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
export default function TalkToOurFounderButton() {
    useEffect(() => {
        (async function () {
            const cal = await getCalApi();
            cal("ui", { "styles": { "branding": { "brandColor": "#000000" } }, "hideEventTypeDetails": false, "layout": "month_view" });
        })();
    }, [])
    return <button
    className={cn("dark:text-zinc-600 text-sm md:text-base")} 
        data-cal-namespace=""
        data-cal-link="aykut-gedik-infrastack-ai/talk-to-our-founder"
        data-cal-config='{"layout":"week_view"}'
    >Talk to Our Founder <ArrowUpRight className="inline h-4 w-4 fill-current" /></button>;
};