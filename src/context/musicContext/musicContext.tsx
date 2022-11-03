import React, { createContext, useReducer } from "react";
import {IMusic} from "../../types/IMusic";
import { musicReducer } from './musicReducer';

export type InitialStateType = {
    playlistMusicsIds: number[],
    index: number | null,
    music: IMusic | null,
    isRunning:boolean,
    stateDuration: number | null,
    volume: number,
}

export const initialState = {
    playlistMusicsIds: [],
    index: null,
    music: null,
    isRunning:false,
    stateDuration:null,
    volume: 30,
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