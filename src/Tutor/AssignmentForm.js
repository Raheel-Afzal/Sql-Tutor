// import { useState, useEffect } from 'react';
// import studentIcon from '../Teacher.jpg';
// import { Button, Modal } from 'react-bootstrap';

// function AssignmentForm() {
//   const initialAssignment = {
//     AssignmentNumber: 0,
//     Title: '',
//     Description: '',
//     DueDate: '',
//     DatabaseName: '',
//     Semester: '',
//     Section: '',
//   };

//   const [assignment, setAssignment] = useState(initialAssignment);

//   //const [assignment, setAssignment] = useState(initialAssignment);
//   const [showDialog, setShowDialog] = useState(false);
//   // const [assignment, setAssignment] = useState({
//   //   AssignmentNumber: 0,
//   //   Title: '',
//   //   Description: '',
//   //   DeadLine: '',
//   //   DatabaseName: ''
//   // });
//   const [assignments, setAssignments] = useState([]);
//   const [isNewAssignment, setIsNewAssignment] = useState(true);
//   const [databases, setDatabases] = useState([]);
  
// // Add Assignment
// const handleAdd = () => {
//   setAssignment(initialAssignment);
//   setShowDialog(true);
// };




// const handleClose = () => {
//   setAssignment(initialAssignment);
//   setShowDialog(false);
// };

// // Update Assignment
// const handleUpdate = (updatedAssignment) => {
//   const updatedAssignments = assignments.map((a) =>
//     a.AssignmentNumber === updatedAssignment.AssignmentNumber ? updatedAssignment : a
//   );
//   setAssignments(updatedAssignments);
//   handleClose();
// };

// // Delete Assignment
// const handleDeleteAssignment = (assignment) => {
//   // Implement the delete logic here
//   // You can use the assignment data to perform the deletion

//   // After successful deletion, update the assignments list
//   const updatedAssignments = assignments.filter((a) => a.AssignmentNumber !== assignment.AssignmentNumber);
//   setAssignments(updatedAssignments);
// };

// // Edit Assignment
// // Edit Assignment
// const handleEditAssignment = (assignment) => {
//   setAssignment(assignment);
//   setShowDialog(true);
// };


//   useEffect(() => {
//     // Fetch list of assignments
//     fetch('http://localhost/FYPAPI/api/Teacher/GetAssgs')
//       .then(response => response.json())
//       .then(data => setAssignments(data))
//       .catch(error => console.error(error));

//     // Fetch list of databases
//     fetch('http://localhost/FYPAPI/api/Teacher/GetDatabaseList')
//       .then(response => response.json())
//       .then(data => setDatabases(data))
//       .catch(error => console.error(error));
//   }, []);

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Send a POST request to the API endpoint
//     fetch('http://localhost/FYPAPI/api/Teacher/AssgEntry', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(assignment)
//     })
//       .then(response => response.text())
//       .then(message => {
//         alert(message);
//         // Fetch updated list of assignments after successful submission
//         fetch('http://localhost/FYPAPI/api/Teacher/GetAssgs')
//           .then(response => response.json())
//           .then(data => setAssignments(data))
//           .catch(error => console.error(error));
//       })
//       .catch(error => console.error(error));
//   };

//   const handleEdit = (assignment) => {
//     setAssignment(assignment);
//     setIsNewAssignment(false);
//   };

//   const handleCancelEdit = () => {
//     setAssignment({
//       AssignmentNumber: 0,
//       Title: '',
//       Description: '',
//       DueDate: '',
//       DatabaseName: ''
//     });
//     setIsNewAssignment(true);
//   };

//   const handleDelete = (assignment) => {
//     // Send a DELETE request to the API endpoint
//     fetch(`http://localhost/FYPAPI/api/Teacher/DeleteAssg/${assignment.AssignmentNumber}`, {
//       method: 'DELETE',
//     })
//       .then(response => response.text())
//       .then(message => {
//         alert(message);
//         // Fetch updated list of assignments after successful deletion
//         fetch('http://localhost/FYPAPI/api/Teacher/GetAssgs')
//           .then(response => response.json())
//           .then(data => setAssignments(data))
//           .catch(error => console.error(error));
//       })
//       .catch(error => console.error(error));
//   };

