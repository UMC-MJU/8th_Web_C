import React, { useContext } from "react";
import { ThemeContext } from "../useContext/ThemeContext";

function Footer(){
    const {isDark,setIsDark} = useContext(ThemeContext);
    
    const darkMode = () =>{
        setIsDark(!isDark);
    }

    return(
        <footer className="footer" 
            style={{
                backgroundColor: isDark? 'black' : 'white',
            }}>
            <button className="button" onClick={darkMode}>
                Dark Mode
            </button>
        </footer>

    )
}

export default Footer;