import axios from "axios";
import { Search } from "lucide-react";
import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const StockComparisonPage = () => {
  const [stock1, setStock1] = useState("");
  const [stock2, setStock2] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleCompare = async () => {
    if (!stock1 || !stock2) {
      alert("Please enter both stock values");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:3001/compare?stock1=${stock1}&stock2=${stock2}`
      );
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Error fetching comparison:", error);
      alert("Something went wrong while comparing stocks.");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (val) =>
    `$${Number(val).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    })}`;

  return (
    <div className="min-h-screen p-10">
      {/* Title */}
      <h1 className="mb-1 text-4xl font-bold text-black">Compare Stocks</h1>

      {/* Description */}
      <p className="mb-5 text-xl text-gray-400">
        A tool for you that analyzes and compares the performance, metrics, and trends of stocks.
      </p>

      {/* Search Inputs */}
      <div className="bg bg-white border border-gray-300 rounded p-5">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* First Stock */}
          <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3 w-full">
            <div className="flex flex-col flex-1">
              <label className="text-xs text-gray-500 uppercase mb-1">1st Stock</label>
              <input
                type="text"
                value={stock1}
                onChange={(e) => setStock1(e.target.value)}
                placeholder="e.g. Microsoft"
                className="bg-transparent outline-none text-gray-800"
              />
            </div>
            <Search className="text-gray-500" />
          </div>

          {/* Second Stock */}
          <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3 w-full">
            <div className="flex flex-col flex-1">
              <label className="text-xs text-gray-500 uppercase mb-1">2nd Stock</label>
              <input
                type="text"
                value={stock2}
                onChange={(e) => setStock2(e.target.value)}
                placeholder="e.g. Apple"
                className="bg-transparent outline-none text-gray-800"
              />
            </div>
            <Search className="text-gray-500" />
          </div>

          {/* Compare Button */}
          <button
            onClick={handleCompare}
            disabled={loading}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Comparing..." : "Compare Now"}
          </button>
        </div>
      </div>

      {/* Result */}
      {result && (
        <>
          {/* Overview */}
          <h3 className="text-xl font-semibold mb-4 mt-8">Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {result.overview?.map((stock, i) => (
              <div
                key={stock.symbol || i}
                className="bg-white rounded-xl shadow p-4 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <img
                      src={stock.logo}
                      alt={stock.symbol || "logo"}
                      className="w-6 h-6"
                    />
                    <h4 className="font-semibold">{stock.symbol}</h4>
                  </div>
                  <p className="text-gray-500">{stock.companyName}</p>
                </div>
                <div className="text-right">
                  <p className="text-green-600 font-semibold">
                    Revenue: {formatCurrency(stock.revenue)}
                  </p>
                  <p className="text-gray-700">
                    Market Cap: {formatCurrency(stock.marketCap)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Price Comparison */}
          <h3 className="text-xl font-semibold mb-4">Price Comparison</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {result.priceData?.map((stock, i) => (
              <div
                key={stock.symbol || i}
                className="bg-white rounded-xl shadow p-4 flex flex-col"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold">{stock.symbol}</h4>
                    <p className="text-gray-500">{stock.companyName}</p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold ${
                        stock.change >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stock.change >= 0 ? "+" : ""}
                      {stock.change}%
                    </p>
                    <p className="text-lg font-semibold">
                      {formatCurrency(stock.price)}
                    </p>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={stock.history}>
                    <defs>
                      <linearGradient
                        id={`color${stock.symbol}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={i === 0 ? "#3b82f6" : "#000000"}
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor={i === 0 ? "#3b82f6" : "#000000"}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke={i === 0 ? "#3b82f6" : "#000000"}
                      fillOpacity={1}
                      fill={`url(#color${stock.symbol})`}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default StockComparisonPage;