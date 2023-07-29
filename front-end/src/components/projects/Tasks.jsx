import React, { useState } from "react";
import { Button, Box, Divider, Stack, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CircleIcon from "@mui/icons-material/Circle";
import TaskCard from "./TaskCard";
import { useSelector } from "react-redux";
import AddTask from "../../modals/AddTask";
import {
  ListGrid,
  StatusTitle,
  TaskListHeader,
  TaskListTitle,
} from "./styles/TasksStyles";

function Tasks() {
  const status = ["Not Started", "In Progress", "Completed"];
  const activeTasks = useSelector((state) => state.cache.activeTasks);
  const [openAddTask, setOpenAddTask] = useState(false);
  console.log(activeTasks);
  console.log("here5");

  // add task
  const handleOpenAddTask = () => {
    setOpenAddTask(true);
  };

  return (
    <>
      <TaskListHeader>
        <TaskListTitle variant="h4" component="div">
          Tasks (5)
        </TaskListTitle>
        <Button
          size="small"
          sx={{ color: "#1AA8E9", fontWeight: "600" }}
          startIcon={<AddIcon />}
          onClick={handleOpenAddTask}
        >
          Add task
        </Button>

        {/* Add task modal */}
        {openAddTask && (
          <AddTask
            openAddTask={openAddTask}
            setOpenAddTask={setOpenAddTask}
            projectID={activeTasks.projectID}
          />
        )}
      </TaskListHeader>
      <Divider sx={{ margin: "0 20px", height: "2px", color: "#828282" }} />

      <Grid sx={{ flexGrow: 1 }}>
        <Grid item xs={12}>
          <ListGrid container justifyContent="space-around">
            {status.map((value, index) => (
              <Grid key={index} item>
                <Box sx={{ display: "flex", minWidth: "280px" }}>
                  <CircleIcon
                    fontSize="small"
                    sx={{
                      color:
                        index === 0
                          ? "#fee135"
                          : index === 1
                          ? "#0DA2FF"
                          : "#3DD598",
                    }}
                  />

                  <StatusTitle variant="h5" gutterBottom>
                    {value} (4)
                  </StatusTitle>
                </Box>
                <Stack spacing={2}>
                  {activeTasks.tasks.length > 0
                    ? activeTasks.tasks.map((task) => {
                        if (task.attributes.status === value)
                          return <TaskCard task={task} />;
                        else return "";
                      })
                    : ""}
                </Stack>
              </Grid>
            ))}
          </ListGrid>
        </Grid>
      </Grid>
    </>
  );
}

export default Tasks;
