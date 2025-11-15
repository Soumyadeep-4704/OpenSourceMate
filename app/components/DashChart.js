"use client";

import { chartData } from "@/app/lib/mock-data";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

export default function DashChart() {
  return (
    // ResponsiveContainer makes the chart adapt to its parent's size
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 20, // Give space for labels
            left: -20, // Adjust to pull Y-axis labels closer
            bottom: 5,
          }}
        >
          {/* A light grid in the background */}
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          
          {/* X-axis (days) */}
          <XAxis 
            dataKey="name" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
          />
          
          {/* Y-axis (commit count) */}
          <YAxis 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            allowDecimals={false} 
          />
          
          {/* Tooltip that appears on hover */}
          <Tooltip 
            contentStyle={{ backgroundColor: "#fff", border: "1px solid #ccc", borderRadius: "8px" }}
            cursor={{ fill: 'rgba(206, 206, 206, 0.2)' }}
          />
          
          {/* The actual bars */}
          <Bar 
            dataKey="commits" 
            fill="#1a73e8" //Bar Color
            radius={[4, 4, 0, 0]} //Rounded Tops
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}