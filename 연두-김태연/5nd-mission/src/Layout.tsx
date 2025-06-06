import { Outlet } from "react-router-dom";
import Header from "./components/Header.tsx";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
}