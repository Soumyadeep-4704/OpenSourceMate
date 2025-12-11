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

export default function DashChart({data = []}) {

  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const axisColor = isDark ? '#9ca3af' : '#6b7280';
  const barColor = isDark ? '#3b82f6' : '#1a73e8';
  const gridColor = isDark ? '#374151' : '#e0e0e0';
  const tooltipBg = isDark ? '#1f2937' : '#ffffff';
  const tooltipBorder = isDark ? '#374151' : '#ccc';

  // Explicitly destructure 'data' from props with a default value of []
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="h-64 w-full flex items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
        No activity data available
      </div>
    );
  }

  return (
    // ResponsiveContainer makes the chart adapt to its parent's size
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 20, // Give space for labels
            left: -20, // Adjust to pull Y-axis labels closer
            bottom: 5,
          }}
        >
          {/* A light grid in the background */}
          <CartesianGrid 
          strokeDasharray="3 3" 
          stroke="#e0e0e0" />
          
          {/* X-axis (days) */}
          <XAxis 
            dataKey="name" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
            stroke={axisColor}
          />
          
          {/* Y-axis (commit count) */}
          <YAxis 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            allowDecimals={false} 
            stroke={axisColor}  
          />
          
          {/* Tooltip that appears on hover */}
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "#fff", 
              border: "1px solid #ccc", 
              borderRadius: "8px" }}
            cursor={{ fill: 'rgba(206, 206, 206, 0.2)' }}
          />
          
          {/* The actual bars */}
          <Bar 
            dataKey="value" 
            fill={barColor} //Bar Color
            radius={[4, 4, 0, 0]} //Rounded Tops
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}