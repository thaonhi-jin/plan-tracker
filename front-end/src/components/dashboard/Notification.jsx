import React from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Typography,
  Card,
  Badge,
  Paper,
  Chip,
  ListSubheader,
} from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useDispatch, useSelector } from "react-redux";
import { WarningProjectsFilter, daysleftCount } from "../../redux/methods";
import { setProjectActive } from "../../redux/cacheSlice";

function Notification() {
  const infoProjects = useSelector((state) => state.cache.infoProjects);
  const warningProjects = WarningProjectsFilter(infoProjects);
  const dispatch = useDispatch();

  return (
    <Card
      sx={{
        width: "300px",
        marginLeft: "20px",
        height: "400px",
        padding: "15px",
      }}
    >
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <ListSubheader sx={{ textAlign: "center" }}>
          <Badge color="warning" badgeContent={warningProjects.length}>
            <NotificationsActiveIcon fontSize="large" />
          </Badge>
          <Typography
            sx={{ fontSize: 15, textAlign: "center" }}
            color="text.secondary"
          >
            Deadline is due soon
          </Typography>
        </ListSubheader>

        {warningProjects.length > 0
          ? warningProjects.map((project) => (
              <Paper key={project.id} elevation={1} sx={{ margin: "15px 0" }}>
                <ListItemButton
                  onClick={() => dispatch(setProjectActive(project.id))}
                >
                  <ListItemText
                    primary={project.attributes.title}
                    secondary={project.attributes.deadline}
                  />

                  <ListItemAvatar>
                    <Chip
                      label={
                        daysleftCount(project.attributes.deadline) === 0
                          ? "today"
                          : `${daysleftCount(
                              project.attributes.deadline
                            )} days left`
                      }
                      sx={{ bgcolor: "#fcfc5c" }}
                    />
                  </ListItemAvatar>
                </ListItemButton>
              </Paper>
            ))
          : ""}
      </List>
    </Card>
  );
}

export default Notification;
