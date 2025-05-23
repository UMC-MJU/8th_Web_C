import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import { useState } from "react"

export default function HomeLayout() {
  const [search, setSearch] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="h-dvh flex flex-col">
      <NavBar
        search={search}
        setSearch={setSearch}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
      />
      <main className="flex-1">
        <Outlet context={{ search, isSidebarOpen, setIsSidebarOpen }} />
      </main>
      <Footer />
    </div>
  )
}
