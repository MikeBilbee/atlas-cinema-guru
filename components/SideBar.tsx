// components/Sidebar.tsx
"use client"
import Link from "next/link";
import { useState } from "react";
import {
  MdHome,
  MdFavorite,
  MdOutlineWatchLater,
} from "react-icons/md";

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <aside
      className={`bg-lumi-dark-teal transition-all duration-300 ease-in-out  ${
        isSidebarOpen ? "w-64 pl-6 pr-10" : "w-14"
      }`}
      onMouseEnter={() => setIsSidebarOpen(true)}
      onMouseLeave={() => setIsSidebarOpen(false)}
    >
      <nav className="flex flex-col space-y-4 mt-8"> 
        <Link href="/" className={`sidebar-link flex items-center hover:text-lumi-navy ${isSidebarOpen ? "" : "justify-center"}`}> 
          <MdHome className="text-xl" /> 
          {isSidebarOpen && <span className="ml-2">Home</span>}
        </Link>
        <Link href="/favorites" className={`sidebar-link flex items-center hover:text-lumi-navy ${isSidebarOpen ? "" : "justify-center"}`}> 
          <MdFavorite className="text-xl" />
          {isSidebarOpen && <span className="ml-2">Favorites</span>}
        </Link>
        <Link href="/watch-later" className={`sidebar-link flex items-center hover:text-lumi-navy ${isSidebarOpen ? "" : "justify-center"}`}> 
          <MdOutlineWatchLater className="text-xl" />
          {isSidebarOpen && <span className="ml-2">Watch Later</span>}
        </Link>
      </nav>
      {isSidebarOpen && (
        <div className="mt-6 rounded-lg text-lumi-navy bg-lumi-teal p-2"> {/* Card styling */}
          <h3 className="text-lg font-semibold mb-2 text-center">Latest Activities</h3> {/* White text */}
          <div className="text-sm">
            {/* ... more activities ... */}
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;