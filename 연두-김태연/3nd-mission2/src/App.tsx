import { useState } from 'react'
import MoviePage from "./pages/MoviePage";
import Navbar from "./components/Navbar";
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  console.log("VITE_TMDB_KEY:", import.meta.env.VITE_TMDB_KEY);

  return (
    <>
      <Navbar/>
      <MoviePage/>
    </>
  )
}

export default App
