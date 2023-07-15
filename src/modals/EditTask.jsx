import React, { useState } from "react";
import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Stack,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { useDispatch } from "react-redux";
import { editTask } from "../redux/projectSlice";

function EditTask({
  openEdit,
  setOpenEdit,
  setAnchorElUser,
  task,
  maxDate,
  taskIndex,
}) {
  const dispatch = useDispatch();
  const [updateTask, setUpdateTask] = useState({ ...task });
  const [updateSubtasks, setUpdateSubtasks] = useState(task.subtasks);

  // validate
  const validateDate = () => {
    let start = new Date(updateTask["start-date"]);
    let end = new Date(updateTask["end-date"]);
    if (start && end) return start > end;
    return false;
  };

  // subtasks
  const handleAddSubTask = () => {
    let length = updateSubtasks.length;
    setUpdateSubtasks((prev) => [
      ...prev,
      { name: "", isCompleted: false, id: length },
    ]);
  };

  const handleChangeSubtasks = (id, newValue) => {
    setUpdateSubtasks((prev) => {
      const newState = [...prev];
      const subtask = newState.find((subtask) => subtask.id === id);
      subtask.name = newValue;
      return newState;
    });
  };

  const handleDelSubtask = (id) => {
    setUpdateSubtasks(updateSubtasks.filter((subtask) => subtask.id !== id));
  };

  // edit-task modal
  const handleUpdateChange = (e) => {
    setUpdateTask((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleCloseEdit = () => {
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
              defaultValue={task.name}
              onChange={handleUpdateChange}
            />
            <div>
              <TextField
                id="outlined-basic"
                name="start-date"
                // label="Start Date"
                variant="outlined"
                type="date"
                placeholder="dd/mm/yyyy"
                sx={{ minWidth: "200px", marginRight: "10px" }}
                defaultValue={task["start-date"]}
                onChange={handleUpdateChange}
                inputProps={{
                  max: `${maxDate}`,
                }}
                error={validateDate()}
                helperText={
                  validateDate() ? "Start Date is before End Date!" : ""
                }
              />
              <TextField
                id="outlined-basic"
                name="end-date"
                // label="End Date"
                variant="outlined"
                sx={{ minWidth: "200px" }}
                type="date"
                placeholder="dd/mm/yyyy"
                defaultValue={task["end-date"]}
                onChange={handleUpdateChange}
                inputProps={{
                  max: `${maxDate}`,
                }}
                error={validateDate()}
              />
            </div>

            <div>
              <Box
                sx={{
                  width: "25%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography fontSize="16px" fontWeight="500" color="black">
                  Subtasks
                </Typography>
                <IconButton>
                  <AddBoxOutlinedIcon
                    fontSize="small"
                    color="#4B5563"
                    onClick={handleAddSubTask}
                  />
                </IconButton>
              </Box>

              {updateSubtasks.map((subtask, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    marginTop: "15px",
                  }}
                >
                  <TextField
                    hiddenLabel
                    defaultValue={subtask.name}
                    variant="filled"
                    size="small"
                    // placeholder="e.g Take coffee break"
                    sx={{ minWidth: "400px" }}
                    onChange={(e) =>
                      handleChangeSubtasks(subtask.id, e.target.value)
                    }
                  />

                  <IconButton
                    sx={{ ml: 2, my: 0.5 }}
                    onClick={() => handleDelSubtask(subtask.id)}
                  >
                    <DeleteIcon fontSize="small" color="#4B5563" />
                  </IconButton>
                </Box>
              ))}
            </div>
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseEdit}>Cancel</Button>
        <Button
          disabled={validateDate()}
          onClick={() => {
            dispatch(
              editTask({
                taskIndex,
                taskStatus: task.status,
                updateTask,
                updateSubtasks,
              })
            );
            handleCloseEdit();
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditTask;
