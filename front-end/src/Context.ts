import { createContext, useContext } from "react";

export const Context = createContext<any>(null)

export const globalContext = () => useContext(Context)
