// src/routes.jsx
import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

// Lazy-load tes pages si tu veux
const Home        = lazy(() => import('./pages/Home.jsx'))
const Solo        = lazy(() => import('./pages/Solo.jsx'))
const Multiplayer = lazy(() => import('./pages/Multiplayer.jsx'))
const Statistics  = lazy(() => import('./pages/Statistics.jsx'))
const Lyrics      = lazy(() => import('./pages/Lyrics.jsx'))

export default function AppRoutes() {
  return (
    // Suspense affiche un fallback pendant le chargement
    <Suspense fallback={<div>Chargement…</div>}>
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/solo"       element={<Solo />} />
        <Route path="/multiplayer" element={<Multiplayer />} />
        <Route path="/stats"      element={<Statistics />} />
          <Route path="/lyrics/:slug" element={<LyricsViewer />} />
      </Routes>
    </Suspense>
  )
}
