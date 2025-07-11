// src/App.jsx
import React from 'react'
import { Routes, Route, useParams } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Solo from './pages/Solo.jsx'
import Multiplayer from './pages/Multiplayer.jsx'
import Statistics from './pages/Statistics.jsx'
import LyricsViewer from './components/LyricsViewer.jsx'
import Header from './components/Header.jsx'

export default function App() {
  return (
    <div className="app-container">
      {/* On utilise désormais le composant Header */}
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solo" element={<Solo />} />
          <Route path="/multiplayer" element={<Multiplayer />} />
          <Route path="/stats" element={<Statistics />} />
          {/* Route pour afficher les paroles */}
          <Route path="/lyrics/:slug" element={<LyricsPage />} />
        </Routes>
      </main>
    </div>
  )
}

