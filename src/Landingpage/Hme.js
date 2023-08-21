import SizeContext from "antd/es/config-provider/SizeContext";
import React from "react";
import { Navbar } from "react-bootstrap";


import { BrowserRouter as Router,Link,useNavigate } from "react-router-dom";

function Home(){
    const navigate = useNavigate();
   
    
return(


  
<div>

<Navbar>
    <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
        <a href="index.html" className="navbar-brand d-flex align-items-center px-4 px-lg-5">
            <h4 className="m-0 text-primary"><i className="fa fa-book me-3"></i>BIIT DATABASE TUTOR</h4>
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
           
            <a href="/login" className="btn btn-primary py-4 px-lg-5 d-none d-lg-block" onClick={()=>navigate("/login")}>LOG-IN<i className="fa fa-arrow-right ms-3"></i></a>
        </div>
    </nav>
 </Navbar>
   
    <div className="container-fluid p-0 mb-5">
        <div className=" header-carousel position-relative">
            <div className="owl-carousel-item position-relative">
                <img className="img-fluid" src="img/carousel-1.jpg" alt="" />
                <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center" style={{background:'rgba(24, 29, 56, .7)'}} >
                    <div className="container">
                        <div className="row justify-content-start">
                            <div className="col-sm-10 col-lg-8">
                                <h5 className="text-primary text-uppercase mb-3 animated slideInDown">Best Online Courses</h5>
                                <h1 className="display-3 text-white animated slideInDown">The Best Online Learning Platform</h1>
                                <p className="fs-5 text-white mb-4 pb-2"> BY Using BIIT DataBase Tutor App You Can Learn DataBase Querys.</p>
                                <a href="about.html" className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft">Read More</a>
                                <a href="/login" className="btn btn-light py-md-3 px-md-5 animated slideInRight">Join Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
    </div>


    {/* <!-- Service Start --> */}
    <div class="container-xxl py-5">
        <div class="container">
            <div class="row g-4">
                <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div class="service-item text-center pt-3">
                        <div class="p-4">
                            <i class="fa fa-3x fa-graduation-cap text-primary mb-4"></i>
                            <h5 class="mb-3">Skilled Tutor</h5>
                            <p>Learn With skill full DATABASE Expert Tutor  </p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
                    <div class="service-item text-center pt-3">
                        <div class="p-4">
                            <i class="fa fa-3x fa-globe text-primary mb-4"></i>
                            <h5 class="mb-3">Online Practice</h5>
                            <p>Practice SQL Query ON SQL Editor With OutPut Results</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
                    <div class="service-item text-center pt-3">
                        <div class="p-4">
                            <i class="fa fa-3x fa-home text-primary mb-4"></i>
                            <h5 class="mb-3">Home Assignments</h5>
                            <p>Assignments AND Solutions For Betther Learning</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
                    <div class="service-item text-center pt-3">
                        <div class="p-4">
                            <i class="fa fa-3x fa-book-open text-primary mb-4"></i>
                            <h5 class="mb-3">DATABASE Tutorial</h5>
                            <p>Brst DATABASE Tutorial Notes and YOUTUB Vidoes Lecture for Better Results</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- Service End --> */}




    <div className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container py-5">
            <div className="row g-5">
                <div className="col-lg-4 col-md-8">
                    <h4 className="text-white mb-1" >Quick Link</h4>
                    <a className="btn btn-link" href="home.js">About Us</a>
                    <a className="btn btn-link" href="home.js">Contact Us</a>
                    <a className="btn btn-link" href="home.js">Privacy Policy</a>
                    <a className="btn btn-link" href="home.js">Terms & Condition</a>
                    <a className="btn btn-link" href="home.js">FAQs & Help</a>
                </div>
                <div className="col-lg-4 col-md-8">
                    <h4 className="text-white mb-3">Contact</h4>
                    <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>BIIT, Rawalpindi, Pakistan</p>
                    <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>+092  348  5603230  </p>
                    <p className="mb-2"><i className="fa fa-envelope me-3"></i>alimazam33@gmail.com</p>
                    <div className="d-flex pt-2" style={{marginLeft:100}}>
                        <a className="btn btn-outline-light btn-social" href="home.js"><i className="fab fa-twitter"></i></a>
                        <a className="btn btn-outline-light btn-social" href="home.js"><i className="fab fa-facebook-f"></i></a>
                        <a className="btn btn-outline-light btn-social" href="https://www.youtube.com/channel/UCqSj307Nr19KOkjkwBRD3gw"><i className="fab fa-youtube"></i></a>
                        <a className="btn btn-outline-light btn-social" href="home.js"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
                <div className="col-lg-4 col-md-8">
                    <h4 className="text-white mb-3">Gallery</h4>
                    <div className="row g-2 pt-2">
                        <div className="col-4">
                            <img className="img-fluid bg-light p-1" src="/img/course-1.jpg" alt=""/>
                        </div>
                        <div className="col-4">
                            <img className="img-fluid bg-light p-1" src="/img/course-2.jpg" alt=""/>
                        </div>
                        <div className="col-4">
                            <img className="img-fluid bg-light p-1" src="/img/course-3.jpg" alt=""/>
                        </div>
                        <div className="col-4">
                            <img className="img-fluid bg-light p-1" src="/img/course-2.jpg" alt=""/>
                        </div>
                        <div className="col-4">
                            <img className="img-fluid bg-light p-1" src="/img/course-3.jpg" alt=""/>
                        </div>
                        <div className="col-4">
                            <img className="img-fluid bg-light p-1" src="/img/course-1.jpg" alt=""/>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        <div className="container">
            <div className="copyright">
                <div className="row">
                    <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                        &copy; <a className="border-bottom" href="/">BIIT DataBase Tutor </a> 

                        Designed By <a className="border-bottom" href="https://htmlcodex.com">Moazam Khalid</a><br></br>
                        ARID-NO <a className="border-bottom" href="https://themewagon.com">2019-Arid-2999</a>
                    </div>
                    <div className="col-md-6 text-center text-md-end">
                        <div className="footer-menu">
                            <a href="home.js">Home</a>
                            <a href="home.js">Cookies</a>
                            <a href="home.js">Help</a>
                            <a href="home.js">FQAs</a>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- Footer End -->


    <!-- Back to Top --> */}
    {/* <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></a> */}

</div>
);
}




    



export default Home;