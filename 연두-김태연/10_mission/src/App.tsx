import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import MoviePage from "./pages/MoviePage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MoviePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
