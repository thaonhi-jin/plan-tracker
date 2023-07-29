import React from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Typography,
  Badge,
  Paper,
  Chip,
  ListSubheader,
} from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useDispatch, useSelector } from "react-redux";
import { WarningProjectsFilter, daysleftCount } from "../../redux/methods";
import { setProjectActive } from "../../redux/cacheSlice";
import { CartSubTitle, NotificationCard } from "./styles/dashboardStyles";

function Notification() {
  const infoProjects = useSelector((state) => state.cache.infoProjects);
  const warningProjects = WarningProjectsFilter(infoProjects);
  const dispatch = useDispatch();

  return (
    <NotificationCard>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <ListSubheader sx={{ textAlign: "center" }}>
          <Badge
            sx={{ color: "#01058A" }}
            badgeContent={warningProjects.length}
          >
            <NotificationsActiveIcon
              fontSize="large"
              sx={{ color: "#01058A" }}
            />
          </Badge>
          <CartSubTitle>Deadline is due soon</CartSubTitle>
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
                      sx={{ bgcolor: "#d9f1ff", color: "#01058A" }}
                    />
                  </ListItemAvatar>
                </ListItemButton>
              </Paper>
            ))
          : ""}
      </List>
    </NotificationCard>
  );
}

export default Notification;
