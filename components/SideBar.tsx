// components/Sidebar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import clockfull from "assets/clockfull.svg";
import starfull from "assets/starfull.svg";
import folder from "assets/folder.svg";

interface Activity {
	id: string;
	timestamp: string;
	title: string;
	activity: string;
}

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(`/api/activities?page=1`);
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        setActivities(data.activities);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

    const getLinkClassName = () => {
        return `sidebar-link flex items-center ${
            isSidebarOpen ? "" : "justify-center" 
        }`;
    };

	const formatUtcTime = (timestamp: string): string => {
		const date = new Date(timestamp);
		return date.toISOString().replace("T", " ").slice(0, 19) + " UTC";
	};

    return (
        <aside
            className={`bg-lumi-dark-teal transition-all duration-300 ease-in-out min-h-screen ${
                isSidebarOpen ? "w-64 pl-6 pr-10" : "w-20"
            }`}
            onMouseEnter={() => setIsSidebarOpen(true)}
            onMouseLeave={() => setIsSidebarOpen(false)}
        >
            <nav className="flex flex-col space-y-4 mt-8">
                <Link href="/" className={getLinkClassName()}>
				<Image src={folder} alt="Home" width={24} height={24} />
                    {isSidebarOpen && <span className="ml-2">Home</span>}
                </Link>
                <Link href="/favorites" className={getLinkClassName()}>
				<Image src={starfull} alt="Favorites" width={24} height={24} />
                    {isSidebarOpen && <span className="ml-2">Favorites</span>}
                </Link>
                <Link href="/watch-later" className={getLinkClassName()}>
				<Image src={clockfull} alt="Watch Later" width={24} height={24} />
                    {isSidebarOpen && <span className="ml-2">Watch Later</span>}
                </Link>
            </nav>
			{isSidebarOpen && (
        <div className="mt-6 rounded-lg text-lumi-navy bg-lumi-teal p-2">
          <h3 className="text-lg font-semibold mb-2 text-center">
            Latest Activities
          </h3>
          <div className="text-sm">
          {activities.map((activity) => (
            <div key={activity.id}>
              <p>
			  {formatUtcTime(activity.timestamp)}
			  {activity.activity === "FAVORITED" ? (
                  <>Favorited <span className="font-bold">{activity.title}</span></>
                ) : activity.activity === "WATCH_LATER" ? (
                  <>Added <span className="font-bold">{activity.title}</span> to watch later</>
                ) : (
                  <>{activity.activity} <span className="font-bold">{activity.title}</span></> 
                )}
              </p>
            </div>
          ))}
        </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;