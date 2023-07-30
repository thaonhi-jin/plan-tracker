import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Stack,
  TextField,
  Chip,
  Alert,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { editTask } from "../redux/cacheSlice";
import { checkInValid } from "../redux/methods";

function EditTask({ openEdit, setOpenEdit, setAnchorElUser, task }) {
  const [updateTask, setUpdateTask] = useState({ ...task.attributes });
  const dispatch = useDispatch();
  const today = dayjs(dayjs().format("YYYY-MM-DD"));
  const infoProjects = useSelector((state) => state.cache.infoProjects);
  const activeProject = infoProjects.find((project) => project.isActive);
  const endDateProject = dayjs(activeProject.attributes.endDate);

  // return maxDate for StartDate
  const FindMaxDate = () => {
    if (!checkInValid(updateTask.endDate, "date"))
      return dayjs(updateTask.endDate);
    return endDateProject;
  };

  // return minDate for EndDate
  const FindMinDate = () => {
    if (!checkInValid(updateTask.startDate, "date"))
      return dayjs(updateTask.startDate);
  };

  // edit-task modal
  const handleUpdateDate = (name, value) => {
    setUpdateTask((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleUpdateChange = (e) => {
    setUpdateTask((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleEditTask = () => {
    let updateData = {
      data: {
        ...updateTask,
        status: checkStatus(),
      },
    };
    axios
      .put(`http://localhost:1337/api/tasks/${task.id}`, updateData)
      .then((res) => {
        dispatch(editTask(res.data.data));
      })
      .then(() => {
        setUpdateTask({});
        setOpenEdit(false);
        setAnchorElUser(null);
      })
      .catch((err) => console.log(err));
  };

  // check status
  const checkStatus = () => {
    if (updateTask.isCompleted) return "Completed";
    if (checkInValid(updateTask.startDate, "date"))
      return task.attributes.status;
    let currDate = new Date();
    let start = new Date(updateTask.startDate);
    if (currDate >= start) return "In Progress";
    return "Not Started";
  };

  //check empty before add project
  const checkEmpty = () => {
    return (
      checkInValid(updateTask.name, "text") ||
      checkInValid(updateTask.startDate, "date") ||
      checkInValid(updateTask.endDate, "date")
    );
  };
  console.log(updateTask.status);

  const handleCloseEdit = () => {
    setUpdateTask({});
    setOpenEdit(false);
    setAnchorElUser(null);
  };
  return (
    <Dialog open={openEdit} onClose={handleCloseEdit}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ padding: "10px 5px" }}>
          <Stack spacing={4}>
            {today.isAfter(endDateProject) && !updateTask.isCompleted ? (
              <Alert severity="warning">
                The End Date of project is overdue. You should extend it before
                edit task.
              </Alert>
            ) : (
              ""
            )}
            <TextField
              id="outlined-basic"
              name="name"
              label="Name"
              variant="outlined"
              sx={{ minWidth: "300px" }}
              defaultValue={task.attributes.name}
              onChange={handleUpdateChange}
              helperText={
                checkInValid(updateTask.name, "text")
                  ? "Please fill in this field!"
                  : ""
              }
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <label>Note: End Date isn't after Start Date.</label>
              <DatePicker
                required
                label="Start Date"
                id="startDate"
                name="startDate"
                sx={{ minWidth: "200px", marginTop: "12px" }}
                format="DD-MM-YYYY"
                defaultValue={dayjs(updateTask.startDate)}
                maxDate={FindMaxDate()}
                onChange={(value) => {
                  if (value)
                    handleUpdateDate("startDate", value.format("YYYY-MM-DD"));
                }}
                slotProps={{
                  textField: {
                    helperText: `${
                      checkInValid(updateTask.startDate, "date")
                        ? "Please fill in this field!"
                        : ""
                    }`,
                  },
                }}
              />

              {today.isAfter(dayjs(updateTask.endDate)) &&
              !updateTask.isCompleted ? (
                <Alert severity="error">
                  The End Date of task is overdue. Please extend it.
                </Alert>
              ) : (
                ""
              )}

              <DatePicker
                required
                label="End Date"
                id="endDate"
                name="endDate"
                sx={{ minWidth: "200px", marginTop: "12px" }}
                format="DD-MM-YYYY"
                defaultValue={dayjs(updateTask.endDate)}
                minDate={FindMinDate()}
                maxDate={endDateProject}
                onChange={(value) => {
                  if (value)
                    handleUpdateDate("endDate", value.format("YYYY-MM-DD"));
                }}
                slotProps={{
                  textField: {
                    helperText: `${
                      checkInValid(updateTask.endDate, "date")
                        ? "Please fill in this field!"
                        : ""
                    }`,
                  },
                }}
              />
            </LocalizationProvider>

            <div>
              <label>Status: </label>
              <Chip
                label={checkStatus()}
                sx={{
                  backgroundColor:
                    checkStatus() === "In Progress"
                      ? "#73C2FB"
                      : checkStatus() === "Completed"
                      ? "#3DD598"
                      : "action",
                }}
              />
              {checkStatus() !== "Completed" && (
                <Chip label="Not Completed" variant="outlined" />
              )}
            </div>
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: "#555555" }} onClick={handleCloseEdit}>
          Cancel
        </Button>
        <Button
          startIcon={<SaveIcon />}
          variant="outlined"
          sx={{ color: "#0DA2FF" }}
          disabled={checkEmpty()}
          onClick={() => {
            handleEditTask();
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditTask;
