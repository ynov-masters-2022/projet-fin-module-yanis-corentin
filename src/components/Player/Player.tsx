import './Player.scss';
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai';
import { ImPrevious, ImNext } from 'react-icons/im';
import { GoUnmute, GoMute } from 'react-icons/go';
import { useContext, useEffect, useRef, useState } from "react";
import { useMusicContext } from "../../context/musicContext/musicContext";
import { ThemeContext } from '../../context/themeContext/themeContext';
export default function Player() {

    const music = useMusicContext();
    const playerRef = useRef<HTMLAudioElement>(null)
    const [isMuted, setIsMuted] = useState(false);
    const theme = useContext(ThemeContext);
    const darkMode = theme.state.darkMode;

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
        console.log("music.state.volume:",music.state.volume," | playerRef.current.volume", playerRef.current?.volume,"e.target.value",parseFloat(e.target.value));
        
    }

    const handlePrevious = () => {
        console.log('clicked');
    }
    const handleNext = () => {
        
    }

    useEffect(() => {
        console.log('isRunning has been modified');
        if(playerRef.current){
            if(music.state.isRunning){
                playerRef.current.play();
            }
            else{
                playerRef.current.pause();
            }
            console.log("music.state.isRunning",music.state.isRunning);
            
        }
    }, [music.state.isRunning]);

    useEffect(() => {
        console.log("music state:",music.state);
    }, []);

    return (

        <div className={`player-container ${darkMode ? "dark-mode" : "light-mode"}`}>
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