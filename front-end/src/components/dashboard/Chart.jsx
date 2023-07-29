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
import { ChartCard, ChartTitle } from "./styles/dashboardStyles";

function Chart() {
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
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
    <ChartCard>
      <ChartTitle>Number of tasks in this week</ChartTitle>
      <BarChart width={700} height={250} data={dataAggregation()} barGap={10}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="weekday" tickLine={false} />
        <YAxis domain={[0, "dataMax + 2"]} axisLine={false} tickLine={false} />
        <Tooltip cursor={{ fill: "transparent" }} />
        <Legend
          verticalAlign="top"
          align="right"
          height={40}
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: "13px" }}
        />
        <Bar
          dataKey="Completed"
          fill="#01058A"
          radius={[2, 2, 0, 0]}
          barSize={20}
        ></Bar>
        <Bar
          dataKey="Uncompleted"
          fill="#1AA8E9"
          radius={[2, 2, 0, 0]}
          barSize={20}
        />
      </BarChart>
    </ChartCard>
  );
}

export default Chart;
