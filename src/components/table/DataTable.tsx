import * as React from "react";
import { useReactTable, getCoreRowModel, flexRender, getSortedRowModel, getFilteredRowModel, ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  // CSV Export helper
  function exportToCSV(rows: any[]) {
    if (!rows.length) return;
    const header = Object.keys(rows[0].original).join(",");
    const csv = [header, ...rows.map(r => Object.values(r.original).map((v: any) => `"${String(v).replace(/"/g, '""')}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'export.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  const [sorting, setSorting] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
  });

  return (
    <div className="w-full overflow-x-auto rounded-xl shadow bg-card">
      <div className="flex items-center justify-between p-4 gap-2 flex-wrap">
        <input
          className="border rounded px-3 py-1 text-sm w-60 focus:outline-none focus:ring"
          placeholder="Search..."
          value={globalFilter}
          onChange={e => setGlobalFilter(e.target.value)}
        />
        <button
          className="ml-2 px-4 py-1 rounded bg-primary text-primary-foreground text-sm font-semibold shadow hover:bg-primary/90 transition"
          onClick={() => exportToCSV(table.getFilteredRowModel().rows)}
        >
          Export CSV
        </button>
      </div>

      {/* CSV Export helper function */}
      {/* Place this function inside the DataTable component */}
      
      <table className="min-w-full divide-y divide-border">
        <thead className="bg-muted">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className={cn("px-4 py-2 text-left text-xs font-semibold text-muted-foreground cursor-pointer select-none", header.column.getCanSort() && "hover:underline")}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted() ? (header.column.getIsSorted() === "asc" ? " ▲" : " ▼") : ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-card">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-muted/40 transition-colors">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-4 py-2 text-sm">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
