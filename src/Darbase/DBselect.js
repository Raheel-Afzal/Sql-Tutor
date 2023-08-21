
import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
function App() {
  const [databases, setDatabases] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState(null);
  const [tables, setTables] = useState([]);
  const [selectedTables, setSelectedTables] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [finalQuery, setFinalQuery] = useState('');
  const [queryType, setQueryType] = useState('');
  
const [selectedTableColumns, setSelectedTableColumns] = useState({});

  useEffect(() => {
    // Get the list of databases
    axios.get('http://localhost/FYPAPI/api/Teacher/GetDatabaseList')
      .then(response => setDatabases(response.data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (selectedDatabase) {
      // Get the list of tables for the selected database
      axios.get(`http://localhost/FYPAPI/api/Teacher/GetTableColumns?databaseName=${selectedDatabase}`)
        .then(response => {
          const tables = response.data.map(tableInfo => tableInfo.TableName);
          setTables(tables);
          setSelectedTables([]);
          setColumns([]);
          setSelectedColumns([]);
        })
        .catch(error => console.error(error));

      // Get the list of columns for the selected database
      axios.get(`http://localhost/FYPAPI/api/Teacher/GetColumnsList?databaseName=${selectedDatabase}`)
        .then(response => setColumns(response.data))
        .catch(error => console.error(error));
    }
  }, [selectedDatabase]);

  const handleDatabaseSelect = (event) => {
    const databaseName = event.target.value;
    setSelectedDatabase(databaseName);
  };

  const handleTableSelect = (event) => {
    const tableName = event.target.value;

    // Get the list of columns for the selected table in the selected database
    axios.get(`http://localhost/FYPAPI/api/Teacher/GetTableColumns?databaseName=${selectedDatabase}&tableName=${tableName}`)
      .then(response => {
        const columns = response.data[0].ColumnNames;
        setColumns(columns);
        setSelectedColumns([]);
      })
      .catch(error => console.error(error));
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
    axios.get(`http://localhost/FYPAPI/api/Teacher/GetTableColumns?databaseName=${selectedDatabase}&tableNames=${updatedTables.join(',')}`)
      .then((response) => {
        const columnsByTable = {};
        response.data.forEach((table) => {
          columnsByTable[table.TableName] = table.ColumnNames;
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
  
  const handleQueryGenerate = () => {
    // Create the initial SELECT and FROM clauses
    let selectClause = '';
    let fromClause = '';
  
    // If there is only one table, no need for joins
    if (selectedTables.length === 1) {
      selectClause = selectedColumns.map((column) => `${selectedTables[0]}.${column}`).join(', ');
      fromClause = selectedTables[0];
    } else {
      // Create the JOIN clause
      let joinClause = '';
      let selectTables = [];
      for (let i = 0; i < selectedTables.length; i++) {
        joinClause += `${selectedTables[i]} `;
       // selectTables.push(`${selectedTables[i]}.${columnName}`);
        if (i < selectedTables.length - 1) {
          joinClause += `JOIN `;
        }
      }
      joinClause += `ON `;
      for (let i = 0; i < selectedTables.length - 1; i++) {
       // joinClause += `${selectedTables[i]}.${columnName} = ${selectedTables[i + 1]}.${columnName} `;
      }
  
      // Create the SELECT and FROM clauses
      selectClause = selectTables.join(', ');
      fromClause = `${selectedTables[0]} ${joinClause}`;
    }
  
    // Create the WHERE clause
    let whereClause = '';
    if (selectedColumns.length > 0) {
      const whereCondition = prompt('Enter where condition (leave empty for no condition)');
      if (whereCondition) {
        whereClause = `WHERE ${whereCondition}`;
      }
    }
  
    // Create the ORDER BY clause
    let orderByClause = '';
    if (selectedColumns.length > 0) {
      orderByClause = `ORDER BY ${selectedTables[0]}.${selectedColumns[0]}`;
    }
  
    // Combine the clauses to form the final query
    let finalQuery = '';
    if (queryType === 'SELECT') {
      finalQuery = `SELECT ${selectClause} FROM ${fromClause} ${whereClause} ${orderByClause}`;
    } else if (queryType === 'INSERT') {
      let columnClause = selectedColumns.join(', ');
      let valueClause = selectedColumns.map(() => '?').join(', ');
      finalQuery = `INSERT INTO ${fromClause} (${columnClause}) VALUES (${valueClause}) ${whereClause}`;
    } else if (queryType === 'UPDATE') {
      let setClause = selectedColumns.map((column) => `${column} = ?`).join(', ');
      finalQuery = `UPDATE ${fromClause} SET ${setClause} ${whereClause}`;
    } else if (queryType === 'DELETE') {
      finalQuery = `DELETE FROM ${fromClause} ${whereClause}`;
    }
    setFinalQuery(finalQuery);
  };
  
  const handleNextButtonClick = () => {
    alert(`Selected database: ${selectedDatabase}\nSelected tables: ${selectedTables.join(', ')}\nSelected columns: ${selectedColumns.join(',')}\nSQL Query: ${finalQuery}`);
  };
  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.25)' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Database Query Builder</h1>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          {!selectedDatabase &&
            <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '0.25rem', boxShadow: '0 0.5rem 1rem rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h1 style={{ marginBottom: '1rem' }}>Select a database</h1>
              <select id="databaseSelect" onChange={handleDatabaseSelect} style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '0.25rem' }}>
                <option value="">Select a database</option>
                {databases.map(database => <option key={database} value={database}>{database}</option>)}
              </select>
              <button disabled={!selectedDatabase} style={{ width: '100%', padding: '0.5rem', backgroundColor: '#0088cc', color: '#fff', border: 'none', borderRadius: '0.25rem' }}>Next</button>
            </div>
          }
  
          {selectedDatabase && !selectedTables.length &&
            <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '0.25rem', boxShadow: '0 0.5rem 1rem rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h1 style={{ marginBottom: '1rem' }}>Select tables</h1>
              <select id="tableSelect" onChange={handleTableSelect} style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '0.25rem' }}>
                <option value="">Select a table</option>
                {tables.map(table => <option key={table} value={table}>{table}</option>)}
              </select>
              <div style={{ width: '100%', marginBottom: '1rem' }}>
                {tables.map(table => <div key={table} style={{ display: 'flex', alignItems: 'center' }}>
                  <input type="checkbox" name={`table_${table}`} value={table} onChange={handleTableCheckboxChange} />
                  <label style={{ marginLeft: '0.5rem' }}>{table}</label>
                </div>)}
              </div>
              <button disabled={selectedTables.length === 0} style={{ width: '100%', padding: '0.5rem', backgroundColor: '#0088cc', color: '#fff', border: 'none', borderRadius: '0.25rem' }}>Next</button>
            </div>
          }
  
          {selectedDatabase && selectedTables.length > 0 && !finalQuery &&
            <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '0.25rem', boxShadow: '0 0.5rem 1rem rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h1 style={{ marginBottom: '1rem' }}>Select columns</h1>
              <p style={{ marginBottom: '1rem' }}>{selectedTables.join(', ')}</p>
              {Object.keys(selectedTableColumns).map((tableName) => <div key={tableName} style={{ width: '100%', marginBottom: '1rem' }}>
                {selectedTableColumns[tableName].map(columnName => <div key={columnName} style={{ display: 'flex', alignItems: 'center' }}>
                  <input type="checkbox" name={`column_${columnName}`} value={columnName} onChange={handleColumnCheckboxChange} />
                  <label style={{ marginLeft: '0.5rem' }}>{columnName}</label>
                </div>)}
              </div>)}
              <select id="queryTypeSelect" onChange={handleQueryTypeChange} style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '0.25rem' }}>
                <option value="">Select query type</option>
                <option value="SELECT">SELECT</option>
                <option value="INSERT">INSERT</option>
                <option value="UPDATE">UPDATE</option>
                <option value="DELETE">DELETE</option>
              </select>
              <button disabled={selectedColumns.length === 0 || queryType === ''} onClick={handleQueryGenerate} style={{ width: '100%', padding: '0.5rem', backgroundColor: '#0088cc', color: '#fff', border: 'none', borderRadius: '0.25rem' }}>Generate SQL Query</button>
            </div>
          }
  
          {selectedDatabase && selectedTables.length > 0 && finalQuery &&
            <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '0.25rem', boxShadow: '0 0.5rem 1rem rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h1 style={{ marginBottom: '1rem' }}>Generated SQL Query</h1>
              <div style={{ backgroundColor: '#f8f8f8', padding: '1rem', borderRadius: '0.25rem' }}>{finalQuery}</div>
              <button onClick={handleNextButtonClick} style={{ width: '100%', padding: '0.5rem', backgroundColor: '#0088cc', color: '#fff', border: 'none', borderRadius: '0.25rem' }}>Next</button>
              {/* <Link to="/treeview" className="btn btn-primary">
        Run Query
      </Link> */}
      <Link to={`/treeview?query=${finalQuery}`} className="btn btn-primary">
  Run Query
</Link>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;