import {IMusicProps} from "../../types/IMusic";
import { useContext } from "react";
import './MusicItem.scss'
import { AiFillPlayCircle } from 'react-icons/ai'
import {fancyTimeFormat} from "../../Utils/utils"
import { MusicContext } from "../../context/musicContext/musicContext";
import { ActionsTypes } from "../../context/musicContext/musicReducer";
export default function MusicItem({music, index, listMusicsIds}:IMusicProps) {

    const { state, dispatch } = useContext(MusicContext);

    return ( 
        <div className='music-container'>
            <div className='music-id'>
                <div className="text" > {index} </div>
                <AiFillPlayCircle onClick={() => {
                    dispatch({
                        type: ActionsTypes.SET_MUSIC,
                        payload: { playlistMusicsIds: listMusicsIds, index: index, music: music}
                    });
                }}/>
            </div>
            <div className='music-title'>
                <img aria-hidden="false" draggable="false" loading="eager" src={music.icon} alt="" onClick={() => {
                }}/>
                <div className='music-infos'>
                    <p>{music.title}</p>
                    <p>{music.author}</p>    
                </div>
            </div>
            <div className='music-album'>
                <p>{music.album}</p>
            </div>
            <div className='music-duration'>
                <p>{fancyTimeFormat(music.duration)}</p>
            </div>
        </div>
     );
}