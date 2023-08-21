// import React, { useState } from 'react';
// import axios from 'axios';

// const AddStudentForm = () => {
//   const [formData, setFormData] = useState({
//     Sid: '',
//     Fname: '',
//     Lname: '',
//     Semester: '',
//     Section: '',
//     Semail: '',
//     Spassword: '',
//   });

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((formData) => ({
//       ...formData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     axios
//       .post('http://localhost/FYPAPI/api/Teacher/AddStudent', formData)
//       .then((response) => {
//         console.log(response);
//         alert('Data added successfully!');
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     setFormData({
//       Sid: '',
//       Fname: '',
//       Lname: '',
//       Semester: '',
//       Section: '',
//       Semail: '',
//       Spassword: '',
//     });
//   };

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//       <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '50%' }} onSubmit={handleSubmit}>
//         <label>
//           Student ID:
//           <input
//             type="text"
//             name="Sid"
//             value={formData.Sid}
//             onChange={handleInputChange}
//           />
//         </label>
//         <label>
//           First Name:
//           <input
//             type="text"
//             name="Fname"
//             value={formData.Fname}
//             onChange={handleInputChange}
//           />
//         </label>
//         <label>
//           Last Name:
//           <input
//             type="text"
//             name="Lname"
//             value={formData.Lname}
//             onChange={handleInputChange}
//           />
//         </label>
//         <label>
//           Semester:
//           <select
//             name="Semester"
//             value={formData.Semester}
//             onChange={handleInputChange}
//           >
//             <option value="">--Select--</option>
//             {[...Array(8).keys()].map((semester) => (
//               <option key={semester} value={semester + 1}>
//                 {semester + 1}
//               </option>
//             ))}
//           </select>
//         </label>
//         <label>
//           Section:
//           <select
//             name="Section"
//             value={formData.Section}
//             onChange={handleInputChange}
//           >
//             <option value="">--Select--</option>
//             {['A', 'B', 'C', 'D'].map((section) => (
//               <option key={section} value={section}>
//                 {section}
//               </option>
//             ))}
//           </select>
//         </label>
//         <label>
//           Email:
//           <input
//             type="email"
//             name="Semail"
//             value={formData.Semail}
//             onChange={handleInputChange}
//           />
//         </label>
//         <label>
//           Password:
//           <input
//             type="password"
//             name="Spassword"
//             value={formData.Spassword}
//             onChange={handleInputChange}
//           />
//         </label>
//         <button type="submit">
//           Add Student
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddStudentForm;


import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import studentIcon from '../Teacher.jpg';
const AddStudentForm = () => {
  const [formData, setFormData] = useState({
    Sid: '',
    Fname: '',
    Lname: '',
    Semester: '',
    Section: '',
    Semail: '',
    Spassword: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost/FYPAPI/api/Teacher/AddStudent', formData)
      .then((response) => {
        console.log(response);
        alert('Data added successfully!');
      })
      .catch((error) => {
        console.log(error);
      });
    setFormData({
      Sid: '',
      Fname: '',
      Lname: '',
      Semester: '',
      Section: '',
      Semail: '',
      Spassword: '',
    });
  };

  return (
    <div 
    >
      
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
            {/* <a href="/assignmentlist" className="nav-item nav-link">
              {email}
            </a> */}
          </div>

          <img src={studentIcon} alt="Student Icon" style={iconStyle} />
        </div>
      </nav>
      <div className="text-center mb-4">
            <h2 style={{ fontFamily: 'Arial', fontWeight: 'bold',marginTop:'10px' }}>Add New Student</h2>
            <p>Enter the details of the student below:</p>
          </div>
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="Sid">Student ID:</label>
              <input
                type="text"
                id="Sid"
                className="form-control"
                name="Sid"
                value={formData.Sid}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Fname">First Name:</label>
              <input
                type="text"
                id="Fname"
                className="form-control"
                name="Fname"
                value={formData.Fname}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Lname">Last Name:</label>
              <input
                type="text"
                id="Lname"
                className="form-control"
                name="Lname"
                value={formData.Lname}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Semester">Semester:</label>
              <select
                id="Semester"
                className="form-control"
                name="Semester"
                value={formData.Semester}
                onChange={handleInputChange}
              >
                <option value="">--Select--</option>
                {[...Array(8).keys()].map((semester) => (
                  <option key={semester} value={semester + 1}>
                    {semester + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="Section">Section:</label>
              <select
                id="Section"
                className="form-control"
                name="Section"
                value={formData.Section}
                onChange={handleInputChange}
              >
                <option value="">--Select--</option>
                {['A', 'B', 'C', 'D'].map((section) => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="Semail">Email:</label>
              <input
                type="email"
                id="Semail"
                className="form-control"
                name="Semail"
                value={formData.Semail}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Spassword">Password:</label>
              <input
                type="password"
                id="Spassword"
                className="form-control"
                name="Spassword"
                value={formData.Spassword}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              <FontAwesomeIcon icon={faPlus} className="mr-1" />
              Add Student
            </button>
          </form>
        </div>
      </div>
      <div style={{ backgroundColor: '#f2f2f2', color: '#4d4d4d', padding: '20px', marginTop: '30px', textAlign: 'center' }}>
        &copy; BIIT DataBase Tutor. All rights reserve  d.
      </div>
    </div>
  );
};

export default AddStudentForm;

const iconStyle = {
  width: '40px',
  height: '40px',
  marginRight: '10px',
};