import { useTheme, THEME } from "../context/ThemeProvider";
import clsx from "clsx";

export default function ThemeToggleButton() {
    const { theme, toggleTheme } = useTheme();

    const isLightMode = theme === THEME.LIGHT;
    return (
        <button onClick={toggleTheme} className={clsx('px4 py2 mt-4 rounded-md transition-all', {
            'bg-black text-white': !isLightMode,
            'bg-white text-black': isLightMode,
        })}>
            {isLightMode ? '🌙다크 모드' : '🔅라이트 모드'}
        </button>
    )
}
