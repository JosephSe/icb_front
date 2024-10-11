import React, { useState, useEffect } from 'react';
import { Button, Paragraph } from 'govuk-react';
import { useLocation } from 'react-router-dom';
import CompareResults from './CompareResults';

const SearchInProgress = () => {
  const location = useLocation();
  const selectedSources = location.state?.selectedSources || {};
  const [levBirthComplete, setLevBirthComplete] = useState(false);
  const [ipcsSearchComplete, setIpcsSearchComplete] = useState(false);
  const [dvlaSearchComplete, setDvlaSearchComplete] = useState(false);
  const [showCompareResults, setShowCompareResults] = useState(false);

  useEffect(() => {
    const createTimer = (setComplete) => {
      return setTimeout(() => {
        setComplete(true);
      }, Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000);
    };

    const timers = [
      selectedSources.levBirth ? createTimer(setLevBirthComplete) : null,
      selectedSources.ipcs ? createTimer(setIpcsSearchComplete) : null,
      selectedSources.dvla ? createTimer(setDvlaSearchComplete) : null,
    ].filter(Boolean); // Filter out null values

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [selectedSources]);

  const handleViewDetails = () => {
    setShowCompareResults(true);
  };

  return (
    <div className="govuk-width-container">
      <fieldset className="govuk-fieldset" aria-describedby="verification-hint">
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
          <h1 className="govuk-fieldset__heading">Search In Progress</h1>
        </legend>
      </fieldset>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', marginBottom: '20px' }}>
        {selectedSources.levBirth && (
          <div className="tile">
            <div className="tile-content">
              <h2 className="govuk-heading-m">LEV - BIRTH</h2>
              {!levBirthComplete ? (
                <>
                  <div className="loader"></div>
                  <Paragraph>Searching...</Paragraph>
                </>
              ) : (
                <>
                  <Paragraph>Search Complete</Paragraph>
                  <Paragraph>Identity Verification - 55%</Paragraph>
                  <Paragraph>Nationality Verification - 95%</Paragraph>
                  <Paragraph>Vulnerability Verification - N/A</Paragraph>
                  <Paragraph>Eligibility Verification - N/A</Paragraph>
                </>
              )}
            </div>
            {!levBirthComplete ? (
              <Button className="tile-button" disabled>Stop</Button>
            ) : (
              <Button className="tile-button" onClick={handleViewDetails}>View Details</Button>
            )}
          </div>
        )}

        {selectedSources.ipcs && (
          <div className="tile">
            <div className="tile-content">
              <h2 className="govuk-heading-m">IPCS</h2>
              {!ipcsSearchComplete ? (
                <>
                  <div className="loader"></div>
                  <Paragraph>Searching...</Paragraph>
                </>
              ) : (
                <>
                  <Paragraph>Search Complete</Paragraph>
                  <Paragraph>Identity Verification - 95%</Paragraph>
                  <Paragraph>Nationality Verification - N/A</Paragraph>
                  <Paragraph>Vulnerability Verification - N/A</Paragraph>
                  <Paragraph>Eligibility Verification - N/A</Paragraph>
                </>
              )}
            </div>
            {!ipcsSearchComplete ? (
              <Button className="tile-button" disabled>Stop</Button>
            ) : (
              <Button className="tile-button" onClick={handleViewDetails}>View Details</Button>
            )}
          </div>
        )}

        {selectedSources.dvla && (
          <div className="tile">
            <div className="tile-content">
              <h2 className="govuk-heading-m">DVLA</h2>
              {!dvlaSearchComplete ? (
                <>
                  <div className="loader"></div>
                  <Paragraph>Searching...</Paragraph>
                </>
              ) : (
                <>
                  <Paragraph>Search Incomplete</Paragraph>
                  <Paragraph>Multiple Matches Found</Paragraph>
                </>
              )}
            </div>
            {!dvlaSearchComplete ? (
              <Button className="tile-button" disabled>Stop</Button>
            ) : (
              <Button className="tile-button" onClick={handleViewDetails}>View Details</Button>
            )}
          </div>
        )}
      </div>

      {showCompareResults && (
        <div id="compare-results-section" style={{ marginTop: '20px' }}>
          <CompareResults />
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
