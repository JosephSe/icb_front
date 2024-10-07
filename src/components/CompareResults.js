import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Table, Heading } from 'govuk-react';

const CompareResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedSources = location.state?.selectedSources || {};

  return (
    <div className="container">
      <Heading level={1}>Compare Results Together</Heading>
      <p>Compare the detailed results holistically</p>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Cell header>Search Filters</Table.Cell>
            <Table.Cell header>LEV - Birth</Table.Cell>
            <Table.Cell header>IPCS</Table.Cell>
            <Table.Cell header>DVLA</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {[ 
            { label: "First Name", lev: "waiting...", ipcs: "✔", dvla: "Resolution Required" },
            { label: "Middle Name", lev: "waiting...", ipcs: "✔", dvla: "Resolution Required" },
            { label: "Last Name", lev: "waiting...", ipcs: "✔", dvla: "Resolution Required" },
            { label: "Date of Birth", lev: "waiting...", ipcs: "—", dvla: "Resolution Required" },
            { label: "Address", lev: "waiting...", ipcs: "", dvla: "Resolution Required" },
            { label: "Unique Identifier - Birth Cert", lev: "waiting...", ipcs: "N/A", dvla: "N/A" },
            { label: "Driving Licence Number", lev: "N/A", ipcs: "✔", dvla: "Resolution Required" },
          ].map((row, index) => (
            <Table.Row key={index}>
              <Table.Cell>{row.label}</Table.Cell>
              <Table.Cell>{row.lev}</Table.Cell>
              <Table.Cell>{row.ipcs}</Table.Cell>
              <Table.Cell>{row.dvla}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div className="button-container">
        <Button onClick={() => window.history.back()} className="govuk-button">Back</Button>
        <Button onClick={() => navigate('/')} className="govuk-button">Home</Button>
      </div>
    </div>
  );
};

export default CompareResults;
