
import StockPredictor from "@/components/StockPredictor";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e5deff] to-[#d3e4fd] flex flex-col items-center py-12 px-4">
      <div className="mb-8 text-center animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-extrabold text-vividPurple drop-shadow mb-2">
          7-Day Stock Price Forecaster
        </h1>
        <p className="text-lg text-gray-700">
          Predict the next 7 days of any stock—instantly (powered by smart mock data)
        </p>
      </div>
      <StockPredictor />
    </div>
  );
};

// color override
const vividPurple = "text-[#8b5cf6]";

export default Index;
