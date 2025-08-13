import { useState } from "react";
import { Link } from "react-router-dom";
import { 
    LayoutDashboard, 
    ChartCandlestick, 
    GitCompareArrows, 
    Settings, 
    BadgeQuestionMark, 
    CircleChevronLeft, 
    CircleChevronRight, 
    Newspaper, 
    Star, 
} from 'lucide-react';
import myLogo from '../../assets/logo/stox_logo.svg';
import StocksDropdown from "./StocksDropdown";

const Sidebar = () => {
    const [open, setOpen] = useState(true);

    const Menus = [
        { title: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/" },
        { title: "Stocks", icon: <ChartCandlestick size={20} />, path: "/stocks" },
        { title: "Stock Comparison", icon: <GitCompareArrows size={20} />, path: "/stock-comparison", new: true },
        { title: "My Watchlist", icon: <Star size={20} />, path: "/my-watchlist", new: true },
        // { title: "News", icon: <Newspaper size={20} />, path: "/news", new: true },
        // { title: "Setting", icon: <Settings size={20} />, path: "/settings", gap: true },
        // { title: "Help", icon: <BadgeQuestionMark size={20} />, path: "/help" },
    ];

    return (
        <div className="flex z-40">
            <div
                className={`${
                open ? 'w-72' : 'w-20'
                } bg-white shadow h-screen p-5 pt-8 relative duration-300`}
            >
                <div
                    onClick={() => setOpen(!open)}
                    className="absolute cursor-pointer -right-3 top-9 w-7 h-7 flex items-center justify-center rounded-full text-black"
                >
                    {open ? <CircleChevronLeft /> : <CircleChevronRight />}
                </div>

                <div className="flex gap-x-4 items-center">
                    <img
                        src={myLogo}
                        className={`h-20 w-20 cursor-pointer duration-500 ${
                        open ? 'rotate-[360deg]' : ''
                        }`}
                        alt="Logo"
                    />
                    <h1
                        className={`text-black origin-left font-medium text-xl duration-200 ${
                        !open ? 'scale-0' : ''
                        }`}
                    >
                        Stox
                    </h1>
                </div>

                <ul className="pt-6">
                    {Menus.map((menu, index) =>
                        menu.title === "Stocks" ? (
                            <StocksDropdown key="stock" open={open} />
                        ) : (
                            <Link key={index} to={menu.path}>
                                <li
                                    className={`flex items-center gap-x-4 text-black text-sm cursor-pointer p-2 rounded-md hover:bg-light-white
                                        ${menu.gap ? 'mt-9' : 'mt-2'} ${
                                        index === 0 ? 'bg-light-white' : ''
                                        }`}
                                >
                                    {menu.icon}
                                    <span className={`origin-left duration-200 ${!open ? 'hidden' : ''}`}>
                                        {menu.title}
                                    </span>

                                    {menu.new && open && (
                                        <span className="ml-auto bg-red-100 text-red-500 text-xs px-2 py-0.5 rounded-full">
                                            NEW
                                        </span>
                                    )}
                                </li>
                            </Link>
                        )
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
