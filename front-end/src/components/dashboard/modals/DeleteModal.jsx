import React from "react";
import axios from "axios";
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
import {
  deleteTaskDashBoard,
  editProjectDashBoard,
} from "../../../redux/cacheSlice";
import { checkAllTasksCompleted } from "../../../redux/methods";

function DeleteModal({ openDel, setOpenDel, task }) {
  const dispatch = useDispatch();

  const handleClickDelete = () => {
    axios
      .delete(`http://localhost:1337/api/tasks/${task.id}`)
      .then(() => {
        dispatch(deleteTaskDashBoard(task.id));
      })
      .then(() => {
        axios
          .get(
            `http://localhost:1337/api/projects/${task.projectID}?populate=*`
          )
          .then((res) => {
            let project = res.data.data;
            let newStatus = checkAllTasksCompleted(
              project.attributes.tasks.data
            );
            if (newStatus) {
              delete project.attributes.tasks;
              let updateProject = {
                data: {
                  ...project.attributes,
                  status: "Completed",
                },
              };
              axios
                .put(
                  `http://localhost:1337/api/projects/${task.projectID}`,
                  updateProject
                )
                .then((res) => {
                  dispatch(editProjectDashBoard(res.data.data));
                  setOpenDel(false);
                })
                .catch((err) => {
                  console.log(err);
                  setOpenDel(false);
                });
            } else setOpenDel(false);
          })
          .catch((err) => {
            console.log(err);
            setOpenDel(false);
          });
      })
      .catch((err) => {
        console.log(err);
        setOpenDel(false);
      });
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
        Delete this task?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete the "{task.attributes.name}" task?
          This action cannot be reversed.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          color="error"
          onClick={handleClickDelete}
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

export default DeleteModal;
