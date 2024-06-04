import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { pricingCalculator } from "@/lib/pricingUtils";
import { PaymentInterval, PricingOptions } from "@/types/pricing";
import { HelpCircle } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const paymentIntervals = [
  { label: "Monthly", value: "monthly" },
  { label: "Annual", value: "yearly" },
];
interface Props {
  paymentInterval: PaymentInterval;
  onPaymentIntervalChange: (interval: PaymentInterval) => void;
}
export function PricingCalculator({
  paymentInterval,
  onPaymentIntervalChange,
}: Props) {
  const [pricingOpts, _setPricingOpts] = useState<
    Omit<PricingOptions, "paymentInterval">
  >({
    plan: "essential",
    usersCount: 1,
    eventsPerDay: 5,
  });

  const calculationResult = pricingCalculator({
    ...pricingOpts,
    paymentInterval,
  });

  const setPricingOpts = (
    opts: Partial<Omit<PricingOptions, "paymentInterval">>
  ) => {
    _setPricingOpts((prev) => ({
      ...prev,
      ...opts,
    }));
  };

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow p-6 md:grid grid-cols-2 gap-6">
      <div className="md:pr-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Payment Frequency</h3>
          <RadioGroup
            value={paymentInterval}
            onValueChange={onPaymentIntervalChange}
          >
            {paymentIntervals.map((interval, ix) => (
              <div className="flex items-center space-x-2" key={ix}>
                <RadioGroupItem value={interval.value} id={`${ix}`} />
                <Label htmlFor={`${ix}`}>{interval.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Team Size</h3>
          <Label htmlFor="users-count-slider">
            Active Users: {pricingOpts.usersCount}
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="inline h-4 ml-1 mb-1" />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Every user has 1 development <br></br>environment by default.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Slider
            className="mt-4"
            onValueChange={(value) => {
              setPricingOpts({ usersCount: value[0] });
            }}
            defaultValue={[pricingOpts.usersCount]}
            min={1}
            max={50}
            step={1}
            id="users-count-slider"
          />
        </div>
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Daily Events</h3>
          <Select
            value={`${pricingOpts.eventsPerDay}`}
            onValueChange={(value) =>
              setPricingOpts({ eventsPerDay: Number(value) })
            }
          >
            <SelectTrigger className="w-[210px]">
              <SelectValue placeholder="Select Event Amount" />
            </SelectTrigger>
            <SelectContent className="">
              <SelectItem value="5">5M Production Events</SelectItem>
              <SelectItem value="10">10M Production Events</SelectItem>
              <SelectItem value="20">20M Production Events</SelectItem>
              <SelectItem value="40">40M Production Events</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="sticky bottom-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 md:border-l max-md:border-t">

        <p className="text-center">Estimated Monthly Price</p>
        <p className="text-2xl text-center text-bold">
          ${Number(calculationResult.totalWithDiscount).toFixed(2)}
        </p>
      </div>
    </div>
  );
}
