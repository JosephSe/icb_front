import React, { useState, useEffect } from 'react';
import { Button, Paragraph } from 'govuk-react';
import { useLocation } from 'react-router-dom';
import CompareResults from './CompareResults';
import SearchResult from '../models/SearchResult';
import {Client} from '@stomp/stompjs'

const SearchInProgress = () => {
  const location = useLocation();
  const searchFilter = location.state?.selectedFilter;

  // Extract selected sources for easy access
  const selectedArray = searchFilter?.searchSources || [];
  const [showCompareResults, setShowCompareResults] = useState(false);
  const [selectedSources, setSelectedSources] = useState(selectedArray);
  const [searchResults, setSearchResults] = useState([]);
  
  selectedArray.forEach(source => {
    const index = searchResults.findIndex(item => item.source === source);
    if (index === -1) {
      const searchResult = new SearchResult(
        source,
        false
      );
      searchResults.push(searchResult);
    }
  });

  useEffect(() => {
    const stompClient = new Client({
      brokerURL: 'ws://localhost:8080/ws'
    });
  
    stompClient.onConnect = (frame) => {
      stompClient.subscribe('/session/topic/results', (greeting) => {
          const result = JSON.parse(greeting.body);
          const searchResult = new SearchResult(result.searchSource, result.searchComplete, result.match.matches, result.match.verifications);
          setSearchResults(prevResults => {
            const index = prevResults.findIndex(item => item.source === result.searchSource);
            if (index !== -1) {
              prevResults[index] = searchResult;
              return [...prevResults];
            } else {
              return [...prevResults, searchResult];
            }
          })
      });
      const jsonString = `{"searchSources":${JSON.stringify(selectedArray)}, "searchIDTypes":[{"searchSource":"DVLA","searchIDType":"DRIVER_LICENSE","value":"D87654322"}], "searchBioDetails":{"firstName":"jane","lastName":"smith"}}`
      stompClient.publish({
        destination: "/app/search",
        body: jsonString
      });  
    };
    stompClient.activate();
    // const createTimer = (setComplete) => {
    //   return setTimeout(() => {
    //     setComplete(true);
    //   }, Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000);
    // };

    // const timers = [
    //   createTimer(setLevBirthComplete),
    //   createTimer(setIpcsSearchComplete),
    //   createTimer(setDvlaSearchComplete),
    // ];
    // Cleanup function to disconnect the client when the component unmounts
    return () => {
      if (stompClient.connected) {
        stompClient.deactivate();
        console.log('Disconnected');
      }
    };
  }, []);

  const handleViewDetails = () => {
    setSelectedSources(selectedArray); // Set the selected sources in local state
    setShowCompareResults(true); // Show the comparison table on the same page
  };

  return (
    <div className="govuk-width-container">
      <fieldset className="govuk-fieldset" aria-describedby="verification-hint">
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
          <h1 className="govuk-fieldset__heading">Search In Progress</h1>
        </legend>
      </fieldset>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', marginBottom: '20px' }}>
        {searchResults.map((result) => (
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
                  <Paragraph>{result.verifications}</Paragraph>
                </>
              )}
            </div>
            {!result.complete ? (
              <Button className="tile-button" disabled>Stop</Button>
            ) : (
              <Button className="tile-button" onClick={handleViewDetails}>View Details</Button>
            )}
          </div>
        ))}
      </div>

      {showCompareResults && (
        <div id="compare-results-section" style={{ marginTop: '20px' }}>
          <CompareResults searchResults={searchResults} selectedSources={selectedSources} />
        </div>
      )}

      <div className="button-container" style={{ marginTop: '20px' }}>
        <Button onClick={() => window.history.back()} className="govuk-button">Back</Button>
        <Button onClick={() => window.location.href = '/'} className="govuk-button">Home</Button>
      </div>
    </div>
  );
};

export default SearchInProgress;
