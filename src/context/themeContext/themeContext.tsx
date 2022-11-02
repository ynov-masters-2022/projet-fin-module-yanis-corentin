import React, { createContext, useReducer } from "react";
import { themeReducer } from './themeReducer';

export type InitialStateType = {darkMode: boolean};

export const initialState = {darkMode: false};

export const ThemeContext = createContext<{
    state: InitialStateType;
    dispatch: React.Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => null
});

export function ThemeProvider(props:any) {
    const [state, dispatch] = useReducer(themeReducer, initialState);
  
    return <ThemeContext.Provider value={{ state: state, dispatch: dispatch }}>{props.children}</ThemeContext.Provider>;
}