
import React from "react";
import { LineChart, XAxis, YAxis, Tooltip, CartesianGrid, Line, ResponsiveContainer } from "recharts";

type Prediction = { date: string; price: number };

interface Props {
  predictions: Prediction[];
}

const PredictionChart: React.FC<Props> = ({ predictions }) => {
  // Format date for display
  const formatDay = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });

  return (
    <div className="bg-[#f1f0fb] rounded-xl p-4 shadow mb-2 border border-[#e5deff] animate-fade-in">
      <h2 className="text-lg font-semibold mb-2 text-vividPurple">7-Day Price Prediction</h2>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={predictions}>
          <CartesianGrid stroke="#eee" strokeDasharray="4 6" />
          <XAxis
            dataKey="date"
            tickFormatter={formatDay}
            fontSize={13}
            tick={{ fill: "#888" }}
          />
          <YAxis
            domain={["dataMin - 5", "dataMax + 5"]}
            fontSize={12}
            tick={{ fill: "#888" }}
            tickCount={6}
            width={50}
          />
          <Tooltip 
            labelFormatter={formatDay}
            contentStyle={{ borderRadius: 8, background: "#fff" }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#8b5cf6"
            strokeWidth={3}
            dot={{ r: 5, fill: "#8b5cf6", stroke: "#fff", strokeWidth: 2 }}
            activeDot={{ r: 7, fill: "#d946ef", stroke: "#8b5cf6", strokeWidth: 2 }}
            animationDuration={600}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// tailwind color override:
const vividPurple = "text-[#8b5cf6]";

export default PredictionChart;
