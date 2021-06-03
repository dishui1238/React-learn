import React from "react";

export const ThemeContext = React.createContext({ themeColor: "pink" }); // 默认值
export const ThemeProvider = ThemeContext.Provider;
export const ThemeConsumer = ThemeContext.Consumer;
