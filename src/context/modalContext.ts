import React from "react";
import { ModalProps } from "react-bootstrap";
import IMusic from "../types/IMusic";

export enum ModalAction{
    SET_MUSIC = 'SET_MUSIC'
}

type ModalSoundLoad = {
    [ModalAction.SET_MUSIC]: IMusic;
}

export type ModalActions = ActionMap<ModalSoundLoad>[keyof ActionMap<ModalSoundLoad>]

export const initialState: ModalProps = {
    music: null
}

export const ModalContext = React.createContext<{
    state: ModalProps;
    dispatch: React.Dispatch<ModalActions>;
}>({
    state: initialState,
    dispatch: () => null
});

export const modalReducer = (
    state: ModalProps,
    action: ModalActions
): ModalProps => {
    switch(action.type) {
        case ModalAction.SET_MUSIC:
            return{ 
                music: action.soundload,
                start: true
            };
        default:
            return state;
    }
};