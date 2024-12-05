import React, { useState } from "react";
import Papa from "papaparse"; // Install this library: npm install papaparse

const InputForm = ({ onDataSubmit }) => {
  const [data, setData] = useState([]);
  const [maxStudents, setMaxStudents] = useState(30);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const csvData = result.data.map((row) => ({
            semester: row["Semester"] || "",
            courseCode: row["Course Code"] || "",
            totalStudents: parseInt(row["Total Students"], 10) || 0,
          }));
          setData(csvData);
        },
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onDataSubmit(data, maxStudents);
  };

  return (
    <form onSubmit={handleSubmit} className="p-3">
      <h4>Input Historical Enrollment Data</h4>
      <input type="file" accept=".csv" onChange={handleFileUpload} className="mb-3" />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Semester</th>
            <th>Course Code</th>
            <th>Total Students</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={row.semester}
                  onChange={(e) =>
                    setData((prevData) => {
                      const newData = [...prevData];
                      newData[index].semester = e.target.value;
                      return newData;
                    })
                  }
                  className="form-control"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.courseCode}
                  onChange={(e) =>
                    setData((prevData) => {
                      const newData = [...prevData];
                      newData[index].courseCode = e.target.value;
                      return newData;
                    })
                  }
                  className="form-control"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.totalStudents}
                  onChange={(e) =>
                    setData((prevData) => {
                      const newData = [...prevData];
                      newData[index].totalStudents = e.target.value;
                      return newData;
                    })
                  }
                  className="form-control"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mb-3">
        <label>Max Students Per Section:</label>
        <input
          type="number"
          value={maxStudents}
          onChange={(e) => setMaxStudents(parseInt(e.target.value, 10))}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default InputForm;
