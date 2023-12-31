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
  BoardHeader,
} from "./styles/taskListStyles";
import { useDispatch, useSelector } from "react-redux";
import { checkTaskStatus, daysleftCount } from "../../redux/methods";
import CompleteModal from "./modals/CompleteModal";
import DeleteModal from "./modals/DeleteModal";
import ExtendModal from "./modals/ExtendModal";
import NavigateModal from "./modals/NavigateModal";
import { setProjectActive } from "../../redux/cacheSlice";
import dayjs from "dayjs";

function TaskList() {
  const dispatch = useDispatch();
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

  // callback in sort()
  const compareDaysLeft = (task1, task2) => {
    return dayjs(task1.attributes.endDate) - dayjs(task2.attributes.endDate);
  };

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
        <BoardHeader>
          <BoardTitle variant="h6" component="div">
            Past
          </BoardTitle>
          <BoardSubTitle color="text.secondary">
            You haven't done {pastTasks.length} tasks yet
          </BoardSubTitle>
        </BoardHeader>

        <Stack sx={{ width: "100%" }}>
          {(pastTasks || []).sort(compareDaysLeft).map((task) => (
            <NotiPaper elevation={1} key={task.id}>
              <Box sx={{ flexGrow: 1 }}>
                <Checkbox
                  checked={task.attributes.isCompleted}
                  color="success"
                  onClick={() => handleOpenComplete(task)}
                />
              </Box>
              <Box
                sx={{ flexGrow: 15, cursor: "pointer" }}
                onClick={() => {
                  dispatch(setProjectActive(task.projectID));
                }}
              >
                <Typography sx={{ fontSize: 16 }}>
                  {task.attributes.name}
                </Typography>
                <Typography
                  sx={{ fontSize: 12, marginLeft: "3px" }}
                  color="text.secondary"
                >
                  End Date:{" "}
                  {dayjs(task.attributes.endDate).format("DD-MM-YYYY")}
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
        <BoardHeader>
          <BoardTitle variant="h6" component="div">
            Today
          </BoardTitle>
          <BoardSubTitle color="text.secondary">
            You have {todayTasks.length} tasks for today
          </BoardSubTitle>
        </BoardHeader>

        <Timeline sx={{ margin: "5px 25px 15px 25px", paddingTop: 0 }}>
          {(todayTasks || []).sort(compareDaysLeft).map((task, index) => (
            <LeftTimeLineItem key={index}>
              <TimelineSeparator>
                <TimelineDot />
                {index !== todayTasks.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent sx={{ display: "flex" }}>
                <Box
                  sx={{ flexGrow: 10, cursor: "pointer" }}
                  onClick={() => {
                    dispatch(setProjectActive(task.projectID));
                  }}
                >
                  <Typography sx={{ fontSize: 16 }}>
                    {task.attributes.name}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 12, marginLeft: "3px" }}
                    color="text.secondary"
                  >
                    End Date:{" "}
                    {dayjs(task.attributes.endDate).format("DD-MM-YYYY")}
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
        <BoardHeader>
          <BoardTitle variant="h6" component="div">
            Future
          </BoardTitle>
          <BoardSubTitle color="text.secondary">
            You have {futureTasks.length} upcoming tasks
          </BoardSubTitle>
        </BoardHeader>

        <Timeline sx={{ margin: "5px 25px 15px 25px", paddingTop: 0 }}>
          {(futureTasks || []).sort(compareDaysLeft).map((task, index) => (
            <LeftTimeLineItem key={index}>
              <TimelineSeparator>
                <TimelineDot />
                {index !== futureTasks.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent sx={{ display: "flex" }}>
                <Box
                  sx={{ flexGrow: 10, cursor: "pointer" }}
                  onClick={() => {
                    dispatch(setProjectActive(task.projectID));
                  }}
                >
                  <Typography sx={{ fontSize: 16 }}>
                    {task.attributes.name}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 12, marginLeft: "3px" }}
                    color="text.secondary"
                  >
                    Start Date:{" "}
                    {dayjs(task.attributes.startDate).format("DD-MM-YYYY")}
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
