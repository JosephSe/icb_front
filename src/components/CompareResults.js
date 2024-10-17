import React from 'react';

const CompareResults = ({ selectedSources }) => {
  const data = [
    { label: "First Name", lev: "waiting...", ipcs: "✔", dvla: "Resolution Required" },
    { label: "Middle Name", lev: "waiting...", ipcs: "✔", dvla: "Resolution Required" },
    { label: "Last Name", lev: "waiting...", ipcs: "✔", dvla: "Resolution Required" },
    { label: "Date of Birth", lev: "waiting...", ipcs: "—", dvla: "Resolution Required" },
    { label: "Address", lev: "waiting...", ipcs: "", dvla: "Resolution Required" },
    { label: "Unique Identifier - Birth Cert", lev: "waiting...", ipcs: "N/A", dvla: "N/A" },
    { label: "Driving Licence Number", lev: "N/A", ipcs: "✔", dvla: "Resolution Required" },
  ];

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
              {selectedSources.includes('LEV') && <th scope="col" className="govuk-table__header">LEV - Birth</th>}
              {selectedSources.includes('IPCS') && <th scope="col" className="govuk-table__header">IPCS</th>}
              {selectedSources.includes('DVLA') && <th scope="col" className="govuk-table__header">DVLA</th>}
            </tr>
          </thead>
          <tbody className="govuk-table__body">
            {data.map((row, index) => (
              <tr className="govuk-table__row" key={index}>
                <th scope="row" className="govuk-table__header">{row.label}</th>
                {selectedSources.includes('LEV') && <td className="govuk-table__cell">{row.lev}</td>}
                {selectedSources.includes('IPCS') && <td className="govuk-table__cell">{row.ipcs}</td>}
                {selectedSources.includes('DVLA') && <td className="govuk-table__cell">{row.dvla}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default CompareResults;
