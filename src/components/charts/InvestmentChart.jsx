import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const InvestmentChart = () => {
  const data = [
    { time: "8:00AM", green: 40, blue: 30 },
    { time: "9:00AM", green: 30, blue: 25 },
    { time: "10:00AM", green: 50, blue: 45 },
    { time: "11:00AM", green: 70, blue: 60 },
    { time: "12:00PM", green: 60, blue: 55 },
    { time: "2:00PM", green: 65, blue: 50 },
    { time: "3:00PM", green: 55, blue: 45 },
    { time: "5:00PM", green: 50, blue: 60 },
    { time: "7:00PM", green: 45, blue: 50 },
  ];

  return (
    <div className="p-4 mb-10 border border-gray-300 rounded-2xl bg-white">
      {/* Chart Header */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <h2 className="text-lg font-semibold">Investment Statistic</h2>
          <p className="text-gray-500 text-sm">
            Revealing risk, and growth in investments.
          </p>
        </div>

        {/* Time Filter Buttons */}
        <div className="flex gap-2 text-sm">
          {["1D", "5D", "1M", "1Y", "All"].map((range) => (
            <button
              key={range}
              className={`px-3 py-1 rounded ${
                range === "1D"
                  ? "bg-gray-200 font-medium"
                  : "hover:bg-gray-100"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="time" axisLine={false} tickLine={false} />
          <YAxis hide />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="blue"
            stroke="#3b82f6"
            fill="url(#colorBlue)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="green"
            stroke="#22c55e"
            fill="url(#colorGreen)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InvestmentChart;
