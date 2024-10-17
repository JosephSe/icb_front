import React from 'react';

const CompareResults = ({ selectedSources }) => {
  const data = [
    { label: "First Name", fields: { LEV: "waiting...", IPCS: "✔", DVLA: "Resolution Required" } },
    { label: "Middle Name", fields: { LEV: "waiting...", IPCS: "✔", DVLA: "Resolution Required" } },
    { label: "Last Name", fields: { LEV: "waiting...", IPCS: "✔", DVLA: "Resolution Required" } },
    { label: "Date of Birth", fields: { LEV: "waiting...", IPCS: "—", DVLA: "Resolution Required" } },
    { label: "Address", fields: { LEV: "waiting...", IPCS: "", DVLA: "Resolution Required" } },
    { label: "Unique Identifier - Birth Cert", fields: { LEV: "waiting...", IPCS: "N/A", DVLA: "N/A" } },
    { label: "Driving Licence Number", fields: { LEV: "N/A", IPCS: "✔", DVLA: "Resolution Required" } },
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
              {selectedSources.map((source) => (
                <th key={source} scope="col" className="govuk-table__header">
                  {source === 'LEV' ? 'LEV - Birth' : source}
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
