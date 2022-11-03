import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MusicItem from '../MusicItem/MusicItem';
import './PlaylistContent.scss'


export default function PlaylistContent({musicsId, updateTotalDuration}:any) {
    const [musics, setMusics] = useState<any[]>([]);

    useEffect(() => {
        fetchMusicsFromPlaylist()
    }, []);
    
    useEffect(() => {
        const totalDuration=musics.reduce((acc, music)=> acc+=music.duration,0)
        updateTotalDuration(totalDuration)
        
    }, [musics]);

    async function fetchMusicsFromPlaylist(){
        const list = musicsId.map((id:number) =>
        axios.get(`http://localhost:3001/musics/${id}`) 
        )
        await Promise.all(list)
        .then((res:any) => {
            const musics = res.map((response:any) => response.data)
            setMusics(musics);
        })
    }
  
    return (
        <ul className='playlist-content'>
        {
            musics.map((music, index) =>
                (
                <li key={index}><MusicItem music={music} index={index+1} listMusicsIds={musicsId}/></li>
                )
            )
        }
        </ul>
    )
}
