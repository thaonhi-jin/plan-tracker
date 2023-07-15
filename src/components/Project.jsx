import React from "react";
import { useSelector } from "react-redux";
import { convertDate } from "../redux/projectSlice";

import Column from "./Column";
import { Box, Grid, Typography } from "@mui/material";

function Project() {
  const status = ["Not Started", "In Progress", "Completed"];
  const projects = useSelector((state) => state.projects);
  const activeProject = projects.find((project) => project.isActive);
  const filterTasks = (status) => {
    return activeProject.tasks.filter((task) => task.status === status);
  };

  return (
    <div
      style={{
        marginLeft: "150px",
      }}
    >
      <Box sx={{ padding: "100px 0 50px 200px" }}>
        <Typography>Description: {activeProject.description}</Typography>
        <Typography>
          Deadline:{" "}
          {activeProject.deadlineTime +
            " " +
            convertDate(activeProject.deadlineDate)}
        </Typography>

        <Typography>
          Start: {convertDate(activeProject["start-date"])}
        </Typography>
        <Typography>
          Finish: {convertDate(activeProject["end-date"])}
        </Typography>
        {/* <Typography>
          Completed: <Checkbox checked={currentTheme === "#ABD5AB"} />
        </Typography> */}
        {/* {currentTheme === "#F28B88" && (
          <Stack spacing={2} direction="row">
            <Button variant="outlined">Set new deadline</Button>
            <Button variant="outlined">Delete Project</Button>
          </Stack>
        )} */}
      </Box>
      <Grid sx={{ flexGrow: 1 }} container spacing={45}>
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="center"
            spacing={15}
            sx={{ paddingTop: "20px" }}
          >
            {status.map((value, index) => (
              <Grid key={index} item>
                <Column
                  statusName={value}
                  tasks={filterTasks(value)}
                  maxDate={activeProject["end-date"]}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Project;
