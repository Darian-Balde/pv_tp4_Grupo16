import React, { useState, useEffect } from 'react';
//import './ProductForm.css';

const ProductForm = ({ agregarProducto, actualizarProducto, productoEditar, cancelarEdicion }) => {
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [descuento, setDescuento] = useState('');
  const [stock, setStock] = useState('');

  useEffect(() => {
    if (productoEditar) {
      setDescripcion(productoEditar.descripcion);
      setPrecio(productoEditar.precio);
      setDescuento(productoEditar.descuento);
      setStock(productoEditar.stock);
    } else {
      setDescripcion('');
      setPrecio('');
      setDescuento('');
      setStock('');
    }
  }, [productoEditar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoProducto = { descripcion, precio, descuento, stock };

    if (productoEditar) {
      actualizarProducto(productoEditar.id, nuevoProducto);
    } else {
      agregarProducto(nuevoProducto);
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Precio Unitario"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="% Descuento"
        value={descuento}
        onChange={(e) => setDescuento(e.target.value)}
      />
      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        required
      />
      <div className="form-buttons">
        <button type="submit">{productoEditar ? 'Actualizar' : 'Guardar'}</button>
        <button type="button" onClick={cancelarEdicion}>Cancelar</button>
      </div>
    </form>
  );
};

export default ProductForm;