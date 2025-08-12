// Layout.tsx
import { Outlet } from "react-router-dom";
import { Sidebar, Topbar } from "../components/common";

export default function Layout() {
    const isDark = true; 

    return (
        <div className={`${isDark ? 'dark' : ''} flex h-screen overflow-hidden`}>
        <div className="flex h-screen w-full bg-white text-black">
            <Sidebar />
            <div className="flex flex-col flex-1">
            <Topbar/>
            <main className="flex-1 overflow-y-auto bg-gray-50">
                <Outlet />
            </main>
            </div>
        </div>
        </div>
    );
}