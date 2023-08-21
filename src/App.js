

import {React,Button} from "react";
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import  Home  from './Landingpage/Hme';
import  Test  from './Test';
import TreeView from './TreeView';
import Login from "./Landingpage/Login";
 import  Dashboard  from'./Student/dashbord';
  import TeacherDashboard from "./Tutor/Tdashbord";
// import Contect from "./pages/contect";
// import Login from "./pages/components/login.component";
// import SignUp from "./pages/components/signup.component";
// import LoginSignup from "./pages/loginsignup";
 import AssignmentList from "./Student/assignmentlist";
 import Grades from "./Student/grades";
 import AssSol from "./Student/asssol";
 import Tutorial from "./Student/tutorial";
 import Practice from "./Student/practice";
 import AssignmentForm from "./Tutor/AssignmentForm";
 import AddStudent  from "./Tutor/AddStudent";
 //
 import LessonsPage from './Tutor/LessonsPage';
 import StudentsPage from './Tutor/StudentsPage';
 import AssignmentsPage from './Tutor/AssignmentsPage';
 import ReportsPage from './Tutor/ReportsPage';
 import Updatestudentinfo from './Tutor/UpdateStudentInfo ';
 //import AssigmentForm from './Tutor/AssignmentForm';
// import LessonsPage from"./pages/LessonsPage";


import DBselect from "./Darbase/DBselect";
import { BrowserRouter as Router, Route, Routes, Redirect,Link,useNavigate } from "react-router-dom";
function App(){
  
  return(
<div className=''>

 
 <Router>
 {/* <Link to ="/about">click</Link> */}
 
  <Routes>
  <Route path="/" element={<Home />} />
  <Route exact  path='/home' element={<Home />}/>
  <Route exact  path='/test' element={<Test />}/>
  <Route exact  path='/TreeView' element={<TreeView />}/>
  <Route exact  path='/login' element={<Login />}/>
  <Route exact path='/dashbord' element={<Dashboard />}/>
  <Route exact path='/Tdashbord' element={<TeacherDashboard />}/>
  <Route exact path='/assignmentlist' element={<AssignmentList />}/>
  <Route exact path='/grades' element={<Grades />}/>
  <Route exact path='/asssol' element={<AssSol />}/>
  <Route exact path='/tutorial' element={<Tutorial />}/>
  <Route exact path='/practice' element={<Practice />}/>
  <Route exact path="/AssgForm" element={<AssignmentForm/>}/>
  <Route exact path="/AddStudent" element={<AddStudent/>}/>
  <Route exact path="/UpdateStudent" element={<Updatestudentinfo/>}/>
  

  {/* 
  <Route exact path='/contect' element={<Contect />}/>
  <Route exact path='/login' element={<Login />}/>
  <Route exact path='/signup' element={<SignUp />}/>
  <Route exact path='/loginsignup' element={<LoginSignup />}/>
  
 
  <Route exact path='/LessonsPage' element={<LessonsPage />}/> */}

<Route exact path='/lessonpage' element={<LessonsPage />}/>
  <Route exact path='/studentpage' element={<StudentsPage />}/>
  <Route exact path="/Assigmentpage" element={<AssignmentsPage/>}/>
  <Route exact path="/Reportpage" element={<ReportsPage/>}/>

  

  </Routes>
 </Router>
</div>

  );
}
export default App;
