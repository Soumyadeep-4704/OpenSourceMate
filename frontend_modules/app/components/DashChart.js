"use client";

import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { useTheme } from "@/app/components/AuthProvider";

const DashChart = ({ data = [] }) => {
  const { theme } = useTheme();

  const isDark = theme === 'dark';
  // Define colors based on theme
  const axisColor = isDark ? '#9ca3af' : '#6b7280';
  const barColor = isDark ? '#0ed7a8' : '#35e579fa';
  const gridColor = isDark ? '#374151' : '#e0e0e0';
  const tooltipBg = isDark ? '#1f2937' : '#ffffff';
  const tooltipBorder = isDark ? '#374151' : '#ccc';

  // Fallback if data is invalid
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="h-64 w-full flex items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
        No activity data available
      </div>
    );
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis 
            dataKey="name" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            stroke={axisColor} 
          />
          <YAxis 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            allowDecimals={false} 
            stroke={axisColor} 
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: tooltipBg, 
              border: `1px solid ${tooltipBorder}`, 
              borderRadius: "8px" 
            }}
            cursor={{ fill: 'rgba(206, 206, 206, 0.2)' }}
          />
          <Bar 
            dataKey="value" 
            fill={barColor} 
            radius={[4, 4, 0, 0]} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashChart;