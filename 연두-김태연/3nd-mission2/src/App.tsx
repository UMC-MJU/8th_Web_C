import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import MoviePage from "./pages/MoviePage";
import MovieNowPlaying from "./pages/MovieNowPlaying";
import MovieTopRated from "./pages/MovieTopRated";
import MovieUpComig from "./pages/MovieUpComig";
import MoviePopular from "./pages/MoviePopular";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MoviePage />} />
          <Route path="/movie/MovieNowPlaying" element={<MovieNowPlaying />} />
          <Route path="/movie/MovieTopRated" element={<MovieTopRated />} />
          <Route path="/movie/MovieUpComig" element={<MovieUpComig />} />
          <Route path="/movie/MoviePopular" element={<MoviePopular />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
