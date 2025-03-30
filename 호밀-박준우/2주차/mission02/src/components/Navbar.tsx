import clsx from "clsx";
import { useTheme, THEME } from "../context/ThemeProvider";
import { ThemeToggleButton } from "./ThemeToggleButton";


const Navbar = () => {
    const {theme, toggleTheme} = useTheme();

    const isLightMode = theme === THEME.LIGHT;


    return (
        <nav className={clsx(
            'p-4 w-full flex justify-end ',
            isLightMode ? 'bg-white' : 'bg-gray-800'
        )}>
            <ThemeToggleButton />
        </nav>
    )
}

export default Navbar;