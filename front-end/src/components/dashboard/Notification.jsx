import React from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Badge,
  Paper,
  Chip,
  ListSubheader,
  Box,
} from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useDispatch, useSelector } from "react-redux";
import { WarningProjectsFilter, daysleftCount } from "../../redux/methods";
import { setProjectActive } from "../../redux/cacheSlice";
import {
  CartSubTitle,
  NotiHeader,
  NotiList,
  NotificationCard,
} from "./styles/dashboardStyles";
import dayjs from "dayjs";

function Notification() {
  const infoProjects = useSelector((state) => state.cache.infoProjects);
  const warningProjects = WarningProjectsFilter(infoProjects);
  const dispatch = useDispatch();

  const compareDaysLeft = (project1, project2) => {
    return (
      dayjs(project1.attributes.deadline) - dayjs(project2.attributes.deadline)
    );
  };

  return (
    <NotificationCard>
      <NotiHeader>
        <Badge sx={{ color: "#1AA8E9" }} badgeContent={warningProjects.length}>
          <NotificationsActiveIcon fontSize="large" sx={{ color: "#01058A" }} />
        </Badge>
        <CartSubTitle>Deadline is due soon</CartSubTitle>
      </NotiHeader>
      <NotiList sx={{}}>
        {warningProjects.length > 0
          ? warningProjects.sort(compareDaysLeft).map((project) => (
              <Paper key={project.id} elevation={1} sx={{ margin: "15px 0" }}>
                <ListItemButton
                  onClick={() => dispatch(setProjectActive(project.id))}
                >
                  <ListItemText
                    primary={project.attributes.title}
                    secondary={dayjs(project.attributes.deadline).format(
                      "DD-MM-YYYY"
                    )}
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
      </NotiList>
    </NotificationCard>
  );
}

export default Notification;
