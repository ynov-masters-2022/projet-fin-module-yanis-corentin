import {IMusic} from "../../types/IMusic";
import IPlaylist from "../../types/IPlaylist";

export enum ActionsTypes {
    SET_MUSIC = 'SET_MUSIC',
    SET_PAUSE = 'SET_PAUSE',
    SET_PLAY = 'SET_PLAY',
    SET_DURATION = 'SET_DURATION',
    SET_VOLUME = 'SET_VOLUME',
}

export type MusicActions = ActionsTypes.SET_MUSIC | ActionsTypes.SET_PAUSE | ActionsTypes.SET_DURATION | ActionsTypes.SET_PLAY | ActionsTypes.SET_VOLUME;

type MusicPayload = {
    type: MusicActions
    payload: {
        playlist?: IPlaylist,
        music?: IMusic,
        isRunning?:boolean,
        stateDuration?: number,
        volume?: number
    }
}


export const musicReducer = (state: any | null, action: MusicPayload) => {
    switch (action.type) {
      case ActionsTypes.SET_MUSIC:
        return {
            ...state,
            playlist: action.payload.playlist,
            music: action.payload.music,
            isRunning: true,
            stateDuration: 0,
        }
        case ActionsTypes.SET_PAUSE:
            return{ 
                ...state,
                isRunning: false,
            }
        case ActionsTypes.SET_PLAY:
            return{ 
                ...state,
                isRunning: true,
            }
        case ActionsTypes.SET_DURATION:
            return{ 
                ...state,
                stateDuration: action.payload.stateDuration,
            }
        case ActionsTypes.SET_VOLUME:
            return{ 
                ...state,
                volume: action.payload.volume,
            }
      default:
        return state;
    }
}