import './App.css';
import Homepage from './views/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import Playlist from './views/Playlist/Playlist';

function App() {

  return (
      <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/playlist:id" element={<Playlist />} />
      </Routes>
  );
}

export default App;
