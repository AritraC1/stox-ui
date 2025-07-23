import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChartCandlestick, ChevronDown, ChevronUp } from "lucide-react";
import { fetchTickers } from "../api/tickers";

const TickerDropdown = ({ open }) => {
  const [tickersOpen, setTickersOpen] = useState(false);
  const [tickers, setTickers] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (tickersOpen && tickers.length === 0) {
      fetchTickers(1).then((data) => {
        setTickers(data);
        if (data.length < 20) setHasMore(false);
      });
    }
  }, [tickersOpen]);

  const loadMore = () => {
    const nextPage = page + 1;
    fetchTickers(nextPage).then((data) => {
      setTickers((prev) => [...prev, ...data]);
      if (data.length < 20) setHasMore(false);
      setPage(nextPage);
    });
  };

  return (
    <>
      <li
        onClick={() => setTickersOpen(!tickersOpen)}
        className="flex items-center justify-between gap-x-4 text-black text-sm cursor-pointer p-2 rounded-md hover:bg-light-white mt-2"
      >
        <div className="flex items-center gap-x-4">
          <ChartCandlestick size={20} />
          <span className={`origin-left duration-200 ${!open ? "hidden" : ""}`}>
            Tickers
          </span>
        </div>
        {open && (tickersOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
      </li>

      {tickersOpen && (
        <div className="pl-10 max-h-60 overflow-y-auto">
          {tickers.map((ticker, idx) => (
            <Link key={idx} to={`/ticker/${ticker.symbol}`}>
              <div className="text-sm text-black hover:underline py-1">
                {ticker.name} ({ticker.symbol})
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

export default TickerDropdown;
