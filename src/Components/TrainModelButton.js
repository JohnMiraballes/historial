import React from "react";
import * as tf from "@tensorflow/tfjs";

const TrainModelButton = ({ data, maxStudents, onModelTrained }) => {
  const trainModel = async () => {
    const inputX = data.map((d, i) => [i]); // Simple index as input
    const outputY = data.map((d) => d.totalStudents);

    const model = tf.sequential();
    model.add(tf.layers.dense({ inputShape: [1], units: 1 }));

    model.compile({ optimizer: "sgd", loss: "meanSquaredError" });

    const xs = tf.tensor2d(inputX);
    const ys = tf.tensor2d(outputY, [outputY.length, 1]);

    await model.fit(xs, ys, { epochs: 500 });

    const predictions = data.map((_, i) => {
      const predicted = model.predict(tf.tensor2d([[i]])).dataSync()[0];
      return Math.round(predicted / maxStudents);
    });

    onModelTrained(predictions);
  };

  return <button onClick={trainModel} className="btn btn-success">Train Model</button>;
};

export default TrainModelButton;
