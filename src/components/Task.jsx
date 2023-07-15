import React, { useState } from "react";
import {
  Paper,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ErrorIcon from "@mui/icons-material/Error";
import { useDispatch, useSelector } from "react-redux";
import {
  setSubtaskCompleted,
  convertDate,
  setClickTaskCompleted,
} from "../redux/projectSlice";
import DeleteTask from "../modals/DeleteTask";
import EditTask from "../modals/EditTask";

function Task({ taskIndex, task, maxDate }) {
  const [openTask, setOpenTask] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const dispatch = useDispatch();
  const currDate = useSelector((state) =>
    state.currentState.datetime.slice(0, 10)
  );

  const handleClickOpenTask = () => {
    setOpenTask(true);
  };

  const handleCloseTask = () => {
    setOpenTask(false);
  };
  const filterCompletedSubTask = (task) => {
    return task.subtasks.filter((subtask) => subtask.isCompleted === true);
  };

  /*
  // check task completed (subtasks)
  const isAllSubtasksCompleted = () => {
    let isCompleted = true;
    (task.subtasks || []).forEach((subtask) => {
      if (!subtask.isCompleted) isCompleted = false;
    });
    return isCompleted;
  };

  // check task change
  const checkTaskChange = () => {
    if (
      (isAllSubtasksCompleted() && !task.isCompleted) ||
      (!isAllSubtasksCompleted() && task.isCompleted)
    )
      return true;
    return false;
  };

  // save task Status (after complete subtask)
  const handleSaveTask = () => {
    if (checkTaskChange()) {
      dispatch(setClickTaskCompleted({ taskIndex, taskStatus: task.status }));
    }
    console.log(task);
    setOpenTask(false);
  };

  */

  const handleClickCompletedTask = () => {
    dispatch(setClickTaskCompleted({ taskIndex, taskStatus: task.status }));
  };

  // update task theme
  const updateTaskTheme = () => {
    let today = new Date(currDate);
    let end = new Date(task["end-date"]);
    if (today > end && !task.isCompleted) return "#F7B4BB";
    else return "#fff";
  };

  // edit-task modal
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  // open delete-task modal
  const handleOpenDel = () => {
    setOpenDel(true);
  };

  // settings for Task
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <div>
      <Paper
        elevation={3}
        sx={{
          width: "256px",
          height: "fit-content",
          padding: "24px 12px",
          margin: "12px 0",
          borderRadius: "7px",
          backgroundColor: `${updateTaskTheme()}`,
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ fontSize: "16px", fontWeight: "700", cursor: "pointer" }}
          onClick={handleClickOpenTask}
        >
          {task.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "rgb(107 114 128)",
            fontSize: "10px",
            fontWeight: "700",
            marginTop: "8px",
            cursor: "pointer",
          }}
          onClick={handleClickOpenTask}
        >
          {filterCompletedSubTask(task).length} of {task.subtasks.length}{" "}
          completed subtasks
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              onClick={handleClickCompletedTask}
              checked={task.isCompleted}
              disabled={task.subtasks.length > 0}
            />
          }
          label="Completed"
        />
        {maxDate < task["start-date"] ? (
          <Typography color="error" fontSize="11px">
            <ErrorIcon fontSize="small" /> Start Date is greater than End Date
            of this project
          </Typography>
        ) : maxDate < task["end-date"] ? (
          <Typography color="error" fontSize="11px">
            <ErrorIcon fontSize="small" /> End Date is greater than End Date of
            this project
          </Typography>
        ) : (
          ""
        )}
      </Paper>
      <Dialog
        open={openTask}
        onClose={handleCloseTask}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              minWidth: "300px", // Set your width here
            },
          },
        }}
      >
        <DialogTitle sx={{ display: "flex" }}>
          <Typography
            fontSize="18px"
            fontWeight="600"
            sx={{ flexGrow: 4, marginRight: "30px" }}
          >
            {task.name}
          </Typography>
          <Tooltip title="Open settings" sx={{ flexGrow: 1 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <MoreVertIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
        </DialogTitle>
        <Box sx={{ marginLeft: "30px" }}>
          <Typography>Start: {convertDate(task["start-date"])}</Typography>
          <Typography>Finish: {convertDate(task["end-date"])}</Typography>
          <Typography>Status: {task.status}</Typography>
        </Box>

        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={() => handleOpenEdit()}>
            <Typography textAlign="center">Edit Task</Typography>
          </MenuItem>

          <MenuItem onClick={() => handleOpenDel()}>
            <Typography textAlign="center" color="error">
              Delete Task
            </Typography>
          </MenuItem>

          {/* Edit Task Modal */}
          {openEdit && (
            <EditTask
              openEdit={openEdit}
              setOpenEdit={setOpenEdit}
              setAnchorElUser={setAnchorElUser}
              task={task}
              maxDate={maxDate}
              taskIndex={taskIndex}
            />
          )}

          {/* Delete Task Modal */}
          {openDel && (
            <DeleteTask openDel={openDel} setOpenDel={setOpenDel} task={task} />
          )}
        </Menu>
        <DialogContent>
          <FormGroup>
            {task.subtasks
              ? task.subtasks.map((subtask, index) => (
                  <FormControlLabel
                    key={index}
                    onClick={() => {
                      dispatch(
                        setSubtaskCompleted({
                          index,
                          taskIndex,
                          statusTask: task.status,
                        })
                      );
                    }}
                    control={<Checkbox checked={subtask.isCompleted} />}
                    label={subtask.name}
                  />
                ))
              : "No subtask"}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTask}>Cancel</Button>
          {/* {task.subtasks.length > 0 ? (
            <Button onClick={handleSaveTask} disabled={!checkTaskChange()}>
              Save
            </Button>
          ) : (
            <Button onClick={handleClickCompletedTask}>Completed</Button>
          )} */}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Task;
