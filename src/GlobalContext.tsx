import { createContext, useContext, useState, type FC, type JSX } from "react";
import type { Theme, User } from "./models";

interface Globals {
    user: User | null;
    theme: Theme | null;
    setUser : (u : User | null) => void;
    setTheme : (t : Theme | null) => void;
}

const GlobalContext = createContext<Globals | null>(null);

export const GlobalsProvider : FC<{children : JSX.Element}> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [theme, setTheme] = useState<Theme | null>(null);

    return (
        <GlobalContext value={{user, setUser, theme, setTheme}}>
            {children}
        </GlobalContext>
    );
}

export const useGlobalContext = () => useContext(GlobalContext);