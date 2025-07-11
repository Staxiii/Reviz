import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function LyricsViewer() {
  const { slug } = useParams()
  const [lyricsHtml, setLyricsHtml] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) return

    setLyricsHtml('')    // reset si slug change
    setError(null)

    fetch(`http://localhost:8080/api/songs/${slug}/lyrics`, {
      headers: { 'Accept': 'text/html' }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erreur ${response.status}`)
        }
        return response.text()
      })
      .then(html => {
        setLyricsHtml(html)
      })
      .catch(err => {
        setError(err.message)
      })
  }, [slug])

  // Affiche un lien retour, état loading, erreur ou contenu
  return (
    <section className="lyrics-viewer-container">
      <header>
        <Link to="/">← Retour à l’accueil</Link>
      </header>

      <h2>Paroles de&nbsp;<em>{slug}</em></h2>

      {error && (
        <div style={{ color: 'red', margin: '1rem 0' }}>
          Impossible de charger les paroles : {error}
        </div>
      )}

      {!error && !lyricsHtml && (
        <div>Chargement des paroles…</div>
      )}

      {!error && lyricsHtml && (
        <div
          className="lyrics-viewer"
          dangerouslySetInnerHTML={{ __html: lyricsHtml }}
        />
      )}
    </section>
  )
}
