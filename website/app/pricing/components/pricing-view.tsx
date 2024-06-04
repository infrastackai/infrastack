"use client";
import { PricingStickyHeader } from "./pricing-sticky-header";
import { PricingTable } from "./pricing-table";
import { PricingCalculator } from "./pricing-calculator";
import { use, useEffect, useRef, useState } from "react";
import { PaymentInterval } from "@/types/pricing";
import PricingWidget from "./pricing-widget";
import { PricingFAQ } from "./pricing-faq";
import { PricingCardsDesktop } from "./pricing-cards.desktop";
import { PricingIntervalToggle } from "./pricing-interval-toggle";
import { cn } from "@/lib/utils";
export function PricingView() {
  const [paymentInterval, setPaymentInterval] =
    useState<PaymentInterval>("monthly");

  return (
    <div className="my-10 md:my-20">
      <div>
        <h1 className="font-bold text-2xl md:text-3xl text-center mb-4 md:mb-8">
          Pricing plans
        </h1>
        <div>
          <PricingIntervalToggle
            paymentInterval={paymentInterval}
            onPaymentIntervalChange={setPaymentInterval}
          />
        </div>
        <PricingStickyHeader paymentInterval={paymentInterval} />
        <div className="my-10">
          <h2 className="text-xl md:text-2xl font-semibold mb-6">
            Plans Comparison
          </h2>
          <PricingTable />
        </div>
      </div>
      <div className="my-10">
        <h2 className="text-xl md:text-2xl font-semibold mb-6">Pricing Calculator</h2>
        <div className="mb-8 text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
          voluptatem possimus officia pariatur adipisci repellat odio, modi
          laborum officiis minima reiciendis nisi esse. Earum, explicabo quidem
          deserunt excepturi quasi fugit!
        </div>
        <PricingCalculator
          paymentInterval={paymentInterval}
          onPaymentIntervalChange={setPaymentInterval}
        />
      </div>
      <div className="my-10">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Plans FAQ</h2>
        <PricingFAQ />
      </div>
    </div>
  );
}
