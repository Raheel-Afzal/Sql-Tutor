import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function AssignmentsPage() {
  const headingStyle = {
    textAlign: 'center',
    margin: '20px 0'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'center',
    margin: '20px 0'
  };

  const thStyle = {
    backgroundColor: '#f2f2f2',
    padding: '12px'
  };

  const tdStyle = {
    border: '1px solid #ddd',
    padding: '12px'
  };

  const buttonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '12px 20px',
    margin: '10px 2px',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'center'
  };

  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetch('http://localhost/FYPAPI/api/Teacher/GetAssgs')
      .then(response => response.json())
      .then(data => setAssignments(data));
  }, []);

  return (
    <div className="container">
      <h2 style={headingStyle}>Assignments</h2>
      <p style={{ textAlign: 'center', margin: '20px 0' }}>Here you can view and manage your assignments.</p>
      <div className="text-center mb-4">
        <Link to="/AssgForm" className="btn btn-primary mr-2">
          <FontAwesomeIcon icon={faPlus} className="mr-1" />
          Create Assignment
        </Link>
        <button style={buttonStyle} className="btn btn-success">
          <FontAwesomeIcon icon={faEdit} className="mr-1" />
          Edit Assignment
        </button>
        <button style={buttonStyle} className="btn btn-danger">
          <FontAwesomeIcon icon={faTrash} className="mr-1" />
          Delete Assignment
        </button>
      </div>
      <table style={tableStyle} className="table">
        <thead>
          <tr>
            <th style={thStyle}>Title</th>
            <th style={thStyle}>Deadline</th>
            <th style={thStyle}>Database Name</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment, index) => (
            <tr key={index}>
              <td style={tdStyle}>{assignment.Title}</td>
              <td style={tdStyle}>{assignment.Deadline}</td>
              <td style={tdStyle}>{assignment.DatabaseName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/Tdashbord" className="btn btn-primary">
        Go Back
      </Link>
    </div>
  );
}

export default AssignmentsPage;
