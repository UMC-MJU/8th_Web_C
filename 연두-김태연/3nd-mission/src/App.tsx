import { useState } from 'react'
import MoviePage from "./pages/MoviePage";
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  console.log("VITE_TMDB_KEY:", import.meta.env.VITE_TMDB_KEY);

  return (
    <>
       <MoviePage/>
    </>
  )
}

export default App
