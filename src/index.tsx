import React, { useContext, createContext, useReducer } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const [theme, setTheme] = useReducer()
const ThemeContext = createContext('Light');
const MusicContext = createContext({
  title: 'Choose your music',
  sound: 'test'
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeContext.Provider value={theme}>        
      <MusicContext.Provider value={signedInUser}>          
        <App />
      </MusicContext.Provider>      
    </ThemeContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
