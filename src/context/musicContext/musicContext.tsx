import React, { createContext, useReducer } from "react";
import {IMusic} from "../../types/IMusic";
import IPlaylist from "../../types/IPlaylist";
import { musicReducer } from './musicReducer';

export type InitialStateType = {
    playlist: IPlaylist | null,
    music: IMusic | null,
    isRunning:boolean,
    stateDuration: number | null,
    volume: number,
}

export const initialState = {
    playlist: null,
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

export function MusicProvider(props:any) {
    const [state, dispatch] = useReducer(musicReducer, initialState);
  
    return <MusicContext.Provider value={{ state: state, dispatch: dispatch }}>{props.children}</MusicContext.Provider>;
}