import { Button } from "@/components/ui/button";
import { pricingCalculator } from "@/lib/pricingUtils";
import { cn } from "@/lib/utils";
import { PaymentInterval, PricingOptions } from "@/types/pricing";
import { useState, useRef, useEffect } from "react";
import { PricingCardsDesktop } from "./pricing-cards.desktop";

interface Props {
  paymentInterval: PaymentInterval;
}
export function PricingStickyHeader({ paymentInterval }: Props) {
  const defaultOpts: PricingOptions = {
    plan: "essential",
    usersCount: 1,
    eventsPerDay: 5,
    paymentInterval,
  };
  const calculatedPrice = pricingCalculator(defaultOpts);
  const [cardsThreshold, setCardsThreshold] = useState(1);

  const cardsRef = useRef(null);
  useEffect(() => {
    const observeHandler: IntersectionObserverCallback = (ob) => {
      ob.forEach((el) => {
        setCardsThreshold(el.intersectionRatio);
      });
    };

    const observer = new IntersectionObserver(observeHandler, {
      threshold: Array.from({ length: 10 }, (_, i) => i * 0.1),
    });

    if (cardsRef.current) {
      observer.observe(cardsRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <>
      <div
        className={cn(
          "hidden md:block my-6 trasition transition-opacity duration-300 -mb-[150px]",
          {
            "opacity-0": cardsThreshold < 0.5,
          }
        )}
        ref={cardsRef}
      >
        <PricingCardsDesktop paymentInterval={paymentInterval} />
      </div>
      <div
        className={cn(
          "sticky border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 top-16 z-10",
          "trasition transition-opacity duration-300",

          {
            "md:invisible": cardsThreshold > 0.6,
            "md:opacity-0": cardsThreshold > 0.5,
          }
        )}
      >
        <div className="grid grid-cols-3 md:grid-cols-4">
          <div className="hidden md:flex" />
          <div className="text-sm text-center flex-1">
            <h2 className="my-4 text-base md:text-lg font-semibold">
              Early adopter
            </h2>
            <p className="text-base mb-8">$0</p>
            <div className="hidden md:block mb-8">
              <Button variant="secondary" disabled>
                Current Plan
              </Button>
            </div>
          </div>
          <div className="text-sm text-center flex-1">
            <h2 className="my-4 text-base md:text-lg font-semibold">
              Essential
            </h2>
            <p className="text-base mb-8">
              ${Number(calculatedPrice.totalWithDiscount).toFixed(2)}/mo
            </p>
            <div className="hidden md:block mb-8">
              <Button>Upgrade</Button>
            </div>
          </div>
          <div className="text-sm text-center flex-1">
            <h2 className="my-4 text-base md:text-lg font-semibold">
              Professional
            </h2>
            <p className="text-base mb-8">Get in touch</p>
            <div className="hidden md:block mb-8">
              <Button variant="secondary">Contact Us</Button>
            </div>
          </div>
        </div>
        <div className="mb-8 flex justify-center md:hidden">
          <Button>Get Started</Button>
        </div>
      </div>
    </>
  );
}
