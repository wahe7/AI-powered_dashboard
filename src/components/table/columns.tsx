"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";

export type CampaignRow = {
  campaign: string;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: string;
  cvr: string;
};

export const columns: ColumnDef<CampaignRow>[] = [
  {
    accessorKey: "campaign",
    header: "Campaign",
    cell: (info) => (
      <span className="font-medium">{info.getValue() as string}</span>
    ),
  },
  {
    accessorKey: "impressions",
    header: "Impressions",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "clicks",
    header: "Clicks",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "conversions",
    header: "Conversions",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "ctr",
    header: "CTR",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "cvr",
    header: "CVR",
    cell: (info) => info.getValue(),
  },
];
