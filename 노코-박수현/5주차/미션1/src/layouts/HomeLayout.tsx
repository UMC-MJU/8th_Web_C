import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"

export default function HomeLayout() {
  return (
    <div className="h-dvh flex flex-col">
      <NavBar />
      <Outlet />
      <main className="flex-1"></main>
      <footer className="italic text-sm">designed by noco</footer>
    </div>
  )
}
