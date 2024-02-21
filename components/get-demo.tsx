'use client'
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
export default function GetDemoButton() {
    useEffect(() => {
        (async function () {
            const cal = await getCalApi();
            cal("ui", { "styles": { "branding": { "brandColor": "#000000" } }, "hideEventTypeDetails": false, "layout": "month_view" });
        })();
    }, [])
    return <Button
    variant={"outline"}
    className={cn("text-zinc-300 dark:md:text-lg border-zinc-300 dark:border-[1px] dark:border-solid z-50")} 
        data-cal-namespace=""
        data-cal-link="aykut-gedik-infrastack-ai/get-a-demo"
        data-cal-config='{"layout":"week_view"}'
    >Get a Demo</Button>;
};