import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Heading, Paragraph } from 'govuk-react';

const SearchInProgress = () => {
  const navigate = useNavigate();

  const [levBirthComplete, setLevBirthComplete] = useState(false);
  const [ipcsSearchComplete, setIpcsSearchComplete] = useState(false);
  const [dvlaSearchComplete, setDvlaSearchComplete] = useState(false);

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
  }, []);

  const handleViewDetails = () => {
    navigate('/compare-results');
  };

  return (
    <div className="container">
      <Heading level={1}>Search In Progress</Heading>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', marginBottom: '20px' }}>
        <div className="tile">
          <div className="tile-content">
            <Heading level={2}>LEV - BIRTH</Heading>
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

        <div className="tile">
          <div className="tile-content">
            <Heading level={2}>IPCS</Heading>
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

        <div className="tile">
          <div className="tile-content">
            <Heading level={2}>DVLA</Heading>
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
      </div>
      <div className="button-container">
        <Button onClick={() => window.history.back()} className="govuk-button">Back</Button>
        <Button onClick={() => navigate('/')} className="govuk-button">Home</Button>
      </div>
    </div>
  );
};

export default SearchInProgress;
