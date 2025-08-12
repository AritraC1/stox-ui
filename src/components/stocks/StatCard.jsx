import React from 'react'

const StatCard = ({ label, value, change, isPositive, showEye }) => {
    return (
    <div className="flex flex-col p-4 w-full">
        {/* Label */}
        <div className="flex items-center text-gray-600 text-sm mb-1">
            {label}
            <span className="ml-1 text-gray-400 cursor-pointer">ⓘ</span>
        </div>

        {/* Value */}
        <div className="flex items-center text-2xl font-semibold">
            {value}
            {showEye && (
                <span className="ml-2 text-gray-400 cursor-pointer">👁</span>
            )}
        </div>

        {/* Change */}
        <div className="flex items-center mt-1 text-sm">
            <span
                className={`px-2 py-0.5 rounded-full font-medium ${
                    isPositive
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-500"
                    }`}
                >
                    {isPositive ? "▲" : "▼"} {change}%
            </span>
            <span className="ml-1 text-gray-500">from previous</span>
        </div>
    </div>
    );        
};

export default StatCard