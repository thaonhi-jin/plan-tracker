import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function Chart() {
  const data = [
    {
      weekday: "Monday",
      "Not Completed": 4,
      Completed: 4,
    },
    {
      weekday: "Tuesday",
      "Not Completed": 3,
      Completed: 2,
    },
    {
      weekday: "Wednesday",
      "Not Completed": 2,
      Completed: 2,
    },
    {
      weekday: "Thursday",
      "Not Completed": 2,
      Completed: 3,
    },
    {
      weekday: "Friday",
      "Not Completed": 1,
      Completed: 4,
    },
    {
      weekday: "Saturday",
      "Not Completed": 3,
      Completed: 3,
    },
    {
      weekday: "Sunday",
      "Not Completed": 2,
      Completed: 2,
    },
  ];
  return (
    <LineChart
      width={800}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="weekday" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="Completed"
        stroke="#82ca9d"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="Not Completed" stroke="#f28b88" />
    </LineChart>
  );
}

export default Chart;
