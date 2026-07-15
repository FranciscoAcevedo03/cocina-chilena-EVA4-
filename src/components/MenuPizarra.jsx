import React from 'react';
import PlatoCard from './PlatoCard';

export default function MenuPizarra({ platos, onUpdatePrecio, onDeletePlato, onToggleDisponibilidad }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-evenly',
      flexWrap: 'wrap',
      gap: '30px',
      padding: '20px 0'
    }}>
      {platos.map((plato) => (
        <PlatoCard 
          key={plato.idMeal}
          plato={plato}
          onUpdatePrecio={onUpdatePrecio}
          onDeletePlato={onDeletePlato}
          onToggleDisponibilidad={onToggleDisponibilidad}
        />
      ))}
    </div>
  );
}