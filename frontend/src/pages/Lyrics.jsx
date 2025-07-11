import React from 'react';
export default function Solo() {
  return <h1>Lyrics</h1>;
}

// Wrapper qui récupère le paramètre slug et passe à LyricsViewer
function LyricsPage() {
  const { slug } = useParams()
  return <LyricsViewer slug={slug} />
}
