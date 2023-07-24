import React from "react";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteInfoProject } from "../redux/cacheSlice";

function DeleteProject({ openDel, setOpenDel, projectTitle }) {
  const dispatch = useDispatch();
  const activeTasks = useSelector((state) => state.cache.activeTasks);

  const handleDeleteProject = () => {
    if (activeTasks.tasks.length > 0) {
      activeTasks.tasks.forEach((task) => {
        axios
          .delete(`http://localhost:1337/api/tasks/${task.id}`)
          .catch((err) => console.log(err));
      });
    }
    axios
      .delete(`http://localhost:1337/api/projects/${activeTasks.projectID}`)
      .then(() => {
        dispatch(deleteInfoProject(activeTasks.projectID));
      })
      .then(() => {
        setOpenDel(false);
      })
      .catch((err) => console.log(err));
  };
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
            handleDeleteProject();
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
