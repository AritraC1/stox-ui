import { Route, Routes } from "react-router-dom"
import Layout from "../layout/Layout"
import { Dashboard, MyWatchlist, News, StockComparison, Stocks } from "../pages"


const AllRoutes = () => {
    return(
        <>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="/stocks/:symbol" element={<Stocks />} />
                <Route path="/stock-comparison" element={<StockComparison />} />
                <Route path="/my-watchlist" element={<MyWatchlist />} />
                <Route path="/news" element={<News />} />
            </Route>
        </Routes>
        </>
    )
}

export default AllRoutes