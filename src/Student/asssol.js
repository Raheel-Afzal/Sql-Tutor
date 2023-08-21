
// import axios from 'axios';
// import logo from '../AssgsSol.jpg';
// import studentIcon from '../student.jpg';
// import { useLocation,useNavigate } from "react-router-dom";
// import React, { useState, useEffect } from 'react';

// const iconStyle = {
//   width: '40px',
//   height: '40px',
//   marginLeft: '10px',
// };
// const [sid, setSid] = useState('');
// const [fname, setFname] = useState('');
// const [lname, setLname] = useState('');
// const [semester, setSemester] = useState('');
// const [section, setSection] = useState('');
// const [semail, setSemail] = useState('');
// const [spassword, setSpassword] = useState('');

// //

// //
// const location = useLocation();
// const searchParams = new URLSearchParams(location.search);
// const email = searchParams.get("email");
// const Studentid = searchParams.get('sid');

// const navigate = useNavigate();
// //
// useEffect(() => {
//   const fetchStudentInfo = async () => {
//     try {
//       const response = await fetch(`http://localhost/FYPAPI/api/Teacher/GetStudentInfoByEmail?email=${email}`);
//       const data = await response.json();

//       // Update the state variables with the data
//       if (data) {
//         setSid(data.Sid);
//         setFname(data.Fname);
//         setLname(data.Lname);
//         setSemester(data.Semester);
//         setSection(data.Section);
//         setSemail(data.Semail);
//         setSpassword(data.Spassword);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   fetchStudentInfo();
// }, [email]);
// class DownloadSolution extends React.Component {
//   state = {
//     assignments: [],
//   };
  
//   componentDidMount() {
//     // Fetch assignment details
//     axios
//       .get(`http://localhost/FYPAPI/api/Student/GetSolutions?section=${Section}&Semester=${Semester}`)
//       .then((response) => {
//         this.setState({ assignments: response.data });
//       })
//       .catch((error) => {
//         console.error('Error fetching assignments:', error);
//       });
//   }
  

//   handleDownload = (solutionId) => {
//     axios({
//       url: 'http://localhost/FYPAPI/api/Student/DownloadSolution',
//       method: 'GET',
//       responseType: 'blob',
//       params: {
//         solutionId: solutionId,
//       },
//     })
//       .then((response) => {
//         // Create a temporary link element
//         const url = window.URL.createObjectURL(new Blob([response.data]));
//         const link = document.createElement('a');
//         link.href = url;
//         link.setAttribute('download', `solution_${solutionId}.pdf`);
//         document.body.appendChild(link);

//         // Trigger the download
//         link.click();

//         // Cleanup
//         link.parentNode.removeChild(link);
//       })
//       .catch((error) => {
//         console.error('Error downloading solution:', error);
//       });
//   };

//   render() {
//     const { assignments } = this.state;

//     return (
//       <div className="container-fluid p-0">
        // <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
        //   <a href="index.html" className="navbar-brand d-flex align-items-center px-4 px-lg-5">
        //     <img src={logo} alt="Logo" style={{ width: '40px', height: 'auto' }} />
        //     <h2 className="m-0 ms-3 text-primary">BIIT DATABASE TUTOR</h2>
        //   </a>
        //   <button
        //     type="button"
        //     className="navbar-toggler me-4"
        //     data-bs-toggle="collapse"
        //     data-bs-target="#navbarCollapse"
        //   >
        //     <span className="navbar-toggler-icon"></span>
        //   </button>
        //   <div className="collapse navbar-collapse" id="navbarCollapse">
        //     <div className="navbar-nav ms-auto p-4 p-lg-0">
        //       <a href="/home" className="nav-item nav-link active">
        //         Home
        //       </a>
        //       <a href="/login" className="nav-item nav-link">
        //         Logout
        //       </a>
        //       {/* <a href="/assignmentlist" className="nav-item nav-link">
        //         {email}
        //       </a> */}
        //     </div>

        //     <img src={studentIcon} alt="Student Icon" style={iconStyle} />
        //   </div>
        // </nav>

