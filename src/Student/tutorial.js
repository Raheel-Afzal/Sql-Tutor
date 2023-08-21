import React, { useState } from "react";
import { FaEdit, FaTrash,FaYoutube } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';

import studentIcon from '../student.jpg';
const SQLNotes = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email');
  const Studentid = searchParams.get('sid');

  const navigate = useNavigate();
  const [notes, setNotes] = useState([
    { id: 1, title: "Intro", text: "A database is a collection of data that is organized in a way that allows it to be easily accessed, managed, and updated. Databases are used in a wide range of applications, from simple to complex." },
    { id: 2, title: "Types of Databases", text: "There are two main types of databases: relational and non-relational." },
    { id: 3, title: "Relational Databases", text: "Relational databases store data in tables, which are organized into rows and columns. Each table represents a specific entity, such as a customer or product, and each row in the table represents an instance of that entity. Relational databases use a query language, such as SQL, to access and manipulate data." },
    { id: 4, title: "Non-Relational Databases", text: "Non-relational databases, also known as NoSQL databases, store data in a way that is not based on tables. They are often used for unstructured data, such as social media posts, and are designed to be highly scalable." },
    { id: 5, title: "Benefits of Using Databases", text: "Improved data integrity: Databases use constraints to ensure that data is accurate and consistent.Data security: Databases allow for fine-grained access control, so that users only have access to the data they need.    Improved data management: Databases allow for complex queries and data manipulation, which can be time-consuming or impossible with other methods." },
    
    { id: 6, title: "Database Queries", text: "A query is a request for data from a database. Queries can be used to retrieve, update, or delete data, as well as to create new data." },
    { id: 7, title: "Retrieving Data", text: "To retrieve data from a database, you use a SELECT statement. SELECT statements allow you to specify which columns you want to retrieve, as well as any conditions that the data must meet.Example:SELECT first_name, last_name, email FROM customers WHERE city = 'New York'" },
    { id: 8, title: "Updating Data", text: "To update data in a database, you use an UPDATE statement. UPDATE statements allow you to modify existing data in a table.Example: UPDATE customers SET email = 'newemail@example.com' WHERE customer_id = 1234" },
    { id: 7, title: "Deleting Data", text: "To delete data from a database, you use a DELETE statement. DELETE statements allow you to remove one or more rows from a table. Example: DELETE FROM customers WHERE customer_id = 5678" },
    { id: 7, title: "Conclusion", text: "Database queries are a fundamental tool for working with data in a database. Understanding how to retrieve, update, and delete data using SQL statements can help you manage your data more effectively." },
 
  ]);

  const handleEdit = (id) => {
    // code to handle editing a note goes here
  };

  const handleDelete = (id) => {
  
  };
  const openYouTube = () => {
    window.open("https://www.youtube.com/channel/UCNidDyOfGoJ_1T3D4b7rYQQ");
  }

  return (
    <div style={{ backgroundColor: "#f8f9fa" }}>  
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
    <div style={{ backgroundColor: "#f8f9fa", padding: "30px" }}>
   
      <h1 style={{ textAlign: "center", color: "#007bff" }}>Database </h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {notes.map((note) => (
          <div key={note.id} style={{ width: "30%", margin: "20px", backgroundColor: "#fff", boxShadow: "0 0 10px #ccc", padding: "20px" }}>
            <h3 style={{ color: "#007bff" }}>{note.title}</h3>
            <p>{note.text}</p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {/* <button style={{ backgroundColor: "#007bff", color: "#fff", padding: "5px 10px", border: "none" }} onClick={() => handleEdit(note.id)}>
                <FaEdit style={{ marginRight: "5px" }} />
                Practice On SQL
              </button> */}
              <button style={{ backgroundColor: "#dc3545", color: "#fff", padding: "5px 10px", border: "none" }} onClick={() => {openYouTube();}}>
                <FaYoutube style={{ marginRight: "5px" }} />
                YOUTUB 
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default SQLNotes;
const iconStyle = {
  width: '40px',
  height: '40px',
  marginRight: '10px',
};