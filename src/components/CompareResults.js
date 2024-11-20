import React from 'react';

const CompareResults = ({ searchResults, selectedSources }) => {
  
  
  const data = [
    // { label: "First Name", fields: {  } },
    // { label: "Middle Name", fields: {  } },
    // { label: "Last Name", fields: { } },
    // { label: "Date of Birth", fields: { } },
    // { label: "Address", fields: {  } },
    // { label: "Unique Identifier - Birth Cert", fields: {} },
    // { label: "Driving Licence Number", fields: { } },
  ];
  const excludedLabels = ['First Name data', 'Middle Name data','Last Name data','Date of Birth data','Address data',
    'Unique Identifier - Birth Cert data','Driving Licence Number data','Passport Number data'
   ];
  selectedSources.forEach((source) => {
    const index = searchResults.findIndex(item => item.source === source);
    const searchResult = searchResults[index];
    if (searchResult.icbMatch.matches) {
      searchResult.icbMatch.matches.forEach((match) => {
        
        const index1 = data.findIndex(item => item.label === match.first);
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

  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper" id="main-content" role="main">
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
        .filter(row => !excludedLabels.includes(row.label)) // Exclude rows with specified labels
        .map((row, index) =>  (
              <tr className="govuk-table__row" key={index}>
                <th scope="row" className="govuk-table__header">{row.label}</th>
                {selectedSources.map((source) =>
                  selectedSources.includes(source) && (
                    <td
                    className="govuk-table__cell"
                    key={source}
                    style={{ color: sourceColorMap[source] || "inherit" }}
                  >
                    {row.fields[source]}
                  </td>
                  )
                )}
              </tr>
            ))}
          </tbody>

        </table>
      </main>
    </div>
  );
};

export default CompareResults;
