import React, { useState } from "react";
import axios from "axios";
import {
  Typography,
  Box,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Chip,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import DeleteTask from "../../modals/DeleteTask";
import EditTask from "../../modals/EditTask";
import { useDispatch } from "react-redux";
import { editTask } from "../../redux/cacheSlice";
import { checkTaskStatus } from "../../redux/methods";
import {
  CheckboxStyled,
  CompletedCheckbox,
  CompletedTypo,
  PaperStyle,
  TaskDateBox,
  TaskName,
} from "./styles/TaskCardStyles";
import dayjs from "dayjs";

function TaskCard({ task }) {
  const dispatch = useDispatch();
  const [openDel, setOpenDel] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  console.log("here6");

  // click checkbox Completed
  const handleClickCompleted = (e) => {
    var updateState;
    if (e.target.checked) {
      updateState = {
        data: {
          ...task.attributes,
          status: "Completed",
          isCompleted: true,
        },
      };
    } else {
      let status = checkTaskStatus(task);
      updateState = {
        data: {
          ...task.attributes,
          status: status === "Overdue" ? "In Progress" : status,
          isCompleted: false,
        },
      };
    }

    axios
      .put(`http://localhost:1337/api/tasks/${task.id}`, updateState)
      .then((res) => {
        dispatch(editTask(res.data.data));
      })
      .catch((err) => console.log(err));
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
    <PaperStyle elevation={3}>
      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
        <TaskName gutterBottom variant="h6" component="div">
          {task.attributes.name}
        </TaskName>
        {checkTaskStatus(task) === "Overdue" &&
          !task.attributes.isCompleted && (
            <ErrorOutlineIcon sx={{ color: "#FC5A5A" }} />
          )}

        <Tooltip title="Open settings" sx={{ flexGrow: 1 }}>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <MoreVertIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* menu settings */}
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
          />
        )}

        {/* Delete Task Modal */}
        {openDel && (
          <DeleteTask
            openDel={openDel}
            setOpenDel={setOpenDel}
            setAnchorElUser={setAnchorElUser}
            taskName={task.attributes.name}
            taskID={task.id}
          />
        )}
      </Menu>

      <TaskDateBox>
        <ScheduleIcon sx={{ flexGrow: 1 }} fontSize="medium" color="action" />
        <Typography sx={{ flexGrow: 4 }} fontSize="14px" color="text.secondary">
          <Chip
            label={dayjs(task.attributes.startDate).format("DD-MM-YYYY")}
            sx={{
              height: "26px",
            }}
          />{" "}
          -{" "}
          <Chip
            label={dayjs(task.attributes.endDate).format("DD-MM-YYYY")}
            sx={{
              height: "26px",
            }}
          />
        </Typography>
      </TaskDateBox>

      <CompletedCheckbox>
        <CheckboxStyled
          defaultChecked={task.attributes.isCompleted}
          sx={{
            color: task.attributes.status === "Not Started" ? "" : "#0DA2FF",
            "&.Mui-checked": {
              color: "#3DD598",
            },
          }}
          onClick={handleClickCompleted}
        />
        <CompletedTypo fontSize="14px" color="text.secondary">
          Completed
        </CompletedTypo>
      </CompletedCheckbox>
    </PaperStyle>
  );
}

export default TaskCard;
