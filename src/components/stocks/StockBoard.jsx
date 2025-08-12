import React, { useState } from "react";
import { Info, MoreHorizontal, ShoppingCart, Cross, Landmark } from "lucide-react"; // Import needed icons

const StockBoard = () => {
  const tabs = ["Stock Sector", "Stock Index", "Stock Calendar", "Stock Analyst"];
  const [activeTab, setActiveTab] = useState("Stock Sector");

  const stocks = [
    {
      title: "Energy",
      count: 80,
      price: "$150,27",
      change: 8.2,
      isPositive: true,
      icon: <Cross className="w-6 h-6 text-white" />, // Replace with relevant icon
      bg: "bg-orange-500",
    },
    {
      title: "Finance",
      count: 107,
      price: "$135,30",
      change: 6.2,
      isPositive: true,
      icon: <Landmark className="w-6 h-6 text-white" />,
      bg: "bg-blue-500",
    },
    {
      title: "Health",
      count: 32,
      price: "$108,25",
      change: 2.4,
      isPositive: false,
      icon: <Cross className="w-6 h-6 text-white" />,
      bg: "bg-cyan-500",
    },
    {
      title: "Raw Product",
      count: 103,
      price: "$123,51",
      change: 3.1,
      isPositive: true,
      icon: <ShoppingCart className="w-6 h-6 text-white" />,
      bg: "bg-purple-500",
    },
  ];

  return (
    <div className="p-5 b-5 border border-gray-300 rounded-2xl bg-white">
      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-300 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-sm font-medium ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stocks.map((stock, idx) => (
          <div
            key={idx}
            className="p-4 border border-gray-300 rounded-2xl shadow flex flex-col justify-between"
          >
            {/* Top Row */}
            <div className="flex justify-between items-start mb-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${stock.bg}`}
              >
                {stock.icon}
              </div>
              <MoreHorizontal className="text-gray-500 cursor-pointer" />
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold">{stock.title}</h3>

            {/* Stock count */}
            <div className="flex items-center text-sm text-gray-500">
              {stock.count} Stock <Info size={14} className="ml-1" />
            </div>

            {/* Price & Change */}
            <div className="mt-2">
              <p className="text-xl font-bold">{stock.price}</p>
              <div
                className={`flex items-center text-sm font-medium ${
                  stock.isPositive ? "text-green-600" : "text-red-500"
                }`}
              >
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    stock.isPositive
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-500"
                  }`}
                >
                  {stock.isPositive ? "▲" : "▼"} {stock.change}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockBoard;