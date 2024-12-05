import React, { useState } from "react";

const InputForm = ({ onDataSubmit }) => {
  const [data, setData] = useState([
    { semester: "2022-2", courseCode: "ITE102", totalStudents: 90 },
    { semester: "2023-1", courseCode: "CCS101", totalStudents: 90 },
    { semester: "2023-4", courseCode: "ITE102", totalStudents: 120 },
    { semester: "2024-1", courseCode: "CCS101", totalStudents: 100 },
  ]);
  const [maxStudents, setMaxStudents] = useState(30);

  const handleSubmit = (e) => {
    e.preventDefault();
    onDataSubmit(data, maxStudents);
  };

  return (
    <form onSubmit={handleSubmit} className="p-3">
      <h4>Input Historical Enrollment Data</h4>
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
              <td>{row.semester}</td>
              <td>{row.courseCode}</td>
              <td>{row.totalStudents}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mb-3">
        <label>Max Students Per Section:</label>
        <input
          type="number"
          value={maxStudents}
          onChange={(e) => setMaxStudents(e.target.value)}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default InputForm;
