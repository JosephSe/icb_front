// src/components/SearchSources.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SearchSources = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container">
      <h1>Search Sources</h1>
      <h2>Do you know which sources you need to use for search?</h2>
      <div className="radio-container">
        <label className="radio-label">
          <input type="radio" name="knowSources" value="yes" /> Yes
        </label>
        <label className="radio-label">
          <input type="radio" name="knowSources" value="no" /> No
        </label>
      </div>
      <div className="button-container">
        <button onClick={() => navigate('/search-source-choices')} className="button">Continue</button>
      </div>
    </div>
  );
};

export default SearchSources;