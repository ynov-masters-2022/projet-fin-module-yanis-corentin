import React, { createContext, useReducer } from "react";
import { musicReducer } from './musicReducer';

type currentMusicType = {
    id: number;
    icon: string;
    title: string;
    author: string;
    album: string;
    duration: number;
    link: string;
}
export type InitialStateType = {
    music: currentMusicType | null,
    isRunning:boolean,
    stateDuration: number | null,
    volume: number,
}

export const initialState = {
    music: null,
    isRunning:false,
    stateDuration:null,
    volume: 50,
}

export const MusicContext = createContext<{
    state: InitialStateType;
    dispatch: React.Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => null
});

export const useMusicContext = () => React.useContext(MusicContext);

export function MusicProvider(props:any) {
    const [state, dispatch] = useReducer(musicReducer, initialState);
  
    return <MusicContext.Provider value={{ state: state, dispatch: dispatch }}>{props.children}</MusicContext.Provider>;
}