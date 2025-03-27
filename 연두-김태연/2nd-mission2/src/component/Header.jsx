import React, { useContext } from "react";
import { ThemeContext } from "../useContext/ThemeContext";

function Header(){
    const {isDark} = useContext(ThemeContext);

    return(
        
        <header className="header"
        style={{
            backgroundColor: isDark? 'black' : 'white',
            color: isDark?'white':'black'
        }}>
            <h1>UMC 8th</h1>
        </header>
        
    )
}

export default Header;