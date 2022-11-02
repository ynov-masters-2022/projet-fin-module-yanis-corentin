import './App.css';
import Homepage from './views/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Playlist from './views/Playlist/Playlist';
import Music from './views/Music/Music';



function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/playlist/:id" element={<Playlist />} />
            {/* <Route path="/music:id" element={<Music />} /> */}
        </Routes>
      </BrowserRouter>
  );
}

export default App;
