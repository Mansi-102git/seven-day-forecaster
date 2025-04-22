
import React, { useState } from "react";
import PredictionChart from "./PredictionChart";
import PredictionCards from "./PredictionCards";
import BestBuySellSuggestion from "./BestBuySellSuggestion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

type Prediction = { date: string; price: number };

// Extended mock JSON data for popular stock symbols (7 days each)
const mockStockData: Record<string, Prediction[]> = {
  AAPL: [
    { date: "2025-04-21", price: 173.2 },
    { date: "2025-04-22", price: 174.4 },
    { date: "2025-04-23", price: 172.0 },
    { date: "2025-04-24", price: 176.3 },
    { date: "2025-04-25", price: 175.1 },
    { date: "2025-04-26", price: 177.7 },
    { date: "2025-04-27", price: 178.3 },
  ],
  MSFT: [
    { date: "2025-04-21", price: 400.5 },
    { date: "2025-04-22", price: 402.8 },
    { date: "2025-04-23", price: 401.3 },
    { date: "2025-04-24", price: 403.9 },
    { date: "2025-04-25", price: 407.2 },
    { date: "2025-04-26", price: 405.7 },
    { date: "2025-04-27", price: 408.1 },
  ],
  GOOGL: [
    { date: "2025-04-21", price: 142.9 },
    { date: "2025-04-22", price: 144.1 },
    { date: "2025-04-23", price: 143.8 },
    { date: "2025-04-24", price: 146.2 },
    { date: "2025-04-25", price: 146.7 },
    { date: "2025-04-26", price: 147.1 },
    { date: "2025-04-27", price: 147.3 },
  ],
  TSLA: [
    { date: "2025-04-21", price: 215.4 },
    { date: "2025-04-22", price: 218.2 },
    { date: "2025-04-23", price: 219.7 },
    { date: "2025-04-24", price: 217.4 },
    { date: "2025-04-25", price: 220.0 },
    { date: "2025-04-26", price: 221.5 },
    { date: "2025-04-27", price: 225.2 },
  ],
  AMZN: [
    { date: "2025-04-21", price: 182.7 },
    { date: "2025-04-22", price: 184.0 },
    { date: "2025-04-23", price: 182.3 },
    { date: "2025-04-24", price: 185.2 },
    { date: "2025-04-25", price: 187.0 },
    { date: "2025-04-26", price: 189.5 },
    { date: "2025-04-27", price: 191.1 },
  ],
  NVDA: [
    { date: "2025-04-21", price: 851.9 },
    { date: "2025-04-22", price: 860.2 },
    { date: "2025-04-23", price: 858.6 },
    { date: "2025-04-24", price: 863.5 },
    { date: "2025-04-25", price: 866.8 },
    { date: "2025-04-26", price: 871.9 },
    { date: "2025-04-27", price: 879.1 },
  ],
  META: [
    { date: "2025-04-21", price: 476.5 },
    { date: "2025-04-22", price: 480.2 },
    { date: "2025-04-23", price: 478.7 },
    { date: "2025-04-24", price: 482.9 },
    { date: "2025-04-25", price: 484.1 },
    { date: "2025-04-26", price: 487.3 },
    { date: "2025-04-27", price: 489.0 },
  ],
};

const defaultSymbol = "AAPL";

const StockPredictor: React.FC = () => {
  const [symbol, setSymbol] = useState(defaultSymbol);
  const [predictions, setPredictions] = useState<Prediction[]>(mockStockData[defaultSymbol]);
  const [input, setInput] = useState("");

  const handlePredict = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const sym = input.trim().toUpperCase();
    if (mockStockData[sym]) {
      setSymbol(sym);
      setPredictions(mockStockData[sym]);
      toast({
        title: `Success!`,
        description: `Showing prediction for ${sym}`,
      });
    } else {
      toast({
        title: "No Data",
        description: `We don’t have data for "${input.toUpperCase()}". Try: AAPL, MSFT, GOOGL, TSLA, AMZN, NVDA, META.`,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 rounded-2xl shadow-xl bg-white animate-scale-in">
      <form className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6" onSubmit={handlePredict}>
        <div className="flex-1 flex items-center gap-2 w-full">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Enter stock symbol (try: AAPL, MSFT, AMZN, NVDA, META…) "
            className="md:text-lg border-gray-300"
            maxLength={8}
            spellCheck={false}
          />
          <Button onClick={handlePredict} type="submit" className="bg-[#8b5cf6] hover:bg-[#7e69ab] transition-all">
            Predict
          </Button>
        </div>
        <div className="mt-2 md:mt-0 ml-2 md:ml-4">
          <span className="font-bold text-gray-600">Current: </span>
          <span className="font-mono text-[#8b5cf6] tracking-widest text-lg">{symbol}</span>
        </div>
      </form>
      <div className="mb-6">
        <PredictionChart predictions={predictions} />
      </div>
      <PredictionCards predictions={predictions} />
      <BestBuySellSuggestion predictions={predictions} />
    </Card>
  );
};

export default StockPredictor;
