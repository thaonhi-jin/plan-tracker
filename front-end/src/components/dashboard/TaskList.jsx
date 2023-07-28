import React, { useState } from "react";
import "./styles/dashboard.css";
import { Box, Typography, Checkbox, Stack, IconButton } from "@mui/material";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {
  Timeline,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import {
  BoardSubTitle,
  BoardTitle,
  FutureNoti,
  NotiPaper,
  OverdueNoti,
  TaskBoard,
  WarningNoti,
  LeftTimeLineItem,
} from "./styles/taskListStyles";
import { useSelector } from "react-redux";
import { checkTaskStatus, daysleftCount } from "../../redux/methods";
import CompleteModal from "./modals/CompleteModal";
import DeleteModal from "./modals/DeleteModal";
import ExtendModal from "./modals/ExtendModal";
import NavigateModal from "./modals/NavigateModal";

function TaskList() {
  const [openComplete, setOpenComplete] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [openExtend, setOpenExtend] = useState(false);
  const [openActiveProject, setOpenActiveProject] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  const allTasks = useSelector((state) => state.cache.allTasks);
  const uncompletedTasks = allTasks.filter(
    (task) => !task.attributes.isCompleted
  );
  const pastTasks = uncompletedTasks.filter(
    (task) => checkTaskStatus(task) === "Overdue"
  );
  const todayTasks = uncompletedTasks.filter(
    (task) => checkTaskStatus(task) === "In Progress"
  );
  const futureTasks = uncompletedTasks.filter(
    (task) => checkTaskStatus(task) === "Not Started"
  );

  // complete modal
  const handleOpenComplete = (task) => {
    setSelectedTask(task);
    setOpenComplete(true);
  };

  // delete modal
  const handleOpenDel = (task) => {
    setSelectedTask(task);
    setOpenDel(true);
  };

  // extend modal
  const handleOpenExtend = (task) => {
    setSelectedTask(task);
    setOpenExtend(true);
  };

  return (
    <div className="task-lists">
      {/* Past - Not Completed */}
      <TaskBoard>
        <Box>
          <BoardTitle variant="h6" component="div">
            Past
          </BoardTitle>
          <BoardSubTitle color="text.secondary">
            You haven't done {pastTasks.length} tasks yet
          </BoardSubTitle>
        </Box>

        <Stack sx={{ width: "100%" }}>
          {(pastTasks || []).map((task) => (
            <NotiPaper elevation={1} key={task.id}>
              <Box sx={{ flexGrow: 1 }}>
                <Checkbox
                  checked={task.attributes.isCompleted}
                  color="success"
                  onClick={() => handleOpenComplete(task)}
                />
              </Box>
              <Box sx={{ flexGrow: 15 }}>
                <Typography sx={{ fontSize: 16, marginBottom: "5px" }}>
                  {task.attributes.name}
                </Typography>
                <OverdueNoti>
                  <ErrorOutlineIcon fontSize="small" />
                  <Typography sx={{ fontSize: 12 }}>
                    {daysleftCount(task.attributes.endDate)} days ago
                  </Typography>
                </OverdueNoti>
              </Box>
              <IconButton onClick={() => handleOpenExtend(task)}>
                <UpdateIcon />
              </IconButton>

              <IconButton onClick={() => handleOpenDel(task)}>
                <DeleteForeverIcon />
              </IconButton>
            </NotiPaper>
          ))}
        </Stack>
      </TaskBoard>

      {/* Today */}
      <TaskBoard>
        <Box>
          <BoardTitle variant="h6" component="div">
            Today
          </BoardTitle>
          <BoardSubTitle color="text.secondary">
            You have {todayTasks.length} tasks for today
          </BoardSubTitle>
        </Box>

        <Timeline sx={{ margin: "10px 25px" }}>
          {(todayTasks || []).map((task, index) => (
            <LeftTimeLineItem key={index}>
              <TimelineSeparator>
                <TimelineDot />
                {index !== todayTasks.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent sx={{ display: "flex" }}>
                <Box sx={{ flexGrow: 10 }}>
                  <Typography sx={{ fontSize: 16 }}>
                    {task.attributes.name}
                  </Typography>
                  <Typography sx={{ fontSize: 12 }} color="text.secondary">
                    End Date: {task.attributes.endDate}
                  </Typography>
                  <WarningNoti>
                    <TimelapseIcon fontSize="small" />
                    <Typography sx={{ fontSize: 12 }}>
                      {daysleftCount(task.attributes.endDate)} days left
                    </Typography>
                  </WarningNoti>
                </Box>
                <Box sx={{ flexGrow: 1, textAlign: "center" }}>
                  <Checkbox
                    checked={task.attributes.isCompleted}
                    color="success"
                    onClick={() => handleOpenComplete(task)}
                  />
                </Box>
              </TimelineContent>
            </LeftTimeLineItem>
          ))}
        </Timeline>
      </TaskBoard>

      {/* Future */}
      <TaskBoard>
        <Box>
          <BoardTitle variant="h6" component="div">
            Future
          </BoardTitle>
          <BoardSubTitle color="text.secondary">
            You have {futureTasks.length} upcoming tasks
          </BoardSubTitle>
        </Box>

        <Timeline sx={{ margin: "10px 25px" }}>
          {(futureTasks || []).map((task, index) => (
            <LeftTimeLineItem key={index}>
              <TimelineSeparator>
                <TimelineDot />
                {index !== futureTasks.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent sx={{ display: "flex" }}>
                <Box sx={{ flexGrow: 10 }}>
                  <Typography sx={{ fontSize: 16 }}>
                    {task.attributes.name}
                  </Typography>
                  <Typography sx={{ fontSize: 12 }} color="text.secondary">
                    Start Date: {task.attributes.startDate}
                  </Typography>
                  <FutureNoti>
                    <TimelapseIcon fontSize="small" />
                    <Typography sx={{ fontSize: 12 }}>
                      {daysleftCount(task.attributes.startDate)} days to start
                    </Typography>
                  </FutureNoti>
                </Box>
                <Box sx={{ flexGrow: 1, textAlign: "right" }}>
                  <Checkbox
                    checked={task.attributes.isCompleted}
                    color="success"
                    onClick={() => handleOpenComplete(task)}
                  />
                </Box>
              </TimelineContent>
            </LeftTimeLineItem>
          ))}
        </Timeline>
      </TaskBoard>

      {/* Complete Modal */}
      {openComplete && (
        <CompleteModal
          openComplete={openComplete}
          setOpenComplete={setOpenComplete}
          task={selectedTask}
        />
      )}

      {/* Delete Modal */}
      {openDel && (
        <DeleteModal
          openDel={openDel}
          setOpenDel={setOpenDel}
          task={selectedTask}
        />
      )}

      {/* Extend Modal */}
      {openExtend && (
        <ExtendModal
          openExtend={openExtend}
          setOpenExtend={setOpenExtend}
          setOpenActiveProject={setOpenActiveProject}
          task={selectedTask}
        />
      )}

      {/* Navigate Modal */}
      {openActiveProject && (
        <NavigateModal
          openActiveProject={openActiveProject}
          setOpenActiveProject={setOpenActiveProject}
          projectID={selectedTask.projectID}
        />
      )}
    </div>
  );
}

export default TaskList;
