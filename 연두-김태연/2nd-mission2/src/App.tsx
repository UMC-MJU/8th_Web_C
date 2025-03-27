import { useState, useEffect } from "react";
import ContextPage from "./useContext/ContextPage.tsx";
import { ThemeContext } from "./useContext/ThemeContext";
import "./App.css";
import Header from "./component/Header.jsx";
import Footer from "./component/Footer.jsx";

export default function App() {
  const [isDark, setIsDark] = useState(false);

  // 화면 전체적으로 다크모드 적용하고 싶어서...
  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDark]);
  
  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      <Header />
      <Footer />
    </ThemeContext.Provider>
  );
}
