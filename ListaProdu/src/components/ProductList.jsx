import React from 'react';
import ProductItem from './ProductItem';
import './ProductList.css';

const ProductList = ({ productos = [], onEditar, onEliminar, searchValue }) => {
  return (
    <div className="product-list">
      {productos.length > 0 ? (
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
      ) : searchValue.trim() !== '' ? (
        <p>No hay productos que coincidan con la búsqueda.</p>
      ) : (
        <p style={{ textAlign: 'center', color: '#999' }}>
          No hay productos todavía. Agregá uno para comenzar 😊
        </p>
      )}
    </div>
  );
};

export default ProductList;
