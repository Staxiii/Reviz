import React from 'react';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Solo from './pages/Solo.jsx';
import revizLogo from './assets/reviz.png';
import Multiplayer from './pages/Multiplayer.jsx';
import Statistics from './pages/Statistics.jsx';
import LyricsViewer from './components/LyricsViewer';

export default function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <Link to="/">
          <img src={revizLogo} alt="Reviz Logo" className="logo" />
        </Link>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/solo">Solo</Link>
          <Link to="/multiplayer">Multiplayer</Link>
          <Link to="/stats">Stats</Link>
          {/* Lien de test pour les paroles */}
          <Link to="/lyrics/tomber">Paroles “Tomber”</Link>
        </nav>
      </header>
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
  );
}

// Wrapper qui récupère le paramètre slug et passe à LyricsViewer
function LyricsPage() {
  const { slug } = useParams();
  return <LyricsViewer slug={slug} />;
}