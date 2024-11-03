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

  selectedSources.forEach((source) => {
    const index = searchResults.findIndex(item => item.source === source);
    const searchResult = searchResults[index];
    if (searchResult.matches) {
      searchResult.matches.forEach((match) => {
        const index1 = data.findIndex(item => item.label === match.first);
        if (index1 === -1) {
          data.push({ label: match.first, fields: {[source]: match.second === 'YES' ? "✔" : match.second === 'NO' ? <strong>X</strong> : match.second } });
        } else {  
          data[index1].fields[source] =  match.second === 'YES' ? "✔" : match.second === 'NO' ? <strong>X</strong> : match.second;
        }
      // data.forEach((row) => {
      //   searchResult
      //   row.fields[source] = searchResults[index].complete ? searchResults[index].firstNameMatched == "YES" ? "✔" : "X" : "Waiting...";
      // });
    });
  }
  });
  selectedSources.forEach((source) => {
    const index = searchResults.findIndex(item => item.source === source);
    const searchResult = searchResults[index];
    let status = 'Waiting...';
    if (searchResult.status === 'No match found') {
      status = 'N/A';
    } else if (searchResult.status === 'Multiple matches found') {
      status = 'Resolve...';
    }
    data.forEach((row) => {
      if (!row.fields[source]) {
        row.fields[source] = status;
      }
    });
  });
  // searchResults.forEach((result) => {   
  //   data.forEach((row) => {
  //     row.fields[result.source] = result.match[row.label];
  //   });
  // });

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
            {data.map((row, index) => (
              <tr className="govuk-table__row" key={index}>
                <th scope="row" className="govuk-table__header">{row.label}</th>
                {selectedSources.map((source) =>
                  selectedSources.includes(source) && (
                    <td className="govuk-table__cell" key={source}>{row.fields[source]}</td>
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
