import { PricingCalculationConfig, PricingOptions } from "@/types/pricing";

interface PricingCalculationResult {
  total: number;
  totalWithDiscount: number;
  discount: number;
}

// TODO: We can fetch this from CMS in the future
const DEFAULT_CONFIG: PricingCalculationConfig = {
  basePrice: {
    essential: 40,
    professional: 120,
    earlyadopter: 0,
  },
  perUserPrice: 5,
  perEventExtraPrice: 5,
  includedEvents: {
    essential: 5,
    professional: 20,
    earlyadopter: 1,
  },
  yearlyDiscount: 0.1,
};
export function pricingCalculator(
  opts: PricingOptions,
  config: PricingCalculationConfig = DEFAULT_CONFIG
): PricingCalculationResult {
  const { plan, paymentInterval, usersCount, eventsPerDay } = opts;
  if (plan === "earlyadopter") {
    return {
      total: 0,
      totalWithDiscount: 0,
      discount: 0,
    };
  }
  const { basePrice, perUserPrice, perEventExtraPrice, includedEvents } =
    config;

  const discountRate = paymentInterval === "yearly" ? config.yearlyDiscount : 0;

  const total =
    basePrice[plan] +
    usersCount * perUserPrice +
    Math.max(eventsPerDay - includedEvents[plan], 0) * perEventExtraPrice;

  const discount = total * discountRate;

  const totalWithDiscount = total - discount;

  return {
    total,
    totalWithDiscount,
    discount,
  };
}
