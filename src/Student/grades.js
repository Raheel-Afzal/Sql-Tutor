import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import studentIcon from '../student.jpg';
import gradepic from '../grading-1622052736.avif';
const AssignmentResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email');
  const Studentid = searchParams.get('sid');

  const navigate = useNavigate();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchAssignmentResults = async () => {
      try {
        const response = await fetch(`http://localhost/FYPAPI/api/Teacher/marks?Sid=${Studentid}`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAssignmentResults();
  }, [Studentid]);

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
            <a href="/assignmentlist" className="nav-item nav-link">
              {email}
            </a>
          </div>

          <img src={studentIcon} alt="Student Icon" style={iconStyle} />
        </div>
      </nav>
      <div style={{ backgroundColor: '#F5F5F5', minHeight: '100vh', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
  <div>
    <h1 style={{ textAlign: 'center', color: '#3F51B5', marginBottom: '20px' }}>Assignment Results</h1>
    <div style={{ overflowX: 'auto' }}>
      
      <table style={{ width: '100%', margin: '0 auto', borderCollapse: 'collapse', backgroundColor: '#F5F5F5' }}>
        <thead>
          <tr style={{ backgroundColor: '#3F51B5', color: 'white' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Student</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Assignment</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Grade</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{result.Sid}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{result.AssignmentNumber}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{result.Amarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      
    </div>
  </div>
  <div style={{ backgroundImage: `url(${gradepic})`, backgroundSize: 'cover', minHeight: '60vh',maxHeight:'1200vh', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
</div>
  <footer style={{ backgroundColor: '#f2f2f2', padding: '20px', color: '#4d4d4d', textAlign: 'center' }}>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ marginRight: '10px' }}>
        <i className="fab fa-twitter"></i>
      </div>
      <div style={{ marginRight: '10px' }}>
        <i className="fab fa-facebook"></i>
      </div>
      <div style={{ marginRight: '10px' }}>
        <i className="fab fa-instagram"></i>
      </div>
      <div>
        <i className="fab fa-linkedin"></i>
      </div>
    </div>
    <p style={{ marginTop: '10px' }}>© 2023 Your Company. All rights reserved.</p>
  </footer>
</div>




    </div>
  );
};

export default AssignmentResults;

const iconStyle = {
  width: '40px',
  height: '40px',
  marginRight: '10px',
};





