import React, { useState } from "react";
import InputForm from "./Components/InputForm";
import TrainModelButton from "./Components/TrainModelButton";
import PredictionTable from "./Components/PredictionTable";
import ChartVisualization from "./Components/ChartVisualization";
import './App.css'; // Import new CSS styles

const App = () => {
  const [data, setData] = useState([]);
  const [maxStudents, setMaxStudents] = useState(30);
  const [predictions, setPredictions] = useState([]);

  return (
    <div className="container">
      <h1>Course Section Forecasting</h1>
      
      {/* Input Form Section */}
      <div className="form-container">
        <InputForm onDataSubmit={(d, m) => { setData(d); setMaxStudents(m); }} />
      </div>

      {/* Model Training and Prediction Section */}
      {data.length > 0 && (
        <>
          <TrainModelButton
            data={data}
            maxStudents={maxStudents}
            onModelTrained={setPredictions}
          />
          {predictions.length > 0 && (
            <>
              {/* Prediction Table */}
              <div className="table-container">
                <PredictionTable data={data} predictions={predictions} />
              </div>

              {/* Chart Visualization */}
              <div className="chart-container">
                <ChartVisualization data={data} predictions={predictions} />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default App;
