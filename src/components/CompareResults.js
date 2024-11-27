import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ViewResult from './ViewResult.js';



const CompareResults = ({ searchResults, selectedSources }) => {
  const [showTable, setShowTable] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [resultD, setResultD] = useState(null);
  const data = [
    // { label: "First Name", fields: {  } },
    // { label: "Middle Name", fields: {  } },
    // { label: "Last Name", fields: { } },
    // { label: "Date of Birth", fields: { } },
    // { label: "Address", fields: {  } },
    // { label: "Unique Identifier - Birth Cert", fields: {} },
    // { label: "Driving Licence Number", fields: { } },
  ];
  let flag=false;
    selectedSources.forEach((source) => {
      const index = searchResults.findIndex(item => item.source === source);
      const searchResult = searchResults[index];

      if (!flag&&searchResult.icbMatch?.isFullRecordAvailable) {
        flag=true;
      }

      if (searchResult.icbMatch?.matches) {
        
    
        searchResult.icbMatch?.matches.forEach((match) => {
          const index1 =data.findIndex(item => item.label === match.first);
          if (index1 === -1) {
          // If no existing entry in `data`, add a new one.
          data.push({ 
              label: match.first,
              fields: {
                [source]: match.second === 'YES' ? "✔" : match.second === 'NO' ? <strong>X</strong>
                        : match.second === 'RED' ? "🚩" 
                        : match.second === 'AMBER' ? "⚠️"
                        : match.second 
              }
            });
          } else {
          // If the entry exists, update its `fields`.
          data[index1].fields[source] = match.second === 'YES' ? "✔" 
              : match.second === 'NO' ? <strong>X</strong>
                                      : match.second === 'RED' ? "🚩" 
                                      : match.second === 'AMBER' ? "⚠️" 
                                      : match.second;
          }
        
      // data.forEach((row) => {
      //   searchResult
      //   row.fields[source] = searchResults[index].complete ? searchResults[index].firstNameMatched == "YES" ? "✔" : "X" : "Waiting...";
      // });
    });
  }
  });
  console.log("row is", data);
const sourceColorMap = {};

data.forEach(row => {
  selectedSources.forEach(source => {
    Object.keys(row.fields).forEach(fieldKey => {
      if (row.fields[fieldKey] === "🚩") {
        sourceColorMap[fieldKey] = "red";
      } else if (row.fields[fieldKey] === "⚠️") {
        sourceColorMap[fieldKey] = "orange";
      }
    });
  });
});

console.log("sourceColorMap:", sourceColorMap);

  
  selectedSources.forEach((source) => {
    const index = searchResults.findIndex(item => item.source === source);
    const searchResult = searchResults[index];
      let status = 'Waiting...';
      if (searchResult.status === 'No match found') {
        status = 'N/A';
      } else if (searchResult.status === 'Multiple matches found') {
        status = 'Resolve...';
      } else if (searchResult.status === 'One match found') {
        status = '-';
      }
    data.forEach((row) => {
        if (!row.fields[source]) {
          row.fields[source] = status;
        }
      });
    });
    const handleViewData = (result) => {
      setResultD(result);
      setShowDetails(prevShowDetails => !prevShowDetails);
    };
    console.log("resultD  ",showDetails)
  
  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper" id="main-content" role="main">
      {showTable && ( 
          <>
        <fieldset className="govuk-fieldset" aria-describedby="verification-hint">
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
            <h1 className="govuk-fieldset__heading">Compare Results Together</h1>
          </legend>
        </fieldset>
        <div id="verification-hint" className="govuk-hint">
          Compare the detailed results holistically.
        </div>
        <table className="govuk-table">
          <thead className="govuk-table__head">
            <tr className="govuk-table__row">
              <th scope="col" className="govuk-table__header">Search Filters</th>
              {searchResults.map((result) => (
                <th key={result.source} scope="col" className="govuk-table__header">
                  {result.source === 'LEV' ? 'LEV - Birth' : result.source}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="govuk-table__body">
            {data
              .map((row, index) => (
                <tr className="govuk-table__row" key={index}>
                  <th scope="row" className="govuk-table__header">{row.label}</th>
                  {selectedSources.map((source) => (
                    selectedSources.includes(source) && (
                      <td
                        className="govuk-table__cell"
                        key={source}
                        style={{ color: sourceColorMap[source] || "inherit" }}
                      >
                        {row.fields[source]}
                      </td>
                    )
                  ))}
                </tr>
              ))}
            {flag && (
              <tr className="govuk-table__row">
                <th scope="row" className="govuk-table__header">Details</th>
                {selectedSources.map((source) => {
                  const index = searchResults.findIndex(item => item.source === source);
                  const searchResult = searchResults[index];

                  // Check if 'isFullRecordAvailable' is true
                  return (
                    <td
                      className="govuk-table__cell"
                      key={source}
                      style={{ color: sourceColorMap[source] || "inherit" }}
                    >
                      {searchResult.icbMatch?.isFullRecordAvailable ? (
                        <button onClick={() => handleViewData(searchResult)}>
                          {showDetails ? 'Hide Details' : 'View Details'}
                        </button>
                      ) : (
                        "-"
                      )}
                    </td>
                  );
                })}
              </tr>
            )}
          </tbody>
        </table>
        </>
        )}

        {showDetails  &&(
        <div id="view-result-section" style={{ marginTop: '20px' }}>
      
          <ViewResult searchResults={resultD} selectedSources={resultD.source} />
        </div>
      )}
        
        
      </main>
    </div>
  );
};

export default CompareResults;
