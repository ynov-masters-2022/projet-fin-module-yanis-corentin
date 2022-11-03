import './PlaylistHeader.scss';
import { BsDot } from 'react-icons/bs'
import {fancyTimeFormat} from "../../Utils/utils"

export default function PlaylistHeader({playlist, totalDuration}:any) {

    return (
        <div className="playlist-header-container">
            <img src={playlist.icon} alt={playlist.title+" from "+playlist.author} />
            <div className="playlist-header-wrapper">
                <h2 className="playlist-header-title">{playlist.title}</h2>
                <div className="playlist-info">
                    <p> <span className='author'>{playlist.author}</span> <BsDot size={'20'}/> <span className='nbmusic'>{playlist.musicsId.length} titres</span><BsDot size={'20'}/> <span className='duration'>{fancyTimeFormat(totalDuration)}</span> </p>
                </div>
            </div>    
        </div>
    )

}