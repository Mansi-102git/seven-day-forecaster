
import React from "react";
import { Card } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";

type Prediction = { date: string; price: number };

interface Props {
  predictions: Prediction[];
}

function getDayInWeek(dateStr: string) {
  return new Date(dateStr).toLocaleDateString(undefined, { weekday: "short" });
}

const PredictionCards: React.FC<Props> = ({ predictions }) => {
  return (
    <div className="flex gap-3 flex-wrap justify-center">
      {predictions.map((pred, idx) => {
        // price change vs yesterday
        const prev = idx > 0 ? predictions[idx - 1].price : pred.price;
        const diff = +(pred.price - prev).toFixed(2);
        const positive = diff > 0;
        return (
          <Card
            key={pred.date}
            className={`flex flex-col items-center px-4 py-3 rounded-xl border w-24 min-w-[80px] bg-white drop-shadow transition-transform hover-scale animate-fade-in`}
            style={{ animationDelay: `${idx * 60}ms` }}
          >
            <div className="text-gray-400 text-xs mb-1">{getDayInWeek(pred.date)}</div>
            <div className="flex items-center gap-1 font-semibold text-lg text-[#8b5cf6]">
              <DollarSign size={18} className="inline" />
              {pred.price.toFixed(2)}
            </div>
            <div
              className={`flex items-center gap-1 text-sm mt-1 font-medium ${
                diff === 0
                  ? "text-gray-400"
                  : positive
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {diff === 0 ? (
                "--"
              ) : positive ? (
                <>
                  <TrendingUp size={15} />
                  +{diff}
                </>
              ) : (
                <>
                  <TrendingDown size={15} />
                  {diff}
                </>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default PredictionCards;
