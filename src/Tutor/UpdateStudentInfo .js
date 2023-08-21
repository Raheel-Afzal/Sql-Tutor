// import React, { useState } from 'react';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit } from '@fortawesome/free-solid-svg-icons';

// const UpdateStudentInfo = () => {
//   const [sid, setSid] = useState('');
//   const [updatedData, setUpdatedData] = useState({
//     Fname: '',
//     Lname: '',
//     Semester: '',
//     Section: '',
//     Semail: '',
//     Spassword: ''
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedData({ ...updatedData, [name]: value });
//   };

//   const handleClose = () => {
//     setSid('');
//     setUpdatedData({
//       Fname: '',
//       Lname: '',
//       Semester: '',
//       Section: '',
//       Semail: '',
//       Spassword: ''
//     });
//   };

//   const handleSubmit = async () => {
//     try {
//       await axios.put(`http://localhost/FYPAPI/api/Teacher/UpdateStudentInfo?Sid=${sid}`, updatedData);
//       alert('Student record updated successfully!');
//     } catch (error) {
//       console.error('Error updating student record:', error);
//     }
//     handleClose();
//   };

//   return (
//     <div className="modal" style={{ display: 'block', background: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }}>
//       <div className="modal-dialog" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '500px', background: '#fff', padding: '20px' }}>
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">Update Student Information</h5>
//             <button type="button" className="close" aria-label="Close" onClick={handleClose}>
//               <span aria-hidden="true">&times;</span>
//             </button>
//           </div>
//           <div className="modal-body">
//             <input
//               name="sid"
//               className="form-control"
//               placeholder="Student ID"
//               value={sid}
//               onChange={(e) => setSid(e.target.value)}
//             />
//             <input
//               name="Fname"
//               className="form-control"
//               placeholder="First Name"
//               value={updatedData.Fname}
//               onChange={handleInputChange}
//             />
//             <input
//               name="Lname"
//               className="form-control"
//               placeholder="Last Name"
//               value={updatedData.Lname}
//               onChange={handleInputChange}
//             />
//             <input
//               name="Semester"
//               className="form-control"
//               placeholder="Semester"
//               value={updatedData.Semester}
//               onChange={handleInputChange}
//             />
//             <input
//               name="Section"
//               className="form-control"
//               placeholder="Section"
//               value={updatedData.Section}
//               onChange={handleInputChange}
//             />
//             <input
//               name="Semail"
//               className="form-control"
//               placeholder="Email"
//               value={updatedData.Semail}
//               onChange={handleInputChange}
//             />
//             <input
//               name="Spassword"
//               className="form-control"
//               placeholder="Password"
//               value={updatedData.Spassword}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="modal-footer">
//             <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancel</button>
//             <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const UpdateStudentButton = () => {
//   const [showDialog, setShowDialog] = useState(false);

//   const handleButtonClick = () => {
//     setShowDialog(true);
//   };

//   const handleDialogClose = () => {
//     setShowDialog(false);
//   };

//   return (
//     <>
//       <button className="btn btn-primary" style={{ marginRight: '5px' }} onClick={handleButtonClick}>
//         <FontAwesomeIcon icon={faEdit} style={{ marginRight: '5px' }} />
//         Edit
//       </button>
//       {showDialog && <UpdateStudentInfo onClose={handleDialogClose} />}
//     </>
//   );
// };

// export default UpdateStudentButton;




import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const UpdateStudentInfo = ({ onClose }) => {
  const [sid, setSid] = useState('');
  const [updatedData, setUpdatedData] = useState({
    Fname: '',
    Lname: '',
    Semester: '',
    Section: '',
    Semail: '',
    Spassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleClose = () => {
    setSid('');
    setUpdatedData({
      Fname: '',
      Lname: '',
      Semester: '',
      Section: '',
      Semail: '',
      Spassword: ''
    });
    onClose();
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost/FYPAPI/api/Teacher/UpdateStudentInfo?Sid=${sid}`, updatedData);
      alert('Student record updated successfully!');
    } catch (error) {
      console.error('Error updating student record:', error);
    }
    handleClose();
  };

  return (
    <div className="modal" style={{ display: 'block', background: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }}>
      <div className="modal-dialog" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '500px', background: '#fff', padding: '20px' }}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Student Information</h5>
            <button type="button" className="close" aria-label="Close" onClick={handleClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <input
              name="sid"
              className="form-control"
              placeholder="Student ID"
              value={sid}
              onChange={(e) => setSid(e.target.value)}
            />
            <input
              name="Fname"
              className="form-control"
              placeholder="First Name"
              value={updatedData.Fname}
              onChange={handleInputChange}
            />
            <input
              name="Lname"
              className="form-control"
              placeholder="Last Name"
              value={updatedData.Lname}
              onChange={handleInputChange}
            />
            <input
              name="Semester"
              className="form-control"
              placeholder="Semester"
              value={updatedData.Semester}
              onChange={handleInputChange}
            />
            <input
              name="Section"
              className="form-control"
              placeholder="Section"
              value={updatedData.Section}
              onChange={handleInputChange}
            />
            <input
              name="Semail"
              className="form-control"
              placeholder="Email"
              value={updatedData.Semail}
              onChange={handleInputChange}
            />
            <input
              name="Spassword"
              className="form-control"
              placeholder="Password"
              value={updatedData.Spassword}
              onChange={handleInputChange}
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const UpdateStudentButton = () => {
  const [showDialog, setShowDialog] = useState(false);

  const handleButtonClick = () => {
    setShowDialog(true);
  };

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  return (
    <>
      <button className="btn btn-primary" style={{ marginRight: '5px' }} onClick={handleButtonClick}>
        <FontAwesomeIcon icon={faEdit} style={{ marginRight: '5px' }} />
        Update 
      </button>
      {showDialog && <UpdateStudentInfo onClose={handleDialogClose} />}
    </>
  );
};

export default UpdateStudentButton;
