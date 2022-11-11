
# YCP - React Player

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)

Dans le cadre de notre projet de fin de module React, nous avons souhaité apprendre à utiliser les contexts au sein d'une application Typescript. Pour cela, nous avons décidé de réaliser un player audio (type _spotify_) qui, grâce aux contexts, peut tourner en continue quelque soit notre localisation sur l'application.

#### Sommaire
  - [Présentation de l'outil](#présentation-de-loutil)
  - [Démarrage](#démarrage)
  - [Back-end](#back-end)
    - [Json-server](#json-server)
    - [Axios](#axios)
  - [Context](#context)
    - [ThemeContext et ThemeReducer](#themecontext-et-themereducer)
    - [MusicContext et MusicReducer](#musiccontext-et-musicreducer)
  - [MusicPlayer](#musicplayer)
    - [Récupérer les données stockées dans le contexte](#Récupérer-les-données-stockées-dans-le-contexte)
    - [Le player](#Le-player)
  - [Auteurs](#auteurs)

### Présentation de l'outil
Lors du démarrage de l'outil, voici l'affichage de notre page d'accueil qui contient la liste des playlists disponibles sur notre application.
![image](https://user-images.githubusercontent.com/92028058/200021144-00212dc2-e15a-441e-9e7b-a5654701dc48.png)
L'utilisateur peut alors sélectionner la playlist de son choix pour ensuite lancer une musique.
![image](https://user-images.githubusercontent.com/92028058/200021328-4d46d703-d3f3-4421-9b9d-015971fa473a.png)
Une fois sélectionnée, la musique sera chargée dans le player audio et l'utilisateur pourra continuer à naviguer dans son application tout en profitant du song qu'il vient de lancer.
![image](https://user-images.githubusercontent.com/92028058/200021417-8925b1a7-ecc3-44a1-bd87-22d359bcbcdf.png)
L'utilisateur à la possibilité d'interagir avec son player grâce aux fonctionnalités de : 
![image](https://user-images.githubusercontent.com/92028058/200021521-5635ff25-c839-4d50-b4ea-6c02a6f4d549.png)
* Mise en Pause / reprise de lecture [1]
* Passage à la musique suivante / retour à la musique précédente [2]
* Réglage du volume / mute / démute [3]
* Réglage du temps de lecture [4]

Il faut savoir que si aucune action est faite avant la fin de la musique alors le player jouera la musique suivante qui est présente dans la playlist.

Enfin, il est possible pour l'utilisateur de changer le mode d'affichage pour avoir un thème plus clair ou plus sombre en fonction de ses préférences.
![image](https://user-images.githubusercontent.com/92028058/200022012-44fdd892-966b-4cf0-b76e-deb485331351.png)
![image](https://user-images.githubusercontent.com/92028058/200021944-644f95c2-1ad9-435b-8b7c-c94b0071f1d5.png)

### Démarrage

Une fois que le projet a été installé, il est nécessaire d'importer l'ensemble des dépendances reacts utilisées par notre outil.

Pour cela, il faut ouvrir un premier terminal dans le projet que vous venez de cloner puis lancer la commande : 
```js
npm install
```
Une fois l'installation terminée, vous pouvez ouvrir un second terminal dans le repertoire "/data" et démarrer le serveur API REST grâce à la commande :

```js
npx json-server -p 3001 .\db.json -w
```

Dans le premier terminal, vous pouvez alors lancer l'application grâce à la commande :

```js
npm run start
```

Votre Application est donc lancée à l'adresse http://localhost:3000/  ---> enjoy :)
### Back-end

#### Json-Server
```js
npm install -g json-server
```

[Json-Server](https://www.npmjs.com/package/json-server) sert à créer une "fake" REST API sans coder et en moins de 30s.

Il a été créé pour que les développeurs front-end, qui ont besoin d'un petit back-end rapide, puissent commencer coder rapidement ou faire leur prototypage. 

Pour l'utiliser, il suffit de créer un fichier `.json` et Json-Server s'occupera tout seul de créer les endpoints.

```json
{
    "playlist": [
        {
            "id":1,
            "icon": "https://images.genius.com/f8363c49c70651643f979dbf68b85db5.300x300x1.jpg",
            "title": "Playlist 1",
            "author": "Yanis",
            "date": "2021-10-14",
            "musicsId": [
                1, 2
            ]
        },
        {
            "id":2,
            "icon": "https://i.scdn.co/image/ab67616d0000b2733d9cedf011e85ff7f7fdbc39",
            "title": "React Playlist",
            "author": "Corentin",
            "date": "2022-10-13",
            "musicsId": [
                6, 3, 5
            ]
        }
    ]
}
```

#### Axios
```js
npm install axios
```
### Context
Très utiles pour conserver des variables dans l'ensemble d'une application, les contexts permettent de transmettre des informations globales aux autres composants. 

Dans notre cas, deux contexts ont été créés afin de gérer le changement de theme pour notre site ainsi que pour conserver la musique dans notre player quelque soit les actions de l'utilisateur.

Dans ces deux cas, nous avons séparé le code entre une partie "Context" (qui contient l'état "Initiale" de notre context) et une partie "Reducer" (qui gère le changement d'état de notre context en fonction des action appelés par les composants).  
#### ThemeContext et ThemeReducer

Dans la partie _ThemeContext_, il est possible de retrouver, dans un premier temps, les imports utiles pour l'utilisation du context et de son reducer :
```js
import React, { createContext, useReducer } from "react";
import { themeReducer } from './themeReducer';
```
Nous avons également la présence d'un type _InitialStateType_ et d'une constante _initialState_ qui correspondent à l'état initial du context pour sa création.
```js
export type InitialStateType = {darkMode: boolean};

export const initialState = {darkMode: false};
```

La constante _ThemeContext_ utilise le HOOK createContext pour permettre la création du context à partir des attributs "state" (qui corespond à la valeur de notre context) et "dispatch" (qui permet de distribuer des actions et de déclancher des changements d'états).

```js
export const ThemeContext = createContext<{
    state: InitialStateType;
    dispatch: React.Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => null
});
```

Enfin, la fonction _ThemeProvider_ est utile pour associer notre Context à son Reducer grâce à l'utilisation du HOOK useReducer

```js
export function ThemeProvider(props:any) {
    const [state, dispatch] = useReducer(themeReducer, initialState);
  
    return <ThemeContext.Provider value={{ state: state, dispatch: dispatch }}>{props.children}</ThemeContext.Provider>;
}
```
Cette méthode est par la suite appelée au plus haut niveau de notre application pour s'assurer que l'ensemble des composants puissent utiliser / modifier le context.

```js
### index.js
#[...]

root.render(
  <React.StrictMode>   
    <ThemeProvider>
      <MusicProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MusicProvider>    
    </ThemeProvider>    
  </React.StrictMode>

#[...]
);
```

Dans la partie _ThemeReducer_, la liste des actions disponibles pour notre context est placée dans un énuméré puis associée à un type. Par exemple, le theme aura la possibilité d'activer le Lightmode ou bien le Darkmode.

```js
export enum ActionsTypes {
    LIGHTMODE = 'LIGHTMODE',
    DARKMODE = 'DARKMODE',
}

export type ThemeActions = ActionsTypes.LIGHTMODE | ActionsTypes.DARKMODE;
```

Le type _ThemePayload_ correspond à l'action qui sera associée à notre reducer et il est constitué d'un attribut "type" (qui sera l'une des valeur de notre ActionsTypes) et d'un attribut "darkmMode" (qui sera la nouvelle valeur de notre context)

```js
type ThemePayload = {
    type: ThemeActions,
    darkMode: boolean,
}
```
Et la constante _themeReducer_ permet d'effectuer le changement d'état de notre context en fonction de l'action qui lui est notifiée.

```js
export const themeReducer = (state: any | null, action: ThemePayload) => {
    switch (action.type) {
        case ActionsTypes.LIGHTMODE:
            return { 
                darkMode: false,
            }
        case ActionsTypes.DARKMODE:
            return { 
                darkMode: true,
            }
      default:
        return state;
    }
}
```

Grâce à ces deux fichiers, il est maintenant possible d'utiliser le context du theme de l'application pour notament associer des attributs différents à certaines classeName en fonction du mode activé. Par exemple, la couleur de la navBar dépendra du state de notre context:

```js
## CustomNavbar

const CustomNavbar = () => { 

    const theme = useContext(ThemeContext);
    const darkMode = theme.state.darkMode;

    return ( 
        <Navbar expand="lg" variant={`${darkMode ? "dark" : "light"}`} bg={`${darkMode ? "dark" : "light"}`}>
            <Container>
                <Link to={'/'}>
                    <Navbar.Brand>YCP</Navbar.Brand>
                </Link>
                <SwitchThemeBtn />
            </Container>
        </Navbar>
     );
```
#### MusicContext et MusicReducer

De la même façon que pour le ThemeContext, MusicContext permettra d'établir l'état initial de notre Context (qui ici, est plus complexe que le précédent.)

Pour cela, le type _InitialStateType_ est constitué de plusieurs attributs tels que :
* playlistMusicsIds = correspond à la liste des ids des musiques présentes dans la playlist courante
* index = correspond à l'index de la musique au sein de la playlist
* music = correspond à la musique sélectionné pour le player,
* isRunning: correspond à l'état En cours ou non de la musique dans le player,
* volume = correspond au niveau de volume du player.
  
```js
import React, { createContext, useReducer } from "react";
import {IMusic} from "../../types/IMusic";
import { musicReducer } from './musicReducer';

export type InitialStateType = {
    playlistMusicsIds: number[],
    index: number | null,
    music: IMusic | null,
    isRunning:boolean,
    volume: number,
}

export const initialState = {
    playlistMusicsIds: [],
    index: null,
    music: null,
    isRunning:false,
    volume: 30,
}
```
Un panel d'action plus large est également disponible dans MusicReducer avec notament :
* SET_MUSIC = permet de modifier la musique en cours,
* SET_PAUSE = permet de passer le player en pause,
* SET_PLAY = permet de reprendre la lecture du player,
* SET_NEXT_PREVIOUS = permet de passer à la musique suivante ou précédente de la playlist,
* SET_VOLUME =  permet de modifier le volume sonore du player,

```js
import {IMusic} from "../../types/IMusic";

export enum ActionsTypes {
    SET_MUSIC = 'SET_MUSIC',
    SET_PAUSE = 'SET_PAUSE',
    SET_PLAY = 'SET_PLAY',
    SET_NEXT_PREVIOUS = 'SET_NEXT_PREVIOUS',
    SET_VOLUME = 'SET_VOLUME',
}

export type MusicActions = ActionsTypes.SET_MUSIC | ActionsTypes.SET_PAUSE | ActionsTypes.SET_NEXT_PREVIOUS | ActionsTypes.SET_PLAY | ActionsTypes.SET_VOLUME;

type MusicPayload = {
    type: MusicActions
    payload: {
        playlistMusicsIds?: number[],
        index?: number,
        music?: IMusic,
        isRunning?:boolean,
        volume?: number
    }
}

export const musicReducer = (state: any | null, action: MusicPayload) => {
    switch (action.type) {
        case ActionsTypes.SET_MUSIC:
            return {
                ...state,
                playlistMusicsIds: action.payload.playlistMusicsIds,
                index: action.payload.index,
                music: action.payload.music,
                isRunning: true,
            }
        case ActionsTypes.SET_PAUSE:
            return{ 
                ...state,
                isRunning: false,
            }
        case ActionsTypes.SET_PLAY:
            return{ 
                ...state,
                isRunning: true,
            }
        case ActionsTypes.SET_NEXT_PREVIOUS:
            return {
                ...state,
                index: action.payload.index,
                music: action.payload.music,
                isRunning: true,
            }
        case ActionsTypes.SET_VOLUME:
            return{ 
                ...state,
                volume: action.payload.volume,
            }
      default:
        return state;
    }
}
```
L'utilisation de ce context est essentiel pour le bon fonctionnement du player et celle-ci va être expliquée dans la partie [MusicPlayer](#musicplayer)

### MusicPlayer

Nous avons déjà pu avoir un aperçu du player. 
![image](https://user-images.githubusercontent.com/92028058/200021521-5635ff25-c839-4d50-b4ea-6c02a6f4d549.png)

#### Récupérer les données stockées dans le contexte
Tout d'abord les imports utiles pour récupérer nos données.
```js
import { useContext, useEffect, useRef, useState } from "react";
import { MusicContext } from "../../context/musicContext/musicContext";
import { ThemeContext } from '../../context/themeContext/themeContext';
import { ActionsTypes } from '../../context/musicContext/musicReducer';
```

Ensuite dans notre player nous pouvons utiliser `useContext()` et accéder aux données avec `[context].state`
```js
const music = useContext(MusicContext);
const theme = useContext(ThemeContext);

const darkMode = theme.state.darkMode;
```

Pour utiliser les actions définies dans le contextReducer, nous pouvons utiliser `[context].dispatch({type:"[NOTRE_ACTION]"})`:
```js
music.dispatch({type:"SET_PAUSE"})
``` 
#### Le player

Le Player peut se découper en 3 parties: 
* L'affichage relatif à la musique (gauche)
  ```js
    <div className="player-left">
        <img src={music.state.music?.icon} alt={music.state.music?.title +' by '+ music.state.music?.author}/>
        <figcaption> <span> {music.state.music?.title} </span> <span> {music.state.music?.author} </span> </figcaption>
    </div>
   ```
   
* La partie qui influe sur la musique elle-même (milieu)
   ```js
    <div className="player-center">
        <div className="player-center-header">
            <button onClick={handlePrevious}> <ImPrevious /> </button>
            {
                music.state.isRunning ? (<button onClick={handleIsRunning}> <AiFillPauseCircle /> </button>)
                : ( <button onClick={handleIsRunning}> <AiFillPlayCircle /> </button>)
            }
            <button onClick={handleNext}> <ImNext /> </button>
        </div>
        <audio
            ref={playerRef}
            onEnded={handleNext}
            controls
            src={music.state.music?.link}>
                <a href={music.state.music?.link}>
                    Download audio  
                </a>
        </audio>
    </div>
   ```

   Ici il est important de noter l'utilisation de `ref={PlayerRef}` dans la balise html `audio`. En effet pour pouvoir interagir avec notre player, react nous offre le hook `useRef` qui permet d'interagir avec le DOM où se trouve la balise `audio`.

   ```js
    const playerRef = useRef<HTMLAudioElement>(null)
   ```

   Pour les fonctions interagissant avec le DOM et donc avec le player :
   * Interaction avec le bouton Play/Pause[1]
    ```js
    const handleIsRunning=()=>{
        if(playerRef.current){
            if(music.state.isRunning){
                music.dispatch({type:"SET_PAUSE"})
            }
            else {
                music.dispatch({type:"SET_PLAY"})
            }
        }
    }
    useEffect(() => {
        if(playerRef.current){
            if(music.state.isRunning){
                playerRef.current.play();
            }
            else{
                playerRef.current.pause();
            }
        }
    }, [music.state.isRunning, music.state.music]);
    ```
    * Interaction avec les boutons Précédent/Suivant [2]
    ```js
    async function fetchMusicById(id:number){
        const res = await axios.get(`http://localhost:3001/musics/${id}`) 
        return res.data
    }

    const handlePrevious = async () => {
        if(music.state.index){
            if (music.state.index > 1 ) {
                music.state.index -= 1
            } else {
                music.state.index = music.state.playlistMusicsIds.length;
            }
            let previousMusic = await fetchMusicById(music.state.playlistMusicsIds[music.state.index-1])
            music.dispatch({
                type: ActionsTypes.SET_NEXT_PREVIOUS,
                payload: { index: music.state.index, music: previousMusic}
            })
        }
    }

    const handleNext = async () => {        
        if(music.state.index){
            if (music.state.index < music.state.playlistMusicsIds.length ) {
                music.state.index += 1
            } else {
                music.state.index = 1;
            }
            let nextMusic = await fetchMusicById(music.state.playlistMusicsIds[music.state.index-1])
            music.dispatch({
                type: ActionsTypes.SET_NEXT_PREVIOUS,
                payload: { index: music.state.index, music: nextMusic},
            })
        }
    }
    ```

   
* La partie qui modifie le son du player (droite) [3]
   ```js
    <div className="player-right">
        <input type="range" min="0" max="100" onChange={handleAudioVolume} value={music.state.volume}/>
        {
            isMuted ? (<button onClick={handleMuteVolume}> <GoMute /></button>)
            : ( <button onClick={handleMuteVolume}> <GoUnmute />  </button>)
        }
    </div>
   ```
   En ce qui concerne les fonctions qui s'occupe d'interagir avec le DOM.

   ```js
   const [isMuted, setIsMuted] = useState(false);

   const handleMuteVolume = ()=>{
        if(playerRef.current){
            if(isMuted){
                playerRef.current.volume = music.state.volume/100 ;
                setIsMuted(false);
            }
            else {
                playerRef.current.volume=0;
                setIsMuted(true);
            }
        }
    }
    
    const handleAudioVolume = (e:any)=>{
        if(playerRef.current){
            music.dispatch({type:"SET_VOLUME",payload:{volume: parseFloat(e.target.value)}})
            playerRef.current.volume= (parseFloat(e.target.value)/100);
            if (parseFloat(e.target.value) === 0) {
                setIsMuted(true);
            } else {  
                setIsMuted(false);
            }
        }
        
    }
   ```

### Auteurs

* **Yanis BEN AMOR** _alias_ [@KizutoFR](https://github.com/KizutoFR)
* **Corentin MAILLER** _alias_ [@MAILLERC0](https://github.com/MAILLERC0)


