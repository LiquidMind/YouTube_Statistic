// // MyLineChart.js
// import React from 'react';
// import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Label } from 'recharts';

// const MyLineChart = ({ data }) => {
//   return (
//     <LineChart width={800} height={400} data={data}>
//       <Line type="monotone" dataKey="value" stroke="#8884d8" label={{ position: 'top', fontSize: 14 }} />
//       <CartesianGrid stroke="#ccc" />
//       <XAxis dataKey="iteration" />
//       <YAxis />
//       <Tooltip />
//     </LineChart>
//   );
// };

// export default MyLineChart;
import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const MyLineChart = ({ data }) => {
  return (
    <LineChart width={800} height={400} data={data}>
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="iteration" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};

export default MyLineChart;
