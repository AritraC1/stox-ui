import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";
import { Star } from "lucide-react";

const StocksPage = () => {
    const { symbol } = useParams();
    const [stock, setStock] = useState(null);
    const [history, setHistory] = useState([]);
    const [isInWatchlist, setIsInWatchlist] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const stockRes = await axios.get(`http://localhost:3001/stocks/${symbol}`);
                setStock(stockRes.data);

                const histRes = await axios.get(
                    `http://localhost:3001/stocks/${symbol}/history?period=1mo&interval=1d`
                );
                setHistory(histRes.data.history);
            } catch (err) {
                console.error("Error fetching stock data:", err);
            }
        };
        fetchData();
    }, [symbol]);

    const toggleWatchlist = async () => {
        try {
            if (isInWatchlist) {
                await axios.delete(`http://localhost:3001/watchlist/${symbol}`);
            } else {
                await axios.post(`http://localhost:3001/watchlist`, { symbol });
            }
            setIsInWatchlist(!isInWatchlist);
        } catch (err) {
            console.error("Error updating watchlist:", err);
        }
    };

    if (!stock) return <div className="p-10">Loading stock data...</div>;

    return (
        <div className="p-10 bg-white m-5 rounded border border-gray-300 shadow">
            {/* Header with logo, name, and watchlist */}
            <div className="flex items-center gap-4 mb-4">
                {stock.logo && (
                    <img
                        src={stock.logo}
                        alt={`${stock.name} logo`}
                        className="w-12 h-12 object-contain"
                    />
                )}
                <div className="flex-1">
                    <h1 className="text-3xl font-bold">{stock.name || symbol}</h1>
                    <p className="text-gray-700 text-sm">Symbol: {symbol}</p>
                </div>
                <button
                    onClick={toggleWatchlist}
                    className="p-2 rounded hover:bg-gray-100"
                    title={isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
                >
                    <Star
                        size={24}
                        className={isInWatchlist ? "text-yellow-500 fill-yellow-500" : "text-gray-500"}
                    />
                </button>
            </div>

            {/* Price and change */}
            <p className="text-gray-600 mt-2">Price: ₹{stock.price}</p>
            <p className="text-gray-600">
                Change: {stock.change.toFixed(4)} ({stock.changePercent.toFixed(4)}%)
            </p>

            {/* Chart */}
            <div className="mt-6" style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                    <LineChart data={history}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={["auto", "auto"]} />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="close"
                            stroke="#8884d8"
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default StocksPage;