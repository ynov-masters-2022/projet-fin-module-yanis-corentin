import Nav from '../../components/CustomNavbar'
import './Home.scss'
import PlaylistContent from '../../components/PlaylistContent/PlaylistContent'

const Homepage = () => {
    let date= new Date("2021-12-03")
    return (
        <div className="Homepage-container">
            <Nav />
            <div className="playlist-views">
                <PlaylistContent id={1} icon='https://static.fnac-static.com/multimedia/Images/FR/NR/c8/53/d4/13915080/1540-1/tsp20211110173128/Jefe.jpg' title='Playlist 1' author='Yanis' date={date} musicsId={[1,2,3]} />
            </div>
        </div>
    )
}

export default Homepage