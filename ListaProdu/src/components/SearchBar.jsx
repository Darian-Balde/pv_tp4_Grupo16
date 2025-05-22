import React from 'react';
import './SearchBar.css';

const SearchBar = ({
  searchType,
  setSearchType,
  searchQuery,
  setSearchQuery,
  setMostrarFormulario
}) => {
  return (
    <div className="search-bar">
      <label>
        <input
          type="radio"
          value="descripcion"
          checked={searchType === 'descripcion'}
          onChange={(e) => setSearchType(e.target.value)}
        />
        Descripción
      </label>
      <label>
        <input
          type="radio"
          value="id"
          checked={searchType === 'id'}
          onChange={(e) => setSearchType(e.target.value)}
        />
        ID
      </label>
      <input
        type="text"
        className="search-input"
        placeholder="Buscar producto..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <button
        className="add-product-btn"
        onClick={() => setMostrarFormulario(true)}
      >
        Agregar Producto
      </button>
    </div>
  );
};

export default SearchBar;