// import React, { useState } from "react";
// import { FaEdit, FaTrash,FaYoutube } from "react-icons/fa";

// const SQLNotes = () => {
//   const [notes, setNotes] = useState([
//     { id: 1, title: "Intro", text: "A database is a collection of data that is organized in a way that allows it to be easily accessed, managed, and updated. Databases are used in a wide range of applications, from simple to complex." },
//     { id: 2, title: "Types of Databases", text: "There are two main types of databases: relational and non-relational." },
//     { id: 3, title: "Relational Databases", text: "Relational databases store data in tables, which are organized into rows and columns. Each table represents a specific entity, such as a customer or product, and each row in the table represents an instance of that entity. Relational databases use a query language, such as SQL, to access and manipulate data." },
//     { id: 4, title: "Non-Relational Databases", text: "Non-relational databases, also known as NoSQL databases, store data in a way that is not based on tables. They are often used for unstructured data, such as social media posts, and are designed to be highly scalable." },
//     { id: 5, title: "Benefits of Using Databases", text: "Improved data integrity: Databases use constraints to ensure that data is accurate and consistent.Data security: Databases allow for fine-grained access control, so that users only have access to the data they need.    Improved data management: Databases allow for complex queries and data manipulation, which can be time-consuming or impossible with other methods." },
    
//     { id: 6, title: "Database Queries", text: "A query is a request for data from a database. Queries can be used to retrieve, update, or delete data, as well as to create new data." },
//     { id: 7, title: "Retrieving Data", text: "To retrieve data from a database, you use a SELECT statement. SELECT statements allow you to specify which columns you want to retrieve, as well as any conditions that the data must meet.Example:SELECT first_name, last_name, email FROM customers WHERE city = 'New York'" },
//     { id: 8, title: "Updating Data", text: "To update data in a database, you use an UPDATE statement. UPDATE statements allow you to modify existing data in a table.Example: UPDATE customers SET email = 'newemail@example.com' WHERE customer_id = 1234" },
//     { id: 7, title: "Deleting Data", text: "To delete data from a database, you use a DELETE statement. DELETE statements allow you to remove one or more rows from a table. Example: DELETE FROM customers WHERE customer_id = 5678" },
//     { id: 7, title: "Conclusion", text: "Database queries are a fundamental tool for working with data in a database. Understanding how to retrieve, update, and delete data using SQL statements can help you manage your data more effectively." },
 
//   ]);
//   const [editingId, setEditingId] = useState(null);
//   const [editingText, setEditingText] = useState("");
//   const handleEdit = (id) => {
//     // code to handle editing a note goes here
//     setEditingId(id);
//     setEditingText(notes.find((note) => note.id === id).text);
    
//   };
//   const handleSave = () => {
//     setNotes(
//       notes.map((note) =>
//         note.id === editingId ? { ...note, text: editingText } : note
//       )
//     );
//     setEditingId(null);
//     setEditingText("");
//   };

//   const handleDelete = (id) => {
//     setNotes(notes.filter((note) => note.id !== id));
//   };

//   return (
//     <div style={{ backgroundColor: "#f8f9fa", padding: "30px" }}>
//       <h1 style={{ textAlign: "center", color: "#007bff" }}>SQL lessons</h1>
//       <div style={{ display: "flex", flexWrap: "wrap" }}>
//         {notes.map((note) => (
//           <div key={note.id} style={{ width: "30%", margin: "20px", backgroundColor: "#fff", boxShadow: "0 0 10px #ccc", padding: "20px" }}>
//             <h3 style={{ color: "#007bff" }}>{note.title}</h3>
//             <p>{note.text}</p>
//             <div style={{ display: "flex", justifyContent: "space-between" }}>
              
//               <button style={{ backgroundColor: "#007bff", color: "#fff", padding: "5px 10px", border: "none" }} onClick={() => handleEdit(note.id)}>
//                 <FaEdit style={{ marginRight: "5px" }} />
//                 Edit Lesson
//               </button>
//               <button style={{ backgroundColor: "#dc3545", color: "#fff", padding: "5px 10px", border: "none" }} onClick={() => handleDelete(note.id)}>
//                 <FaTrash style={{ marginRight: "5px" }} />
//                 Delete Lesson 
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <a href="/Tdashbord" className="btn btn-primary">
//                   Go to Back
//                 </a>
//     </div>
//   );
// };

// export default SQLNotes;






import React, { useState } from 'react';
import axios from 'axios';
import studentIcon from '../Teacher.jpg';
const UploadSolution = () => {
  const iconStyle = {
    width: '40px',
    height: '40px',
    marginRight: '10px',
  };
  const [file, setFile] = useState(null);
  const [assignmentNumber, setAssignmentNumber] = useState('');
  const [semester, setSemester] = useState('');
  const [section, setSection] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleAssignmentNumberChange = (event) => {
    setAssignmentNumber(event.target.value);
  };

  const handleSemesterChange = (event) => {
    setSemester(event.target.value);
  };

  const handleSectionChange = (event) => {
    setSection(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`http://localhost/FYPAPI/api/Student/UploadSolution?assignmentNumber=${assignmentNumber}&semester=${semester}&section=${section}`, formData);

      // File upload successful
      setSuccessMessage('Assignment solution uploaded successfully.');

      // Reset form values
      setFile(null);
      setAssignmentNumber('');
      setSemester('');
      setSection('');

      // Refresh the page after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      // Handle the error
      console.error('Error uploading file:', error);
    }
  };

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
      <h1 className="text-center">Upload Solution</h1>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fileInput" className="form-label">
            Select File:
          </label>
          <input type="file" id="fileInput" className="form-control" onChange={handleFileChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="assignmentNumber" className="form-label">
            Assignment Number:
          </label>
          <select id="assignmentNumber" className="form-select" value={assignmentNumber} onChange={handleAssignmentNumberChange} required>
            <option value="" disabled>
              Select Assignment Number
            </option>
            {[...Array(8)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="semester" className="form-label">
            Semester:
          </label>
          <select id="semester" className="form-select" value={semester} onChange={handleSemesterChange} required>
            <option value="" disabled>
              Select Semester
            </option>
            {[...Array(8)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="section" className="form-label">
            Section:
          </label>
          <select id="section" className="form-select" value={section} onChange={handleSectionChange} required>
            <option value="" disabled>
              Select Section
            </option>
            {['A', 'B', 'C', 'D'].map((section) => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Upload
        </button>
      </form>
      {successMessage && (
        <div className="mt-4 alert alert-success">
          {successMessage}
        </div>
      )}
    </div>
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

  );
};

export default UploadSolution;
