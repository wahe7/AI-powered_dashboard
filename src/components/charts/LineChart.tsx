import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface DataPoint {
  name: string;
  value: number;
}

interface LineChartProps {
  data: DataPoint[];
  color?: string;
}

export function LineChart({ data, color = "#6366f1" }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <RechartsLineChart
        data={data}
        margin={{ top: 16, right: 16, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={3}
          dot={false}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
