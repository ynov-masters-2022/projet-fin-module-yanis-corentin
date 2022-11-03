export enum ActionsTypes {
    SET_MUSIC = 'SET_MUSIC',
    SET_PAUSE = 'SET_PAUSE',
    SET_PLAY = 'SET_PLAY',
    SET_DURATION = 'SET_DURATION',
    SET_VOLUME = 'SET_VOLUME',
}

type currentMusicType = {
    id: number;
    icon: string;
    title: string;
    author: string;
    album: string;
    duration: number;
    link: string;
}

export type MusicActions = ActionsTypes.SET_MUSIC | ActionsTypes.SET_PAUSE | ActionsTypes.SET_DURATION | ActionsTypes.SET_PLAY | ActionsTypes.SET_VOLUME;

type MusicPayload = {
    type: MusicActions
    payload: {
        music?: currentMusicType,
        isRunning:boolean,
        stateDuration?: number,
        volume: number
    }
}


export const musicReducer = (state: any | null, action: MusicPayload) => {
    switch (action.type) {
      case ActionsTypes.SET_MUSIC:
        return { 
            music: action.payload.music,
            isRunning: true,
            stateDuration: 0,
        }
        case ActionsTypes.SET_PAUSE:
            return{ 
                isRunning: false,
            }
        case ActionsTypes.SET_PLAY:
            return{ 
                isRunning: true,
            }
        case ActionsTypes.SET_DURATION:
            return{ 
                stateDuration: action.payload.stateDuration,
            }
        case ActionsTypes.SET_VOLUME:
            return{ 
                volume: action.payload.volume,
            }
      default:
        return state;
    }
}