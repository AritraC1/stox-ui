import React, { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const StockCard = ({ symbol }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/stock/${symbol}`)
      .then(res => res.json())
      .then(setData);
  }, [symbol]);

  if (!data) return <div className="p-4">Loading...</div>;

  const formatCurrency = (num) => {
    if (!num) return "-";
    return `$${Number(num).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-3xl mx-auto mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {data.logo && <img src={data.logo} alt={data.symbol} className="w-10 h-10" />}
          <div>
            <h2 className="text-xl font-semibold">{data.symbol}</h2>
            <p className="text-gray-500">{data.companyName}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-500">Pre Market</p>
          <p className={data.preMarketPrice < data.previousClose ? "text-red-600 font-semibold" : "text-green-600 font-semibold"}>
            {formatCurrency(data.preMarketPrice)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Market Cap</p>
          <p className="font-semibold">{formatCurrency(data.marketCap)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Volume</p>
          <p className="font-semibold">{data.volume?.toLocaleString()}</p>
        </div>
      </div>

      {/* Chart */}
      <div>
        <p className="text-2xl font-semibold mb-2">
          {formatCurrency(data.currentPrice)}
          <span className={data.priceChange >= 0 ? "text-green-600 ml-2" : "text-red-600 ml-2"}>
            {data.priceChange >= 0 ? "+" : ""}
            {data.priceChange}%
          </span>
        </p>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data.history}>
            <defs>
              <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" hide />
            <YAxis hide />
            <Tooltip />
            <Area type="monotone" dataKey="price" stroke="#10b981" fillOpacity={1} fill="url(#chartColor)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockCard;
