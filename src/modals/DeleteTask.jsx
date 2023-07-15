import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteTask } from "../redux/projectSlice";

function DeleteTask({ openDel, setOpenDel, task }) {
  const dispatch = useDispatch();

  const handleCloseDel = () => {
    setOpenDel(false);
  };

  return (
    <Dialog
      open={openDel}
      onClose={handleCloseDel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" color="error">
        Delete this task?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete the "{task.name}" task and its
          subtasks? This action cannot be reversed.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          color="error"
          onClick={() => {
            dispatch(deleteTask(task));
            handleCloseDel();
          }}
        >
          Delete
        </Button>
        <Button onClick={handleCloseDel} autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteTask;
