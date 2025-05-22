import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './App.css';
import NavBar from './components/NavBar'; //navbar
import SearchBar from './components/SearchBar';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
// import NavBar from './components/NavBar'; // <- solo si usás NavBar

function App() {
  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState('descripcion');
  const [busqueda, setBusqueda] = useState('');
  const [searchValue, setSearchValue] = useState('');
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

  const manejarEditar = useCallback((producto) => {
    setProductoEditar(producto);
    setMostrarFormulario(true);
  }, []);

  const productosFiltrados = useMemo(() => {
    const texto = busqueda.toLowerCase();
    return productos.filter((p) =>
      filtro === 'id'
        ? p.id.toString().includes(texto)
        : p.descripcion.toLowerCase().includes(texto)
    );
  }, [productos, filtro, busqueda]);

  return (
    <div className="app-container">
      <NavBar /> 
      <SearchBar
        searchType={filtro}
        setSearchType={setFiltro}
        searchQuery={busqueda}
        setSearchQuery={setBusqueda}
        setMostrarFormulario={setMostrarFormulario}
      />
      <ProductList
        productos={productosFiltrados}
        onEditar={manejarEditar}
        onEliminar={eliminarProducto}
        searchValue={busqueda}
      />
      {mostrarFormulario && (
        <ProductForm
          agregarProducto={agregarProducto}
          actualizarProducto={actualizarProducto}
          productoEditar={productoEditar}
          cancelarEdicion={() => {
            setProductoEditar(null);
            setMostrarFormulario(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
