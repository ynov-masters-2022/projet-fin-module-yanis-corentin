
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
npm install json-server
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


### Auteurs

* **Yanis BENAMOR** _alias_ [@KizutoFR](https://github.com/KizutoFR)
* **Corentin MAILLER** _alias_ [@MAILLERC0](https://github.com/MAILLERC0)


