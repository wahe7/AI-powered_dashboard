"use client";
import React, { useRef, useState } from "react";
import { Popover } from "@headlessui/react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface DateRangePickerProps {
  range: { startDate: Date; endDate: Date };
  onChange: (range: { startDate: Date; endDate: Date }) => void;
}

export function PopoverDateRangePicker({
  range,
  onChange,
}: DateRangePickerProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const display = `${format(range.startDate, "MMM d, yyyy")} - ${format(range.endDate, "MMM d, yyyy")}`;

  return (
    <Popover className="relative inline-block">
      <Popover.Button
        ref={buttonRef}
        className="px-4 py-2 border rounded-lg shadow-sm bg-background hover:bg-muted text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
        onClick={() => setOpen(!open)}
      >
        <span className="mr-2">{display}</span>
        <svg
          width="18"
          height="18"
          fill="none"
          viewBox="0 0 24 24"
          className="inline"
        >
          <path stroke="currentColor" strokeWidth="2" d="M6 9l6 6 6-6" />
        </svg>
      </Popover.Button>
      <Popover.Panel className="absolute z-50 mt-2 left-0 bg-card rounded-xl shadow-lg border p-2">
        <DateRange
          editableDateInputs={true}
          onChange={(item: { selection: { startDate?: Date; endDate?: Date } }) => {
            const sel = item.selection;
            if (sel.startDate && sel.endDate) {
              onChange({ startDate: sel.startDate, endDate: sel.endDate });
            }
          }}
          moveRangeOnFirstSelection={false}
          ranges={[
            {
              startDate: range.startDate,
              endDate: range.endDate,
              key: "selection",
            },
          ]}
          maxDate={new Date()}
          rangeColors={["#6366f1"]}
        />
      </Popover.Panel>
    </Popover>
  );
}
