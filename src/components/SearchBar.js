import React, { useState } from 'react';
import { Search } from '@carbon/react';
import './SearchBar.scss';

function SearchBar({ onSearch }) {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchValue('');
    onSearch('');
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar-wrapper">
        <Search
          size="lg"
          placeholder="Search news and partner resources..."
          labelText="Search"
          closeButtonLabelText="Clear search input"
          id="search-1"
          value={searchValue}
          onChange={handleChange}
          onClear={handleClear}
        />
      </div>
    </div>
  );
}

export default SearchBar;

// Made with Bob
