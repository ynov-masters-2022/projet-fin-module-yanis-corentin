import Nav from '../../components/CustomNavbar'
import './Home.scss'
import IPlaylist from '../../types/IPlaylist'
import PlaylistOverview from '../../components/PlaylistOverview/PlaylistOverview'

const Homepage = () => {
    let date= new Date("2021-12-03")
    return (
        <div className="Homepage-container">
            <Nav />
            <div className="playlist-views">
                <PlaylistOverview id={1} icon='https://static.fnac-static.com/multimedia/Images/FR/NR/c8/53/d4/13915080/1540-1/tsp20211110173128/Jefe.jpg' title='Playlist 1' author='Yanis' date={date} musique={[1]}/>
            </div>
        </div>
    )
}

export default Homepage