import './App.css';
import Homepage from './views/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Playlist from './views/Playlist/Playlist';

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/playlist:id" element={<Playlist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
