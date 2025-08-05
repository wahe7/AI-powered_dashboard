import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

interface PieDataPoint {
  name: string;
  value: number;
  color?: string;
}

interface PieChartProps {
  data: PieDataPoint[];
}

const COLORS = [
  "#6366f1", // Indigo
  "#34d399", // Green
  "#f59e42", // Orange
  "#f472b6", // Pink
  "#60a5fa", // Blue
  "#fbbf24", // Amber
];

export function PieChart({ data }: PieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <RechartsPieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#6366f1"
          label
        >
          {data.map((entry, idx) => (
            <Cell
              key={`cell-${idx}`}
              fill={entry.color || COLORS[idx % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}
