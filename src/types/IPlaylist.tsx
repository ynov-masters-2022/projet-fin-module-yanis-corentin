interface IPlaylist{
    id: number;
    icon: string;
    title: string;
    author: string;
    date: Date;
    musicsId: number[];
}

export default IPlaylist;