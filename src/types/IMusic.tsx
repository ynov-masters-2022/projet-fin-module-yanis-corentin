export interface IMusic {
    id: number;
    icon: string;
    title: string;
    author: string;
    album: string;
    date: Date;
    duration: number;
    link: string;
}

export interface IMusicProps {
    music: IMusic;
    index: number;
    listMusicsIds:number[];
}

