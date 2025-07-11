// src/components/Header.jsx
import React from 'react'
import './Header.css'     // <— exactement comme ça
import { Link } from 'react-router-dom'
import revizLogo from '../assets/reviz.png'


export default function Header() {
  return (
    <header className="app-header">
      <div className="header-inner">
        <Link to="/" className="logo-link">
          <img src={revizLogo} alt="Reviz Logo" className="logo" />
        </Link>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/solo">Solo</Link>
          <Link to="/multiplayer">Multijoueur</Link>
          <Link to="/stats">Stats</Link>
        </nav>
      </div>
    </header>
  )
}
