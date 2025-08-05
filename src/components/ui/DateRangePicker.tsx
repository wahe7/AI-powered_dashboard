"use client";
import React from "react";
import { DateRange, RangeKeyDict } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface DateRangePickerProps {
  range: { startDate: Date; endDate: Date };
  onChange: (range: { startDate: Date; endDate: Date }) => void;
}

export function DateRangePicker({ range, onChange }: DateRangePickerProps) {
  return (
    <div className="z-50 bg-card rounded-xl shadow p-2 inline-block">
      <DateRange
        editableDateInputs={true}
        onChange={(item: RangeKeyDict) => {
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
    </div>
  );
}
