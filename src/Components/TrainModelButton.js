import React from "react";
import * as tf from "@tensorflow/tfjs";

const TrainModelButton = ({ data, maxStudents, onModelTrained }) => {
  const trainModel = async () => {
    // Filter out rows with missing or invalid data
    const validData = data.filter((row) => row.totalStudents && row.semester && row.courseCode);

    // Prepare the data for training
    const inputX = validData.map((d) => [d.totalStudents]); // Use 'totalStudents' as feature
    const outputY = validData.map((d) => d.totalStudents); // Predict 'totalStudents'

    // Ensure there is data to train on
    if (inputX.length === 0 || outputY.length === 0) {
      console.error("No valid data available for training.");
      return;
    }

    // Create a simple neural network model
    const model = tf.sequential();
    model.add(tf.layers.dense({ inputShape: [1], units: 10, activation: "relu" })); // 10 units, relu activation
    model.add(tf.layers.dense({ units: 1 })); // Output layer

    model.compile({ optimizer: "adam", loss: "meanSquaredError" });

    // Convert data into tensors
    const xs = tf.tensor2d(inputX);
    const ys = tf.tensor2d(outputY, [outputY.length, 1]);

    // Train the model
    await model.fit(xs, ys, { epochs: 1000, batchSize: 32 });

    // Make predictions after training
    const predictions = validData.map((d) => {
      const predicted = model.predict(tf.tensor2d([[d.totalStudents]])).dataSync()[0];
      return Math.round(predicted / maxStudents); // Dividing by maxStudents for prediction
    });

    // Update the parent component with the predictions
    onModelTrained(predictions);
  };

  return <button onClick={trainModel} className="btn btn-success">Train Model</button>;
};

export default TrainModelButton;
