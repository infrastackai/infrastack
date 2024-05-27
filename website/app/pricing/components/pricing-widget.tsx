'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

import { HelpCircle } from "lucide-react";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link";


export default function PricingWidget() {

    const [usersCount, setUsersCount] = useState(1);
    const [devEnvironments, setDevEnvironments] = useState(1);
    const [productionEvents, setProductionEvents] = useState("5");
    const [currentPlan, setCurrentPlan] = useState("earlyadopter");
    const [selectedPlan, setSelectedPlan] = useState(currentPlan);

    useEffect(() => {
        if (usersCount > 1) {
            setSelectedPlan("ESSENTIAL");
        }
        else if (usersCount >= 1 && usersCount < 10) {
            setSelectedPlan("earlyadopter")
        } 
        else if (usersCount >= 10) {
            setSelectedPlan("professional")

        }
    }, [usersCount]);

    return (
        <div className="container max-w-[1200px]">
            <div className="mb-10">
                <span className="mb-6">Active Users: {usersCount}
                </span>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <HelpCircle className="inline h-4 ml-1 mb-1" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Every user has 1 development <br></br>environment by default.</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <Slider className="mt-4" onValueChange={(value) => {
                    setUsersCount(value[0]);
                }} defaultValue={[usersCount]} min={1} max={50} step={1} />
            </div>
            <div className="flex flex-row flex-nowrap space-x-3">
                <div className={cn("relative grow border rounded-lg text-center p-6 w-56 h-[600px]", { 'ring-1 ring-indigo-500': (selectedPlan.toLowerCase() === 'free' || selectedPlan.toLowerCase() === 'earlyadopter') })}>
                    <Badge variant='outline' className="text-zinc-100 bg-indigo-500">{currentPlan?.toLowerCase() === 'earlyadopter' ? "EARLY ADOPTER ⭐️" : "FREE"}</Badge>
                    <p className="text-3xl font-normal mt-6">$0</p>
                    <p className="text-base text-muted-foreground font-normal mt-2">Best for low-traffic application observability.</p>

                    <p className="text-base text-muted-foreground font-normal mt-16">1 User</p>
                    <p className="text-base text-muted-foreground font-normal">1 Development Environment</p>
                    <p className="text-base text-muted-foreground font-normal">1 Production Environment</p>
                    <p className="text-base text-muted-foreground font-normal">100k Ingested Events Per Day</p>
                    <p className="text-base text-muted-foreground font-normal">Basic Copilots</p>
                    <p className="text-base text-muted-foreground font-normal">Unlimeted Copilot Usage</p>
                    <p className="text-base text-muted-foreground font-normal">Retention Period 7 Days</p>
                    <p className="text-base text-muted-foreground font-normal">1 Alert</p>
                    <p className="text-base text-muted-foreground font-normal">Slack & Email Notifications</p>

                    <Button variant="outline" className="absolute bottom-6 m-auto left-0 right-0 w-fit bg-indigo-500 hover:bg-indigo-600 disabled">Current Plan</Button>
                </div>
                <div className={cn("relative grow border rounded-lg text-center jus p-6 w-56", { 'ring-1 ring-indigo-500': (selectedPlan.toLowerCase() === 'essential') })}>
                    <Badge className="bg-zinc-900 text-zinc-100">ESSENTIAL</Badge>
                    <p className="text-3xl font-normal mt-6">${20 + 20 * usersCount + (productionEvents === "5" ? 0 : parseInt(productionEvents) * 4)}/mo</p>
                    <p className="text-base text-muted-foreground font-normal mt-2">Best for teams and multiple environments.</p>

                    <div className="w-full flex justify-center mt-6">
                        <Select defaultValue={productionEvents} onValueChange={(value) => setProductionEvents(value)}>
                            <SelectTrigger className="w-[210px]">
                                <SelectValue placeholder="Select Event Amount" />
                            </SelectTrigger>
                            <SelectContent className="">
                                <SelectGroup>
                                    {/* <SelectLabel>Fruits</SelectLabel> */}
                                    <SelectItem value="5">5M Production Events</SelectItem>
                                    <SelectItem value="10">10M Production Events</SelectItem>
                                    <SelectItem value="20">20M Production Events</SelectItem>
                                    <SelectItem value="40">40M Production Events</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <p className="text-base text-muted-foreground font-normal mt-8">{usersCount} User{usersCount > 1 ? 's' : ''}</p>
                    <p className="text-base text-muted-foreground font-normal">{usersCount} Development Environment{usersCount > 1 ? 's' : ''}</p>
                    <p className="text-base text-muted-foreground font-normal">1 Production Environment</p>
                    <p className="text-base text-muted-foreground font-normal">1M Ingested Events Per Day</p>
                    <p className="text-base text-muted-foreground font-normal">Standard Copilots</p>
                    <p className="text-base text-muted-foreground font-normal">Retention Period 1 Month</p>
                    <p className="text-base text-muted-foreground font-normal">5 Alerts</p>
                    <p className="text-base text-muted-foreground font-normal">+ Everything Free</p>


                    <Button className="absolute bottom-6 m-auto left-0 right-0 w-fit bg-indigo-500 hover:bg-indigo-600">Upgrade</Button>


                </div>
                <div className={cn("relative grow border rounded-lg text-center jus p-6 w-56", { 'ring-1 ring-indigo-500': (selectedPlan.toLowerCase() === "professional") })}>                    
                <Badge className="">PROFESSIONAL</Badge>
                    <p className="text-3xl font-normal mt-6">Get in touch</p>
                    <p className="text-base text-muted-foreground font-normal mt-2">Best for unique requirements that <br></br> need to scale.</p>
                    <p className="text-base text-muted-foreground font-normal mt-6">Talk with an expert to discuss <br></br> your unique needs.</p>


                    <p className="text-base text-muted-foreground font-normal mt-12">Advanced Copilots & Agents</p>
                    <p className="text-base text-muted-foreground font-normal">On Prem Support</p>
                    <p className="text-base text-muted-foreground font-normal mb-20">+ Everything Essential</p>
                    <Link href="mailto:hello@infrastack.ai">
                        <Button className="absolute bottom-6 m-auto left-0 right-0 w-fit bg-indigo-500 hover:bg-indigo-600">Contact Us</Button>
                    </Link>
                </div>
            </div>
            {false && <Accordion type="single" collapsible className="w-ful mt-10">
                <AccordionItem value="item-1">
                    <AccordionTrigger><span className="text-lg">Users & Teams</span></AccordionTrigger>
                    <AccordionContent>
                        Yes. It&apos;s animated by default, but you can disable it if you
                        prefer.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger><span className="text-lg">Environments</span></AccordionTrigger>
                    <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger><span className="text-lg">Mixture of Expert LLMs</span></AccordionTrigger>
                    <AccordionContent>
                        Yes. It comes with default styles that matches the other
                        components&apos; aesthetic.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger><span className="text-lg">Security and Compliance</span></AccordionTrigger>
                    <AccordionContent>
                        Yes. It comes with default styles that matches the other
                        components&apos; aesthetic.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>}
        </div>
    )
}
