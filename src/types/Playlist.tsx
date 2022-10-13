import Music from "./Music";

interface Playlist{
    id: number;
    icon: string;
    title: string;
    author: string;
    date: Date;
    musique: Music[];
}

export default Playlist;