//         <main className="container">
//           <div>
//             <h1 className="text-center mt-4">{fname+lname}</h1>
//           </div>
//           <div className="row">
//             <div className="col">
//               <h2 className="mt-4">Assignment List</h2>
//               {assignments.map((assignment) => (
//                 <div key={assignment.SolutionId} className="card mb-3">
//                   <div className="card-body">
//                     <h5 className="card-title">Assignment Number: {assignment.AssignmentNumber}</h5>
//                     <p className="card-text">
//                       <strong>Section:</strong> {assignment.Section}
//                     </p>
//                     <p className="card-text">
//                       <strong>Semester:</strong> {assignment.Semester}
//                     </p>
//                     <button
//                       onClick={() => this.handleDownload(assignment.SolutionId)}
//                       className="btn btn-primary"
//                     >
//                       <i className="bi bi-cloud-download"></i> Download Solution
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </main>

//         <footer className="bg-dark text-light text-center py-3">
//           Assignment Portal &copy; {new Date().getFullYear()}
//         </footer>
//       </div>
//     );
//   }
// }

// export default DownloadSolution;



// import axios from 'axios';
// import logo from '../AssgsSol.jpg';
// import studentIcon from '../student.jpg';
// import { useLocation, useNavigate } from 'react-router-dom';
// import React, { useState, useEffect } from 'react';

// const iconStyle = {
//   width: '40px',
//   height: '40px',
//   marginLeft: '10px',
// };

// function DownloadSolution() {
//   const [sid, setSid] = useState('');
//   const [fname, setFname] = useState('');
//   const [lname, setLname] = useState('');
//   const [semester, setSemester] = useState('');
//   const [section, setSection] = useState('');
//   const [semail, setSemail] = useState('');
//   const [spassword, setSpassword] = useState('');
//   const [assignments, setAssignments] = useState([]);

//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const email = searchParams.get('email');
//   const Studentid = searchParams.get('sid');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchStudentInfo = async () => {
//       try {
//         const response = await fetch(`http://localhost/FYPAPI/api/Teacher/GetStudentInfoByEmail?email=${email}`);
//         const data = await response.json();

//         // Update the state variables with the data
//         if (data) {
//           setSid(data.Sid);
//           setFname(data.Fname);
//           setLname(data.Lname);
//           setSemester(data.Semester);
//           setSection(data.Section);
//           setSemail(data.Semail);
//           setSpassword(data.Spassword);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchStudentInfo();
//   }, [email]);

//   useEffect(() => {
//     // Fetch assignment details
//     axios
//       .get(`http://localhost/FYPAPI/api/Student/GetSolutions?section=${section}&Semester=${semester}`)
//       .then((response) => {
//         setAssignments(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching assignments:', error);
//       });
//   }, [section, semester]);

//   const handleDownload = (solutionId) => {
//     axios({
//       url: 'http://localhost/FYPAPI/api/Student/DownloadSolution',
//       method: 'GET',
//       responseType: 'blob',
//       params: {
//         solutionId: solutionId,
//       },
//     })
//       .then((response) => {
//         // Create a temporary link element
//         const url = window.URL.createObjectURL(new Blob([response.data]));
//         const link = document.createElement('a');
//         link.href = url;
//         link.setAttribute('download', `solution_${solutionId}.pdf`);
//         document.body.appendChild(link);

//         // Trigger the download
//         link.click();

//         // Cleanup
//         link.parentNode.removeChild(link);
//       })
//       .catch((error) => {
//         console.error('Error downloading solution:', error);
//       });
//   };

//   return (
//     <div className="container-fluid p-0">
//        <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
//           <a href="index.html" className="navbar-brand d-flex align-items-center px-4 px-lg-5">
//             <img src={logo} alt="Logo" style={{ width: '40px', height: 'auto' }} />
//             <h2 className="m-0 ms-3 text-primary">BIIT DATABASE TUTOR</h2>
//           </a>
//           <button
//             type="button"
//             className="navbar-toggler me-4"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarCollapse"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarCollapse">
//             <div className="navbar-nav ms-auto p-4 p-lg-0">
//               <a href="/home" className="nav-item nav-link active">
//                 Home
//               </a>
//               <a href="/login" className="nav-item nav-link">
//                 Logout
//               </a>
//               {/* <a href="/assignmentlist" className="nav-item nav-link">
//                 {email}
//               </a> */}
//             </div>

