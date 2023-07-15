import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Button,
  Container,
  Tooltip,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AdbIcon from "@mui/icons-material/Adb";
import { useSelector } from "react-redux";
import DeleteProject from "../modals/DeleteProject";
import EditProject from "../modals/EditProject";
import AddTask from "../modals/AddTask";

function Header() {
  const projects = useSelector((state) => state.projects);
  const activeProject = projects.find((board) => board.isActive);
  const currentDateTime = useSelector((state) => state.currentState);
  const currDT = new Date(currentDateTime.datetime);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDel, setOpenDel] = React.useState(false);
  const [openAddTask, setOpenAddTask] = React.useState(false);

  // add task
  const handleOpenAddTask = () => {
    setOpenAddTask(true);
  };

  // edit project modal
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  // delete project modal
  const handleOpenDel = () => {
    setOpenDel(true);
  };

  // handle open/close setting modal
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          // backgroundColor: "#73C2FB",
          backgroundColor: "#fff",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                color: "#73C2FB",
              }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                color: "#73C2FB",
                textDecoration: "none",
              }}
            >
              Plan Tracker
            </Typography>

            <Box
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            ></Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              // noWrap
              // component="a"
              // href=""
              fontSize="Roboto"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "Roboto",
                fontWeight: 400,
                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box
              sx={{
                marginLeft: "9%",
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                fontWeight: "700",
                fontSize: "25px",
                color: "#000",
              }}
            >
              {/* title Task */}
              {activeProject.title} {currDT.toLocaleString()}
            </Box>

            <Box sx={{ flexGrow: 0.03 }}>
              <Button
                sx={{ borderRadius: "20px", backgroundColor: "#1E90FF" }}
                variant="contained"
                onClick={handleOpenAddTask}
              >
                + Add New Task
              </Button>
            </Box>

            {/* Add task modal */}
            {openAddTask && (
              <AddTask
                openAddTask={openAddTask}
                setOpenAddTask={setOpenAddTask}
                activeProject={activeProject}
              />
            )}

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <MoreVertIcon fontSize="medium" />
                </IconButton>
              </Tooltip>
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
                  <Typography textAlign="center">Edit Project</Typography>
                </MenuItem>

                <MenuItem onClick={() => handleOpenDel()}>
                  <Typography textAlign="center" color="error">
                    Delete Project
                  </Typography>
                </MenuItem>

                {/* Edit Project Modal */}
                {openEdit && (
                  <EditProject
                    activeProject={activeProject}
                    openEdit={openEdit}
                    setOpenEdit={setOpenEdit}
                    setAnchorElUser={setAnchorElUser}
                  />
                )}

                {/* Delete Project Modal */}
                {openDel && (
                  <DeleteProject
                    openDel={openDel}
                    setOpenDel={setOpenDel}
                    projectTitle={activeProject.title}
                  />
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Header;