//   const isNewNumber = (number) => {
//     return assignments.findIndex(a => a.AssignmentNumber === number) === -1;
//   };
  

// //   return (
// //     <div>
      
// //        <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
// //         <a
// //           href="index.html"
// //           className="navbar-brand d-flex align-items-center px-4 px-lg-5"
// //         >
// //           <h2 className="m-0 text-primary">
// //             <i className="fa fa-book me-3"></i>BIIT DATABASE TUTOR
// //           </h2>
// //         </a>
// //         <button
// //           type="button"
// //           className="navbar-toggler me-4"
// //           data-bs-toggle="collapse"
// //           data-bs-target="#navbarCollapse"
// //         >
// //           <span className="navbar-toggler-icon"></span>
// //         </button>
// //         <div className="collapse navbar-collapse" id="navbarCollapse">
// //           <div className="navbar-nav ms-auto p-4 p-lg-0">
// //             <a href="/home" className="nav-item nav-link active">
// //               Home
// //             </a>
           

// //             <a href="/login" className="nav-item nav-link">
// //               Logout
// //             </a>
// //             {/* <a href="/assignmentlist" className="nav-item nav-link">
// //               {email}
// //             </a> */}
// //           </div>

// //           <img src={studentIcon} alt="Student Icon" style={iconStyle} />
// //         </div>
// //       </nav>
// //       <div style={{marginTop:'20px'}}></div>
// //       <div className="row h-100">
// //         <div className="col-lg-6 p-4">
// //           <h2>Add Assignment</h2>
// //           <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
// //             <div className="form-group">
// //               <label htmlFor="assignmentNumber">Assignment Number</label>
// //               <input type="number" className="form-control" id="assignmentNumber" value={assignment.AssignmentNumber} onChange={(event) => setAssignment({ ...assignment, AssignmentNumber: parseInt(event.target.value) })} required />
// //               {isNewAssignment && !isNewNumber(assignment.AssignmentNumber) && <div className="invalid-feedback">This assignment number is already in use.</div>}
// //             </div>
// //             <div className="form-group">
// //               <label htmlFor="title">Title</label>
// //               <input type="text" className="form-control" id="title" value={assignment.Title} onChange={(event) => setAssignment({ ...assignment, Title: event.target.value })} required />
// //             </div>
// //             <div className="form-group">
// //               <label htmlFor="description">Description</label>
// //               <textarea className="form-control" id="description" rows="3" value={assignment.QuestionText} onChange={(event) => setAssignment({ ...assignment, Description: event.target.value })} required></textarea>
// //             </div>
// //             <div className="form-group">
// //               <label htmlFor="dueDate">Due Date</label>
// //               <input type="date" className="form-control" id="dueDate" value={assignment.Deadline} onChange={(event) => setAssignment({ ...assignment, DueDate: event.target.value })} required />
// //             </div>
// //             <div className="form-group">
// //               <label htmlFor="database-name" className="font-weight-bold">Database Name:</label>
// //               <select className="form-control" id="database-name" value={assignment.DatabaseName} onChange={e => setAssignment({ ...assignment, DatabaseName: e.target.value })}>
// //                 <option value="">Select a database</option>
// //                 {databases.map(database => (
// //                   <option value={database} key={database}>{database}</option>
// //                 ))}
// //               </select>
// //             </div>
// //             <div className="form-group">
// //   <label htmlFor="semester">Semester</label>
// //   <select className="form-control" id="semester" value={assignment.Semester} onChange={(event) => setAssignment({ ...assignment, Semester: event.target.value })}>
// //     <option value="">Select a semester</option>
// //     {[1, 2, 3, 4, 5, 6, 7, 8].map(semester => (
// //       <option value={semester} key={semester}>{semester}</option>
// //     ))}
// //   </select>
// // </div>
// // <div className="form-group">
// //   <label htmlFor="section">Section</label>
// //   <select className="form-control" id="section" value={assignment.Section} onChange={(event) => setAssignment({ ...assignment, Section: event.target.value })}>
// //     <option value="">Select a section</option>
// //     {['A', 'B', 'C', 'D'].map(section => (
// //       <option value={section} key={section}>{section}</option>
// //     ))}
// //   </select>
// // </div>

