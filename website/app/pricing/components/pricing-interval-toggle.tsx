import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PaymentInterval } from "@/types/pricing";
interface Props {
  paymentInterval: PaymentInterval;
  onPaymentIntervalChange: (interval: PaymentInterval) => void;
}
export function PricingIntervalToggle({
  onPaymentIntervalChange,
  paymentInterval,
}: Props) {
  return (
    <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mb-8">
      <div className="flex justify-center">
        <div className="flex items-center space-x-2">
          <Label htmlFor="monthly-annual-switch">Monthly</Label>
          <Switch
            id="monthly-annual-switch"
            onCheckedChange={(checked) =>
              checked
                ? onPaymentIntervalChange("yearly")
                : onPaymentIntervalChange("monthly")
            }
            checked={paymentInterval === "yearly"}
          />
          <Label htmlFor="monthly-annual-switch">Annual</Label>
        </div>
      </div>
    </div>
  );
}
