import React, { useState, useEffect } from 'react';
import './ProductForm.css';

const ProductForm = ({
  agregarProducto,
  actualizarProducto,
  productoEditar,
  cancelarEdicion
}) => {
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
    const precioNum = parseFloat(precio);
    const descuentoNum = parseFloat(descuento);
    const stockNum = parseInt(stock);

    if (!descripcion.trim()) {
      alert("La descripción no puede estar vacía.");
      return;
    }
    if (isNaN(precioNum) || precioNum <= 0) {
      alert("El precio debe ser mayor a 0.");
      return;
    }
    if (isNaN(descuentoNum) || descuentoNum < 0 || descuentoNum > 100) {
      alert("El descuento debe estar entre 0 y 100.");
      return;
    }
    if (isNaN(stockNum) || stockNum < 0) {
      alert("El stock no puede ser negativo.");
      return;
    }

    const nuevoProducto = {
      descripcion,
      precio: precioNum,
      descuento: descuentoNum,
      stock: stockNum
    };

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
      />
      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
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
      />
      <div className="form-buttons">
        <button type="submit">{productoEditar ? 'Actualizar' : 'Guardar'}</button>
        <button type="button" onClick={cancelarEdicion}>Cancelar</button>
      </div>
    </form>
  );
};

export default ProductForm;
