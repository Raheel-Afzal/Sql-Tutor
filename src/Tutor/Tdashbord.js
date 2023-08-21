import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faChalkboardTeacher, faUsers, faCalendarCheck, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import studentIcon from '../Teacher.jpg';

const TeacherDashboard = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  const [currentScreen, setCurrentScreen] = useState('dashboard');


  return (
    <div className="dashboard-container container-fluid">
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
      <div style={{ backgroundColor: '#f2f2f2', padding: '20px' }}>
        <h1 style={{ color: '#4d4d4d', fontWeight: 'bold' }}>
          <FontAwesomeIcon icon={faChalkboardTeacher} style={{ marginRight: '10px' }} />
          Teacher Dashboard
        </h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <div style={{ backgroundColor: '#66cc99', padding: '20px', flex: '1', color: '#fff', textAlign: 'center' }}>
            <FontAwesomeIcon icon={faUsers} style={{ fontSize: '50px', marginBottom: '10px' }}
            />
            <h2>Students</h2>
            <p>View and manage students</p>
            <button style={{ backgroundColor: '#fff', color: '#66cc99', border: 'none', padding: '10px 20px', borderRadius: '5px' }} onClick={() => { window.location.href = '/studentpage'; }}>
              View Students & Add Student
            </button>
          </div>
          <div style={{ backgroundColor: '#99cc66', padding: '20px', flex: '1', color: '#fff', textAlign: 'center' }}>
            <FontAwesomeIcon icon={faCalendarCheck} style={{ fontSize: '50px', marginBottom: '10px' }}
            />
            <h2>Assignments</h2>
            <p>Create and view assignments</p>
            <button style={{ backgroundColor: '#fff', color: '#99cc66', border: 'none', padding: '10px 20px' }} onClick={() => { window.location.href = '/AssgForm'; }} >
              Create Assignment & View Assignment
            </button>
          </div>


        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>

          <div style={{ backgroundColor: '#cc9966', padding: '20px', flex: '1', color: '#fff', textAlign: 'center' }}>
            <FontAwesomeIcon icon={faFileAlt} style={{ fontSize: '50px', marginBottom: '10px' }}
            />
            <h2>Marks Assignment</h2>
            <p>Mark and Uplode New Assignment</p>
            <button style={{ backgroundColor: '#fff', color: '#cc9966', border: 'none', padding: '10px 20px', borderRadius: '5px' }} onClick={() => { window.location.href = '/Reportpage'; }}>
              View Reports & Generate Report</button>
          </div>
          <div style={{ backgroundColor: '#6699cc', padding: '20px', flex: '1', color: '#fff', textAlign: 'center' }}>
            <FontAwesomeIcon icon={faBook} style={{ fontSize: '50px', marginBottom: '10px' }}
            />
            <h2>Uplode Solutions</h2>
            <p>Create and manage Assignment</p>
            <button style={{ backgroundColor: '#fff', color: '#6699cc', border: 'none', padding: '10px 20px', borderRadius: '5px' }} onClick={() => { window.location.href = '/lessonpage'; }}>
              Create Assignment Solutions
            </button>
          </div>
        </div>
        <div style={{ backgroundColor: '#f2f2f2', color: '#4d4d4d', padding: '20px', marginTop: '30px', textAlign: 'center' }}>
          &copy; BIIT DataBase Tutor. All rights reserve  d.
        </div>
      </div>
    </div>
  )
}

export default TeacherDashboard;
const iconStyle = {
  width: '40px',
  height: '40px',
  marginRight: '10px',
};