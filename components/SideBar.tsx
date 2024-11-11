// components/Sidebar.tsx
"use client"
import Link from "next/link";
import { 
    MdHome,
    MdFavorite,
    MdOutlineWatchLater,
} from "react-icons/md";
import { useState } from "react";

const Sidebar: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <aside
            className={`bg-lumi-dark-teal transition-all duration-300 ease-in-out ${
                isSidebarOpen ? "w-64 pl-6 pr-10" : "w-20"
            }`}
            onMouseEnter={() => setIsSidebarOpen(true)}
            onMouseLeave={() => setIsSidebarOpen(false)}
        >
            <nav className="flex flex-col space-y-4 mt-8">
                <Link href="/">
                    <MdHome className="text-xl" />
                    {isSidebarOpen && <span className="ml-2">Home</span>}
                </Link>
                <Link href="/favorites">
                    <MdFavorite className="text-xl" />
                    {isSidebarOpen && <span className="ml-2">Favorites</span>}
                </Link>
                <Link href="/watch-later"> 
                    <MdOutlineWatchLater className="text-xl" />
                    {isSidebarOpen && <span className="ml-2">Watch Later</span>}
                </Link>
            </nav>
      {isSidebarOpen && (
        <div className="mt-6 rounded-lg text-lumi-navy bg-lumi-teal p-2">
          <h3 className="text-lg font-semibold mb-2 text-center">Latest Activities</h3>
          <div className="text-sm">
            {/* ... more activities ... */}
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;