// //             <div className="form-group">
// //               {isNewAssignment ? (
// //                 <button type="submit" className="btn btn-primary">Create Assignment</button>
// //               ) : (
// //                 <div>
// //                   <button type="submit" className="btn btn-primary">Save Changes</button>
// //                   <button type="button" className="btn btn-danger ml-2" onClick={handleCancelEdit}>Cancel</button>
// //                 </div>
// //               )}
// //             </div>
// //           </form>
// //         </div>
// //         <div className="col-lg-6 p-4">
// //           <h2>Assignments</h2>
// //           <div className="table-responsive">
// //             <table className="table">
// //               <thead>
// //                 <tr>
// //                   <th>Assignment Number</th>
// //                   <th>Title</th>
// //                   <th>Description</th>
// //                   <th>Due Date</th>
// //                   <th>Database Name</th>
// //                   <th>Semester</th>
// //                   <th>Seaction</th>
// //                   <th></th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {assignments.map(a => (
// //                   <tr key={a.AssignmentNumber}>
// //                     <td>{a.AssignmentNumber}</td>
// //                     <td>{a.Title}</td>
// //                     <td>{a.QuestionText}</td>
// //                     <td>{a.Deadline}</td>
// //                     <td>{a.DatabaseName}</td>
// //                     <td>{a.Smester}</td>
// //                     <td>{a.Section}</td>
// //                     <td>
// //                       <button type="button" className="btn btn-primary btn-sm mr-2" onClick={() => handleEdit(a)}>Edit</button>
// //                       <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(a)}>Delete</button>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         </div>
// //       </div>
// //       <div style={{ backgroundColor: '#f2f2f2', color: '#4d4d4d', padding: '20px', marginTop: '30px', textAlign: 'center' }}>
// //         &copy; BIIT DataBase Tutor. All rights reserve  d.
// //       </div>
// //     </div>
// //   );

// return (
//   <div>
//     <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
//       <a href="index.html" className="navbar-brand d-flex align-items-center px-4 px-lg-5">
//         <h2 className="m-0 text-primary">
//           <i className="fa fa-book me-3"></i>BIIT DATABASE TUTOR
//         </h2>
//       </a>
//       <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
//         <span className="navbar-toggler-icon"></span>
//       </button>
//       <div className="collapse navbar-collapse" id="navbarCollapse">
//         <div className="navbar-nav ms-auto p-4 p-lg-0">
//           <a href="/home" className="nav-item nav-link active">
//             Home
//           </a>
//           <a href="/login" className="nav-item nav-link">
//             Logout
//           </a>
//         </div>
//         <img src={studentIcon} alt="Student Icon" style={iconStyle} />
//       </div>
//     </nav>
//     <div style={{ marginTop: '20px' }}></div>
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-lg-12 p-4">
//           <h2>Assignments</h2>
//           <div className="table-responsive">
//             <table className="table">
//               <thead>
//                 <tr>
//                   <th>Assignment Number</th>
//                   <th>Title</th>
//                   <th>Description</th>
//                   <th>Due Date</th>
//                   <th>Database Name</th>
//                   <th>Semester</th>
//                   <th>Section</th>
//                   <th></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {assignments.map(a => (
//                   <tr key={a.AssignmentNumber}>
//                     <td>{a.AssignmentNumber}</td>
//                     <td>{a.Title}</td>
//                     <td>{a.QuestionText}</td>
//                     <td>{a.Deadline}</td>
//                     <td>{a.DatabaseName}</td>
//                     <td>{a.Smester}</td>
//                     <td>{a.Section}</td>
//                     <td>
//                       <button type="button" className="btn btn-primary btn-sm mr-2" onClick={() => handleEdit(a)}>Edit</button>
//                       <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(a)}>Delete</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="text-center mt-4">
//             <button type="button" className="btn btn-primary" onClick={handleAdd}>Add Assignment</button>
//           </div>
//         </div>
//       </div>
//     </div>