//             <img src={studentIcon} alt="Student Icon" style={iconStyle} />
//           </div>
//         </nav>

//         <main className="container">
//           <div>
//             <h1 className="text-center mt-4">{fname+lname}</h1>
//           </div>
//           <div className="row">
//             <div className="col">
//               <h2 className="mt-4">Assignment List</h2>
//               {assignments.map((assignment) => (
//                 <div key={assignment.SolutionId} className="card mb-3">
//                   <div className="card-body">
//                     <h5 className="card-title">Assignment Number: {assignment.AssignmentNumber}</h5>
//                     <p className="card-text">
//                       <strong>Section:</strong> {assignment.Section}
//                     </p>
//                     <p className="card-text">
//                       <strong>Semester:</strong> {assignment.Semester}
//                     </p>
//                     <button
//                       onClick={() => this.handleDownload(assignment.SolutionId)}
//                       className="btn btn-primary"
//                     >
//                       <i className="bi bi-cloud-download"></i> Download Solution
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </main>

//         <footer className="bg-dark text-light text-center py-3">
//           Assignment Portal &copy; {new Date().getFullYear()}
//         </footer>
//     </div>
//   );
// }

// export default DownloadSolution;





import axios from 'axios';
import logo from '../AssgsSol.jpg';
import studentIcon from '../student.jpg';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const iconStyle = {
  width: '40px',
  height: '40px',
  marginLeft: '10px',
};

function DownloadSolution() {
  const [sid, setSid] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [semester, setSemester] = useState('');
  const [section, setSection] = useState('');
  const [semail, setSemail] = useState('');
  const [spassword, setSpassword] = useState('');
  const [assignments, setAssignments] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email');
  const Studentid = searchParams.get('sid');
  const navigate = useNavigate();

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

  useEffect(() => {
    // Fetch assignment details
    axios
      .get(`http://localhost/FYPAPI/api/Student/GetSolutions?section=${section}&Semester=${semester}`)
      .then((response) => {
        setAssignments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching assignments:', error);
      });
  }, [section, semester]);

  const handleDownload = (solutionId) => {
    axios({
      url: 'http://localhost/FYPAPI/api/Student/DownloadSolution',
      method: 'GET',
      responseType: 'blob',
      params: {
        solutionId: solutionId,
      },
    })
      .then((response) => {
        // Create a temporary link element
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `solution_${solutionId}.pdf`);
        document.body.appendChild(link);

        // Trigger the download
        link.click();

        // Cleanup
        link.parentNode.removeChild(link);
      })
      .catch((error) => {
        console.error('Error downloading solution:', error);
      });
  };

  return (
    <div className="container-fluid p-0">
      {/* Rest of the code remains the same */}
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
      <main className="container">
        <div>
          <h1 className="text-center mt-4">{fname + lname}</h1>
        </div>
        <div className="row">
          <div className="col">
            <h2 className="mt-4">Assignment List</h2>
            {assignments.map((assignment) => (
              <div key={assignment.SolutionId} className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">Assignment Number: {assignment.AssignmentNumber}</h5>
                  <p className="card-text">
                    <strong>Section:</strong> {assignment.Section}
                  </p>
                  <p className="card-text">
                    <strong>Semester:</strong> {assignment.Semester}
                  </p>
                  <button onClick={() => handleDownload(assignment.SolutionId)} className="btn btn-primary">
                    <i className="bi bi-cloud-download"></i> Download Solution
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-dark text-light text-center py-3 fixed-bottom">
  Assignment Portal &copy; {new Date().getFullYear()}
</footer>

    </div>
  );
}

export default DownloadSolution;
