import IPlaylist from "../../types/IPlaylist";
import './playlistOverview.scss';
export default function PlaylistOverview({icon,title,author,date}:IPlaylist) {
    return (
        <div className="playlist-container">
            <img src={icon} alt={title+" from "+author} />
            <div className="playlist-info">
                <p>{title}</p>
                <p>{author}</p>
                <p>{date.toLocaleDateString()}</p>
            </div>
        </div>
    )

}