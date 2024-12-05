import React from "react";

const PredictionTable = ({ data, predictions }) => {
  return (
    <table className="table table-bordered mt-3">
      <thead>
        <tr>
          <th>Course Code</th>
          <th>Predicted Enrollment</th>
          <th>Predicted Sections</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.courseCode}</td>
            <td>{Math.round(predictions[index] * 30)}</td>
            <td>{predictions[index]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PredictionTable;
