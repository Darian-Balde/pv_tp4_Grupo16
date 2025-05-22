import React from 'react';
import './ProductItem.css'


const ProductItem = ({ producto, onEditar, onEliminar }) => {
  const { id, descripcion, precio, descuento, stock } = producto;
  const precioConDescuento = (parseFloat(precio) * (1 - descuento / 100)).toFixed(2);

  return (
    <tr>
      <td>{id}</td>
      <td>{descripcion}</td>
      <td>${parseFloat(precio).toFixed(2)}</td>
      <td>{descuento}%</td>
      <td>${precioConDescuento}</td>
      <td>{stock}</td>
      <td>
        <button onClick={() => onEditar(producto)}>Editar</button>
        <button onClick={() => onEliminar(id)}>Eliminar</button>
      </td>
    </tr>
  );
};


export default ProductItem;