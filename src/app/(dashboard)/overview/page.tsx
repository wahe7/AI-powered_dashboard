"use client";

import { Card, Skeleton } from "@/components/ui";
import { RunningAnimal } from "@/components/ui/RunningAnimal";
import React, { useState, useEffect } from "react";
import { LineChart, BarChart, PieChart } from "@/components/charts";
import { DataTable } from "@/components/table/DataTable";
import { columns } from "@/components/table/columns";
import { lineChartData, barChartData, pieChartData, tableData } from "@/lib/mockData";

const metrics = [
  { label: "Revenue", value: "$42,500", change: "+12%", color: "text-green-600" },
  { label: "Users", value: "8,900", change: "+5%", color: "text-blue-600" },
  { label: "Conversions", value: "1,200", change: "+8%", color: "text-purple-600" },
  { label: "Growth %", value: "3.2%", change: "+2%", color: "text-yellow-600" },
];

export default function OverviewPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/10">
          <div className="flex flex-col items-center">
            <RunningAnimal />
            <div className="mt-4 text-lg font-semibold text-yellow-700 drop-shadow animate-pulse">Loading insights…</div>
          </div>
        </div>
      )}
      <section className="w-full max-w-7xl mx-auto pt-8">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {loading
          ? Array(4).fill(0).map((_, i) => (
              <Card key={i} className="flex flex-col gap-2 items-start justify-center min-h-[120px]">
                <Skeleton className="w-20 h-4 mb-2" />
                <Skeleton className="w-24 h-8 mb-2" />
                <Skeleton className="w-16 h-3" />
              </Card>
            ))
          : metrics.map((metric) => (
              <Card key={metric.label} className="flex flex-col gap-2 items-start justify-center min-h-[120px]">
                <div className="text-sm text-muted-foreground font-medium">{metric.label}</div>
                <div className="text-3xl font-bold text-foreground">{metric.value}</div>
                <div className={`text-xs font-semibold ${metric.color}`}>{metric.change} this month</div>
              </Card>
            ))}
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
        {loading ? (
          <>
            <Card className="col-span-1 flex flex-col gap-2">
              <Skeleton className="w-32 h-5 mb-3" />
              <Skeleton className="w-full h-48 rounded-lg" />
            </Card>
            <Card className="col-span-1 flex flex-col gap-2">
              <Skeleton className="w-32 h-5 mb-3" />
              <Skeleton className="w-full h-48 rounded-lg" />
            </Card>
            <Card className="col-span-1 flex flex-col gap-2">
              <Skeleton className="w-32 h-5 mb-3" />
              <Skeleton className="w-full h-48 rounded-lg" />
            </Card>
          </>
        ) : (
          <>
            <Card className="col-span-1">
              <div className="text-base font-semibold mb-2">Revenue Trend</div>
              <LineChart data={lineChartData} />
            </Card>
            <Card className="col-span-1">
              <div className="text-base font-semibold mb-2">Top Campaigns</div>
              <BarChart data={barChartData} />
            </Card>
            <Card className="col-span-1">
              <div className="text-base font-semibold mb-2">Traffic Sources</div>
              <PieChart data={pieChartData} />
            </Card>
          </>
        )}
      </div>
      {/* Data Table */}
      <div className="mb-10">
        <div className="text-lg font-semibold mb-4">Campaign Performance</div>
        {loading ? (
          <div className="border rounded-xl overflow-hidden bg-background">
            <div className="flex flex-col divide-y">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="flex items-center px-4 py-3 gap-4">
                  <Skeleton className="w-32 h-4" />
                  <Skeleton className="w-24 h-4" />
                  <Skeleton className="w-20 h-4" />
                  <Skeleton className="w-20 h-4" />
                  <Skeleton className="w-16 h-4" />
                  <Skeleton className="w-16 h-4" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <DataTable columns={columns} data={tableData} />
        )}
      </div>
    </section>
    </>
  );
}
