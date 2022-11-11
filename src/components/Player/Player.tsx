import './Player.scss';
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai';
import { ImPrevious, ImNext } from 'react-icons/im';
import { GoUnmute, GoMute } from 'react-icons/go';
import { useContext, useEffect, useRef, useState } from "react";
import { MusicContext } from "../../context/musicContext/musicContext";
import { ThemeContext } from '../../context/themeContext/themeContext';
import { ActionsTypes } from '../../context/musicContext/musicReducer';
import axios from 'axios';

export default function Player() {

    const music = useContext(MusicContext);
    const theme = useContext(ThemeContext);
    const darkMode = theme.state.darkMode;
    const playerRef = useRef<HTMLAudioElement>(null)
    const [isMuted, setIsMuted] = useState(false);

    const handleIsRunning=()=>{
        if(playerRef.current){
            if(music.state.isRunning){
                music.dispatch({type:"SET_PAUSE"})
            }
            else {
                music.dispatch({type:"SET_PLAY"})
            }
        }
    }

    const handleMuteVolume = ()=>{
        if(playerRef.current){
            if(isMuted){
                playerRef.current.volume = music.state.volume/100 ;
                setIsMuted(false);
            }
            else {
                playerRef.current.volume=0;
                setIsMuted(true);
            }
        }
    }
    
    const handleAudioVolume = (e:any)=>{
        if(playerRef.current){
            music.dispatch({type:"SET_VOLUME",payload:{volume: parseFloat(e.target.value)}})
            playerRef.current.volume= (parseFloat(e.target.value)/100);
            if (parseFloat(e.target.value) === 0) {
                setIsMuted(true);
            } else {  
                setIsMuted(false);
            }
        }
        
    }

    async function fetchMusicById(id:number){
        const res = await axios.get(`http://localhost:3001/musics/${id}`) 
        return res.data
    }

    const handlePrevious = async () => {
        if(music.state.index){
            if (music.state.index > 1 ) {
                music.state.index -= 1
            } else {
                music.state.index = music.state.playlistMusicsIds.length;
            }
            let previousMusic = await fetchMusicById(music.state.playlistMusicsIds[music.state.index-1])
            music.dispatch({
                type: ActionsTypes.SET_NEXT_PREVIOUS,
                payload: { index: music.state.index, music: previousMusic}
            })
        }
    }
    const handleNext = async () => {        
        if(music.state.index){
            if (music.state.index < music.state.playlistMusicsIds.length ) {
                music.state.index += 1
            } else {
                music.state.index = 1;
            }
            let nextMusic = await fetchMusicById(music.state.playlistMusicsIds[music.state.index-1])
            music.dispatch({
                type: ActionsTypes.SET_NEXT_PREVIOUS,
                payload: { index: music.state.index, music: nextMusic},
            })
        }
    }
    
    useEffect(() => {
        if(playerRef.current){
            if(music.state.isRunning){
                playerRef.current.play();
            }
            else{
                playerRef.current.pause();
            }
            
        }
    }, [music.state.isRunning, music.state.music]);

    return (

        <div className={`player-container ${darkMode ? "dark-mode" : "light-mode"}`} style={music.state.music ? {} : {display:"none"}}>
            <figure>
                <div className="player-left">
                    <img src={music.state.music?.icon} alt={music.state.music?.title +' by '+ music.state.music?.author}/>
                    <figcaption> <span> {music.state.music?.title} </span> <span> {music.state.music?.author} </span> </figcaption>
                </div>

                <div className="player-center">
                    <div className="player-center-header">
                        <button onClick={handlePrevious}> <ImPrevious /> </button>
                        {
                            music.state.isRunning ? (<button onClick={handleIsRunning}> <AiFillPauseCircle /> </button>)
                            : ( <button onClick={handleIsRunning}> <AiFillPlayCircle /> </button>)
                        }
                        <button onClick={handleNext}> <ImNext /> </button>
                    </div>
                    <audio
                        ref={playerRef}
                        onEnded={handleNext}
                        controls
                        src={music.state.music?.link}>
                            <a href={music.state.music?.link}>
                                Download audio  
                            </a>
                    </audio>
                </div>
                <div className="player-right">
                    <input type="range" min="0" max="100" onChange={handleAudioVolume} value={music.state.volume}/>
                    {
                        isMuted ? (<button onClick={handleMuteVolume}> <GoMute /></button>)
                        : ( <button onClick={handleMuteVolume}> <GoUnmute />  </button>)
                    }
                </div>
            </figure>
        </div>
    )

}