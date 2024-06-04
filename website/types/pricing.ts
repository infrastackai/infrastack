export type Plan = "essential" | "earlyadopter" | "professional";
export type PaymentInterval = "monthly" | "yearly";
export interface PricingOptions {
  plan: Plan;
  paymentInterval: PaymentInterval;
  usersCount: number;
  eventsPerDay: number;
}

export interface PricingCalculationConfig {
  basePrice: Record<Plan, number>;
  perUserPrice: number;
  perEventExtraPrice: number;
  includedEvents: Record<Plan, number>;
  yearlyDiscount: number;
}