import './Player.scss';
import { AiFillPlayCircle } from 'react-icons/ai';
import { GoUnmute, GoMute } from 'react-icons/go';
import { useEffect, useRef, useState } from "react";
import { useMusicContext } from "../../context/musicContext/musicContext";
export default function Player() {

    const music = useMusicContext();
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
        console.log("music.state.volume:",music.state.volume," | playerRef.current.volume", playerRef.current?.volume,"e.target.value",parseFloat(e.target.value));
        
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
        <div className="player-container">
            <figure>
                <div className="player-left">
                    <img src='https://images.genius.com/f8363c49c70651643f979dbf68b85db5.300x300x1.jpg' alt=''/>
                    <figcaption> <span> Tempete </span> <span> SCH </span> </figcaption>
                </div>

                <div className="player-center">
                    <div className="player-center-header">
                        <button onClick={handleIsRunning}> <AiFillPlayCircle /> </button>
                    </div>
                    <audio
                        ref={playerRef}
                        controls
                        src="https://wvv.33rapfr.com/wp-content/uploads/2021/03/21-Temp%C3%AAte-Bonus.mp3">
                            <a href="https://wvv.33rapfr.com/wp-content/uploads/2021/03/21-Temp%C3%AAte-Bonus.mp3">
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