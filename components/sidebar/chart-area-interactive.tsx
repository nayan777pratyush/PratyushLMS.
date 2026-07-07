/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


export const description = "An interactive area chart"

const dummyEnrollmentData = [
  { date: "2024-06-01", enrollments: 10 },
  { date: "2024-06-09", enrollments: 33 },
  { date: "2024-06-12", enrollments: 20 },
  { date: "2024-06-19", enrollments: 44 },
  { date: "2024-06-25", enrollments: 50 },
  { date: "2024-07-06", enrollments: 35 },
  { date: "2024-07-13", enrollments: 18 },
  { date: "2024-07-19", enrollments: 15 },
  { date: "2024-07-22", enrollments: 27 },
  { date: "2024-07-28", enrollments: 25 },
  { date: "2024-08-08", enrollments: 30 },
  { date: "2024-08-10", enrollments: 51 },
  { date: "2024-08-14", enrollments: 20 },
  { date: "2024-08-19", enrollments: 35 },
  { date: "2024-08-28", enrollments: 40 },
  { date: "2024-09-07", enrollments: 18 },
  { date: "2024-09-13", enrollments: 67 },
  { date: "2024-09-19", enrollments: 49 },
  { date: "2024-09-25", enrollments: 72 },
  { date: "2024-09-30", enrollments: 32 },
  { date: "2024-10-05", enrollments: 45 },
  { date: "2024-10-11", enrollments: 10 },
  { date: "2024-10-16", enrollments: 25 },
  { date: "2024-10-27", enrollments: 42 },
  { date: "2024-10-30", enrollments: 57 },
]

const chartConfig = {
  enrollments: {
    label: "Enrollments",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

interface ChartAreaInteractiveProps {
  data: { date: string; enrollments: number }[];
}

export function ChartAreaInteractive({ data } : ChartAreaInteractiveProps) {

  const totalEnrollmentsNumber = React.useMemo(
    () => data.reduce((acc, curr) => acc + curr.enrollments, 0), 
    [data]
   );

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Enrollments</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total Enrollments for last 30 Days: {totalEnrollmentsNumber}
          </span>
          <span className="@[540px]/card:hidden">
            Last 30 Days: {totalEnrollmentsNumber}
          </span>
        </CardDescription>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <BarChart 
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis 
              dataKey="date" 
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={"preserveStartEnd"}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
              }}
            />
            <ChartTooltip 
              content={
                <ChartTooltipContent 
                  className="w-[150px]" 
                  labelFormatter={(label) => {
                    const date = new Date(label)
                    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
                  }}
                />
              } 
            />
            <Bar dataKey="enrollments" fill="var(--color-enrollments)" radius={[4, 4, 0, 0]} />    
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
