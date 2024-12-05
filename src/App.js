import React, { useState } from "react";
import InputForm from "./Components/InputForm";
import TrainModelButton from "./Components/TrainModelButton";
import PredictionTable from "./Components/PredictionTable";
import ChartVisualization from "./Components/ChartVisualization";


const App = () => {
  const [data, setData] = useState([]);
  const [maxStudents, setMaxStudents] = useState(30);
  const [predictions, setPredictions] = useState([]);

  return (
    <div className="container mt-3">
      <h1>Course Section Forecasting</h1>
      <InputForm onDataSubmit={(d, m) => { setData(d); setMaxStudents(m); }} />
      {data.length > 0 && (
        <>
          <TrainModelButton
            data={data}
            maxStudents={maxStudents}
            onModelTrained={setPredictions}
          />
          {predictions.length > 0 && (
            <>
              <PredictionTable data={data} predictions={predictions} />
              <ChartVisualization data={data} predictions={predictions} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default App;
