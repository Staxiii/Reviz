// src/App.jsx
import React from 'react'
import Header    from './components/Header.jsx'
import AppRoutes from './routes.jsx'

export default function App() {
  return (
    <>
      <Header />
      <main style={{ padding: '20px', paddingTop: '100px' }}>
        <AppRoutes />
      </main>
    </>
  )
}
