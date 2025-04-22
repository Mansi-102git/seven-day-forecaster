
import React from "react";
import { DollarSign, CalendarClock } from "lucide-react";

type Prediction = { date: string; price: number };

interface Props {
  predictions: Prediction[];
}

const formatDay = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });

const BestBuySellSuggestion: React.FC<Props> = ({ predictions }) => {
  if (!predictions?.length) return null;

  // Find min (buy) and max (sell) price and their indexes
  let buyIdx = 0, sellIdx = 0;
  predictions.forEach((pred, idx) => {
    if (pred.price < predictions[buyIdx].price) buyIdx = idx;
    if (pred.price > predictions[sellIdx].price) sellIdx = idx;
  });

  const buy = predictions[buyIdx];
  const sell = predictions[sellIdx];

  return (
    <div className="bg-[#e9fdf4] border border-green-200 rounded-xl px-5 py-4 mt-5 mb-1 flex flex-col items-center gap-2 animate-fade-in">
      <div className="text-md font-medium mb-1 flex items-center gap-2">
        <CalendarClock size={18} className="text-green-700" />
        Suggested Strategy
      </div>
      <div className="flex gap-4 flex-wrap justify-center">
        <div className="flex flex-col items-center">
          <span className="font-semibold text-green-600 flex items-center gap-1">
            Buy:
            <DollarSign size={15} className="inline" />
            {buy.price.toFixed(2)}
          </span>
          <span className="text-xs text-gray-500">{formatDay(buy.date)}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-semibold text-vividPurple flex items-center gap-1">
            Sell:
            <DollarSign size={15} className="inline" />
            {sell.price.toFixed(2)}
          </span>
          <span className="text-xs text-gray-500">{formatDay(sell.date)}</span>
        </div>
      </div>
      <div className="text-xs text-gray-700 mt-1">Buy at lowest, sell at highest predicted price. Past performance is not financial advice.</div>
    </div>
  );
};

// tailwind color override for vividPurple
const vividPurple = "text-[#8b5cf6]";

export default BestBuySellSuggestion;
