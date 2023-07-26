import React from "react";
import "./dashboard.css";
import Chart from "./Chart";
import Notification from "./Notification";
import TaskList from "./TaskList";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import TodayIcon from "@mui/icons-material/Today";

function Dashboard() {
  return (
    <div>
      <div className="header">
        <Box>
          <Typography sx={{ fontSize: 18 }} color="text.secondary">
            Hi, welcome back to Plan Tracker{" "}
            <WavingHandIcon fontSize="small" sx={{ color: "#73C2FB" }} />
          </Typography>
          <Typography
            variant="h4"
            component="div"
            sx={{
              // textAlign: "center",
              fontWeight: "700",
              fontSize: "32px",
              color: "#000",
              marginBottom: "10px",
            }}
          >
            Your Dashboard Today
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginRight: "100px",
            gap: "15px",
          }}
        >
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
        </Box>
      </div>
      <div className="overview">
        <div className="features">
          <div className="widgets">
            <Card
              sx={{
                maxWidth: 200,
                flex: 1,
                margin: "0px 20px",
                padding: "10px",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  gap: "15px",
                  ":last-child": { padding: "10px" },
                }}
              >
                <Box sx={{ flexGrow: 4 }}>
                  <Typography variant="body2">Completed Projects</Typography>
                  <Typography
                    variant="h4"
                    component="div"
                    marginLeft="5px"
                    fontSize="32px"
                  >
                    5
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "5px",
                    flexGrow: 1,
                  }}
                >
                  <CheckCircleIcon color="success" />
                </Box>
              </CardContent>
            </Card>

            <Card
              sx={{
                maxWidth: 200,
                flex: 1,
                margin: "0px 20px",
                padding: "10px",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  gap: "15px",
                  ":last-child": { padding: "10px" },
                }}
              >
                <Box sx={{ flexGrow: 4 }}>
                  <Typography variant="body2">Completed Projects</Typography>
                  <Typography
                    variant="h4"
                    component="div"
                    marginLeft="5px"
                    fontSize="32px"
                  >
                    5
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "5px",
                    flexGrow: 1,
                  }}
                >
                  <CheckCircleIcon color="success" />
                </Box>
              </CardContent>
            </Card>

            <Card
              sx={{
                maxWidth: 200,
                flex: 1,
                margin: "0px 20px",
                padding: "10px",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  gap: "15px",
                  ":last-child": { padding: "10px" },
                }}
              >
                <Box sx={{ flexGrow: 4 }}>
                  <Typography variant="body2">Completed Projects</Typography>
                  <Typography
                    variant="h4"
                    component="div"
                    marginLeft="5px"
                    fontSize="32px"
                  >
                    5
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "5px",
                    flexGrow: 1,
                  }}
                >
                  <CheckCircleIcon color="success" />
                </Box>
              </CardContent>
            </Card>
          </div>

          <div className="chart">
            <Typography sx={{ textAlign: "center", marginBottom: "15px" }}>
              Number of completed tasks in this week
            </Typography>
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
