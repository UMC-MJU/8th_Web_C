import clsx from "clsx";
import { THEME, useTheme } from "../context/ThemeProvider";


const ThemeContent = () => {
    const { theme, toggleTheme} = useTheme();

    const isLightMode = theme === THEME.LIGHT;
    
  return (
    <div className={clsx(
        'p-4 h-dvh w-full', isLightMode ? 'bg-white' : 'bg-gray-800'
    )}>
       <h1 
       className={clsx(
        'text-wxl font-bold',
        isLightMode ? 'text-black' : 'text-white'
       )}>
        ThemeContent
       </h1>
       </div>
  )
}

export default ThemeContent;