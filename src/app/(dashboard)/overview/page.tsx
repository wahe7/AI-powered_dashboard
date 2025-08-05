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

  const days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    return d;
  }).reverse();
  return days.map(d => ({
    name: d.toISOString().slice(5, 10), 
    date: d.toISOString().slice(0, 10), 
    value: getRandomInt(3000, 8000)
  }));
}


const CAMPAIGNS = ['Campaign A', 'Campaign B', 'Campaign C', 'Campaign D', 'Campaign E'];

function randomizeBarChartSeries() {
  const days = Array.from({length: 30}, (_, i) => {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    return d.toISOString().slice(0, 10);
  });
  const series: { name: string; date: string; value: number }[] = [];
  for (const campaign of CAMPAIGNS) {
    for (const date of days) {
      series.push({ name: campaign, date, value: getRandomInt(100, 800) });
    }
  }
  return series;
}


const SOURCES = [
  { name: 'Search', color: '#6366f1' },
  { name: 'Social', color: '#34d399' },
  { name: 'Email', color: '#f59e42' },
  { name: 'Referral', color: '#f472b6' },
];

function randomizePieChartSeries() {
  const days = Array.from({length: 30}, (_, i) => {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    return d.toISOString().slice(0, 10);
  });
  const series: { name: string; date: string; value: number; color: string }[] = [];
  for (const source of SOURCES) {
    for (const date of days) {
      series.push({ name: source.name, color: source.color, date, value: getRandomInt(20, 100) });
    }
  }
  return series;
}


function randomizeTable() {
  const campaigns = ['Campaign A', 'Campaign B', 'Campaign C', 'Campaign D', 'Campaign E'];
  return campaigns.map(campaign => ({
    campaign,
    impressions: getRandomInt(6000, 15000),
    clicks: getRandomInt(400, 1400),
    conversions: getRandomInt(60, 220),
    ctr: `${(Math.random()*3+6).toFixed(1)}%`,
    cvr: `${(Math.random()*3+13).toFixed(1)}%`,
    date: new Date(Date.now() - getRandomInt(0, 29) * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
  }));
}

import { PopoverDateRangePicker } from "@/components/ui/PopoverDateRangePicker";

export default function OverviewPage() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<null | { label: string; value: string; change: string; color: string }[]>(null);
  const [lineData, setLineData] = useState<null | { name: string; value: number; date: string }[] | null>(null);
  const [barSeries, setBarSeries] = useState<null | { name: string; value: number; date: string }[] | null>(null);
  const [pieSeries, setPieSeries] = useState<null | { name: string; value: number; color: string; date: string }[] | null>(null);
  const [table, setTable] = useState<null | { campaign: string; impressions: number; clicks: number; conversions: number; ctr: string; cvr: string; date: string }[] | null>(null);

  const [dateRange, setDateRange] = useState<{ startDate: Date; endDate: Date }>({
    startDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    endDate: new Date(),
  });

  useEffect(() => {

    setMetrics(null);
    setLineData(null);
    setBarSeries(null);
    setPieSeries(null);
    setTable(null);
    setLoading(true);
    const t = setTimeout(() => {
      setMetrics(randomizeMetrics());
      setLineData(randomizeLineChart());
      setBarSeries(randomizeBarChartSeries());
      setPieSeries(randomizePieChartSeries());
      setTable(randomizeTable());
      setLoading(false);
    }, 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (loading) return;
    const interval = setInterval(() => {
      setMetrics(randomizeMetrics());
      setLineData(randomizeLineChart());
      setBarSeries(randomizeBarChartSeries());
      setPieSeries(randomizePieChartSeries());
      setTable(randomizeTable());
    }, 5000);
    return () => clearInterval(interval);
  }, [loading]);

  function isInRange(dateStr: string) {
    const d = new Date(dateStr);
    return d >= dateRange.startDate && d <= dateRange.endDate;
  }

  const filteredLineData = lineData ? lineData.filter(d => isInRange(d.date)) : [];
  const filteredBarData = CAMPAIGNS.map(name => ({
    name,
    value: barSeries ? barSeries.filter(d => d.name === name && isInRange(d.date)).reduce((sum, d) => sum + d.value, 0) : 0
  }));
  const filteredPieData = SOURCES.map(source => ({
    name: source.name,
    color: source.color,
    value: pieSeries ? pieSeries.filter(d => d.name === source.name && isInRange(d.date)).reduce((sum, d) => sum + d.value, 0) : 0
  }));

  const filteredTable = CAMPAIGNS.map(campaign => {
    const rows = table ? table.filter(d => d.campaign === campaign && isInRange(d.date)) : [];
    if (rows.length === 0) {
      const impressions = getRandomInt(100, 500);
      return {
        campaign,
        impressions,
        clicks: 0,
        conversions: 0,
        ctr: '0%',
        cvr: '0%',
        date: ''
      };
    }
    const impressions = rows.reduce((sum, d) => sum + d.impressions, 0);
    const clicks = rows.reduce((sum, d) => sum + d.clicks, 0);
    const conversions = rows.reduce((sum, d) => sum + d.conversions, 0);
    const ctr = (rows.reduce((sum, d) => sum + parseFloat(d.ctr), 0) / rows.length).toFixed(1) + '%';
    const cvr = (rows.reduce((sum, d) => sum + parseFloat(d.cvr), 0) / rows.length).toFixed(1) + '%';
    return { campaign, impressions, clicks, conversions, ctr, cvr, date: '' };
  });

  return (
    <>
      <div className="w-full flex flex-col md:flex-row md:items-center gap-4 md:gap-8 justify-between mb-6">
        <div>
          <span className="font-semibold text-lg mr-2">Date Range:</span>
          <PopoverDateRangePicker range={dateRange} onChange={setDateRange} />
        </div>
      </div>
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
              <LineChart data={filteredLineData} />
            </Card>
            <Card className="col-span-1">
              <div className="text-base font-semibold mb-2">Top Campaigns</div>
              <BarChart data={filteredBarData} />
            </Card>
            <Card className="col-span-1">
              <div className="text-base font-semibold mb-2">Traffic Sources</div>
              <PieChart data={filteredPieData} />
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
        ) : filteredTable.length ? (
          <DataTable columns={columns} data={filteredTable} />
        ) : null}
      </div>
    </section>
    </>
  );
}
