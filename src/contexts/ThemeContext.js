import { createContext , useContext } from "react";

export const ThemeContext = createContext({
    defaultTheme: "light",
    toggleTheme: () => {},
})


export const ThemeProvider = ThemeContext.Provider

export const useTheme = () => {
    return useContext(ThemeContext)
}
