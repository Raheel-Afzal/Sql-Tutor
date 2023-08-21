import { useLocation } from "react-router-dom";
import { Table, Collapse } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fa0, faChartSimple, faKeyboard, faPersonWalkingDashedLineArrowRight, faQuestion, faQuran, faReceipt, faRefresh, faSave, faSignOut, faStar } from '@fortawesome/free-solid-svg-icons';
import { Fab } from "@mui/material";
import { BrowserRouter as Router,Link,useNavigate } from "react-router-dom";
import {  Modal, Form } from 'react-bootstrap';
const { Panel } = Collapse;


function App() {
  // const locations = useLocation();
  // const searchParamss = new URLSearchParams(locations.search);
  // const email = searchParamss.get("email");
  // const assignmentNumber=searchParams.get("assignmentNumber");
  const [email, setEmail] = useState('');
  const [assignmentNumber, setAssignmentNumber] = useState('');
  const [Studentid, setStudentid] = useState('');
  const [Smt, setSmt] = useState('');
  const [Sec, setSec] = useState('');

  const locations = useLocation();
  const searchParamss = new URLSearchParams(locations.search);

  useEffect(() => {
    const emailParam = searchParamss.get('email');
    const assignmentNumberParam = searchParamss.get('assignmentNumber');
   const Studentidparam = searchParams.get('sid');
   const Semesterparam = searchParamss.get('Semester');
   const Sectionparam = searchParamss.get('Section');
   const DatabaseNameparam = searchParamss.get('DatabaseName');

   setStudentid(Studentidparam);
    setEmail(emailParam);
    setAssignmentNumber(assignmentNumberParam);
    setSmt(Semesterparam);
    setSec(Sectionparam);
    //
    setDbList(DatabaseNameparam);
    //setDatabases(DatabaseNameparam);
    setSelectedDatabase(DatabaseNameparam);
    setSelectedDb(DatabaseNameparam);
    
  }, []);
  const [saveSuccess, setSaveSuccess] = useState(false);

  //
  const navigate = useNavigate();
  const location = useLocation();
  const queryfinal = new URLSearchParams(location.search).get("finalQuery");
  const [query, setQuery] = useState("");
  const [whereClause, setwhere] = useState("");
  const [results, setResults] = useState([]);
  const [dbList, setDbList] = useState([]);

  const [selectedDb, setSelectedDb] = useState("");
  const [openWhereDialog, setOpenWhereDialog] = useState(false);
  const [selectedWhereColumn, setSelectedWhereColumn] = useState("");
  const [selectedWhereOperator, setSelectedWhereOperator] = useState("");
  const [whereValue, setWhereValue] = useState('');
  const [tableColumns, setTableColumns] = useState([]);
  const [selectedJoinColumns, setSelectedJoinColumns] = useState([]);
  const [activeTab, setActiveTab] = useState("result");
  const [querySample, setQuerySample] = useState("");
  const [showDatabaseForm, setShowDatabaseForm] = useState(true);
  const [databases, setDatabases] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState(null);
  const [tables, setTables] = useState([]);
  const [selectedTables, setSelectedTables] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [finalQuery, setFinalQuery] = useState("");
  const [queryType, setQueryType] = useState("");
  const [selectedTableColumns, setSelectedTableColumns] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [studentInfo, setStudentInfo] = useState(['']);

const [sid, setSid] = useState("");
const [fname, setFname] = useState("");
const [lname, setLname] = useState("");
const [semester, setSemester] = useState("");
const [section, setSection] = useState("");
const [semail, setSemail] = useState("");
const [spassword, setSpassword] = useState("");
const [questionNumber, setQuestionNumber] = useState("1");
const [jointype, setjointype]=useState("Inner join");
const [aggregateFunction, setaggregateFunction]=useState("");


useEffect(() => {
  const fetchStudentInfo = async () => {
    try {
      // Check if the student information is already stored in localStorage
      const storedData = localStorage.getItem('studentInfo');
      if (storedData) {
        const data = JSON.parse(storedData);
        setSid(data.Sid);
        setFname(data.Fname);
        setLname(data.Lname);
        setSemester(data.Semester);
        setSection(data.Section);
        setSemail(data.Semail);
        setSpassword(data.Spassword);
      } else {
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

          // Store the student information in localStorage
          localStorage.setItem('studentInfo', JSON.stringify(data));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  fetchStudentInfo();
}, [email]);


  //
  const handleOpenWhereDialog = () => {
    setOpenWhereDialog(true);
  };
  const handleCloseWhereDialog = () => {
    setOpenWhereDialog(false);
    const Whereremove = ``;
  setwhere(Whereremove);
    

  };
  const handleWhereColumnChange = (event) => {
    setSelectedWhereColumn(event.target.value);
  };
  const handleWhereOperatorChange = (event) => {
    setSelectedWhereOperator(event.target.value);
  };
  const handleWhereValueChange = (event) => {
    setWhereValue(event.target.value);
  };
  const handleCondition = () => {
    
    if (selectedColumns.length > 0) {
      handleOpenWhereDialog();
    }
    
    
  };
const handleApplyWhereCondition = () => {
  const newWhere = `WHERE ${selectedWhereColumn} ${selectedWhereOperator} ${whereValue}`;
  setwhere(newWhere);
  setOpenWhereDialog(false);
  
}
  useEffect(() => {
    fetch("http://localhost/FYPAPI/api/Teacher/GetDatabaseList")
      .then((response) => response.json())
      .then((data) => {
        const filteredDbList = data.filter((db) =>
          ["FYP1", "Student", "StDB"].includes(db)
        );
        setDatabases(filteredDbList);
        setSelectedDb(filteredDbList[0]);
      });
  }, []);
  useEffect(() => {
    if (selectedDatabase) {
      // Get the list of tables for the selected database
      axios
        .get(
          `http://localhost/FYPAPI/api/Teacher/GetTableColumns?databaseName=${selectedDatabase}`
        )
        .then((response) => {
          const tables = response.data.map((tableInfo) => tableInfo.TableName);
          setTables(tables);
          setSelectedTables([]);
          setColumns([]);
          setSelectedColumns([]);
        })
        .catch((error) => console.error(error));

      // Get the list of columns for the selected database
      axios
        .get(
          `http://localhost/FYPAPI/api/Teacher/GetColumnsList?databaseName=${selectedDatabase}`
        )
        .then((response) => setColumns(response.data))
        .catch((error) => console.error(error));
    }
  }, [selectedDatabase]);
  const handleDatabaseSelect = (event) => {
    const databaseName = event.target.value;
    setSelectedDatabase(selectedDatabase);
    setSelectedDb(selectedDatabase);
  };
  const handleTableSelect = (event) => {
    const tableName = event.target.value;

    // Get the list of columns for the selected table in the selected database
    axios
      .get(
        `http://localhost/FYPAPI/api/Teacher/GetTableColumns?databaseName=${selectedDatabase}&tableName=${tableName}`
      )
      .then((response) => {
        const columns = response.data[0].ColumnNames;
        setColumns(columns);
        setSelectedColumns([]);
      })
      .catch((error) => console.error(error));
  };
  const handleTableCheckboxChange = (event) => {
    const tableName = event.target.value;
    const isChecked = event.target.checked;
    let updatedTables;

    if (isChecked) {
      updatedTables = [...selectedTables, tableName];
    } else {
      updatedTables = selectedTables.filter((t) => t !== tableName);
    }
    setSelectedTables(updatedTables);

    // Get the list of columns for the selected tables in the selected database
    axios
      .get(
        `http://localhost/FYPAPI/api/Teacher/GetTableColumns?databaseName=${selectedDatabase}&tableNames=${updatedTables.join(
          ","
        )}`
      )
      .then((response) => {
        const columnsByTable = {};
        response.data.forEach((table) => {
          if (updatedTables.includes(table.TableName)) {
            columnsByTable[table.TableName] = table.ColumnNames;
          }
        });
        setSelectedTableColumns(columnsByTable);
      })
      .catch((error) => console.error(error));
  };
  const handleColumnCheckboxChange = (event) => {
    const columnName = event.target.value;
    const isChecked = event.target.checked;
    let updatedColumns = selectedColumns;

    if (isChecked) {
      updatedColumns = [...selectedColumns, columnName];
    } else {
      updatedColumns = selectedColumns.filter((c) => c !== columnName);
    }
    setSelectedColumns(updatedColumns);
  };
  const handleQueryTypeChange = (event) => {
    setQueryType(event.target.value);
  };
  const handleJoinTypeChange = (event) => {
    setjointype(event.target.value);
  };
  const handleagrigateTypeChange = (event) => {
    setaggregateFunction(event.target.value);
  };
  
  const handleQueryGenerate = () => {
    try {
   // Create the initial SELECT and FROM clauses
    let selectClause = "";
    let fromClause = "";

    // If there is only one table, no need for joins
    if (selectedTables.length === 1) {
      selectClause = selectedColumns
        .map((column) => `${selectedTables[0]}.${column}`)
        .join(", ");
      fromClause = selectedTables[0];
    } else {
      // Create the JOIN clause
      let joinClauses = [];

      // Include all selected columns in the SELECT clause
      let selectTables = [];
      selectedTables.forEach((table) => {
        selectedTableColumns[table].forEach((column) => {
          if (selectedColumns.includes(column)) {
            selectTables.push(`${table}.${column}`);
          }
        });
      });

      for (let i = 0; i < selectedTables.length - 1; i++) {
        let joinCondition = "";

        // Get the selected columns for both tables
        const table1Columns = selectedTableColumns[selectedTables[i]];
        const table2Columns = selectedTableColumns[selectedTables[i + 1]];

        // Find the common columns between the two tables
        const commonColumns = table1Columns.filter((column) =>
          table2Columns.includes(column)
        );

        if (commonColumns.length > 0) {
          // Create the join condition based on the shared column names
          joinCondition = commonColumns
            .map(
              (column) =>
                `${selectedTables[i]}.${column} = ${selectedTables[i + 1]
                }.${column}`
            )
            .join(" AND ");
          joinClauses.push(
            `${jointype}  ${selectedTables[i + 1]} ON ${joinCondition}`
          );
        }
      }
      let joinClause = joinClauses.join(" ");
      selectClause = selectTables.join(", ");
      fromClause = `${selectedTables[0]} ${joinClause}`;
    }

  
    // Create the ORDER BY clause
    let orderByClause = "";
    if (selectedColumns.length > 0) {
      // orderByClause = `ORDER BY ${selectedTables[0]}.${selectedColumns[0]}`;
      orderByClause = ``;
    }


     // Create the aggregate function clause (if applicable)
     let aggregateFunctionClause = "";
     if (queryType === "SELECT" && aggregateFunction) {
       aggregateFunctionClause = `${aggregateFunction}(${selectClause})`;
       selectClause = aggregateFunctionClause;
     }
 
    // Combine the clauses to form the final query
    let finalQuery = "";
    if (queryType === "SELECT") {
      finalQuery = `SELECT ${selectClause} FROM ${fromClause} ${whereClause} ${orderByClause}`;
    } else if (queryType === "INSERT") {
      let columnClause = selectedColumns.join(", ");
      let valueClause = selectedColumns.map(() => "?").join(", ");
      finalQuery = `INSERT INTO ${fromClause} (${columnClause}) VALUES (${valueClause}) ${whereClause}`;
    } else if (queryType === "UPDATE") {
      let setClause = selectedColumns
        .map((column) => `${column} = ?`)
        .join(", ");
      finalQuery = `UPDATE ${fromClause} SET ${setClause} ${whereClause}`;
    } else if (queryType === "DELETE") {
      finalQuery = `DELETE FROM ${fromClause} ${whereClause}`;
    }
    setFinalQuery(finalQuery);
  } catch (error) {
    console.error("An error occurred while generating the query:", error);
    // Handle the error or show an error message to the user
  }
  };
  useEffect(() => {
    fetch("http://localhost/FYPAPI/api/Teacher/GetDatabaseList")
      .then((response) => response.json())
      .then((data) => {
        const filteredDbList = data.filter((db) =>
        [ "Electric_Shop",
        "DBTest1",
        "StDB",
        "Student",
        "task1",
        "DBTest2",
        "FYP1",
        "AtncSyst",
        "DBTest3",
        "DBTest4",
        "DBTest5",
        "DBTest6",
        "DBTest7",
        "DBTest8",
        "DBTest9",
        "DBTest10"].includes(db)
        );
        setDbList(filteredDbList);
        setSelectedDb(filteredDbList[0]);
      });
  }, []);
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get("query") || "";
  console.log("query:", queryfinal);
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch(
        // `http://localhost/FYPAPI/api/Student/RunQuery?sqlQuery=${finalQuery}`
        `http://localhost/FYPAPI/api/QueryRun/RunQuery?databaseName=${selectedDatabase}&query=${finalQuery}`,
        {
          method: "POST"
        }
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const response = await fetch(
  //       // `http://localhost/FYPAPI/api/Student/RunQuery?sqlQuery=${finalQuery}`
  //       `http://localhost/FYPAPI/api/QueryRun/RunQuery?databaseName=${selectedDb}&query=${finalQuery}`
  //     );
  //     const data = await response.json();
  //     setResults(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const finalQuery = event.target.elements.sqlQuery.value;
  //     const response = await fetch(
  //       `http://localhost/FYPAPI/api/QueryRun/RunQuery?databaseName=${selectedDb}&query=${finalQuery}`
  //     );
  //     const data = await response.json();
  //     setResults(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const handleChange = (event) => {
    setFinalQuery(event.target.value);
  };
  useEffect(() => {
    fetch("http://localhost/FYPAPI/api/Student/GetTableColumns")
      .then((response) => response.json())
      .then((data) => setTableColumns(data));
  }, []);
  const renderTableColumns = (table) => {
    const columns = table.ColumnNames.map((column) => {
      return {
        title: column,
        dataIndex: column,
        key: column,
      };
    });

    const dataSource = [{}]; // need to set a dummy row to render the table

    return (
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        size="small"
        scroll={{ x: "max-content" }}
      />
    );
  };
  const renderTable = (table) => {
    return (
      <Panel header={table.TableName} key={table.TableName}>
        {renderTableColumns(table)}
      </Panel>
    );
  };
  const renderTree = () => {
    return tableColumns.map((table) => {
      return renderTable(table);
    });
  };
  const handleDbChange = (event) => {
    setSelectedDb(event.target.value);
  };
  const sampleQueries = {
    select: "SELECT * FROM users;",
    insert:
      'INSERT INTO users (name, email) VALUES ("John Doe", "johndoe@example.com");',
    update: 'UPDATE users SET name = "Jane Doe" WHERE id = 1;',
  };
  const handleExecute = () => {
    if (query.trim() === "") {
      return;
    }
    //  setLoading(true);
    setResults([]);
    //setError(null);
    // executeQuery(query)
    //     .then((res) => {
    //         setResults(res);
    //         setQuerySample(sampleQueries[query.trim().toLowerCase().split(' ')[0]]);
    //     })
    //     .catch((err) => setError(err.message))
    //     .finally(() => setLoading(false));
  };
  const Notification = ({ message, type }) => {
    const [show, setShow] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setShow(false);
      }, 2000);
  
      return () => {
        clearTimeout(timer);
      };
    }, []);
  
    if (!show) {
      return null;
    }
  
    return <div className={`notification ${type}`}>{message}</div>;
  };
  
  const handleSaveQuery = () => {
    // Perform your logic here using the state variables (sid, assignmentNumber, databaseName, queryDetails)
    // Example: Send the data to the API endpoint
    console.log(assignmentNumber);
    console.log(sid);
    console.log(Smt);
    console.log(Sec);
    const queryData = {
      Sid: Studentid,
      AssignmentNumber: assignmentNumber,
      Qno: questionNumber,
      Qdetails: finalQuery,
      semester:Smt,
      Section:Sec,


    };
  
    fetch('http://localhost/FYPAPI/api/Student/QueryEntry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(queryData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Data sent successfully:', data);
        setSaveSuccess(true);
      })
      .catch(error => {
        console.error('Error sending data:', error);
        // Handle the error case as needed
      });
  
    // Close the modal
    setShowModal(false);
  };
  
  function ParentComponent() {
    const setLoading = (loading) => {
      // implementation
    };

    const setError = (error) => {
      // implementation
    };

    const executeQuery = (query) => {
      // implementation
    };
    // const handleSaveQuery = () => {
    //   // Handle the submission of the form
    //   // You can access the values using the state variables (sid, assignmentNumber, databaseName, queryDetails)
    //   // Perform your logic here
    //   // Close the modal
    //   setShowModal(false);
    // };
    // const handleSaveQuery = () => {
    //   // Perform your logic here using the state variables (sid, assignmentNumber, databaseName, queryDetails)
    //   // Example: Send the data to the API endpoint
    //   const queryData = {
    //     Sid: sid,
    //     Aid: assignmentNumber,
    //     Qno: questionNumber,
    //     Qdetails: finalQuery
    //   };
  
    //   fetch('http://localhost/FYPAPI/api/Student/QueryEntry', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(queryData)
    //   })
    //     .then(response => response.json())
    //     .then(data => {
    //       console.log('Data sent successfully:', data);
    //       // Perform any additional actions or handle the response as needed
    //     })
    //     .catch(error => {
    //       console.error('Error sending data:', error);
    //       // Handle the error case as needed
    //     });
  
    //   // Close the modal
    //   setShowModal(false);
    // };
  
    return (
      <div>
        <ChildComponent
          setLoading={setLoading}
          setError={setError}
          executeQuery={executeQuery}
        />
      </div>
    );
  }
  function ChildComponent({ setLoading, setError, executeQuery }) {
    // use setLoading, setError, and executeQuery here
  }
  return (
    <div
      style={{
        backgroundImage: `url("https://www.imcinstitute.ae/public/uploads/images/image_lg/sql-essentials-training-and-certification.png")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "115vh",
      }}

    >

      <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0" style={{ height: '65px' }}>
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
            <a href="about.html" className="nav-item nav-link">
              About
            </a>

            <a href="contact.html" className="nav-item nav-link">
              Contact
            </a>
          </div>

          <a
            href="/login"
            className="btn btn-primary py-4 px-lg-5 d-none d-lg-block" style={{ height: '65px' }}
            onClick={() => navigate("/login")}
          >
            LOG-IN<i className="fa fa-arrow-right ms-3"></i>
          </a>
        </div>
      </nav>

      <div className="container-fluid">
        
       {/* <div>
        <p>email{email}</p>
    <p>Full Name: {fname} {lname}</p>
    <p>SID: {sid}</p>
    <p>Semester: {semester}</p>
    <p>Section: {section}</p>
    <p>Email: {semail}</p>
    <p>Password: {spassword}</p>
  </div> */}
        <div className="row">
          {/* div#1 */}

          <div className="col-md-4">
            <h6 style={{ color: "HighlightText" }}>
              {/* {" "} */}
              Selected DataBase:{selectedDatabase}
            </h6>
            <div className="mb-3">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  alignContent: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                {showDatabaseForm && (
                  <div
                    style={{
                      backgroundColor: "#fff",
                      padding: "2rem",
                      borderRadius: "0.25rem",
                      boxShadow: "0 0.5rem 1rem rgba(0,0,0,0.15)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "80%",
                      height: "auto",
                    }}
                  >
                    <h7 style={{ marginBottom: "1rem" }}>{selectedDatabase}</h7>
                    <div></div>
                    {/* <select
                      id="databaseSelect"
                      onChange={handleDatabaseSelect}
                      value={selectedDatabase} */}
                      
                      {/* // style={{ */}
                      {/* //   width: "100%",
                      //   marginBottom: "1rem",
                      //   padding: "0.5rem",
                      //   border: "1px solid #ddd",
                      //   borderRadius: "0.25rem",
                      // }}
                    > */}
                      {/* <option value={selectedDatabase}>Select a database</option> */}
                      {/* {databases.map((database) => (
                        <option key={database} value={database}>
                          {database}
                        </option>
                      )
                      )} */}
                    {/* </select> */}
                    
                    <select
                      id="queryTypeSelect"
                      onChange={handleQueryTypeChange}
                      style={{
                        width: "100%",
                        marginBottom: "1rem",
                        padding: "0.5rem",
                        border: "1px solid #ddd",
                        borderRadius: "0.25rem",
                      }}
                    >
                      <option value="">Select Query Type</option>
                      <option value="SELECT">SELECT</option>
                      <option value="INSERT">INSERT</option>
                      <option value="UPDATE">UPDATE</option>
                      <option value="DELETE">DELETE</option>
                    </select>
                    {queryType === "SELECT" && (
                    <select
                      id="queryTypeSelect"
                      onChange={handleJoinTypeChange}
                      style={{
                        width: "100%",
                        marginBottom: "1rem",
                        padding: "0.5rem",
                        border: "1px solid #ddd",
                        borderRadius: "0.25rem",
                      }}
                    >
                      <option value="">Select Join Type</option>
                      {/* <option value="JOIN">JOIN</option> */}
                      <option value="INNER JOIN">INNER JOIN</option>
                      <option value="LEFT JOIN">LEFT JOIN</option>
                      <option value="RIGHT JOIN">RIGHT JOIN</option>
                      <option value="FULL OUTER JOIN">FULL JOIN</option>
                    </select>
)}

{queryType === "SELECT" && (
                    <select
                      id="queryTypeSelect"
                      onChange={handleagrigateTypeChange}
                      style={{
                        width: "100%",
                        marginBottom: "1rem",
                        padding: "0.5rem",
                        border: "1px solid #ddd",
                        borderRadius: "0.25rem",
                      }}
                    >
                      <option value="">Select Aggregate Function </option>
                      <option value="MIN">MIN()</option>
                      <option value="MAX">MAX()</option>
                      <option value="COUNT">COUNT()</option>
                      <option value="AVG">AVG()</option>
                      <option value="SUM">SUM()</option>
                    </select>
)}
                  </div>
                )}
                {selectedDatabase && (
                  <div
                    style={{
                      backgroundColor: "#fff",
                      padding: "2rem",
                      borderRadius: "0.25rem",
                      boxShadow: "0 0.5rem 1rem rgba(0,0,0,0.15)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginTop: "1rem",
                      justifyContent: "space-between",
                      maxHeight: "22rem",
                      overflowY: "scroll",
                      width: "80%",
                    }}
                  >
                    <h6
                      style={{
                        marginBottom: "1rem",
                        fontWeight: "bold",
                        color: "skyblue",
                      }}
                    >
                      Select Tables & Columns
                    </h6>
                    <div style={{ width: "100%", marginBottom: "1rem" }}>
                      {tables.map((table) => (
                        <div
                          key={table}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            marginBottom: "0.5rem",
                          }}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <input
                              type="checkbox"
                              name={`table_${table}`}
                              value={table}
                              onChange={handleTableCheckboxChange}
                            />
                            <label
                              style={{
                                marginLeft: "0.5rem",
                                fontWeight: "bold",
                              }}
                            >
                              {table}
                            </label>
                          </div>
                          {selectedTableColumns[table] && (
                            <div style={{ marginLeft: "1rem" }}>
                              {selectedTableColumns[table].map((column) => (
                                <div
                                  key={column}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    name={`column_${column}`}
                                    value={column}
                                    onChange={handleColumnCheckboxChange}
                                  />
                                  <label
                                    style={{
                                      marginLeft: "0.5rem",
                                      size: "small",
                                    }}
                                  >
                                    {column}
                                  </label>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <button
                      disabled={
                        selectedColumns.length === 0 || queryType === ""
                      }
                      onClick={handleCondition}
                      style={{
                        width: "100%",
                        padding: "0.5rem",
                        backgroundColor: "#0088cc",
                        color: "#fff",
                        border: "none",
                        borderRadius: "0.25rem",
                        alignSelf: "flex-end",
                      }}
                    >
                      Apply Where Condition
                    </button>
                    
                    <Dialog
                      open={openWhereDialog}
                      onClose={handleCloseWhereDialog}
                    >
                      <DialogTitle>Select a where condition</DialogTitle>
                      <DialogContent>
                        <Select
                          value={selectedWhereColumn}
                          onChange={handleWhereColumnChange}
                        >
                          {selectedColumns.map((column) => (
                            <MenuItem key={column} value={column}>
                              {column}
                            </MenuItem>
                          ))}
                        </Select>
                        <Select
                          value={selectedWhereOperator}
                          onChange={handleWhereOperatorChange}
                        >
                          {[">", "<", ">=", "<=", "="].map((operator) => (
                            <MenuItem key={operator} value={operator}>
                              {operator}
                            </MenuItem>
                          ))}
                        </Select>
                        <TextField
                          value={whereValue}
                          onChange={handleWhereValueChange}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCloseWhereDialog}>Cancel</Button>
                        <Button onClick={handleApplyWhereCondition}>
                          Apply
                        </Button>
                      </DialogActions>
                    </Dialog>
                   <br/>
                    <button
                      disabled={
                        
                        
                        selectedColumns.length === 0 || queryType === ""
                      }
                      onClick={handleQueryGenerate}
                      style={{
                        width: "100%",
                        padding: "0.5rem",
                        backgroundColor: "#0088cc",
                        color: "#fff",
                        border: "none",
                        borderRadius: "0.25rem",
                        alignSelf: "flex-end",
                      }}
                    >
                      Generate SQL Query
                    </button>
                    
                    
                  </div>
                )}
              </div>
            </div>
            {/* <Collapse>{renderTree()}</Collapse> */}
          </div>

          {/* div#2 */}
          <div className="col-md-8">
            <form onSubmit={handleSubmit} style={formStyle}>
              <textarea
                id="query"
                name="query"
                value={finalQuery}
                placeholder="Enter Your SQL Query "
                onChange={handleChange}
                style={inputStyle}
              />
              <div className="text-end w-100">
                <button type="submit" style={buttonStyle}>
                  Run Query
                </button>
                
                <div>
      <Button variant="primary" onClick={() => setShowModal(true)} style={{padding: "10px",
                marginRight:0,
                marginLeft:10,
  fontSize: "1rem",
  fontWeight: "bold",
  color: "white",
  backgroundColor: "blue",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  boxSizing: "border-box", marginTop:'-70px',marginBottom:'0px'}}>
        Save Query
      </Button>

      {showModal && (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Save your SQL Query</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formSid">
                <Form.Label>SId</Form.Label>
                <Form.Control
                  type="text"
                  //value={sid}
                  value={Studentid}
                  //onChange={(e) => setSid(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formAssignmentNumber">
                <Form.Label>Assignment Number</Form.Label>
                <Form.Control
                  type="text"
                  value={assignmentNumber}
                  //onChange={(e) => setAssignmentNumber(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formQuestionNumber">
        <Form.Label>Question Number</Form.Label>
        <Form.Control
          as="select"
          value={questionNumber}
          onChange={(e) => setQuestionNumber(e.target.value)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </Form.Control>
      </Form.Group>
      
              <Form.Group controlId="formDatabaseName">
                <Form.Label>Database Name</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedDatabase}
                  //onChange={(e) => setDatabaseName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formQueryDetails">
                <Form.Label>Query Details</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={finalQuery}
                 // onChange={(e) => setQueryDetails(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveQuery}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      )}
       {saveSuccess && <Notification message="Query Saved Successfully!" type="success" />}
 
    </div>
              </div>
            </form>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  padding: "0.5rem",
                  backgroundColor: activeTab === "result" ? "#eee" : "#fff",
                  borderRadius: "0.25rem",
                  cursor: "pointer",
                }}
                onClick={() => setActiveTab("result")}
              >
                <h3 style={{ fontFamily: "Pacifico", color: "#ff9900" }}>
                  <FontAwesomeIcon icon={faReceipt} className="me-2" />
                  Results
                </h3>
              </div>
              <div
                className="text-center"
                style={{
                  padding: "0.5rem",
                  backgroundColor: activeTab === "query" ? "#eee" : "#fff",
                  borderRadius: "1.00rem",
                  textAlign: "center",
                  justifyItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => setActiveTab("query")}
              >
                <h3 style={{ fontFamily: "Pacifico", color: "#ff9900" }}>
                  <FontAwesomeIcon icon={finalQuery} className="me-2" />
                  Sample
                </h3>
              </div>
              <div
                style={{
                  padding: "0.5rem",
                  backgroundColor: activeTab === "sample" ? "#eee" : "#fff",
                  borderRadius: "0.25rem",
                  cursor: "pointer",
                }}
                onClick={() => setActiveTab("sample")}
              >
                <h3 style={{ fontFamily: "Pacifico", color: "#ff9900" }}>
                  <FontAwesomeIcon icon={faKeyboard} className="me-2" />
                  KeyWords
                </h3>
              </div>
            </div>
            {results && results.length >= 0 ? (
              <div className="bg-white">
                {activeTab === "result" && results.length > 0 ? (
                  <div   style={{
                      backgroundColor: "#fff",
                      padding: "2rem",
                      borderRadius: "0.25rem",
                      boxShadow: "0 0.5rem 1rem rgba(0,0,0,0.15)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginTop: "1rem",
                      justifyContent: "space-between",
                      maxHeight: "13.5rem",
                      overflowY: "scroll",
                      width: "100%",
                    }}> 
                  <table style={tableStyle}>
                    <thead>
                      <tr>
                        {Object.keys(results[0]).map((key) => (
                          <th key={key}>{key}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((result, index) => (
                        <tr key={index}>
                          {Object.values(result).map((value, index) => (
                            <td key={index}>{value}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                ) : activeTab === "query" ? (
                  <div style={{ marginTop: "1rem" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "1rem",
                      }}
                    >
                      <button
                        onClick={() => setFinalQuery("SELECT * FROM Student")}
                        style={{ width: "10rem" }}
                      >
                        SELECT
                      </button>
                      <button
                        onClick={() =>
                          setFinalQuery(
                            "INSERT INTO table_name (column1, column2) VALUES (value1, value2)"
                          )
                        }
                        style={{ width: "10rem" }}
                      >
                        INSERT
                      </button>
                      <button
                        onClick={() =>
                          setFinalQuery(
                            "UPDATE table_name SET column1 = value1, column2 = value2 WHERE condition"
                          )
                        }
                        style={{ width: "10rem" }}
                      >
                        UPDATE
                      </button>
                      <button
                        onClick={() =>
                          setFinalQuery(
                            "DELETE FROM table_name WHERE condition"
                          )
                        }
                        style={{ width: "10rem" }}
                      >
                        DELETE
                      </button>
                      <button
                        onClick={() =>
                          setFinalQuery(
                            "SELECT * FROM table1 JOIN table2 ON table1.id = table2.table1_id"
                          )
                        }
                        style={{ width: "10rem" }}
                      >
                        JOIN
                      </button>

                      {/* Add more buttons for other query types here */}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "1rem",
                      }}
                    >
                      <button
                        onClick={() =>
                          setFinalQuery(
                            "SELECT DISTINCT column1, column2, ... From table_name;"
                          )
                        }
                        style={{ width: "10rem" }}
                      >
                        DISTINCT
                      </button>
                      <button
                        onClick={() =>
                          setFinalQuery(
                            "SELECT column1, column2, ...FROM table_name WHERE condition;"
                          )
                        }
                        style={{ width: "10rem" }}
                      >
                        WHERE
                      </button>
                      <button
                        onClick={() =>
                          setFinalQuery(
                            "SELECT column1, column2, ...FROM table_name WHERE condition1 AND condition2 AND condition3 ...;"
                          )
                        }
                        style={{ width: "10rem" }}
                      >
                        AND
                      </button>
                      <button
                        onClick={() =>
                          setFinalQuery(
                            "SELECT column1, column2, ...FROM table_name WHERE condition1 OR condition2 OR condition3 ...;"
                          )
                        }
                        style={{ width: "10rem" }}
                      >
                        OR
                      </button>
                      <button
                        onClick={() =>
                          setFinalQuery(
                            "SELECT column1, column2, ...FROM table_name WHERE NOT condition;"
                          )
                        }
                        style={{ width: "10rem" }}
                      >
                        NOT
                      </button>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "1rem",
                      }}
                    >
                      <button
                        onClick={() =>
                          setFinalQuery(
                            "SELECT column1, column2, ...FROM table_name ORDER BY column1, column2, ... ASC|DESC;"
                          )
                        }
                        style={{ width: "10rem" }}
                      >
                        ORDER BY{" "}
                      </button>
                      <button
                        onClick={() =>
                          setFinalQuery(
                            "SELECT TOP number|percent column_name(s) FROM table_name WHERE condition;"
                          )
                        }
                        style={{ width: "10rem" }}
                      >
                        TOP{" "}
                      </button>
                      <button
                        onClick={() =>
                          setFinalQuery(
                            "SELECT MIN(column_name) FROM table_name WHERE condition;"
                          )
                        }
                        style={{ width: "10rem" }}
                      >
                        MIN()
                      </button>
                      <button
                        onClick={() =>
                          setFinalQuery(
                            "SELECT MAX(column_name) FROM table_name WHERE condition;"
                          )
                        }
                        style={{ width: "10rem" }}
                      >
                        MAX()
                      </button>
                      <button
                        onClick={() =>
                          setFinalQuery(
                            "SELECT COUNT(column_name)FROM table_name WHERE condition;"
                          )
                        }
                        style={{ width: "10rem" }}
                      >
                        COUNT()
                      </button>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "1rem",
                      }}
                    >
                      <button
                        onClick={() =>
                          setFinalQuery(
                            "SELECT AVG(column_name)FROM table_name WHERE condition;"
                          )
                        }
                        style={{ width: "10rem" }}
                      >
                        AVG()
                      </button>
                      <button
                        onClick={() =>
                          setFinalQuery(
                            "SELECT SUM(column_name)FROM table_name WHERE condition;"
                          )
                        }
                        style={{ width: "10rem" }}
                      >
                        SUM()
                      </button>
                      <button
                        onClick={() =>
                          setFinalQuery(
                            "SELECT column1, column2, ...FROM table_name WHERE columnN LIKE pattern;"
                          )
                        }
                        style={{ width: "10rem" }}
                      >
                        LIKE
                      </button>
                      <button
                        onClick={() =>
                          setFinalQuery(
                            "SELECT column_name(s) FROM table_name WHERE column_name IN (value1, value2, ...);"
                          )
                        }
                        style={{ width: "10rem" }}
                      >
                        IN
                      </button>
                      <button
                        onClick={() =>
                          setFinalQuery(
                            "SELECT column_name(s) FROM table_name WHERE column_name BETWEEN value1 AND value2;"
                          )
                        }
                        style={{ width: "10rem" }}
                      >
                        BETWEEN
                      </button>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "1rem",
                      }}
                    >
                      <button
                        onClick={() =>
                          setFinalQuery(
                            "SELECT column_name(s) FROM table1 INNER JOIN table2 ON table1.column_name = table2.column_name;"
                          )
                        }
                        style={{ width: "10rem" }}
                      >
                        INNER JOIN
                      </button>
                      <button
                        onClick={() =>
                          setFinalQuery(
                            "SELECT column_name(s) FROM table1 LEFT JOIN table2 ON table1.column_name = table2.column_name;"
                          )
                        }
                        style={{ width: "10rem" }}
                      >
                        LEFT JOIN
                      </button>
                      <button
                        onClick={() =>
                          setFinalQuery(
                            "SELECT column_name(s) FROM table1 RIGHT JOIN table2 ON table1.column_name = table2.column_name;"
                          )
                        }
                        style={{ width: "10rem" }}
                      >
                        RIGHT JOIN
                      </button>
                      <button
                        onClick={() =>
                          setFinalQuery(
                            "SELECT column_name(s) FROM table1 FULL OUTER JOIN table2 ON table1.column_name = table2.column_name WHERE condition;"
                          )
                        }
                        style={{ width: "10rem" }}
                      >
                        FULL OUTER JOIN
                      </button>
                      <button
                        onClick={() =>
                          setFinalQuery(
                            "SELECT column_name(s) FROM table_name WHERE condition GROUP BY column_name(s) RDER BY column_name(s);"
                          )
                        }
                        style={{ width: "10rem" }}
                      >
                        GROUP BY
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ marginTop: "1rem" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "1rem",
                      }}
                    >
                      <button
                        onClick={() =>
                          setFinalQuery((prevQuery) => prevQuery + "Select")
                        }
                        style={{ width: "10rem" }}
                      >
                        Select
                      </button>
                      <button
                        onClick={() =>
                          setFinalQuery((prevQuery) => prevQuery + "*")
                        }
                        style={{ width: "10rem" }}
                      >
                        *
                      </button>
                      <button
                        onClick={() =>
                          setFinalQuery((prevQuery) => prevQuery + "From")
                        }
                        style={{ width: "10rem" }}
                      >
                        From
                      </button>
                      <button
                        onClick={() =>
                          setFinalQuery((prevQuery) => prevQuery + "Join")
                        }
                        style={{ width: "10rem" }}
                      >
                        Join
                      </button>
                      <button
                        onClick={() =>
                          setFinalQuery((prevQuery) => prevQuery + "Inset")
                        }
                        style={{ width: "10rem" }}
                      >
                        Insert
                      </button>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "1rem",
                      }}
                    >
                      <button
                        onClick={() =>
                          setFinalQuery((prevQuery) => prevQuery + "like")
                        }
                        style={{ width: "10rem" }}
                      >
                        like
                      </button>
                      <button
                        onClick={() =>
                          setFinalQuery((prevQuery) => prevQuery + "where")
                        }
                        style={{ width: "10rem" }}
                      >
                        where
                      </button>
                      <button
                        onClick={() =>
                          setFinalQuery((prevQuery) => prevQuery + "OR")
                        }
                        style={{ width: "10rem" }}
                      >
                        OR
                      </button>
                      <button
                        onClick={() =>
                          setFinalQuery((prevQuery) => prevQuery + "AND")
                        }
                        style={{ width: "10rem" }}
                      >
                        AND
                      </button>
                      <button
                        onClick={() =>
                          setFinalQuery((prevQuery) => prevQuery + "NOT")
                        }
                        style={{ width: "10rem" }}
                      >
                        NOT
                      </button>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "1rem",
                      }}
                    >
                      <button
                        onClick={() =>
                          setFinalQuery((prevQuery) => prevQuery + "ORDER BY")
                        }
                        style={{ width: "10rem" }}
                      >
                        ORDER BY
                      </button>
                      <button
                        onClick={() =>
                          setFinalQuery((prevQuery) => prevQuery + "UPDATE")
                        }
                        style={{ width: "10rem" }}
                      >
                        UPDATE
                      </button>
                      <button
                        onClick={() =>
                          setFinalQuery((prevQuery) => prevQuery + "DELETE")
                        }
                        style={{ width: "10rem" }}
                      >
                        DELETE
                      </button>
                      <button
                        onClick={() =>
                          setFinalQuery((prevQuery) => prevQuery + "MIN")
                        }
                        style={{ width: "10rem" }}
                      >
                        MIN
                      </button>
                      <button
                        onClick={() =>
                          setFinalQuery((prevQuery) => prevQuery + "MAX")
                        }
                        style={{ width: "10rem" }}
                      >
                        MAX
                      </button>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "1rem",
                      }}
                    >
                      <button
                        onClick={() =>
                          setFinalQuery((prevQuery) => prevQuery + "VALUES")
                        }
                        style={{ width: "10rem" }}
                      >
                        VALUES
                      </button>
                      <button
                        onClick={() =>
                          setFinalQuery((prevQuery) => prevQuery + "SET")
                        }
                        style={{ width: "10rem" }}
                      >
                        SET
                      </button>
                      <button
                        onClick={() =>
                          setFinalQuery((prevQuery) => prevQuery + "SELECT DISTINCT")
                        }
                        style={{ width: "10rem" }}
                      >
                        SELECT DISTINCT
                      </button>
                      <button
                        onClick={() =>
                          setFinalQuery((prevQuery) => prevQuery + "IS NULL")
                        }
                        style={{ width: "10rem" }}
                      >
                        IS NULL
                      </button>
                      <button
                        onClick={() =>
                          setFinalQuery((prevQuery) => prevQuery + "HAVING")
                        }
                        style={{ width: "10rem" }}
                      >
                        HAVING
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-center fw-bold fs-4 my-5">No Results Found</p>
            )}
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

const tableStyle = {
  borderCollapse: "collapse",
  margin: "20px 0",
  fontSize: "1rem",
  width: "100%",
  textAlign: "left",
  border: "1px solid #ddd",
};

const thStyle = {
  padding: "8px",
  fontWeight: "bold",
  backgroundColor: "#f2f2f2",
  borderBottom: "1px solid #ddd",
};

const tdStyle = {
  padding: "8px",
  borderBottom: "1px solid #ddd",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "20px 0",
};

const labelStyle = {
  fontWeight: "bold",
  fontSize: "1rem",
  marginBottom: "10px",
  textAlign: "center",
};

const inputStyle = {
  padding: "10px",
  fontSize: "1rem",
  borderRadius: "5px",
  border: "1px",
  boxShadow: "0px 2px 5px rgba(0,0,0,0.3)",
  margin: "10px 0",
  width: "100%",
  height: "221px",
  boxSizing: "border-box",
};

const buttonStyle = {
  padding: "10px",
  fontSize: "rem",
  fontWeight: "bold",
  color: "white",
  backgroundColor: "blue",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  boxSizing: "border-box",
  marginRight:'150px'
};