//     {showDialog && (
//   <div className="modal-dialog" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10vh' }}>
//     <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">{isNewAssignment ? 'Add Assignment' : 'Edit Assignment'}</h5>
//             <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
//           </div>
//           <div className="modal-body">
//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label htmlFor="assignmentNumber">Assignment Number</label>
//                 <input
//                   type="number"
//                   className="form-control"
//                   id="assignmentNumber"
//                   value={assignment.AssignmentNumber}
//                   onChange={event => setAssignment({ ...assignment, AssignmentNumber: parseInt(event.target.value) })}
//                   required
//                 />
//                 {isNewAssignment && !isNewNumber(assignment.AssignmentNumber) && (
//                   <div className="invalid-feedback">This assignment number is already in use.</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="title">Title</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="title"
//                   value={assignment.Title}
//                   onChange={event => setAssignment({ ...assignment, Title: event.target.value })}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="description">Description</label>
//                 <textarea
//                   className="form-control"
//                   id="description"
//                   rows="3"
//                   value={assignment.QuestionText}
//                   onChange={event => setAssignment({ ...assignment, Description: event.target.value })}
//                   required
//                 ></textarea>
//               </div>
//               <div className="form-group">
//                 <label htmlFor="dueDate">Due Date</label>
//                 <input
//                   type="date"
//                   className="form-control"
//                   id="dueDate"
//                   value={assignment.Deadline}
//                   onChange={event => setAssignment({ ...assignment, DueDate: event.target.value })}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="database-name" className="font-weight-bold">
//                   Database Name:
//                 </label>
//                 <select
//                   className="form-control"
//                   id="database-name"
//                   value={assignment.DatabaseName}
//                   onChange={event => setAssignment({ ...assignment, DatabaseName: event.target.value })}
//                 >
//                   <option value="">Select a database</option>
//                   {databases.map(database => (
//                     <option value={database} key={database}>
//                       {database}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label htmlFor="semester">Semester</label>
//                 <select
//                   className="form-control"
//                   id="semester"
//                   value={assignment.Semester}
//                   onChange={event => setAssignment({ ...assignment, Semester: event.target.value })}
//                 >
//                   <option value="">Select a semester</option>
//                   {[1, 2, 3, 4, 5, 6, 7, 8].map(semester => (
//                     <option value={semester} key={semester}>
//                       {semester}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label htmlFor="section">Section</label>
//                 <select
//                   className="form-control"
//                   id="section"
//                   value={assignment.Section}
//                   onChange={event => setAssignment({ ...assignment, Section: event.target.value })}
//                 >
//                   <option value="">Select a section</option>
//                   {['A', 'B', 'C', 'D'].map(section => (
//                     <option value={section} key={section}>
//                       {section}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="form-group">
//                 {isNewAssignment ? (
//                   <button type="submit" className="btn btn-primary">
//                     Create Assignment
//                   </button>
//                 ) : (
//                   <div>
//                     <button type="submit" className="btn btn-primary">
//                       Save Changes
//                     </button>
//                     <button type="button" className="btn btn-danger ml-2" onClick={handleCancelEdit}>
//                       Cancel
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     )}

//     <div style={{ backgroundColor: '#f2f2f2', color: '#4d4d4d', padding: '20px', marginTop: '30px', textAlign: 'center' }}>
//       &copy; BIIT DataBase Tutor. All rights reserved.
//     </div>
//   </div>
// );


// }

// export default AssignmentForm;
// const iconStyle = {
//   width: '40px',
//   height: '40px',
//   marginRight: '10px',
// };

import React, { useState, useEffect } from 'react';
import studentIcon from '../Teacher.jpg';
import { Button, Modal } from 'react-bootstrap';

