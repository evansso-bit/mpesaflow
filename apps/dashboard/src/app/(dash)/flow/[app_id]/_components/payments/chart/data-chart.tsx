"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@mpesaflow/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@mpesaflow/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const transactionData = [
  { date: "2024-03-03", amount: 650, status: "failed" },
  { date: "2024-03-04", amount: 1000, status: "failed" },
  { date: "2024-03-05", amount: 350, status: "failed" },
  { date: "2024-03-06", amount: 1800, status: "failed" },
  { date: "2024-03-07", amount: 900, status: "failed" },
  { date: "2024-03-08", amount: 450, status: "failed" },
];

const chartConfig = {
  amount: {
    label: "amount",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export default function DataChart() {
  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Transaction Amount Chart</CardTitle>
          <CardDescription>
            Showing total transaction amounts over time
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <BarChart accessibilityLayer data={transactionData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <YAxis
              type="number"
              dataKey="amount"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => `KSh ${value.toLocaleString()}`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="amount" fill="var(--color-amount)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
