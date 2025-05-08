import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"

export default function HomeLayout() {
  return (
    <div className="h-dvh flex flex-col">
      <NavBar />
      <Outlet />
      <main className="flex-1"></main>
      <Footer />
    </div>
  )
}