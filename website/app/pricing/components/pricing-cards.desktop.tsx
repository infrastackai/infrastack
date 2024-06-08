import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { pricingCalculator } from "@/lib/pricingUtils";
import { cn } from "@/lib/utils";
import { PaymentInterval, PricingOptions } from "@/types/pricing";
import { CheckCircledIcon } from "@radix-ui/react-icons";

import Link from "next/link";

interface Props {
  paymentInterval: PaymentInterval;
}
export function PricingCardsDesktop({ paymentInterval }: Props) {
  const defaultOpts: PricingOptions = {
    plan: "essential",
    usersCount: 1,
    eventsPerDay: 5,
    paymentInterval,
  };
  const calculatedPrice = pricingCalculator(defaultOpts);
  return (
    <div className="grid grid-cols-3 gap-10">
      <div className={cn("border rounded-lg p-6 flex flex-col")}>
        <div className="text-center">
          <Badge variant="secondary">EARLY ADOPTER ⭐️</Badge>
          <p className="text-3xl font-normal mt-6">$0</p>
          <p className="text-base text-muted-foreground font-normal mt-2">
            Best for low-traffic application observability.
          </p>
        </div>

        <div className="grow">
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2 list-none">
            <li className="text-base text-muted-foreground font-normal  relative">
              <CheckCircledIcon className="absolute -left-5 top-1 text-primary" />
              1 User
            </li>
            <li className="text-base text-muted-foreground font-normal  relative">
              <CheckCircledIcon className="absolute -left-5 top-1 text-primary" />
              1 Development Environment
            </li>
            <li className="text-base text-muted-foreground font-normal  relative">
              <CheckCircledIcon className="absolute -left-5 top-1 text-primary" />
              1 Production Environment
            </li>
            <li className="text-base text-muted-foreground font-normal  relative">
              <CheckCircledIcon className="absolute -left-5 top-1 text-primary" />
              100k Ingested Events Per Day
            </li>
            <li className="text-base text-muted-foreground font-normal  relative">
              <CheckCircledIcon className="absolute -left-5 top-1 text-primary" />
              Basic Copilots
            </li>
            <li className="text-base text-muted-foreground font-normal  relative">
              <CheckCircledIcon className="absolute -left-5 top-1 text-primary" />
              Unlimeted Copilot Usage
            </li>
            <li className="text-base text-muted-foreground font-normal  relative">
              <CheckCircledIcon className="absolute -left-5 top-1 text-primary" />
              Retention Period 7 Days
            </li>
            <li className="text-base text-muted-foreground font-normal  relative">
              <CheckCircledIcon className="absolute -left-5 top-1 text-primary" />
              1 Alert
            </li>
            <li className="text-base text-muted-foreground font-normal  relative">
              <CheckCircledIcon className="absolute -left-5 top-1 text-primary" />
              Slack & Email Notifications
            </li>
          </ul>
        </div>

        <div className="text-center mb-2">
          <Button variant="secondary">
            Get Started
          </Button>
        </div>
        <div className="text-center text-muted-foreground">
          No credit card required
        </div>
      </div>
      <div
        className={cn(
          "border rounded-lg p-6 ring-1 ring-indigo-500 flex flex-col"
        )}
      >
        <div className="text-center">
          <Badge>ESSENTIAL</Badge>
          <p className="text-3xl font-normal mt-6">
            ${Number(calculatedPrice.totalWithDiscount).toFixed(2)}/mo
          </p>
          <p className="text-base text-muted-foreground font-normal mt-2">
            Best for teams and multiple environments.
          </p>
        </div>
        <div className="grow">
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2 list-none">
            <li className="text-base text-muted-foreground font-normal  relative">
              <CheckCircledIcon className="absolute -left-5 top-1 text-primary" />
              up to 50 Users
            </li>
            <li className="text-base text-muted-foreground font-normal  relative">
              <CheckCircledIcon className="absolute -left-5 top-1 text-primary" />
              up to 50 Development Environments
            </li>
            <li className="text-base text-muted-foreground font-normal  relative">
              <CheckCircledIcon className="absolute -left-5 top-1 text-primary" />
              1 Production Environment
            </li>
            <li className="text-base text-muted-foreground font-normal  relative">
              <CheckCircledIcon className="absolute -left-5 top-1 text-primary" />
              1M Ingested Events Per Day
            </li>
            <li className="text-base text-muted-foreground font-normal  relative">
              <CheckCircledIcon className="absolute -left-5 top-1 text-primary" />
              Standard Copilots
            </li>
            <li className="text-base text-muted-foreground font-normal  relative">
              <CheckCircledIcon className="absolute -left-5 top-1 text-primary" />
              Retention Period 1 Month
            </li>
            <li className="text-base text-muted-foreground font-normal  relative">
              <CheckCircledIcon className="absolute -left-5 top-1 text-primary" />
              5 Alerts
            </li>
            <li className="text-base text-muted-foreground font-normal  relative">
              <CheckCircledIcon className="absolute -left-5 top-1 text-primary" />
              + Everything Free
            </li>
          </ul>
        </div>

        <div className="text-center">
          <Button>Start a free trial</Button>
        </div>
      </div>
      <div className={cn("border rounded-lg jus p-6 flex flex-col")}>
        <div className="text-center">
          <Badge variant="secondary">PROFESSIONAL</Badge>
          <p className="text-3xl font-normal mt-6">Get in touch</p>
          <p className="text-base text-muted-foreground font-normal mt-2">
            Best for unique requirements that <br></br> need to scale.
          </p>
        </div>
        <div className="grow">
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2 list-none">
            <li className="text-base text-muted-foreground font-normal  relative">
              <CheckCircledIcon className="absolute -left-5 top-1 text-primary" />
              Talk with an expert to discuss <br></br> your unique needs.
            </li>
            <li className="text-base text-muted-foreground font-normal  relative">
              <CheckCircledIcon className="absolute -left-5 top-1 text-primary" />
              Advanced Copilots & Agents
            </li>
            <li className="text-base text-muted-foreground font-normal  relative">
              <CheckCircledIcon className="absolute -left-5 top-1 text-primary" />
              On Prem Support
            </li>
            <li className="text-base text-muted-foreground font-normal  relative">
              <CheckCircledIcon className="absolute -left-5 top-1 text-primary" />
              + Everything Essential
            </li>
          </ul>
        </div>
        <div className="text-center">
          <Link href="mailto:hello@infrastack.ai">
            <Button variant="secondary">Contact Us</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
