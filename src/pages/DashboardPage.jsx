import InvestmentChart from "../components/charts/InvestmentChart";
import { StatCard, StockBoard } from "../components/stocks";

const DashboardPage = () => {
    
    const stats = [
        {
            label: "Trading Balance",
            value: "$314,210",
            change: 1.36,
            isPositive: false,
        },
        {
            label: "Total Equity",
            value: "$15,030",
            change: 1.12,
            isPositive: true,
        },
        {
            label: "Profit Margin",
            value: "$50,100",
            change: 8.12,
            isPositive: true,
        },
    ];

    return(
        <div className="min-h-screen p-10">

           <div className="flex justify-between mb-5">
                <div>
                    {/* Title */}
                    <h1 className="mb-1 text-4xl font-bold text-black">Dashboard</h1>

                    {/* Description */}
                    <p className="mb-2 text-xl text-gray-400">Get updates of your assets today</p>
                </div>

                <div>
                    <button 
                    className="p-2 rounded bg-violet-500 text-white cursor-pointer mt-5 mr-3"
                    >
                        Share
                    </button>
                    <button 
                    className="p-2 rounded bg-violet-500 text-white cursor-pointer mt-5"
                    >
                        Download Report
                    </button>
                </div>
           </div>

            {/* data */}
            <div className="mb-5 border border-gray-300 rounded-2xl bg-white">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
                    {stats.map((stat, index) => (
                        <StatCard key={index} {...stat} />
                    ))}
                </div>
            </div>

            <InvestmentChart />

            <StockBoard />
        </div>
    )
}

export default DashboardPage