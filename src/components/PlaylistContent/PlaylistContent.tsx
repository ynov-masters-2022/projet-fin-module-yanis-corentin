import axios from 'axios';
import React from 'react';
import MusicItem from '../MusicItem/MusicItem';
import './PlaylistContent.scss'


export default class PlaylistContent extends React.Component {
    state = {
      musics: []
    }
  
    componentDidMount() {
      axios.get(`http://localhost:3001/musics`)
        .then(res => {
            const musics = res.data;
            this.setState({ musics });
        })
    }
  
    render() {
        return (
            <ul>
            {
                this.state.musics
                .map((music, index) =>
                    <li><MusicItem key={index} id={music['id']} icon={music['icon']} title={music['title']} author={music['author']} album={music['album']} date={music['date']} duration={music['duration']} link={music['link']} /></li>
                )
            }
            </ul>
        )
    }
}
