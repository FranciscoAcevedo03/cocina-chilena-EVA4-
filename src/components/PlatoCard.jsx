import React, { useState } from 'react';

export default function PlatoCard({ plato, onUpdatePrecio, onDeletePlato, onToggleDisponibilidad }) {
  const [editando, setEditando] = useState(false);
  const [inputPrecio, setInputPrecio] = useState('');

  const handleGuardarPrecio = () => {
    onUpdatePrecio(plato.idMeal, inputPrecio);
    setEditando(false);
    setInputPrecio('');
  };

  return (
    <div style={{
      background: '#2c3e50',
      color: '#ecf0f1',
      width: '290px',
      borderRadius: '8px',
      border: '6px solid #8d6e63',
      boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <img 
        src={plato.strMealThumb} 
        alt={plato.strMeal} 
        style={{ width: '100%', height: '180px', objectFit: 'cover', borderBottom: '3px solid #8d6e63' }}
      />

      <div style={{ padding: '15px' }}>
        <h3 style={{ 
          fontFamily: 'Georgia, serif', 
          fontSize: '1.25rem', 
          color: '#f1c40f',
          marginBottom: '10px' 
        }}>
          {plato.strMeal}
        </h3>

        <p style={{ margin: '8px 0', fontSize: '1.1rem' }}>
          Precio: <span style={{ color: '#2ecc71', fontWeight: 'bold' }}>${plato.precio.toLocaleString('es-CL')}</span>
        </p>

        <p style={{ margin: '8px 0', fontSize: '0.9rem' }}>
          Estado:{' '}
          <span style={{
            color: plato.disponible ? '#2ecc71' : '#e74c3c',
            fontWeight: 'bold',
            backgroundColor: 'rgba(255,255,255,0.1)',
            padding: '2px 6px',
            borderRadius: '4px'
          }}>
            {plato.disponible ? '✓ En Carta' : '✗ Agotado'}
          </span>
        </p>
      </div>

      <div style={{ padding: '15px', paddingTop: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {editando ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <input 
              type="text" 
              placeholder="Ej. 6500"
              value={inputPrecio}
              onChange={(e) => setInputPrecio(e.target.value)}
              style={{
                padding: '6px',
                borderRadius: '4px',
                border: 'none',
                color: '#333',
                fontSize: '0.9rem'
              }}
            />
            <div style={{ display: 'flex', gap: '5px' }}>
              <button 
                onClick={handleGuardarPrecio}
                style={{ background: '#2ecc71', color: '#fff', border: 'none', padding: '5px', borderRadius: '4px', flex: 1, cursor: 'pointer', fontWeight: 'bold' }}
              >
                ✓
              </button>
              <button 
                onClick={() => setEditando(false)}
                className="btn-danger"
                style={{ padding: '5px', flex: 1 }}
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <button 
            onClick={() => setEditando(true)}
            style={{
              background: '#34495e',
              color: '#fff',
              border: '1px solid #7f8c8d',
              padding: '8px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Modificar Precio
          </button>
        )}

        <button 
          onClick={() => onToggleDisponibilidad(plato.idMeal)}
          style={{
            background: '#e67e22',
            color: 'white',
            border: 'none',
            padding: '8px',
            borderRadius: '4px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Cambiar Disponibilidad
        </button>

        <button 
          onClick={() => onDeletePlato(plato.idMeal)}
          className="btn-danger"
        >
          Retirar del Menú
        </button>
      </div>
    </div>
  );
}