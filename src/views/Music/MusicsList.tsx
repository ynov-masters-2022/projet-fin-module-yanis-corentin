import './Playlist.scss'
import React from 'react';
import axios from 'axios';
import MusicItem from '../../components/MusicItem/MusicItem';
import IMusic from '../../types/IMusic'
import {useState} from 'react';

const MusicsList = () => {

    const [musics, setMusics] = useState<IMusic[]>([]);

    const getMusicsList = () => {
        axios.get(`http://localhost:3001/musics`)
        .then(res => {
            const musics = res.data;
            setMusics(musics);
        })
    }

    return (
    <ul>
        {
            musics.map(music =>
                <MusicItem id={music.id} icon={music.icon} title={music.title} author={music.author} album={music.album} date={music.date} duration={music.duration} link={music.link} />
            )
        }
    </ul>
    )
}

export default MusicsList;