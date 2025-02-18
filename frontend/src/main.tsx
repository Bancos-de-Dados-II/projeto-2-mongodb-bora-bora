import ReactModal from 'react-modal'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import HomePage from './pages/HomePage'
import Evento from './pages/Evento'
import "leaflet/dist/leaflet.css";


ReactModal.setAppElement('#root');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/evento' element={<Evento/>}></Route>
      </Routes>
    </Router>
  </StrictMode>,
)
