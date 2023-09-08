import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ data }) => {
  const chartData = {
    labels: data.map((_, index) => `Iteration ${index + 1}`),
    datasets: [
      {
        label: 'Number of Lines',
        data,
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default LineChart;
