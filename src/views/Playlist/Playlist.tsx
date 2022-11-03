import { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import PlaylistContent from '../../components/PlaylistContent/PlaylistContent';
import PlaylistHeader from '../../components/PlaylistHeader/PlaylistHeader';
import './Playlist.scss'
import {GrPrevious} from 'react-icons/gr'

const Playlist = () => {
    const id = useParams();
    const location = useLocation()
    const navigate = useNavigate();
    const {playlist} = location.state
    const [totalDuration, setTotalDuration] = useState(0);

    const updateDuration = (duration : number) =>{
        setTotalDuration(duration)
    }

    useEffect(() => {
        console.log(id,location,playlist);
        
    }, []);

    return (
        <div className="Playlist-container">
            <button className='previous-page' onClick={() => navigate(-1)}><GrPrevious/></button>
            <div className="Playlist-header">
                <PlaylistHeader playlist={playlist} totalDuration={totalDuration}/>
            </div>
            <div className="Playlist-content">
                <PlaylistContent musicsId={playlist.musicsId} updateTotalDuration={updateDuration} />
            </div>
        </div>
    )
}

export default Playlist