import React from "react";
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import {
  editProjectDashBoard,
  editTaskDashBoard,
} from "../../../redux/cacheSlice";
import { checkAllTasksCompleted } from "../../../redux/methods";

function CompleteModal({ openComplete, setOpenComplete, task }) {
  const dispatch = useDispatch();
  const handleClickCompleted = () => {
    let updateState = {
      data: {
        ...task.attributes,
        status: "Completed",
        isCompleted: true,
      },
    };
    axios
      .put(`http://localhost:1337/api/tasks/${task.id}`, updateState)
      .then((res) => {
        dispatch(editTaskDashBoard(res.data.data));
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
                  setOpenComplete(false);
                })
                .catch((err) => {
                  console.log(err);
                  setOpenComplete(false);
                });
            } else setOpenComplete(false);
          })
          .catch((err) => {
            console.log(err);
            setOpenComplete(false);
          });
      })
      .catch((err) => {
        console.log(err);
        setOpenComplete(false);
      });
  };
  const handleCloseComplete = () => {
    setOpenComplete(false);
  };
  return (
    <Dialog
      open={openComplete}
      onClose={handleCloseComplete}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" color="success">
        Complete this task?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you've completed the "{task.attributes.name}" task? This
          action will update the status of task, related project and you cannot
          see this task in Dashboard.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          startIcon={<CheckCircleIcon />}
          color="success"
          onClick={handleClickCompleted}
        >
          Completed
        </Button>
        <Button onClick={handleCloseComplete} autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CompleteModal;
