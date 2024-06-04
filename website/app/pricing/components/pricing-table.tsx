import { cn } from "@/lib/utils";
import { Fragment } from "react";

const breakdown = [
  {
    title: "Users",
    data: ["1", "up to 50", "unlimited"],
  },
  {
    title: "Dev Environments",
    data: ["1", "up to 50", "unlimited"],
  },
  {
    title: "Ingested Events Per Day",
    data: ["1M", "5M", ">50M"],
  },
  {
    title: "Retention Period",
    data: ["7 Days", "30 Days", "90 Days"],
  },
  {
    title: "Alerts",
    data: ["1", "5", "10"],
  },
  {
    title: "Copilots",
    data: ["Basic", "Standard", "Premium"],
  },
];

export function PricingTable() {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 ">
      {breakdown.map((line, index) => (
        <Fragment key={index}>
          <div className="col-span-3 md:col-span-1 p-2 border-b md:[&:nth-child(8n+1)]:bg-muted/60   max-md:[&:nth-child(4n+1)]:bg-muted/60   ">
            {line.title}
          </div>
          {line.data.map((data, index) => (
            <div
              key={index}
              className={cn(
                "text-center p-2 border-b",
                Array.from(
                  { length: 3 },
                  (_, i) => `md:[&:nth-child(8n+${i + 2})]:bg-muted/60`
                )
              )}
            >
              {data}
            </div>
          ))}
        </Fragment>
      ))}
    </div>
  );
}
