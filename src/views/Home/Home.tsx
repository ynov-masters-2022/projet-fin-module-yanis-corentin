import Nav from '../../components/CustomNavbar'
import './Home.scss'
import PlaylistOverview from '../../components/PlaylistOverview/PlaylistOverview'

const Homepage = () => {
    let date= new Date("2021-12-03")
    return (
        <div className="Homepage-container">
            <Nav />
            <div className="playlist-views">
                <PlaylistOverview id={1} icon='https://static.fnac-static.com/multimedia/Images/FR/NR/c8/53/d4/13915080/1540-1/tsp20211110173128/Jefe.jpg' title='Playlist 1' author='Yanis' date={date} musique={[1]}/>
                {/* <MusicItem id={1} icon='https://static.fnac-static.com/multimedia/Images/FR/NR/c8/53/d4/13915080/1540-1/tsp20211110173128/Jefe.jpg' title='Jefe' author='Ninho' album='Jefe' date={date} duration={178} link='https://wvv.33rapfr.com/wp-content/uploads/2021/12/Ninho-Blanka.mp3' /> */}
            </div>
        </div>
    )
}

export default Homepage