import IMusic from "../../types/IMusic";
import './MusicItem.scss'
import { AiFillPlayCircle } from 'react-icons/ai'
import {fancyTimeFormat} from "../../Utils/utils"
export default function MusicItem({id, icon, title, author, album, date, duration, link}:IMusic) {

    return ( 
        <div className='music-container'>
            <div className='music-id'>
                <div className="text"> {id} </div>
                <AiFillPlayCircle/>
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
                <p>{fancyTimeFormat(duration)}</p>
            </div>
        </div>
     );
}