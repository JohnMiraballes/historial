import React from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(...registerables);

const ChartVisualization = ({ data, predictions }) => {
  const chartData = {
    labels: data.map((d) => d.courseCode), // Course codes as labels
    datasets: [
      {
        label: "Predicted Enrollment",
        data: predictions.map((p) => p), // Predicted enrollment values
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Blue bars
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Predicted Sections",
        data: predictions.map((p) => Math.ceil(p / 30)), // Predicted sections (e.g., Enrollment / Max Students)
        backgroundColor: "rgba(255, 99, 132, 0.6)", // Red bars
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Course Code",
        },
      },
      y: {
        title: {
          display: true,
          text: "Values",
        },
        beginAtZero: true, // Start y-axis at 0
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default ChartVisualization;
