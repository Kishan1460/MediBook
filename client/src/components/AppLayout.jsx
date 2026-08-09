import { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const AppLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      setSidebarOpen(false);
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-primary-50/40">
      <Header onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
      <div className="flex flex-1">
        <Sidebar open={sidebarOpen} />
        <main className="flex-1 overflow-x-hidden px-4 py-6 sm:px-8">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
