// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchSources from './components/SearchSources';
import SearchSourceChoices from './components/SearchSourceChoices';
import SearchFilters from './components/SearchFilters';
import SearchInProgress from './components/SearchInProgress';
import CompareResults from './components/CompareResults';
import './App.css';  // Add this line

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SearchSources />} />
          <Route path="/search-source-choices" element={<SearchSourceChoices />} />
          <Route path="/search-filters" element={<SearchFilters />} />
          <Route path="/search-in-progress" element={<SearchInProgress />} />
          <Route path="/compare-results" element={<CompareResults />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;