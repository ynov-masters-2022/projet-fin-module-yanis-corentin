import './Home.scss'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AiFillPlayCircle } from 'react-icons/ai'
// import PlaylistContent from '../../components/PlaylistContent/PlaylistContent'

const Homepage = () => {
    const [playlist, setPlaylist] = useState<any[]>([]);
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL+'/playlist').then(res => {setPlaylist(res.data)})
    }, []);

    return (
        <div className="Homepage-container">
            <div className="playlist-views">
                {playlist.length > 0 ?
                (<ul>
                    {
                        playlist.map((_playlist, index) => (
                            <Link to={ '/playlist/'+ _playlist.id } state= {{playlist: _playlist}}>
                                <li key={index}>
                                    <div className='playlist-container'>
                                        <img src={_playlist.icon} alt="icon for {_playlist.title}"/>
                                        <p>{_playlist.title}</p>
                                        <p>{_playlist.author}</p>
                                        <p>{_playlist.date}</p>
                                        <AiFillPlayCircle/>
                                    </div>
                                </li>
                            </Link>
                        ))
                    }
                </ul>)
                : 
                (<p>loading ...</p>) }
            </div>
        </div>
    )
}

export default Homepage