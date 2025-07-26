import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChartCandlestick, ChevronDown, ChevronUp } from "lucide-react";
import { fetchStocks } from "../api/stocks";

const StocksDropdown = ({ open }) => {
  const [StocksOpen, setStocksOpen] = useState(false);
  const [Stocks, setStocks] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (StocksOpen && Stocks.length === 0) {
      fetchStocks(1).then((data) => {
        setStocks(data);
        if (data.length < 20) setHasMore(false);
      });
    }
  }, [StocksOpen]);

  const loadMore = () => {
    const nextPage = page + 1;
    fetchStocks(nextPage).then((data) => {
      setStocks((prev) => [...prev, ...data]);
      if (data.length < 20) setHasMore(false);
      setPage(nextPage);
    });
  };

  return (
    <>
      <li
        onClick={() => setStocksOpen(!StocksOpen)}
        className="flex items-center justify-between gap-x-4 text-black text-sm cursor-pointer p-2 rounded-md hover:bg-light-white mt-2"
      >
        <div className="flex items-center gap-x-4">
          <ChartCandlestick size={20} />
          <span className={`origin-left duration-200 ${!open ? "hidden" : ""}`}>
            Stocks
          </span>
        </div>
        {open && (StocksOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
      </li>

      {StocksOpen && (
        <div className="pl-10 max-h-60 overflow-y-auto">
          {Stocks.map((stock, idx) => (
            <Link key={stock.symbol} to={`/stocks/${stock.symbol}`}>
              <div className="text-sm text-black hover:underline py-1">
                {stock.name} ({stock.symbol})
              </div>
            </Link>
          ))}
          {hasMore && (
            <button onClick={loadMore} className="text-xs text-blue-600 hover:underline mt-2">
              Load more...
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default StocksDropdown;
