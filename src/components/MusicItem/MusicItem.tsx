import IMusic from "../../types/IMusic";
import './MusicItem.scss'

export default function MusicItem({id, icon, title, author, album, date, duration, link}:IMusic) {

    function formatDuration(totalSeconds:number) {
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        let duration = "";
        if (hours > 0) {
            duration += hours + ":" 
        }
        duration += minutes + ":" + seconds
        return duration

    } 

    return ( 
        <div className='music-container'>
            <div className='music-id'>
                <button>{id}</button>
            </div>
            <div className='music-title'>
                <img aria-hidden="false" draggable="false" loading="eager" src={icon} alt=""></img>
                <div className='music-infos'>
                    <p>{title}</p>
                    <p>{author}</p>    
                </div>
            </div>
            <div className='music-album'>
                <p>{album}</p>
            </div>
            <div className='music-duration'>
                <p>{formatDuration(duration)}</p>
            </div>
        </div>
     );
}