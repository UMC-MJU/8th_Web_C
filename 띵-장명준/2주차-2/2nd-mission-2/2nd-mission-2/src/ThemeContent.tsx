import clsx from "clsx";
import { THEME, useTheme } from "./context/ThemeProvider";

export default function ThemeContent(): any {
  const { theme } = useTheme();

  const isLightMode = theme === THEME.LIGHT;
  return (
    <div
      className={clsx(
        "p-4 h-dvh w-full",
        isLightMode ? "bg-white" : "bg-gray-800"
      )}
    >
      <h1
        className={clsx(
          "text-4xl font-bold",
          isLightMode ? "text-black" : "text-white"
        )}
      >
        Theme Content
      </h1>
      <p className={clsx("mt-2", isLightMode ? "text-black" : "text-white")}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius
        distinctio qui rem accusantium aliquam sapiente quos id incidunt
        voluptatem explicabo vitae doloribus aut, repellat deleniti quibusdam,
        provident molestiae maiores iusto?
      </p>
    </div>
  );
}
