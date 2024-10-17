import React, { useState, useEffect } from 'react';
import { Button, Paragraph } from 'govuk-react';
import { useLocation } from 'react-router-dom';
import CompareResults from './CompareResults';
import SearchResult from '../models/SearchResult';

const SearchInProgress = () => {
  const location = useLocation();
  const searchFilter = location.state?.selectedFilter;

  // Extract selected sources for easy access
  const selectedArray = searchFilter?.searchSources || [];
  const [levBirthComplete, setLevBirthComplete] = useState(false);
  const [ipcsSearchComplete, setIpcsSearchComplete] = useState(false);
  const [dvlaSearchComplete, setDvlaSearchComplete] = useState(false);
  const [showCompareResults, setShowCompareResults] = useState(false);
  const [selectedSources, setSelectedSources] = useState(selectedArray);
  
  const searchCompleteStatus = {
    LEV: { complete: levBirthComplete, idVerification: 'Identity Verification - 55%', nationality: 'Nationality Verification - 95%', vulnerability: 'Vulnerability Verification - N/A', eligibility: 'Eligibility Verification - N/A' },
    IPCS: { complete: ipcsSearchComplete, idVerification: 'Identity Verification - 95%', nationality: 'Nationality Verification - N/A', vulnerability: 'Vulnerability Verification - N/A', eligibility: 'Eligibility Verification - N/A' },
    DVLA: { complete: dvlaSearchComplete, idVerification: 'Identity Verification - N/A', nationality: 'Nationality Verification - Multiple Matches Found', vulnerability: 'Vulnerability Verification - N/A', eligibility: 'Eligibility Verification - N/A' },
  };

  // Create an array to hold SearchResult objects
  const searchResults = [];
  selectedArray.forEach(source => {
    const result = searchCompleteStatus[source];
    
    if (result) {
      const searchResult = new SearchResult(
        source,
        result.complete,
        result.idVerification,
        result.nationality,
        result.vulnerability,
        result.eligibility
      );

      searchResults.push(searchResult);
    }
  });

  useEffect(() => {
    const createTimer = (setComplete) => {
      return setTimeout(() => {
        setComplete(true);
      }, Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000);
    };

    const timers = [
      createTimer(setLevBirthComplete),
      createTimer(setIpcsSearchComplete),
      createTimer(setDvlaSearchComplete),
    ];
    return () => {
      timers.forEach(clearTimeout);
    };
  }, [selectedArray]);

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
                  <Paragraph>{result.idVerification}</Paragraph>
                  <Paragraph>{result.nationality}</Paragraph>
                  <Paragraph>{result.vulnerability}</Paragraph>
                  <Paragraph>{result.eligibility}</Paragraph>
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
          <CompareResults selectedSources={selectedSources} />
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
