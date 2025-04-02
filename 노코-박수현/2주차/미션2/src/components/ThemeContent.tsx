import { ReactElement } from "react";
import { THEME, useTheme } from "../context/ThemeProvider";
import clsx from "clsx";

export default function ThemeContent(): ReactElement {
    const { theme } = useTheme();

    const isLightMode = theme === THEME.LIGHT;
    return (
        <div className={clsx('p-4 h-dvh',
            isLightMode ? 'bg-white' : 'bg-gray-800'
        )}>
            <h1 className={clsx('text-wxl font-bold',
                isLightMode ? 'text-black' : 'text-white'
            )}
            >Theme Content</h1>
            <p className={clsx('mt-2', isLightMode ? 'text-black' : 'text-white')}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti eligendi veritatis culpa rem vero dolorum sit necessitatibus qui debitis blanditiis! Autem facere voluptate ad sunt illo et laborum labore magni!
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe, cum doloremque maxime unde voluptas quia, ex consequuntur ad odit aliquam sunt numquam incidunt velit aspernatur. Officia quo fugit temporibus saepe?
            </p>
        </div >
    )
}
