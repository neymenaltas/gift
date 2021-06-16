import React, { useState } from "react";
import ThemeNameEnums from "../enums/ThemeName";

const ThemeContext = React.createContext();

const ThemeStore = ({ children }) => {
  let localStorageTheme = ThemeNameEnums.LIGHT;
  let localStorageFontSize = 16;

  localStorage.getItem("theme")
    ? (localStorageTheme = localStorage.getItem("theme"))
    : localStorage.setItem("theme", ThemeNameEnums.LIGHT);
  localStorage.getItem("fontSize")
    ? (localStorageFontSize = +localStorage.getItem("fontSize"))
    : localStorage.setItem("fontSize", "16");

  const [theme, setTheme] = useState(localStorageTheme);
  const [fontSize, setFontSize] = useState(localStorageFontSize);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, fontSize, setFontSize }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeStore, ThemeContext };
