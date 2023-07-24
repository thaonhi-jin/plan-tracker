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
} from "@mui/material";
import { useDispatch } from "react-redux";
import { editTask } from "../redux/cacheSlice";

function EditTask({ openEdit, setOpenEdit, setAnchorElUser, task }) {
  const [updateTask, setUpdateTask] = useState({ ...task.attributes });
  const dispatch = useDispatch();

  // edit-task modal
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
    let currDate = new Date();
    let start = new Date(updateTask.startDate);
    if (currDate >= start) return "In Progress";
    return "Not Started";
  };

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
            <TextField
              id="outlined-basic"
              name="name"
              label="Name"
              variant="outlined"
              sx={{ minWidth: "300px" }}
              defaultValue={task.attributes.name}
              onChange={handleUpdateChange}
            />
            <div>
              <TextField
                id="outlined-basic"
                name="startDate"
                // label="Start Date"
                variant="outlined"
                type="date"
                placeholder="dd/mm/yyyy"
                sx={{ minWidth: "200px", marginRight: "10px" }}
                defaultValue={task.attributes.startDate}
                onChange={handleUpdateChange}
              />
              <TextField
                id="outlined-basic"
                name="endDate"
                // label="End Date"
                variant="outlined"
                sx={{ minWidth: "200px" }}
                type="date"
                placeholder="dd/mm/yyyy"
                defaultValue={task.attributes.endDate}
                onChange={handleUpdateChange}
              />
            </div>

            <div>
              <label>Status: </label>
              <Chip
                label={updateTask.startDate ? checkStatus() : "Not Started"}
                sx={{
                  backgroundColor:
                    updateTask.startDate && checkStatus() === "In Progress"
                      ? "#6ac5fe"
                      : "#fff444",
                }}
              />
              <Chip
                label={
                  task.attributes.isCompleted ? "Completed" : "Not Completed"
                }
                variant="outlined"
              />
            </div>
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseEdit}>Cancel</Button>
        <Button
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
