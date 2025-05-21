import React from 'react'

const SearchBar = ({ searchType, setSearchType, searchQuery, setSearchQuery }) => {
  return (
    <div className="search-bar"> {/* La clase "search-bar" seguirá estando, pero no tendrá estilos aplicados desde un archivo CSS */}
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
    </div>
  )
}

export default SearchBar