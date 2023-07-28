import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import moment from "moment";
import { useSelector } from "react-redux";

function Chart() {
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const allTasks = useSelector((state) => state.cache.allTasks);
  const uncompletedTasks = allTasks.filter(
    (task) => !task.attributes.isCompleted
  );
  const completedTasks = allTasks.filter((task) => task.attributes.isCompleted);

  const checkTaskInDay = (start, date, end) => {
    let startDate = new Date(start);
    let endDate = new Date(end);
    let date1 = new Date(date);
    if (startDate <= date1 && date1 <= endDate) return true;
    return false;
  };
  const taskCountByDate = (tasks, date) => {
    if (tasks.length === 0) return 0;
    let count = 0;
    tasks.forEach((task) => {
      if (
        checkTaskInDay(task.attributes.startDate, date, task.attributes.endDate)
      )
        count++;
    });
    return count;
  };

  const dataAggregation = () => {
    let date = moment().startOf("week");
    let data = weekdays.map((weekday) => {
      date = date.add(1, "days");
      return {
        weekday: weekday,
        Uncompleted: taskCountByDate(
          uncompletedTasks,
          date.format("YYYY-MM-DD")
        ),
        Completed: taskCountByDate(completedTasks, date.format("YYYY-MM-DD")),
      };
    });
    console.log(data);
    return data;
  };
  return (
    <BarChart width={730} height={250} data={dataAggregation()}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="weekday" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Completed" fill="#82ca9d" radius={8} />
      <Bar dataKey="Uncompleted" fill="#f28b88" radius={8} />
    </BarChart>
  );
}

export default Chart;
