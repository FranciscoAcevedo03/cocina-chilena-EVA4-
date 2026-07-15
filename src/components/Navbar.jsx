import React from 'react';

export default function Navbar() {
  return (
    <header style={{
      background: '#1a252f',
      color: '#ffffff',
      padding: '20px',
      borderRadius: '8px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '5px solid #c0392b',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '2rem' }}>🇨🇱</span>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontFamily: 'Georgia, serif', margin: 0 }}>
            Cocina Chilena
          </h1>
          <p style={{ fontSize: '0.8rem', color: '#bdc3c7', margin: 0 }}>
            Panel de Administración de Menú
          </p>
        </div>
      </div>
      <span style={{
        background: '#c0392b',
        padding: '5px 12px',
        borderRadius: '20px',
        fontSize: '0.85rem',
        fontWeight: 'bold'
      }}>
        Sede Río Bueno
      </span>
    </header>
  );
}