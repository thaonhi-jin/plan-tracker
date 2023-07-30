import React, { useState, useEffect } from "react";
import "./styles/dashboard.css";
import {
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
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import TimelineIcon from "@mui/icons-material/Timeline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import TodayIcon from "@mui/icons-material/Today";
import { ProjectsCount } from "../../redux/methods";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { updateAllTasks } from "../../redux/cacheSlice";
import moment from "moment";

function Dashboard() {
  const projectStatus = ["Completed", "In Progress", "It's overdue"];
  const infoProjects = useSelector((state) => state.cache.infoProjects);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const today = moment().format("ddd MMMM Do, YYYY");
  const currTime = moment().hour();

  // console.log("DB1");
  // console.log(infoProjects);

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
            Hi, welcome back to{" "}
            <span style={{ color: "#0DA2FF", fontWeight: "600" }}>
              Plan Tracker
            </span>{" "}
            <WavingHandIcon fontSize="small" sx={{ color: "#73C2FB" }} />
          </WelcomeTypo>
          <HeaderTypo variant="h4" component="div">
            Your Dashboard Today
          </HeaderTypo>
        </Box>

        <DateBox>
          <Chip
            sx={{ color: "#01058A", padding: "5px", fontWeight: "600" }}
            icon={<TodayIcon fontSize="medium" />}
            label={today}
            variant="outlined"
          />
          {currTime >= 6 && currTime < 18 ? (
            <LightModeIcon fontSize="large" sx={{ color: "#73C2FB" }} />
          ) : (
            <DarkModeIcon fontSize="medium" sx={{ color: "#73C2FB" }} />
          )}
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
                      <CheckCircleOutlineIcon
                        sx={{ color: "#3DD598" }}
                        fontSize="large"
                      />
                    ) : index === 1 ? (
                      <TimelineIcon
                        sx={{ color: "#1AA8E9" }}
                        fontSize="large"
                      />
                    ) : (
                      <WarningAmberIcon
                        sx={{ color: "#FC5A5A" }}
                        fontSize="large"
                      />
                    )}
                  </WidgetIcon>
                </WidgetContent>
              </Widget>
            ))}
          </div>

          <div className="chart">
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
