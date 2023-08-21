import React, { useState } from 'react';

const StudentDetails = ({ assignmentNumber }) => {
  const [studentData, setStudentData] = useState(null);
  const [marks, setMarks] = useState('');

  
  const handleViewDetails = () => {
    // Fetch student details for the selected assignmentNumber from the API endpoint
    fetch(`http://localhost/FYPAPI/api/Teacher/GetStudentQueryInfo/${assignmentNumber}`)
      .then(response => response.json())
      .then(data => setStudentData(data))
      .catch(error => console.log(error));
  };

  const handleSaveMarks = () => {
    // Implement the logic to save assignment marks using the API endpoint
    const marksEntry = {
      Sid: studentData[0].Sid,
      Aid: assignmentNumber,
      Amarks: marks
    };

    fetch('http://localhost/FYPAPI/api/Teacher/marksEntry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(marksEntry)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Marks saved successfully:', data);
        // Reset the marks input field
        setMarks('');
      })
      .catch(error => console.log(error));
  };

  if (!studentData) {
    return (
      <div style={{marginLeft:'600px' }}>
        {/* <br/>
        <h2 style={{marginLeft:'-80px' }} >Uplode Assignment </h2>
        <button onClick={handleViewDetails}>Uplode</button> */}
      </div>
    );
  }

  return (
    <div>
      <h2>Assignment Details</h2>
      <table>
        <thead>
          <tr>
            <th>Assignment Number</th>
            <th>Question Number</th>
            <th>Sid</th>
            <th>Fname</th>
            <th>QDetails</th>
          </tr>
        </thead>
        <tbody>
          {studentData.map((student, index) => (
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
        <button className="Primary" onClick={handleSaveMarks}>Save Marks</button>
      </div>
    </div>
  );
};

export default StudentDetails;
