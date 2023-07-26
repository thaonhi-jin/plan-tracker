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

function Notification() {
  return (
    <Card
      sx={{
        width: "300px",
        marginLeft: "20px",
        height: "400px",
        padding: "15px",
      }}
    >
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        // subheader={
        //   <Typography sx={{ fontSize: 22, fontWeight: 700 }}>
        //     Upcoming
        //   </Typography>
        // }
      >
        <ListSubheader sx={{ textAlign: "center" }}>
          <Badge color="warning" badgeContent={3}>
            <NotificationsActiveIcon fontSize="large" />
          </Badge>
          <Typography
            sx={{ fontSize: 15, textAlign: "center" }}
            color="text.secondary"
          >
            Deadline is due soon
          </Typography>
        </ListSubheader>
        <Paper elevation={1} sx={{ margin: "15px 0" }}>
          <ListItemButton>
            <ListItemText primary="Project" secondary="Deadline: Jan 9, 2014" />

            <ListItemAvatar>
              <Chip label="2 days due" sx={{ bgcolor: "#fcfc5c" }} />
            </ListItemAvatar>
          </ListItemButton>
        </Paper>

        <Paper elevation={1} sx={{ margin: "15px 0" }}>
          <ListItemButton>
            <ListItemText primary="Project" secondary="Deadline: Jan 9, 2014" />

            <ListItemAvatar>
              <Chip label="2 days due" sx={{ bgcolor: "#fcfc5c" }} />
            </ListItemAvatar>
          </ListItemButton>
        </Paper>

        <Paper elevation={1} sx={{ margin: "15px 0" }}>
          <ListItemButton>
            <ListItemText primary="Project" secondary="Deadline: Jan 9, 2014" />

            <ListItemAvatar>
              <Chip label="2 days due" sx={{ bgcolor: "#fcfc5c" }} />
            </ListItemAvatar>
          </ListItemButton>
        </Paper>
      </List>
    </Card>
  );
}

export default Notification;
