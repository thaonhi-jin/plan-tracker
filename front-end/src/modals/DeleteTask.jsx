import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteTask } from "../redux/cacheSlice";

function DeleteTask({
  openDel,
  setOpenDel,
  setAnchorElUser,
  taskName,
  taskID,
}) {
  const dispatch = useDispatch();

  const handleDeleteTask = () => {
    axios
      .delete(`http://localhost:1337/api/tasks/${taskID}`)
      .then(() => {
        dispatch(deleteTask(taskID));
      })
      .then(() => {
        setOpenDel(false);
        setAnchorElUser(null);
      })
      .catch((err) => console.log(err));
  };

  const handleCloseDel = () => {
    setOpenDel(false);
    setAnchorElUser(null);
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
          Are you sure you want to delete the "{taskName}" task? This action
          cannot be reversed.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          color="error"
          onClick={() => {
            handleDeleteTask();
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