function AssignmentForm() {
  const initialAssignment = {
    AssignmentNumber: 0,
    Title: '',
    QuestionText: '',
    Deadline: '',
    DatabaseName: '',
    Section: '',
    semester: '',
  };
  const [file, setFile] = useState(null);
  const [assignment, setAssignment] = useState(initialAssignment);
  const [showDialog, setShowDialog] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [isNewAssignment, setIsNewAssignment] = useState(true);
  const [databases, setDatabases] = useState([]);

  useEffect(() => {
    // Fetch list of assignments
    fetch('http://localhost/FYPAPI/api/Teacher/GetAssgs')
      .then(response => response.json())
      .then(data => setAssignments(data))
      .catch(error => console.error(error));

    // Fetch list of databases
    fetch('http://localhost/FYPAPI/api/Teacher/GetDatabaseList')
      .then(response => response.json())
      .then(data => setDatabases(data))
      .catch(error => console.error(error));
  }, []);

  const handleAdd = () => {
    setAssignment(initialAssignment);
    setShowDialog(true);
  };

  const handleClose = () => {
    setAssignment(initialAssignment);
    setShowDialog(false);
  };

  const handleSubmit = event => {
    event.preventDefault();

    console.log('assignment',assignment)
    // Create form data
    const formData = new FormData();
    formData.append('file', file);

    // Add other assignment data to the formData object
    for (const key in assignment) {
      formData.append(key, assignment[key]);
    }

    // Send a POST request to the API endpoint
    fetch('http://localhost/FYPAPI/api/Teacher/AssgmentEntry', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        alert('Assigment Save Succefully');
        setShowDialog(false);
        // Fetch updated list of assignments after successful submission
        fetch('http://localhost/FYPAPI/api/Teacher/GetAssgs')
          .then(response => response.json())
          .then(data => setAssignments(data))
          .catch(error => console.error(error));
      })
      .catch(error => console.error(error));
  };

  const handleEdit = assignment => {
    setAssignment(assignment);
    setIsNewAssignment(false);
    setShowDialog(true);
  };

  const handleCancelEdit = () => {
    setAssignment(initialAssignment);
    setIsNewAssignment(true);
    setShowDialog(false);
  };

  const handleDelete = assignment => {
    console.log(assignment.Aid);
    // Send a DELETE request to the API endpoint
    fetch(`http://localhost/FYPAPI/api/Teacher/DeleteAssignment?Aid=${assignment.Aid}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error('Error deleting assignment');
        }
      })
      .then(message => {
        alert(message);
        // Fetch updated list of assignments after successful deletion
        fetch('http://localhost/FYPAPI/api/Teacher/GetAssgs')
          .then(response => response.json())
          .then(data => setAssignments(data))
          .catch(error => console.error(error));
      })
      .catch(error => console.error(error));
  };
  

  // const isNewNumber = number => {
  //   return assignments.findIndex(a => a.AssignmentNumber === number) === -1;
  // };
  const isNewNumber = number => {
    return true; // Allow repeating assignment numbers
  };
  const handleFileChange = event => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setAssignment({ ...assignment, QuestionText: selectedFile.name });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
        <a href="index.html" className="navbar-brand d-flex align-items-center px-4 px-lg-5">
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

      <div className="container-fluid py-5">
        <div className="row justify-content-center">
          <div className="col-lg-25">
            <div className="card mb-7">
              <div className="card-header d-flex align-items-center">
                <h4 className="m-0">Assignments List</h4>
                <button className="btn btn-primary btn-sm ms-auto" onClick={handleAdd}>
                  Add Assignment
                </button>
              </div>
              <div className="card-body">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Assignment Number</th>
                      <th>Title</th>
                      <th>Due Date</th>
                      <th>Database Name</th>
                      <th>Semester</th>
                      <th>Section</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignments.map(a => (
                      <tr key={a.AssignmentNumber}>
                        <td>{a.AssignmentNumber}</td>
                        <td>{a.Title}</td>
                        <td>{new Date(a.Deadline).toLocaleDateString(undefined)}</td>
                        <td>{a.DatabaseName}</td>
                        <td>{a.Smester}</td>
                        <td>{a.Section}</td>
                        <td>
                          {/* <button className="btn btn-primary btn-sm me-1" onClick={() => handleEdit(a)}>
                            Edit
                          </button> */}
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(a)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Modal show={showDialog} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isNewAssignment ? 'Add Assignment' : 'Edit Assignment'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Assignment Number</label>
              <input
                type="number"
                className="form-control"
                value={assignment.AssignmentNumber}
                onChange={event => setAssignment({ ...assignment, AssignmentNumber: event.target.value })}
                required
                disabled={!isNewAssignment}
              />
              {!isNewAssignment && !isNewNumber(assignment.AssignmentNumber) && (
                <div className="text-danger">Assignment number already exists. Please choose a different number.</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                value={assignment.Title}
                onChange={event => setAssignment({ ...assignment, Title: event.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="fileInput" className="form-label">
                Select File:
              </label>
              <input type="file" id="fileInput" className="form-control" onChange={handleFileChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Due Date</label>
              <input
                type="date"
                className="form-control"
                value={assignment.Deadline}
                onChange={event => setAssignment({ ...assignment, Deadline: event.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Database Name</label>
              <select
                className="form-control"
                value={assignment.DatabaseName}
                onChange={event => setAssignment({ ...assignment, DatabaseName: event.target.value })}
                required
              >
                <option value="">Select a database</option>
                {databases.map(db => (
                  <option key={db} value={db}>
                    {db}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Semester</label>
              <input
                type="text"
                className="form-control"
                value={assignment.semester}
                onChange={event => setAssignment({ ...assignment, semester: event.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Section</label>
              <input
                type="text"
                className="form-control"
                value={assignment.Section}
                onChange={event => setAssignment({ ...assignment, Section: event.target.value })}
                required
              />
            </div>
            <div className="text-center">
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Save
              </Button>
              {!isNewAssignment && (
                <Button variant="danger" onClick={handleCancelEdit}>
                  Cancel Edit
                </Button>
              )}
            </div>
          </form>
        </Modal.Body>
      </Modal> */}
       <Modal show={showDialog} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isNewAssignment ? 'Add Assignment' : 'Edit Assignment'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="assignmentNumber">Assignment Number:</label>
              <input
                type="number"
                className="form-control"
                id="assignmentNumber"
                value={assignment.AssignmentNumber}
                onChange={event => {
                  const number = parseInt(event.target.value);
                  if (isNewNumber(number)) {
                    setAssignment({ ...assignment, AssignmentNumber: number });
                  } else {
                    alert('Assignment number already exists.');
                  }
                }}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={assignment.Title}
                onChange={event => setAssignment({ ...assignment, Title: event.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="questionText">Question Text:</label>
              <input
                type="file"
                id="fileInput"
                className="form-control"
                onChange={handleFileChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="deadline">Deadline:</label>
              <input
                type="datetime-local"
                className="form-control"
                id="deadline"
                value={assignment.Deadline}
                onChange={event => setAssignment({ ...assignment, Deadline: event.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="databaseName">Database Name:</label>
              <select
                className="form-control"
                id="databaseName"
                value={assignment.DatabaseName}
                onChange={event => setAssignment({ ...assignment, DatabaseName: event.target.value })}
                required
              >
                <option value="">Select a database</option>
                {databases.map(db => (
                  <option key={db} value={db}>
                    {db}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="section">Section:</label>
              <input
                type="text"
                className="form-control"
                id="section"
                value={assignment.Section}
                onChange={event => setAssignment({ ...assignment, Section: event.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="semester">Semester:</label>
              <input
                type="text"
                className="form-control"
                id="semester"
                value={assignment.semester}
                onChange={event => setAssignment({ ...assignment, semester: event.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <Button variant="secondary" onClick={handleCancelEdit} className="mr-2">
                Cancel
              </Button>
              {isNewAssignment ? (
                <Button variant="primary" type="submit">
                  Add
                </Button>
              ) : (
                <Button variant="primary" type="submit">
                  Update
                </Button>
              )}
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AssignmentForm;

const iconStyle = {
  width: '40px',
  height: '40px',
  marginRight: '10px',
};
