import React, { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import AdbIcon from "@mui/icons-material/Adb";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useSelector, useDispatch } from "react-redux";
import { setProjectActive } from "../redux/projectSlice";
import AddProject from "../modals/AddProject";

function Sidebar() {
  const sidebarWidth = 250;
  const projects = useSelector((state) => state.projects);
  const currentDateTime = useSelector((state) => state.currentState);
  const currDT = new Date(currentDateTime.datetime);
  const dispatch = useDispatch();
  const [openAdd, setOpenAdd] = useState(false);

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{
        width: sidebarWidth,
        height: "100vh",
        "& > div": { borderRight: "none" },
      }}
    >
      <List
        disablePadding
        sx={{
          width: sidebarWidth,
          height: "100vh",
          backgroundColor: "#F0F8FF",
          overflow: "hidden",
        }}
      >
        <ListItem sx={{ padding: "16px 8px" }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 0",
            }}
          >
            <AdbIcon
              sx={{
                flexGrow: 1,
                fontSize: "28px",
                mr: 0.5,
                display: { xs: "none", md: "flex" },
                color: "#73C2FB",
              }}
            />
            <Typography
              variant="h4"
              noWrap
              component="a"
              href="/"
              sx={{
                flexGrow: 5,
                display: { xs: "none", md: "flex" },
                fontFamily:
                  "ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
                fontWeight: 700,
                color: "#73C2FB",
                textDecoration: "none",
                fontSize: "28px",
              }}
            >
              Plan Tracker
            </Typography>
          </Box>
        </ListItem>
        <ListItem
          sx={{ padding: "4px 16px", marginBottom: "15px", marginTop: "10px" }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="body2"
              fontWeight="700"
              color="#4B5563"
              fontSize="19px"
            >
              ALL PROJECTS ({projects?.length})
            </Typography>
            <IconButton onClick={() => handleOpenAdd()}>
              <AddBoxOutlinedIcon fontSize="medium" color="#4B5563" />
            </IconButton>
          </Box>
        </ListItem>
        <Collapse in={true} timeout="auto" unmountOnExit>
          <List sx={{ padding: "0" }}>
            {projects
              ? projects.map((project, index) => (
                  <div key={index}>
                    <ListItemButton
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        padding: "16px 16px",
                        borderRadius: "0 40px 40px 0",
                        ":hover": {
                          backgroundColor: "#8cd3ff",
                          color: "#0da2ff",
                        },
                        backgroundColor: project.isActive ? "#0da2ff" : "",
                        color: project.isActive ? "#fff" : "#000",
                      }}
                      onClick={() => dispatch(setProjectActive({ index }))}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: "30px",
                          mr: 2,
                        }}
                      >
                        <ListAltIcon
                          fontSize="medium"
                          sx={{
                            color: "#4B5563",
                          }}
                        />
                      </ListItemIcon>
                      <Typography
                        variant="body2"
                        fontWeight="500"
                        fontSize="18px"
                      >
                        {project.title}
                      </Typography>
                    </ListItemButton>
                  </div>
                ))
              : "No project!"}
          </List>
        </Collapse>

        <Typography fontSize="20px" marginTop="30px" marginLeft="15px">
          {currDT.toLocaleString()}
        </Typography>
      </List>

      {/* Add Project Modal */}
      {openAdd && <AddProject openAdd={openAdd} setOpenAdd={setOpenAdd} />}
    </Drawer>
  );
}

export default Sidebar;
