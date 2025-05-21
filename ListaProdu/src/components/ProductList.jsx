import React from 'react';
import './ProductList.css';
import ProductItem from './ProductItem';

const ProductList = ({ productos = [], onEditar, onEliminar }) => {
  return (
    <div className="product-list">
      {productos.length === 0 ? (
        <p>No hay productos que coincidan con la búsqueda.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>% Descuento</th>
              <th>Precio Final</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <ProductItem
                key={prod.id}
                producto={prod}
                onEditar={onEditar}
                onEliminar={onEliminar}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;