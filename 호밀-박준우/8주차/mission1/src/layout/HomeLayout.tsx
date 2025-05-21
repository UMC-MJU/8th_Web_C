import { useState, useEffect} from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";

export default function HomeLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth < 1024) setIsSidebarOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="h-dvh flex bg-black">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="flex flex-col flex-1 transition-all duration-300">
        <Navbar toggleSidebar={() => setIsSidebarOpen(o => !o)} />
        <main className="flex-1 mt-20">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}