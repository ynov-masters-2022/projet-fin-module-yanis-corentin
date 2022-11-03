import './Player.scss';
import { AiFillPlayCircle } from 'react-icons/ai'
import {GoUnmute, GoMute} from 'react-icons/go'
import { useEffect, useRef, useState } from "react";

export default function Player() {

    const playerRef = useRef<HTMLAudioElement>(null)
    const [isRunning, setIsRunning] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(100);

    const handleIsRunning=()=>{
        if(playerRef.current){
            if(isRunning){
                playerRef.current.pause();
                setIsRunning(false);
            }
            else {
                playerRef.current.play();
                setIsRunning(true);
            }
        }
    }

    const handleMuteVolume = ()=>{

        if(playerRef.current){
            if(isMuted){
                playerRef.current.volume = 1 ;
                setIsMuted(false);
            }
            else {
                playerRef.current.volume=0;
                setIsMuted(true);
            }
        }
    }
    const handleAudioVolume = (e:any)=>{
        setVolume(parseFloat(e.target.value));
        if(playerRef.current){
            switch (volume) {
                case 100:
                    playerRef.current.volume = 1 ;
                    setIsMuted(false);
                    break;
                case 0:
                    playerRef.current.volume=0;
                    setIsMuted(true);
                    break;
            
                default:
                    playerRef.current.volume= volume/100;
                    break;
            }
        }
    }

    useEffect(() => {
        
    }, []);

    return (
        <div className="player-container">
            <figure>
                <div className="player-left">
                    <img src='https://images.genius.com/f8363c49c70651643f979dbf68b85db5.300x300x1.jpg' alt=''/>
                    <figcaption> <span> SCH </span> <span> Tempete </span> </figcaption>
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
                    {/* YCP Player */}
                    {/* <output id="volume-output">100</output> */}
                    <input type="range" min="0" max="100" onChange={handleAudioVolume} value={volume}/>
                    {
                        isMuted ? (<button onClick={handleMuteVolume}> <GoMute /></button>)
                        : ( <button onClick={handleMuteVolume}> <GoUnmute />  </button>)
                    }
                    
                    
                    
                </div>
            </figure>
        </div>
    )

}