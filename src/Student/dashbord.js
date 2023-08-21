import { FaEnvelope } from 'react-icons/fa';
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
//import { useHistory } from "react-router-dom";
import useHistory from 'use-history';
import studentIcon from '../student.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faClipboardList, faChartLine, faDatabase, faBook } from '@fortawesome/free-solid-svg-icons';

//import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import { FaFolderOpen, FaClipboardList, FaChartLine, FaDatabase, FaBook } from "react-icons/fa";
const StudentHome = () => {
  const [sid, setSid] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [semester, setSemester] = useState('');
  const [section, setSection] = useState('');
  const [semail, setSemail] = useState('');
  const [spassword, setSpassword] = useState('');

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");

  useEffect(() => {
    const fetchStudentInfo = async () => {
      try {
        const response = await fetch(`http://localhost/FYPAPI/api/Teacher/GetStudentInfoByEmail?email=${email}`);
        const data = await response.json();
  
        // Update the state variables with the data
        if (data) {
          setSid(data.Sid);
          setFname(data.Fname);
          setLname(data.Lname);
          setSemester(data.Semester);
          setSection(data.Section);
          setSemail(data.Semail);
          setSpassword(data.Spassword);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchStudentInfo();
  }, [email]);
   //const assignmentNumber = searchParams.get("assignmentNumber");
  const [isProfileOpen, setProfileOpen] = useState(false);

  const handleProfileClick = () => {
    setProfileOpen(!isProfileOpen);
  };
  const url0 = `/asssol?email=${email}&sid=${sid}`;
  const url = `/treeview?email=${email}`;
  const url1 = `/assignmentlist?email=${email}&sid=${sid}`;
  const url2 = `/grades?email=${email}&sid=${sid}`;
  const url4 = `/tutorial?email=${email}&sid=${sid}`;
  const url5 = `/test?email=${email}&sid=${sid}`;
  return(

  <div className="dashboard-container">
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
    {/* <div className="container py-5">
      <h1 className="text-center mb-5">Student  Dashboard</h1>
      
      <div>
      
    </div>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                <FaFolderOpen className="mr-2" /> Assignments Solutions
              </h5>
              <p className="card-text">
                View your assignment solutions that you submitted for grading.
              </p>
              <a href="/asssol" className="btn btn-primary">
                Go to Assignment Solutions
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                <FaClipboardList className="mr-2" /> My Assignments
              </h5>
              <p className="card-text">
                View your assignments and submit them for grading.
              </p>
             
              <a href={url1} className="btn btn-primary" onClick={() => { window.location.href = url1; }}>
        Go to Assignment
      </a>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                <FaChartLine className="mr-2" /> My Grades
              </h5>
              <p className="card-text">View your grades and track your progress.</p>
           
              <a href={url2} className="btn btn-primary" onClick={() => { window.location.href = url2; }}>
              Go to My Grades
      </a>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                <FaDatabase className="mr-2" /> Practice
              </h5>
              <p className="card-text">Practice your Database Course queries.</p>
              <a href={url} className="btn btn-primary" onClick={() => { window.location.href = url; }}>
        Go to Database
      </a>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">
                <FaBook className="mr-2" /> Tutorial
              </h5>
              <p className="card-text">
                View Database Course Tutorials for effective learning.
              </p>
              <a href="/tutorial" className="btn btn-primary mx-auto d-block">
                Go to Tutorial
              </a>
            </div>
          </div>
        </div>
      </div>
    </div> */}
     <div style={{ backgroundColor: '#f2f2f2', padding: '20px' }}>
     
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <h1 style={{ color: '#4d4d4d', fontWeight: 'bold', textAlign: 'center', marginBottom: '30px' }}>Student Dashboard</h1>
    <h3>{fname}{lname}</h3>
  </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ backgroundColor: '#6699cc', padding: '20px', flex: '1', color: '#fff', textAlign: 'center' }}>
          <FontAwesomeIcon icon={faFolderOpen} style={{ fontSize: '50px', marginBottom: '10px' }} />
          <h2>Assignment Solutions</h2>
          <p>View your assignment solutions that you submitted for grading.</p>
          <button style={{ backgroundColor: '#fff', color: '#6699cc', border: 'none', padding: '10px 20px', borderRadius: '5px' }} onClick={() => { window.location.href = url0; }}>
  Go to Assignment Solutions
</button>

        </div>
        <div style={{ backgroundColor: '#66cc99', padding: '20px', flex: '1', color: '#fff', textAlign: 'center' }}>
          <FontAwesomeIcon icon={faClipboardList} style={{ fontSize: '50px', marginBottom: '10px' }} />
          <h2>My Assignments</h2>
          <p>View your assignments and submit them for grading.</p>
          <button style={{ backgroundColor: '#fff', color: '#66cc99', border: 'none', padding: '10px 20px', borderRadius: '5px' }} onClick={() => { window.location.href = url1; }}>
  Go to My Assignments
</button>

        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <div style={{ backgroundColor: '#99cc66', padding: '20px', flex: '1', color: '#fff', textAlign: 'center' }}>
          <FontAwesomeIcon icon={faChartLine} style={{ fontSize: '50px', marginBottom: '10px' }} />
          <h2>My Grades</h2>
          <p>View your grades and track your progress.</p>
          <button style={{ backgroundColor: '#fff', color: '#99cc66', border: 'none', padding: '10px 20px', borderRadius: '5px' }} onClick={() => { window.location.href = url2; }}>
  Go to My Grades
</button>

        </div>
        <div style={{ backgroundColor: '#cc9966', padding: '20px', flex: '1', color: '#fff', textAlign: 'center' }}>
          <FontAwesomeIcon icon={faDatabase} style={{ fontSize: '50px', marginBottom: '10px' }} />
          <h2>Practice</h2>
          <p>Practice your Database Course queries.</p>
          <button style={{ backgroundColor: '#fff', color: '#cc9966', border: 'none', padding: '10px 20px', borderRadius: '5px' }} onClick={() => { window.location.href = url5; }}>
  Go to Database
</button>

        </div>
      </div>
      <div style={{ backgroundColor: '#C8E6FF', padding: '20px', color: '#4d4d4d', textAlign: 'center' }}>
  <FontAwesomeIcon icon={faBook} style={{ fontSize: '50px', marginBottom: '10px' }} />
  <h2>Tutorial</h2>
  <p>View Database Course Tutorials for effective learning.</p>
  <button style={{ backgroundColor: '#fff', color: '#4d4d4d', border: 'none', padding: '10px 20px', borderRadius: '5px' }} onClick={() => { window.location.href = url4; }}>
  Go to Tutorial
</button>

</div>



      <div style={{ backgroundColor: '#f2f2f2', color: '#4d4d4d', padding: '20px', marginTop: '30px', textAlign: 'center' }}>
        &copy; BIIT DataBase Tutor. All rights reserve  d.
      </div>
    </div>


  </div>
  );

};

export default StudentHome;

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  backgroundColor: '#f2f2f2',
};

const iconStyle = {
  width: '40px',
  height: '40px',
  marginRight: '10px',
};

const infoStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const textStyle = {
  margin: '0',
};