// app/layout.tsx
import { Metadata } from "next";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import { SessionProvider } from "next-auth/react";
import "./global.css";

export const metadata: Metadata = {
    title: "Cinema Guru | Atlas School",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`antialiased bg-lumi-navy text-white min-h-screen`}>
                <SessionProvider>
                        <Header />
                        <div className="flex pt-[3.5rem]">
                            <Sidebar />
                            <main className="flex-1">
                                {children}
                            </main>
                        </div>
                </SessionProvider>
            </body>
        </html>
    );
}