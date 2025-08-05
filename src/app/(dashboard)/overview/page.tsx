"use client";

import { Card, Skeleton } from "@/components/ui";
import { RunningAnimal } from "@/components/ui/RunningAnimal";
import React, { useState, useEffect } from "react";
import { LineChart, BarChart, PieChart } from "@/components/charts";
import { DataTable } from "@/components/table/DataTable";
import { columns } from "@/components/table/columns";
import { lineChartData, barChartData, pieChartData, tableData } from "@/lib/mockData";

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomizeMetrics() {
  return [
    { label: "Revenue", value: `$${getRandomInt(35000, 55000).toLocaleString()}`, change: `+${getRandomInt(5,15)}%`, color: "text-green-600" },
    { label: "Users", value: getRandomInt(7000, 12000).toLocaleString(), change: `+${getRandomInt(2,8)}%`, color: "text-blue-600" },
    { label: "Conversions", value: getRandomInt(900, 1600).toLocaleString(), change: `+${getRandomInt(1,10)}%`, color: "text-purple-600" },
    { label: "Growth %", value: `${(Math.random() * 5 + 1).toFixed(1)}%`, change: `+${getRandomInt(1,4)}%`, color: "text-yellow-600" },
  ];
}

function randomizeLineChart() {
  return [
    { name: 'Jan', value: getRandomInt(3000, 6000) },
    { name: 'Feb', value: getRandomInt(3000, 6000) },
    { name: 'Mar', value: getRandomInt(3000, 7000) },
    { name: 'Apr', value: getRandomInt(3000, 7000) },
    { name: 'May', value: getRandomInt(4000, 8000) },
    { name: 'Jun', value: getRandomInt(3000, 7000) },
    { name: 'Jul', value: getRandomInt(3000, 7000) },
  ];
}

function randomizeBarChart() {
  return [
    { name: 'Campaign A', value: getRandomInt(2000, 9000) },
    { name: 'Campaign B', value: getRandomInt(1000, 6000) },
    { name: 'Campaign C', value: getRandomInt(5000, 12000) },
    { name: 'Campaign D', value: getRandomInt(2000, 7000) },
    { name: 'Campaign E', value: getRandomInt(2000, 8000) },
  ];
}

function randomizePieChart() {
  return [
    { name: 'Search', value: getRandomInt(200, 600), color: '#6366f1' },
    { name: 'Social', value: getRandomInt(200, 600), color: '#34d399' },
    { name: 'Email', value: getRandomInt(200, 600), color: '#f59e42' },
    { name: 'Referral', value: getRandomInt(100, 400), color: '#f472b6' },
  ];
}

function randomizeTable() {
  return [
    { campaign: 'Campaign A', impressions: getRandomInt(8000, 14000), clicks: getRandomInt(600, 1200), conversions: getRandomInt(80, 200), ctr: `${(Math.random()*3+6).toFixed(1)}%`, cvr: `${(Math.random()*3+13).toFixed(1)}%` },
    { campaign: 'Campaign B', impressions: getRandomInt(7000, 12000), clicks: getRandomInt(500, 1100), conversions: getRandomInt(70, 180), ctr: `${(Math.random()*3+6).toFixed(1)}%`, cvr: `${(Math.random()*3+13).toFixed(1)}%` },
    { campaign: 'Campaign C', impressions: getRandomInt(9000, 15000), clicks: getRandomInt(700, 1400), conversions: getRandomInt(90, 220), ctr: `${(Math.random()*3+6).toFixed(1)}%`, cvr: `${(Math.random()*3+13).toFixed(1)}%` },
    { campaign: 'Campaign D', impressions: getRandomInt(6000, 11000), clicks: getRandomInt(400, 900), conversions: getRandomInt(60, 140), ctr: `${(Math.random()*3+6).toFixed(1)}%`, cvr: `${(Math.random()*3+13).toFixed(1)}%` },
    { campaign: 'Campaign E', impressions: getRandomInt(9000, 13000), clicks: getRandomInt(700, 1200), conversions: getRandomInt(90, 180), ctr: `${(Math.random()*3+6).toFixed(1)}%`, cvr: `${(Math.random()*3+13).toFixed(1)}%` },
  ];
}

export default function OverviewPage() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<null | { label: string; value: string; change: string; color: string }[]>(null);
  const [lineData, setLineData] = useState<null | { name: string; value: number }[]>(null);
  const [barData, setBarData] = useState<null | { name: string; value: number }[]>(null);
  const [pieData, setPieData] = useState<null | { name: string; value: number; color: string }[]>(null);
  const [table, setTable] = useState<null | { campaign: string; impressions: number; clicks: number; conversions: number; ctr: string; cvr: string }[]>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    setMetrics(randomizeMetrics());
    setLineData(randomizeLineChart());
    setBarData(randomizeBarChart());
    setPieData(randomizePieChart());
    setTable(randomizeTable());
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (loading) return;
    const interval = setInterval(() => {
      setMetrics(randomizeMetrics());
      setLineData(randomizeLineChart());
      setBarData(randomizeBarChart());
      setPieData(randomizePieChart());
      setTable(randomizeTable());
    }, 5000); // update every 5 seconds
    return () => clearInterval(interval);
  }, [loading]);

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
        {loading || !metrics
          ? Array(4).fill(0).map((_, i) => (
              <Card key={i} className="flex flex-col gap-2 items-start justify-center min-h-[120px]">
                <Skeleton className="w-20 h-4 mb-2" />
                <Skeleton className="w-24 h-8 mb-2" />
                <Skeleton className="w-16 h-3" />
              </Card>
            ))
          : metrics.map((metric: { label: string; value: string; change: string; color: string }) => (
              <Card key={metric.label} className="flex flex-col gap-2 items-start justify-center min-h-[120px] transition-all duration-500">
                <div className="text-sm text-muted-foreground font-medium">{metric.label}</div>
                <div className="text-3xl font-bold text-foreground animate-pulse">
                  {metric.value}
                </div>
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
