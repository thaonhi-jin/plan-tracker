import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteProject } from "../redux/projectSlice";

function DeleteProject({ openDel, setOpenDel, projectTitle }) {
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
        Delete this project?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete the "{projectTitle}" project? This
          action will remove all tasks and cannot be reversed.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          color="error"
          onClick={() => {
            dispatch(deleteProject());
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

export default DeleteProject;
