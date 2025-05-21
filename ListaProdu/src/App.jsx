import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import ProductForm from './components/ProductForm';

function App() {
  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState('descripcion');
  const [busqueda, setBusqueda] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoEditar, setProductoEditar] = useState(null);

  useEffect(() => {
    console.log('Productos actualizados:', productos);
  }, [productos]);

  const obtenerSiguienteId = () => {
    if (productos.length === 0) return 1;
    return Math.max(...productos.map((p) => p.id)) + 1;
  };

  const agregarProducto = useCallback((producto) => {
    const nuevoProducto = { ...producto, id: obtenerSiguienteId() };
    setProductos((prev) => [...prev, nuevoProducto]);
    setMostrarFormulario(false);
  }, [productos]);

  const eliminarProducto = useCallback((id) => {
 
    setProductos((prev) => prev.filter((p) => p.id !== id));
    if (productoEditar?.id === id) setProductoEditar(null);
  }, [productoEditar]);

  const actualizarProducto = useCallback((id, datosActualizados) => {
    setProductos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...datosActualizados } : p))
    );
    setProductoEditar(null);
    setMostrarFormulario(false);
  }, []);


  const productosFiltrados = useMemo(() => {
    if (!busqueda) {
      return productos;
    }

    return productos.filter((p) => {
      if (filtro === 'descripcion') {
        return p.descripcion.toLowerCase().includes(busqueda.toLowerCase());
      } else if (filtro === 'id') {
        return String(p.id).includes(busqueda);
      }
      return true;
    });
  }, [productos, filtro, busqueda]);

  const manejarEditar = useCallback((producto) => {
    setProductoEditar(producto);
    setMostrarFormulario(true);
  }, []);

  const cancelarEdicion = useCallback(() => {
    setProductoEditar(null);
    setMostrarFormulario(false);
  }, []);

  return (
    <div className="app-container">
      <div className="top-bar">
        {/* SearchBar se mantiene */}
        <SearchBar
          searchType={filtro}
          setSearchType={setFiltro}
          searchQuery={busqueda}
          setSearchQuery={setBusqueda}
        />
        <button
          className="add-product-btn"
          onClick={() => {
            setMostrarFormulario(true);
            setProductoEditar(null);
          }}
        >
          Agregar Producto
        </button>
      </div>

      {mostrarFormulario && (
        <ProductForm
          agregarProducto={agregarProducto}
          actualizarProducto={actualizarProducto}
          productoEditar={productoEditar}
          cancelarEdicion={cancelarEdicion}
        />
      )}
    </div>
  );
}

export default App;
