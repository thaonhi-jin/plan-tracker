import React from "react";
import "./dashboard.css";
import {
  Card,
  Box,
  Typography,
  Checkbox,
  Stack,
  Paper,
  IconButton,
} from "@mui/material";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";

function TaskList() {
  return (
    <div className="task-lists">
      {/* Past - Not Completed */}
      <Card sx={{ width: "350px", height: "420px" }}>
        <Box>
          <Typography
            variant="h6"
            component="div"
            sx={{
              textAlign: "center",
              fontWeight: "700",
              fontSize: "22px",
              color: "#000",
              marginTop: "15px",
            }}
          >
            Past
          </Typography>
          <Typography
            sx={{ fontSize: 15, textAlign: "center" }}
            color="text.secondary"
          >
            You haven't done 5 tasks yet
          </Typography>
        </Box>

        <Stack sx={{ width: "100%" }}>
          <Paper
            // variant="outlined"
            elevation={1}
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "20px 10px",
              margin: "10px 20px",
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Checkbox color="success" />
            </Box>
            <Box sx={{ flexGrow: 15 }}>
              <Typography sx={{ fontSize: 16, marginBottom: "5px" }}>
                Task 0
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "red",
                  gap: "3px",
                }}
              >
                <ErrorOutlineIcon fontSize="small" />
                <Typography sx={{ fontSize: 12 }}>1 day ago</Typography>
              </Box>
            </Box>
            <IconButton>
              <UpdateIcon />
            </IconButton>

            <IconButton>
              <DeleteForeverIcon />
            </IconButton>
          </Paper>

          <Paper
            // variant="outlined"
            elevation={1}
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "20px 10px",
              margin: "10px 20px",
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Checkbox color="success" />
            </Box>
            <Box sx={{ flexGrow: 15 }}>
              <Typography sx={{ fontSize: 16, marginBottom: "5px" }}>
                Task 0
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "red",
                  gap: "3px",
                }}
              >
                <ErrorOutlineIcon fontSize="small" />
                <Typography sx={{ fontSize: 12 }}>1 day ago</Typography>
              </Box>
            </Box>
            <IconButton>
              <UpdateIcon />
            </IconButton>

            <IconButton>
              <DeleteForeverIcon />
            </IconButton>
          </Paper>
        </Stack>
      </Card>

      {/* Today */}
      <Card sx={{ width: "350px", height: "420px" }}>
        <Box>
          <Typography
            variant="h6"
            component="div"
            sx={{
              textAlign: "center",
              fontWeight: "700",
              fontSize: "22px",
              color: "#000",
              marginTop: "15px",
            }}
          >
            Today
          </Typography>
          <Typography
            sx={{ fontSize: 15, textAlign: "center" }}
            color="text.secondary"
          >
            You have 5 tasks for today
          </Typography>
        </Box>

        <Timeline sx={{ margin: "10px 25px" }}>
          <TimelineItem sx={{ "&::before": { content: "none" } }}>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ display: "flex" }}>
              <Box sx={{ flexGrow: 10 }}>
                <Typography sx={{ fontSize: 16 }}>Task 1</Typography>
                <Typography sx={{ fontSize: 12 }} color="text.secondary">
                  End Date: 20 July, 2023
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#ffbf00",
                  }}
                >
                  <TimelapseIcon fontSize="small" />
                  <Typography sx={{ fontSize: 12 }}>1 day left</Typography>
                </Box>
              </Box>
              <Box sx={{ flexGrow: 1, textAlign: "center" }}>
                <Checkbox color="success" />
              </Box>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem sx={{ "&::before": { content: "none" } }}>
            <TimelineSeparator>
              <TimelineDot />
            </TimelineSeparator>
            <TimelineContent sx={{ display: "flex" }}>
              <Box sx={{ flexGrow: 10 }}>
                <Typography sx={{ fontSize: 16 }}>Task 1</Typography>
                <Typography sx={{ fontSize: 12 }} color="text.secondary">
                  End Date: 20 July, 2023
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#ffbf00",
                  }}
                >
                  <TimelapseIcon fontSize="small" />
                  <Typography sx={{ fontSize: 12 }}>1 day left</Typography>
                </Box>
              </Box>
              <Box sx={{ flexGrow: 1, textAlign: "center" }}>
                <Checkbox color="success" />
              </Box>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Card>

      {/* Future */}
      <Card sx={{ width: "350px", height: "420px" }}>
        <Box>
          <Typography
            variant="h6"
            component="div"
            sx={{
              textAlign: "center",
              fontWeight: "700",
              fontSize: "22px",
              color: "#000",
              marginTop: "15px",
            }}
          >
            Future
          </Typography>
          <Typography
            sx={{ fontSize: 15, textAlign: "center" }}
            color="text.secondary"
          >
            Within the next 3 days
          </Typography>
        </Box>

        <Timeline sx={{ margin: "10px 25px" }}>
          <TimelineItem sx={{ "&::before": { content: "none" } }}>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ display: "flex" }}>
              <Box sx={{ flexGrow: 10 }}>
                <Typography sx={{ fontSize: 16 }}>Task 1</Typography>
                <Typography sx={{ fontSize: 12 }} color="text.secondary">
                  Start Date: 20 July, 2023
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#159947",
                  }}
                >
                  <TimelapseIcon fontSize="small" />
                  <Typography sx={{ fontSize: 12 }}>1 day left</Typography>
                </Box>
              </Box>
              <Box sx={{ flexGrow: 1, textAlign: "right" }}>
                <Checkbox color="success" />
              </Box>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem sx={{ "&::before": { content: "none" } }}>
            <TimelineSeparator>
              <TimelineDot />
            </TimelineSeparator>
            <TimelineContent sx={{ display: "flex" }}>
              <Box sx={{ flexGrow: 10 }}>
                <Typography sx={{ fontSize: 16 }}>Task 1</Typography>
                <Typography sx={{ fontSize: 12 }} color="text.secondary">
                  Start Date: 20 July, 2023
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#159947",
                  }}
                >
                  <TimelapseIcon fontSize="small" />
                  <Typography sx={{ fontSize: 12 }}>1 day left</Typography>
                </Box>
              </Box>
              <Box sx={{ flexGrow: 1, textAlign: "right" }}>
                <Checkbox color="success" />
              </Box>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Card>
    </div>
  );
}

export default TaskList;
