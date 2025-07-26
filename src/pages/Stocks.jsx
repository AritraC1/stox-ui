import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Stocks = () => {
    const { symbol } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchStock = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/stocks/${symbol}`);
            setData(res.data);
        } catch (err) {
            console.error("Error fetching stock data:", err);
        }
        };
        fetchStock();
    }, [symbol]);

    if (!data) return <div className="p-10">Loading stock data...</div>;

    return (
        <div className="p-10">
        <h1 className="text-3xl font-bold mb-2">{data.name || symbol}</h1>
        <p className="text-gray-700 text-sm">Symbol: {symbol}</p>
        <p className="text-gray-600 mt-2">Price: ₹{data.price}</p>
        <p className="text-gray-600">Change: {data.change} ({data.changePercent}%)</p>
        </div>
    );
}

export default Stocks