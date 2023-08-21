

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation,useNavigate } from "react-router-dom";
import studentIcon from '../student.jpg';

function AssignmentsPage() {


  const [sid, setSid] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [semester, setSemester] = useState('');
  const [section, setSection] = useState('');
  const [semail, setSemail] = useState('');
  const [spassword, setSpassword] = useState('');

  //
  const [DatabaseName, setDatabaseName] = useState('');
  //
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  const Studentid = searchParams.get('sid');

  const navigate = useNavigate();
//
const [queryData, setQueryData] = useState([]);

useEffect(() => {
  fetchData();
}, []);

// const fetchData = async () => {
//   try {
//     const response = await fetch(
//       `http://localhost/FYPAPI/api/Student/GetSavedQueryData?sid=${Studentid}`
//     );
//     const data = await response.json();
//     setQueryData(data);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };
const fetchData = async () => {
  try {
    const response = await fetch(
      `http://localhost/FYPAPI/api/Student/GetSavedQueryData?sid=${Studentid}`
    );
    const data = await response.json();

    // Sort the data by assignment number
    const sortedData = data.sort((a, b) => a.AssignmentNumber - b.AssignmentNumber);

    setQueryData(sortedData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

//
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
//
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
  const [assignmentNumber, setAssignmentNumber] = useState('');
  const [Query, setQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Clear previous user's data from local storage
        localStorage.removeItem('assignments');
  
        // Fetch data from the API
        const response = await fetch(`http://localhost/FYPAPI/api/Student/GetAssgs?Smester=${semester}&section=${section}`);
        const data = await response.json();
        const sortedAssignments = data.sort((a, b) => a.AssignmentNumber - b.AssignmentNumber);
  
        // Update state with the fetched data
        setAssignments(sortedAssignments);
  
        // Store the fetched data in local storage
        localStorage.setItem('assignments', JSON.stringify(sortedAssignments));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [semester, section]);
  
  
  // useEffect(() => {
  //   fetch(`http://localhost/FYPAPI/api/Student/GetAssgs?Smester=${semester}&section=${section}`)
  //     .then(response => response.json())
  //     .then(data => {
  //       // Sort assignments by assignment number
  //       const sortedAssignments = data.sort((a, b) => a.AssignmentNumber - b.AssignmentNumber);
  //       setAssignments(sortedAssignments);
       
  //     });
  // }, []);
  
  const handleLinkClick = (assignmentNumber) => {
    setAssignmentNumber(assignmentNumber);
  };

  const handleLinkClick1 = (Query) => {
    setQuery(Query);
  };
  // ...
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) {
      return null;
    }

    const dateParts = dateTimeString.split(' ')[0].split('-');
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // month is zero-based in JavaScript Date object
    const day = parseInt(dateParts[2]);

    return new Date(year, month, day);
  };

  const getCurrentDateTime = () => {
    return new Date();
  };

  const calculateRemainingTime = (deadlineDateTime) => {
    const currentDateTime = getCurrentDateTime();
    const remainingTime = deadlineDateTime.getTime() - currentDateTime.getTime();

    // Calculate remaining days, hours, minutes, and seconds
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };
  function handleLinkDClick(assignmentId) {
    const downloadUrl = `http://localhost/FYPAPI/api/Student/DownloadSolution?assignmentId=${assignmentId}`;
  
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = downloadUrl;
   // link.target = '_blank';
    link.download = 'solution.pdf';
  
    // Programmatically click the link to initiate the download
    link.click();
  
    // Clean up the link element
    link.remove();
  }
  
  const [studentName, setStudentName] = useState('John Doe'); // Replace with actual student name
  //const [section, setSection] = useState('A'); // Replace with actual section
  const [studentID, setStudentID] = useState('123456'); // Replace with actual student ID

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
     
      <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
  <h5>Name: {fname}</h5>
  <h5 style={{ marginLeft: '550px', marginTop: '0' }}>Section: {section}</h5>
    <h5 style={{ marginLeft: '500px' }}>Semester: {semester}</h5>
  </div>

  <h1 style={headingStyle}>Assignments List</h1>
 
  <p style={{ textAlign: 'center', margin: '20px 0' }}>Submit your Assignment Before Deadline.</p>

  <table style={tableStyle}>
    <thead>
      <tr>
        <th style={thStyle}>Assignment Number</th>
        <th style={thStyle}>Title</th>
        <th style={thStyle}>Remaining Time</th>
        <th style={thStyle}>Database Name</th>
        <th style={thStyle}>Assignment Questions</th>
        <th style={thStyle}>Action</th>
      </tr>
    </thead>
    <tbody>
      {assignments.map((assignment, index) => {
        const deadlineDateTime = formatDateTime(assignment.Deadline);

        if (!deadlineDateTime) {
          return null;
        }

        const isDeadlineOver = deadlineDateTime < getCurrentDateTime();
        const remainingTime = calculateRemainingTime(deadlineDateTime);

        return (
          <tr key={index}>
            <td style={tdStyle}>{assignment.AssignmentNumber}</td>
            <td style={tdStyle}>{assignment.Title}</td>
            <td style={tdStyle}>
              {isDeadlineOver ? (
                <span style={{ color: 'red' }}>Time is over for this assignment</span>
              ) : (
                remainingTime
              )}
            </td>
            <td style={tdStyle}>{assignment.DatabaseName}</td>
            {/* <td style={tdStyle}>{assignment.QuestionText}</td>
             */}
<td style={tdStyle}>
  <button
    className='btn btn-primary'
    onClick={() => handleLinkDClick(assignment.Aid)}
  >
    Download Assignment
  </button>
</td>

            <td>
              <a
                href={`/treeview?email=${email}&assignmentNumber=${assignment.AssignmentNumber}&sid=${Studentid}&Semester=${semester}&Section=${section}&DatabaseName=${assignment.DatabaseName}`}
                className={`btn btn-primary ${isDeadlineOver ? 'disabled' : ''}`}
                onClick={() => handleLinkClick(assignment.AssignmentNumber)}
              >
                Solve
              </a>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>

<div>
  <h1 style={headingStyle}> Solve Assignments</h1>
<table style={tableStyle}>
        <thead>
          <tr>
            {/* <th style={thStyle}>Qid</th>
            <th style={thStyle}> Sid</th> */}
            <th style={thStyle}> AssignmentNumber</th>
            <th style={thStyle} >Qno</th>
            <th style={thStyle}>Qdetails</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {queryData.map((record) => (
            <tr key={record.Qid}>
              {/* <td style={tdStyle}>{record.Qid}</td>
              <td style={tdStyle}>{record.Sid}</td> */}
              <td style={tdStyle}>{record.AssignmentNumber}</td>
              <td style={tdStyle}>{record.Qno}</td>
              <td style={tdStyle}>{record.Qdetails}</td>
             
              <td>
              <a
                href={`/practice?email=${email}&Query=${record.Qdetails}&sid=${Studentid}`}
                 className={`btn btn-primary`}
                onClick={() => handleLinkClick1(record.Qdetails)}
              >
                Run
              </a>
            </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
  <br/>
</div>
<br/>
<div style={footerStyle}>
    BIIT DataBase TUTOR .
  </div>
    </div>
  );
  
// ...

}

export default AssignmentsPage;
const style = {
  backgroundColor: 'blue',
  padding: '10px',
};
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


const headingStyle = {
  color: '#4d4d4d',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: '30px',
  fontFamily: 'Arial, sans-serif',
  fontSize: '24px',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  fontFamily: 'Arial, sans-serif',
  marginTop: '20px',
  boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
};

const thStyle = {
  backgroundColor: '#f2f2f2',
  color: '#4d4d4d',
  padding: '12px 16px',
  textAlign: 'left',
  borderBottom: '1px solid #ccc',
  fontWeight: 'bold',
  textTransform: 'uppercase',
};

const tdStyle = {
  padding: '12px 16px',
  textAlign: 'left',
  borderBottom: '1px solid #ccc',
};


const footerStyle = {
  backgroundColor: '#f2f2f2',
  padding: '20px',
  color: '#4d4d4d',
  textAlign: 'center',
  fontFamily: 'Arial, sans-serif',
  fontSize: '14px',
  position: 'fixed',
  left: 0,
  bottom: 0,
  width: '100%',
  marginTop:10,
};
export { style, containerStyle };