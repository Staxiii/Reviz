/* src/components/LyricsViewer.jsx */
import React, { useState, useEffect } from 'react';

export default function LyricsViewer({ slug }) {
  const [lyricsHtml, setLyricsHtml] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    fetch(`http://localhost:8080/api/songs/${slug}/lyrics`, {
      headers: {
        'Accept': 'text/html'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erreur ${response.status}`);
        }
        return response.text();
      })
      .then(html => {
        setLyricsHtml(html);
      })
      .catch(err => {
        setError(err.message);
      });
  }, [slug]);

  if (error) {
    return <div style={{ color: 'red' }}>Impossible de charger les paroles: {error}</div>;
  }
  if (!lyricsHtml) {
    return <div>Chargement des paroles...</div>;
  }

  // Dangerously set inner HTML since backend returns safe <p> HTML
  return (
    <div className="lyrics-viewer" dangerouslySetInnerHTML={{ __html: lyricsHtml }} />
  );
}
