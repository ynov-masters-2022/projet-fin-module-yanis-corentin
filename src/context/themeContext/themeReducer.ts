export enum ActionsTypes {
    LIGHTMODE = 'LIGHTMODE',
    DARKMODE = 'DARKMODE',
}

export type ThemeActions = ActionsTypes.LIGHTMODE | ActionsTypes.DARKMODE;

type ThemePayload = {
    type: ThemeActions,
    darkMode: boolean,
}

export const themeReducer = (state: any | null, action: ThemePayload) => {
    switch (action.type) {
        case ActionsTypes.LIGHTMODE:
            return { 
                darkMode: false,
            }
        case ActionsTypes.DARKMODE:
            return { 
                darkMode: true,
            }
      default:
        return state;
    }
}