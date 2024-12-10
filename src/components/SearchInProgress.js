import React, { useState, useEffect } from 'react';
import { Button, Paragraph } from 'govuk-react';
import { useLocation, useNavigate } from 'react-router-dom';
import CompareResults from './CompareResults';
import CompareMatches from './CompareMatches';
import SearchResult from '../models/SearchResult';
import { Client } from '@stomp/stompjs';

import ICBMatch from '../models/ICBMatch.js';
import ICBMatchRecord from '../models/ICBMatchRecord.js';



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
  const [showData, setShowData] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [multiMatchResult, setMultiMatchResult] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [resultP, setResult] = useState(null);



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
        const createICBMatchRecordInstance = (icbMatchRecordData) => {
          if (icbMatchRecordData) {
            const cleanedFileName = icbMatchRecordData.fileName?.replace(/^["]+|["]+$/g, '');


            // Construct the URL
            const baseUrl = "http://localhost:8080";
            var formattedUrl = `${baseUrl}/${cleanedFileName}`;
            if(cleanedFileName === undefined){
              formattedUrl = "";
            }
            return new ICBMatchRecord(
              icbMatchRecordData.firstName,
              icbMatchRecordData.middleName,
              icbMatchRecordData.lastName,
              icbMatchRecordData.dateOfBirth,  // Assuming dateOfBirth is a valid date string or object
              icbMatchRecordData.address,
              icbMatchRecordData.drivingLicenseNumber,
              icbMatchRecordData.passportNumber,
              icbMatchRecordData.birthCertificate,
              formattedUrl,
              icbMatchRecordData.flag,
              icbMatchRecordData.motherName,
              icbMatchRecordData.motherMaidenName,
              icbMatchRecordData.motherPlaceOfBirth,
              icbMatchRecordData.fatherName,
              icbMatchRecordData.fatherPlaceOfBirth,
              icbMatchRecordData.registrationDistrict,
              icbMatchRecordData.subDistrict,
              icbMatchRecordData.administrativeArea,
              icbMatchRecordData.dateOfRegistration,
              icbMatchRecordData.serverResponse
            );
          }
          return null; // Return null or handle the case where there's no valid data
        };

        // Example usage:
        const icbMatchRecordInstance = createICBMatchRecordInstance(result.match?.icbMatchRecord);
        const icbMatch = new ICBMatch(
          result.match?.matches || [],                     // Default to empty array if matches is undefined
          result.match?.verifications || [],               // Default to empty array if verifications is undefined
          result.match?.fullRecordAvailable || false,    // Default to false if isFullRecordAvailable is undefined
          icbMatchRecordInstance       // Default to undefined if icbMatchRecord is undefined
        );

        const newSearchResult = new SearchResult(
          result.searchSource,
          result.searchComplete,
          result.matchStatus,
          icbMatch,
          result.multiMatches || [], // MultiMatches array, default to empty if not provided
          result.birthCertificate ? result.birthCertificate : undefined,
          result.drivingLicenseNumber ? result.drivingLicenseNumber : undefined,
          result.passportNumber ? result.passportNumber : undefined,

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
    setShowCompareMatches(false);
    setShowCompareResults(true);
  };

  const handleCompareMatches = (searchResult) => {
    setShowCompareResults(false)
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
          <div className="tile" key={result.source} style={{ textAlign: 'center' }}>
            <div className="tile-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2 className="govuk-heading-m">{result.source === 'LEV' ? 'LEV - BIRTH' : result.source}</h2>
              {!result.complete ? (
                <>
                  <div className="loader"></div>
                  <Paragraph style={{ margin: '0' }}>Searching...</Paragraph>
                </>
              ) : (
                <>
                  <Paragraph style={{ margin: '0' }}>Search Complete</Paragraph>
                  <Paragraph style={{ margin: '0' }}>{result.status}</Paragraph>
                  {result.icbMatch?.verifications && result.icbMatch?.verifications.map((verification, idx) => (
                    <Paragraph key={idx} style={{ margin: '0' }}>{verification}</Paragraph>
                  ))}
                </>
              )}
            </div>
            {!result.complete ? (
              <Button className="tile-button" disabled>Stop</Button>
            ) : result.status === 'No match found' ? (
              <Button className="tile-button" style={{ display: 'none' }}>Stop</Button>
            ) : result.status === 'Multiple matches found' ? (
              <Button className="tile-button" onClick={() => handleCompareMatches(result)}>Resolve Multiple Matches</Button>
            ) : result.status === 'One match found' && result.icbMatch.isFullRecordAvailable ? (
              <Button className="tile-button" onClick={handleViewDetails}>View Comparison</Button>
            ) : (
              <Button className="tile-button" onClick={handleViewDetails}>View Comparison</Button>
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
            setShowCompareMatches={setShowCompareMatches} />
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
