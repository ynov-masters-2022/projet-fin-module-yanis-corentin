export enum ActionsTypes {
    SET_MUSIC = 'SET_MUSIC',
    SET_PAUSE = 'SET_PAUSE',
    SET_PLAY = 'SET_PLAY',
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

export type MusicActions = ActionsTypes.SET_MUSIC | ActionsTypes.SET_PAUSE | ActionsTypes.SET_PLAY;

type MusicPayload = {
    type: MusicActions
    payload: {
        music?: currentMusicType,
        isRunning:boolean,
        stateDuration?: number,
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
                stateDuration: action.payload.stateDuration,
            }
        case ActionsTypes.SET_PLAY:
            return{ 
                isRunning: true,
            }
      default:
        return state;
    }
}