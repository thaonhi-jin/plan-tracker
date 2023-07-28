import React, { useState, useEffect } from "react";
import "./styles/dashboard.css";
import {
  ChartTitle,
  DateBox,
  HeaderTypo,
  WelcomeTypo,
  Widget,
  WidgetContent,
  WidgetIcon,
  WidgetNumber,
} from "./styles/dashboardStyles";
import Chart from "./Chart";
import Notification from "./Notification";
import TaskList from "./TaskList";
import { Box, Chip, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TimelineIcon from "@mui/icons-material/Timeline";
import ReportIcon from "@mui/icons-material/Report";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import TodayIcon from "@mui/icons-material/Today";
import { ProjectsCount } from "../../redux/methods";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { updateAllTasks } from "../../redux/cacheSlice";

function Dashboard() {
  const projectStatus = ["Completed", "In Progress", "It's overdue"];
  const infoProjects = useSelector((state) => state.cache.infoProjects);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  console.log("DB1");
  console.log(infoProjects);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:1337/api/tasks?populate[0]=project")
      .then((res) => {
        dispatch(updateAllTasks(res.data.data));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="header">
        <Box>
          <WelcomeTypo color="text.secondary">
            Hi, welcome back to Plan Tracker{" "}
            <WavingHandIcon fontSize="small" sx={{ color: "#73C2FB" }} />
          </WelcomeTypo>
          <HeaderTypo variant="h4" component="div">
            Your Dashboard Today
          </HeaderTypo>
        </Box>

        <DateBox>
          <Chip
            sx={{ color: "#73C2FB", padding: "5px" }}
            icon={<TodayIcon fontSize="medium" />}
            label="Wed 26 July, 2023"
            variant="outlined"
          />
          <SentimentVerySatisfiedIcon
            fontSize="large"
            sx={{ color: "#73C2FB" }}
          />
        </DateBox>
      </div>

      <div className="overview">
        <div className="features">
          <div className="widgets">
            {projectStatus.map((status, index) => (
              <Widget key={index}>
                <WidgetContent>
                  <Box sx={{ flexGrow: 4 }}>
                    <Typography variant="body2">
                      {index === 0
                        ? "Completed Project"
                        : index === 1
                        ? "Ongoing Project"
                        : "Overdue Project"}
                    </Typography>
                    <WidgetNumber variant="h4" component="div">
                      {ProjectsCount(infoProjects, status)}
                    </WidgetNumber>
                  </Box>
                  <WidgetIcon>
                    {index === 0 ? (
                      <CheckCircleIcon color="success" fontSize="large" />
                    ) : index === 1 ? (
                      <TimelineIcon color="primary" fontSize="large" />
                    ) : (
                      <ReportIcon color="error" fontSize="large" />
                    )}
                  </WidgetIcon>
                </WidgetContent>
              </Widget>
            ))}
          </div>

          <div className="chart">
            <ChartTitle>Number of completed tasks in this week</ChartTitle>

            <Chart />
          </div>
        </div>
        <div className="notification">
          <Notification />
        </div>
      </div>

      {/* Task List */}
      <TaskList />
    </div>
  );
}

export default Dashboard;
