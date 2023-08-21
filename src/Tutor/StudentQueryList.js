import React, { useState, useEffect } from 'react';
import studentIcon from '../Teacher.jpg';
const StudentQueryList = () => {
  const iconStyle = {
    width: '40px',
    height: '40px',
    marginRight: '10px',
  };
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filters, setFilters] = useState({});

  const [Sid, setSid] = useState('');
  const [Aid, setAid] = useState('');
  const [marks, setMarks] = useState('');
  const [isMarksSaved, setIsMarksSaved] = useState(false);

//   const handleSaveMarks = () => {
    // Implement the logic to save assignment marks using the API endpoint
    // const marksEntry = {
    //   Sid: students.Sid,
    //   Aid: students.AssignmentNumber,
    //   Amarks: marks
    // };

    const handleSaveMarks = () => {
        // Prepare the form data in 'x-www-form-urlencoded' format
        const formData = new URLSearchParams();
        formData.append('Sid', Sid);
        formData.append('AssignmentNumber', Aid);
        formData.append('Amarks', marks);
    
        fetch('http://localhost/FYPAPI/api/Teacher/InsertAmarkRecord', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formData.toString()
        })
          .then(response => response.json())
          .then(data => {
            console.log('Marks saved successfully:', data);
            console.log(Sid,Aid,marks);
            // Reset the marks input field
            setMarks('');
            setIsMarksSaved(true);
          })
          .catch(error => console.log(error));
          }
   
  useEffect(() => {
    // Fetch student data from the API endpoint
    fetch('http://localhost/FYPAPI/api/Teacher/GetStudentQueryInfo')
      .then(response => response.json())
      .then(data => {
        setStudents(data);
        setFilteredStudents(data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    console.log(name+'valu'+value);
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  useEffect(() => {
    // Filter the students based on the selected filters
    let filteredData = students;
    if (filters.AssignmentNumber) {
      const assignmentNumber = parseInt(filters.AssignmentNumber, 10); // Convert to number
      filteredData = filteredData.filter(student => student.AssignmentNumber === assignmentNumber);
    }
    if (filters.Section) {
      filteredData = filteredData.filter(student => student.Section === filters.Section);
    }
    if (filters.Semester) {
      const semester = parseInt(filters.Semester, 10); // Convert to number
      filteredData = filteredData.filter(student => student.Semester === semester);
    }
    // Remove duplicate records based on Sid, Section, and Semester
    filteredData = filteredData.filter((student, index, self) => (
      index === self.findIndex((s) => (
        s.Sid === student.Sid &&
        s.AssignmentNumber === student.AssignmentNumber &&
        s.Section === student.Section &&
        s.Semester === student.Semester
      ))
    ));
    filteredData.sort((a, b) => a.AssignmentNumber - b.AssignmentNumber);
    setFilteredStudents(filteredData);
  }, [students, filters]);
  
  const handleView = (student) => {
    // Filter the student records based on the selected Sid, Section, and Semester
    const filteredData = students.filter(
      s => (
        //s.Sid === student.Sid &&
        s. AssignmentNumber=== student.AssignmentNumber &&
        s.Section === student.Section &&
        s.Semester === student.Semester
      )
    );
    setSelectedStudent(filteredData);
    setSid(student.Sid);
    setAid(student.AssignmentNumber);
  };

  const handleMarkAssignment = (event, student) => {
    event.stopPropagation();
    // Implement the logic to handle marking the assignment for the selected student
    console.log('Mark Assignment for student:', student);
  };
  useEffect(() => {
    if (isMarksSaved) {
      setTimeout(() => {
        setIsMarksSaved(false); // Reset the state after a certain period
      }, 3000);
    }
  }, [isMarksSaved]);

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
              {/* {email} */}
            </a>
          </div>

          <img src={studentIcon} alt="Student Icon" style={iconStyle} />
        </div>
      </nav>
    <div className="container">
      <h1 className="text-center mt-4 mb-5">Student Assignment List</h1>
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Assignment Number:</label>
          <input type="number" className="form-control" name="AssignmentNumber" value={filters.AssignmentNumber || ''} onChange={handleFilterChange} />
        </div>
        <div className="col-md-4">
          <label className="form-label">Section:</label>
          <input type="text" className="form-control" name="Section" value={filters.Section || ''} onChange={handleFilterChange} />
        </div>
        <div className="col-md-4">
  <label className="form-label">Semester:</label>
  <input type="number" className="form-control" name="Semester" value={filters.Semester || ''} onChange={handleFilterChange} />
</div>

      </div>
      <table className="table table-bordered">
        <thead className="bg-primary text-white">
          <tr>
            <th>Student ID</th>
            <th>Assignment Number</th>
            <th>Section</th>
            <th>Semester</th>
            <th>View</th>
            {/* <th>Mark Assignment</th> */}
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={index} onClick={() => handleView(student)}>
              <td>{student.Sid}</td>
              <td>{student.AssignmentNumber}</td>
              <td>{student.Section}</td>
              <td>{student.Semester}</td>
              <td>
                <button className="btn btn-sm btn-primary" >View</button>
              </td>
              {/* <td>
                <button className="btn btn-sm btn-success" onClick={(event) => handleMarkAssignment(event, student)}>Mark Assignment</button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>

      {selectedStudent && (
        <div>
          <h2 className="mt-4">Assignment Details</h2>
          <table className="table table-bordered">
            <thead className="bg-primary text-white">
              <tr>
                <th>Assignment Number</th>
                <th>Question Number</th>
                <th>Sid</th>
                <th>Fname</th>
                <th>QDetails</th>
              </tr>
            </thead>
            <tbody>
              {selectedStudent.map((student, index) => (
                <tr key={index}>
                  <td>{student.AssignmentNumber}</td>
                  <td>{student.Qno}</td>
                  <td>{student.Sid}</td>
                  <td>{student.Fname}</td>
                  <td>{student.Qdetails}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
        <h2>Mark Assignment</h2>
        <div>
          <label>Assignment Marks:</label>
          <input type="text" value={marks} onChange={(e) => setMarks(e.target.value)} />
        </div>
        <button className="btn btn-sm btn-success" onClick={handleSaveMarks}>Save Marks</button>
        {isMarksSaved && <p>Marks saved successfully!</p>}
      </div>
    
        </div>
      )}
      </div>
        <div>
      <footer style={{ backgroundColor: '#f2f2f2', padding: '20px', color: '#4d4d4d', textAlign: 'center',marginTop:'10px' }}>
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

export default StudentQueryList;
