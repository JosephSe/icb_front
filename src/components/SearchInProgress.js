import React, { useState, useEffect } from 'react';
import { Button, Paragraph } from 'govuk-react';
import { useLocation, useNavigate } from 'react-router-dom';
import CompareResults from './CompareResults';
import CompareMatches from './CompareMatches';
import SearchResult from '../models/SearchResult';
import { Client } from '@stomp/stompjs';

const SearchInProgress = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchFilter = location.state?.selectedFilter;
  const handleBack = () => {
    navigate('/search-source-choices', { state: { selectedFilter: searchFilter } });
  };
  const selectedArray = searchFilter?.searchSources || [];
  const [showCompareResults, setShowCompareResults] = useState(false);
  const [showCompareMatches, setShowCompareMatches] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [multiMatchResult, setMultiMatchResult] = useState([]);
  const [stompClient, setStompClient] = useState(null);

 

  useEffect(() => {
    // Initialize the searchResults with selected sources if empty
    const stompClient = new Client({
      brokerURL: 'ws://localhost:8080/ws'
    });
    setStompClient(stompClient)
    if (searchResults.length === 0) {
      const initialResults = selectedArray.map(source => new SearchResult(source, false));
      setSearchResults(initialResults);
    }

    stompClient.onConnect = () => {
      stompClient.subscribe('/session/topic/results', (message) => {
        const result = JSON.parse(message.body);
        const newSearchResult = new SearchResult(
          result.searchSource,
          result.searchComplete,
          result.matchStatus,
          result.match?.matches,
          result.match?.verifications,
          result.multiMatches || [], // MultiMatches array, default to empty if not provided
          result.birthCertificate ? result.birthCertificate : undefined,
          result.drivingLicenseNumber ? result.drivingLicenseNumber : undefined
        );
        

        setSearchResults(prevResults => {
          const existingIndex = prevResults.findIndex(item => item.source === result.searchSource);
          if (existingIndex !== -1) {
            // Update existing entry
            const updatedResults = [...prevResults];
            updatedResults[existingIndex] = newSearchResult;
            return updatedResults;
          } else {
            // Add new entry
            return [...prevResults, newSearchResult];
          }
        });
      });

      const jsonString = JSON.stringify(searchFilter);
      stompClient.publish({
        destination: "/app/search",
        body: jsonString
      });
    };

    stompClient.activate();

    return () => {
      if (stompClient.connected) {
        stompClient.deactivate();
        console.log('Disconnected');
      }
    };
  }, []);

  // Callback function to update searchResults
  const updateSearchResults = (resetSearch) => {
    const existingIndex = searchResults.findIndex(item => item.source === resetSearch.source);
    // Update existing entry
    const updatedResults = [...searchResults];
    updatedResults[existingIndex] = resetSearch;
    setSearchResults(updatedResults);
  };

  const handleViewDetails = () => {
    setShowCompareResults(true);
  };

  const handleCompareMatches = (searchResult) => {
    setShowCompareMatches(true);
    setMultiMatchResult(searchResult);
  };
  
  return (
    <div className="govuk-width-container">
      <fieldset className="govuk-fieldset" aria-describedby="verification-hint">
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
          <h1 className="govuk-fieldset__heading">Search In Progress</h1>
        </legend>
      </fieldset>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', marginBottom: '20px' }}>
        {searchResults.map((result, index) => (
          <div className="tile" key={result.source}>
            <div className="tile-content">
              <h2 className="govuk-heading-m">{result.source === 'LEV' ? 'LEV - BIRTH' : result.source}</h2>
              {!result.complete ? (
                <>
                  <div className="loader"></div>
                  <Paragraph>Searching...</Paragraph>
                </>
              ) : (
                <>
                  <Paragraph>Search Complete</Paragraph>
                  <Paragraph>{result.status}</Paragraph>
                  {result.verifications && result.verifications.map((verification, idx) => (
                    <Paragraph key={idx}>{verification}</Paragraph>
                  ))}
                </>
              )}
            </div>
            {!result.complete ? (
              <Button className="tile-button" disabled>Stop</Button>
            ) : result.status === 'No match found' ? (
              <Button className="tile-button" style={{ display: 'none' }}>Stop</Button>
            ) : result.status === 'Multiple matches found' ? (
              <Button className="tile-button" onClick={() => handleCompareMatches(result)}>Compare Details</Button>
            ) : (
              <Button className="tile-button" onClick={handleViewDetails}>View Details</Button>
            )}
          </div>
        ))}
      </div>

      {showCompareResults && (
        <div id="compare-results-section" style={{ marginTop: '20px' }}>
          
          <CompareResults searchResults={searchResults} selectedSources={selectedArray} />
        </div>
      )}
      {showCompareMatches && (
        <div id="compare-matches-section" style={{ marginTop: '20px' }}>
          <CompareMatches multiMatchResult={multiMatchResult} stompClient={stompClient} updateSearchResults={updateSearchResults} 
        setShowCompareMatches={setShowCompareMatches}/>
        </div>
      )}

      <div className="button-container" style={{ marginTop: '20px' }}>
        <Button onClick={handleBack} className="govuk-button">Back</Button>
        <Button onClick={() => window.location.href = '/'} className="govuk-button">Home</Button>
      </div>
    </div>
  );
};

export default SearchInProgress;
