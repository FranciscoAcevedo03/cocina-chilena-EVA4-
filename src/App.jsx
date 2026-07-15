import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import MenuPizarra from './components/MenuPizarra';
import { fetchPlatosChilenos } from './services/api';

function App() {
  const [menu, setMenu] = useState(() => {
    try {
      const saved = localStorage.getItem('cocina_chilena_menu');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error cargando persistencia:", error);
      return [];
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [nombrePlato, setNombrePlato] = useState('');
  const [precioPlato, setPrecioPlato] = useState('');
  const [imagenPlato, setImagenPlato] = useState('');

  const cargarAPI = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPlatosChilenos();
      setMenu(data);
    } catch (err) {
      setError("No se pudo contactar con el servidor. Revisa tu conexión.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (menu.length === 0) {
      cargarAPI();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cocina_chilena_menu', JSON.stringify(menu));
  }, [menu]);

  const handleCrearPlato = (e) => {
    e.preventDefault();

    if (!nombrePlato.trim()) {
      alert("Por favor, introduce el nombre del plato.");
      return;
    }

    const precioConvertido = Number(precioPlato);

    if (Number.isNaN(precioConvertido) || precioConvertido < 0 || precioPlato.trim() === '') {
      alert("Error de integridad: El precio debe ser un número válido y mayor o igual a 0.");
      return;
    }

    const nuevoPlato = {
      idMeal: `local-${Date.now()}`,
      strMeal: nombrePlato,
      strMealThumb: imagenPlato.trim() || 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500',
      precio: precioConvertido,
      disponible: true
    };

    setMenu([...menu, nuevoPlato]);

    setNombrePlato('');
    setPrecioPlato('');
    setImagenPlato('');
  };

  const handleUpdatePrecio = (idMeal, nuevoPrecioString) => {
    const precioConvertido = Number(nuevoPrecioString);

    if (Number.isNaN(precioConvertido) || precioConvertido < 0 || nuevoPrecioString.trim() === '') {
      alert("Error de validación: Entrada inválida para el precio.");
      return;
    }

    const menuActualizado = menu.map((plato) => {
      if (plato.idMeal === idMeal) {
        return { ...plato, precio: precioConvertido };
      }
      return plato;
    });

    setMenu(menuActualizado);
  };

  const handleToggleDisponibilidad = (idMeal) => {
    const menuActualizado = menu.map((plato) => {
      if (plato.idMeal === idMeal) {
        return { ...plato, disponible: !plato.disponible };
      }
      return plato;
    });
    setMenu(menuActualizado);
  };

  const handleDeletePlato = (idMeal) => {
    const menuFiltrado = menu.filter((plato) => plato.idMeal !== idMeal);
    setMenu(menuFiltrado);
  };

  return (
    <div className="app-container">
      <Navbar />

      <section className="formulario-pizarra">
        <h2>Incorporar Plato Típico a la Carta</h2>
        <form onSubmit={handleCrearPlato}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' }}>
            <div className="form-group">
              <label>Nombre del Plato:</label>
              <input 
                type="text" 
                placeholder="Ej. Humitas" 
                value={nombrePlato}
                onChange={(e) => setNombrePlato(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Precio de Venta ($):</label>
              <input 
                type="text" 
                placeholder="Ej. 5000" 
                value={precioPlato}
                onChange={(e) => setPrecioPlato(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>URL de Imagen:</label>
              <input 
                type="text" 
                placeholder="http://..." 
                value={imagenPlato}
                onChange={(e) => setImagenPlato(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="btn-crear" style={{ marginTop: '15px' }}>
            Añadir a la Pizarra
          </button>
        </form>
      </section>

      {loading && (
        <div className="pantalla-estado">
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>🔄 Obteniendo recetas nacionales de TheMealDB...</p>
        </div>
      )}

      {error && (
        <div className="pantalla-estado" style={{ borderColor: '#c62828' }}>
          <p style={{ color: '#c62828', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '15px' }}>{error}</p>
          <button onClick={cargarAPI} className="btn-danger">
            🔄 Reintentar Conexión
          </button>
        </div>
      )}

      {!loading && !error && (
        <section>
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#5d4037', textAlign: 'center', marginBottom: '20px' }}>
            📜 Menú de Hoy ({menu.length} platos disponibles)
          </h2>
          <MenuPizarra 
            platos={menu}
            onUpdatePrecio={handleUpdatePrecio}
            onDeletePlato={handleDeletePlato}
            onToggleDisponibilidad={handleToggleDisponibilidad}
          />
        </section>
      )}
    </div>
  );
}

export default App;