
import React, { useState, useContext } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import axios from "axios";
import { Navbar } from "react-bootstrap";
import useHistory from 'use-history';
import { SessionContext } from '../SessionContext';
import { BrowserRouter as Router, Link, useNavigate } from "react-router-dom";
import myImage from '../image.jpg';
import HashRouter from 'hash-router';
import { BrowserRouter } from 'react-router-dom';
import style from '../App.css';
import '../styles.css';
function App() {
  const navigate = useNavigate();
  const iconSize = 60;
  const styles = {
    width: `${iconSize}px`,
    height: `${iconSize}px`,
    marginLeft: 1
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  //const session = useContext(SessionContext);
  //   const handleSubmit1 = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const response = await axios.get(
  //         `http://192.168.18.65/FYPAPI/api/Student/Login?Semail=${email}&Spassword=${password}`
  //       );
  //       setMessage(response.data);
  //     } catch (error) {
  //       setMessage("Invalid email or password.");
  //     }
  //   };
  //   const handleSubmit2 = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const response = await axios.get(
  //         `http://192.168.18.65/FYPAPI/api/Teacher/Login?Temail=${email}&Tpassword=${password}`
  //       );
  //       setMessage(response.data);
  //     } catch (error) {
  //       setMessage("Invalid email or password.");
  //     }
  //   };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginType === "student") {
      handleSubmit1();
    } else if (loginType === "teacher") {
      handleSubmit2();
    }
  };

  const handleSubmit1 = async () => {
    try {
      const response = await axios.get(
        `http://localhost/FYPAPI/api/Student/Login?Semail=${email}&Spassword=${password}`
      );
      setMessage(response.data);
      console.log(email, password);
      if (response.data === "Successfully LogIn") {
        //   sessionStorage.setItem("loggedIn", true);
        //   sessionStorage.setItem("email", email);
        //   history.push("/dashbord");
        // } else {
        //   setMessage("Invalid email or password.");

        window.location.href = `/dashbord?email=${email}`;
      }
    } catch (error) {
      setMessage("Invalid email or password.");
    }
  };

  const handleSubmit2 = async () => {
    try {
      const response = await axios.get(
        `http://localhost/FYPAPI/api/Teacher/Login?Temail=${email}&Tpassword=${password}`
      );
      setMessage(response.data);
      if (response.data === "Successfully LogIn") {
        //   sessionStorage.setItem("loggedIn", true);
        //   sessionStorage.setItem("email", email);
        //   history.push("/Tdashbord");
        // } else {
        //   setMessage("Invalid email or password.");
        window.location.href = `/Tdashbord?email=${email}`;
      }
    } catch (error) {
      setMessage("Invalid email or password.");
    }
  };

  const [loginType, setLoginType] = useState('');

  return (
    <div>
      <div style={{ marginTop: 0, marginBottom: -50 }}>
        <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
          <a href="index.html" className="navbar-brand d-flex align-items-center px-3 px-lg-5">
            <h4 className="m-0 fs-3 text-primary"><i className="fa fa-book me-3"></i>BIIT DATABASE TUTOR</h4>
          </a>
         

          <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto p-4 p-lg-0">
              <a href="/home" className="nav-item nav-link active">Home</a>
              <a href="about.html" className="nav-item nav-link">About</a>

              <a href="contact.html" className="nav-item nav-link">Contact</a>
            </div>

            <a href="/login" className="btn btn-primary py-4 px-lg-5 d-none d-lg-block" onClick={() => navigate("/login")}>LOG-IN<i className="fa fa-arrow-right ms-3"></i></a>
          </div>
        </nav>
      </div>
      <MDBContainer fluid className="p-3 my-5 h-custom">

        <MDBRow>

          <MDBCol col='10' md='6' className='desk-img'>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
          </MDBCol>

          <MDBCol col='4' md='6'>

            <div className='row align-items-center icon-div'>

              <div className='col-lg-8 col-md-12 std-tch'>
                <label className='px-3'>
                  <img src="/57_Student.jpg" alt="My Image" style={styles} onClick={() => setLoginType('student')} />
                  <br />
                  Student
                </label>
                <label className='px-3'>
                  <img src="/images.png" alt="My Image" style={styles} onClick={() => setLoginType('teacher')} />
                  <br />
                  Teacher
                </label>
              </div>
              {/* <div className='col-lg-4'>
                <label>
                  <img src="/images.png" alt="My Image" style={styles} onClick={() => setLoginType('teacher')} />
                  <br />
                  Teacher
                </label>
              </div> */}
              <div className='col-lg-4 col-md-12 text-end biit-logo' style={{backgroundColor:'white'}}>
              <img src={myImage} alt="My Image" width="130" height="130" style={{ objectFit: 'cover', borderRadius: '60%' }} className='img-fluid' />
 </div>

            </div>
            {/* {session.isLoggedIn ? (
        <Redirect to="/dashboard" />
      ) : (
        <form onSubmit={handleSubmit}>
          // form fields here
        </form>
      )} */}
            <form onSubmit={handleSubmit}>
              <div className="divider d-flex align-items-center my-2">
                {loginType === 'student' ? <p className="lead fw-normal mb-0 me-3">STUDENT LOG-IN</p> : loginType === 'teacher' ? <p className="lead fw-normal mb-0 me-3">TEACHER LOG-IN</p> : <p className="lead fw-normal mb-0 me-3" style={{ color: 'red' }}>SELECT LOG-IN TYPE(click on icon)</p>}

                <p className="text-center fw-bold mx-3 mb-0"></p>
              </div>
              <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg"
                value={email} onChange={(e) => setEmail(e.target.value)} />
              <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"
                value={password} onChange={(e) => setPassword(e.target.value)} />

              <div className="d-flex justify-content-between mb-4">
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                <a href="">Forgot password?</a>
              </div>

              <div className='text-center text-md-start mt-2 pt-2'>

                <button className="mb-0 px-5 btn btn-primary text-white" type="submit">Login</button>


                {message === "Successfully LogIn" ? (
                  <p style={{ color: "green" }}>{message}</p>
                ) : (
                  <p style={{ color: "red" }}>{message}</p>
                )}
                <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href="" className="link-danger">Register</a></p>
              </div>
            </form>
          </MDBCol>

        </MDBRow>



      </MDBContainer>
    </div>
  );
}

export default App;
