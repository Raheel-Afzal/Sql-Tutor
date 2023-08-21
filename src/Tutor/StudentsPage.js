import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import studentIcon from '../Teacher.jpg';
import UpdateStudentInfo from '../Tutor/UpdateStudentInfo ';
function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [searchSemester, setSearchSemester] = useState('');
  const [searchSection, setSearchSection] = useState('');
  const [searchStudentID, setSearchStudentID] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);

  const [selectedSid, setSelectedSid] = useState('');
  ///

  //

  useEffect(() => {
    axios.get('http://localhost/FYPAPI/api/Teacher/GetTStudentInfo')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
 
    const handleDelete = ({ selectedSid }) => {
      axios.delete(`http://localhost/FYPAPI/api/Teacher/DeleteStudent?Sid=${selectedSid}`)
        .then(response => {
          alert('Student deleted successfully!');
        })
        .catch(error => {
          console.error('Error deleting student:', error);
        });
    };
  useEffect(() => {
    // Apply your filtering logic when search inputs change
    const filteredResult = students.filter((student) => {
      // Check if student's semester matches the searchSemester
      if (
        searchSemester &&
        student.Semester &&
        student.Semester.toLowerCase() !== searchSemester.toLowerCase()
      ) {
        return false;
      }
      // Check if student's section matches the searchSection
      if (
        searchSection &&
        student.Section &&
        student.Section.toLowerCase() !== searchSection.toLowerCase()
      ) {
        return false;
      }
      // Check if student's ID contains the searchStudentID
      if (
        searchStudentID &&
        student.Sid &&
        student.Sid.toString().toLowerCase() !== searchStudentID.toLowerCase()
      ) {
        return false;
      }
      return true;
    });
    setFilteredStudents(filteredResult);
  }, [students, searchSemester, searchSection, searchStudentID]);

  const handleFilter = () => {
    // Apply your filtering logic here using the searchSemester, searchSection, and searchStudentID values
    // Update the filtered result accordingly
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
  const [showDialog, setShowDialog] = useState(false);
  const handleButtonClick = () => {
    setShowButton(false);
    setShowDialog(true);
  };
  
  const [showButton, setShowButton] = useState(true);
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
        <a
          href="index.html"
          className="navbar-brand d-flex align-items-center px-4 px-lg-5"
        >
          <h2 className="m-0 text-primary">
            <i className="fa fa-book me-3"></i>BIIT DATABASE TUTOR
          </h2>
        </a>
        <button
          type="button"
          className="navbar-toggler me-4"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto p-4 p-lg-0">
            <a href="/home" className="nav-item nav-link active">
              Home
            </a>
            <a href="/login" className="nav-item nav-link">
              Logout
            </a>
          </div>
          <img src={studentIcon} alt="Student Icon" style={iconStyle} />
        </div>
      </nav>
      
      <div style={{ backgroundColor: '#f2f2f2', padding: '20px' }}>
        <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Students</h1>
        <p style={{ textAlign: 'center', margin: '20px 0' }}>Here you can view and manage your students.</p>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <Link to="/AddStudent">
            <button className="btn btn-primary">
              <FontAwesomeIcon icon={faPlus} style={{ marginRight: '5px' }} />
              Add Student
            </button>
          </Link>
        </div>
        {/* <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <Link to="/UpdateStudent">
            <button className="btn btn-primary">
              <FontAwesomeIcon icon={faPlus} style={{ marginRight: '5px' }} />
              Update  Student
            </button>
          </Link>
        </div> */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
            <input
              type="text"
              placeholder="Search by Semester"
              className="form-control"
              style={{ marginRight: '10px' }}
              value={searchSemester}
              onChange={(e) => setSearchSemester(e.target.value)}
            />
            <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
            <input
              type="text"
              placeholder="Search by Section"
              className="form-control"
              style={{ marginRight: '10px' }}
              value={searchSection}
              onChange={(e) => setSearchSection(e.target.value)}
            />
            <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
            <input
              type="text"
              placeholder="Search by Student ID"
              className="form-control"
              value={searchStudentID}
              onChange={(e) => setSearchStudentID(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={handleFilter}>
            <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
            Filter
          </button>
        </div>
        <table className="table" style={tableStyle}>
          <thead>
            <tr>
            <th style={thStyle}>Student ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Semester</th>
              <th style={thStyle}>Section</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => {
              const { Sid, Fname, Lname, Semester, Section, Semail } = student;
              const fullName = `${Fname} ${Lname}`;
              return (
                <tr key={index}>
                  <td style={tdStyle}>{Sid}</td>
                  <td style={tdStyle}>{fullName}</td>
                  <td style={tdStyle}>{Semail}</td>
                  <td style={tdStyle}>{Semester}</td>
                  <td style={tdStyle}>{Section}</td>
                  <td style={tdStyle}>
                    {/* <button className="btn btn-primary" style={{ marginRight: '5px' }}>
                      <FontAwesomeIcon icon={faEdit} style={{ marginRight: '5px' }} />
                      Edit
                    </button> */}
 {showButton && (
        <button className="btn btn-primary" style={{ marginRight: '5px' }} onClick={handleButtonClick}>
          <FontAwesomeIcon icon={faEdit} style={{ marginRight: '5px' }} />
          Edit
        </button>
      )}
      {showDialog && <UpdateStudentInfo sid={selectedSid} />}

      <button className="btn btn-danger" onClick={handleDelete}>
      <FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px' }} />
      Remove
    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      
    </div>
    
  );
}

export default StudentsPage;


const iconStyle = {
  width: '40px',
  height: '40px',
  marginRight: '10px',
};