import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import Register from './pages/common/Register';
import Login from "./pages/common/Login";
import Home from './pages/common/Home';
import RegisterAcademy from './pages/Academy/RegisterAcademy';
import Sportspeer from './pages/User/Sportspeer';
import FindAcademy from './pages/User/FindAcademy';
import EditUser from './pages/User/EditUser';
import FindPeer from './pages/User/FindPeer';
import './stylesheets/alignments.css';
import './stylesheets/theme.css';
import './stylesheets/textelements.css';
import './stylesheets/customcomponents.css';
import './stylesheets/form-elements.css';
import './stylesheets/layout.css';
import './stylesheets/homestyle.css';
import './stylesheets/user.css';
import './stylesheets/findacademies.css';
import './stylesheets/edituser.css';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Common Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        

        { /* Academy Routes */}
        <Route path='/registeracademy' element={<RegisterAcademy />} />

        { /* User Routes */}
        <Route path='/user' element={<Sportspeer />} />
        <Route path='/user/findacademy' element={<FindAcademy />} />
        <Route path='/user/edituser' element={<EditUser />} />
        <Route path='/user/findpeer' element={<FindPeer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
