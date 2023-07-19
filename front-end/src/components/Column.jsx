import React from "react";
import { Paper, Stack, Typography, Box } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import Task from "./Task";

function Column({ statusName, tasks, maxDate }) {
  return (
    <div>
      {/* {console.log(tasks)} */}

      <Box sx={{ display: "flex" }}>
        <CircleIcon
          fontSize="small"
          sx={{
            color:
              statusName === "Not Started"
                ? "#FFD300"
                : statusName === "In Progress"
                ? "#1F51FF"
                : "green",
          }}
        />

        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: "600",
            color: "#828FA3",
            fontSize: "16px",
            letterSpacing: "0.15em",
            alignItems: "center",
            margin: "0 10px",
          }}
        >
          {statusName} ({tasks.length})
        </Typography>
      </Box>
      <Stack spacing={2}>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <Task key={index} taskIndex={index} task={task} maxDate={maxDate} />
          ))
        ) : (
          <Paper elevation={0} sx={{ width: "280px", height: "96px" }} />
        )}
      </Stack>
    </div>
  );
}

export default Column;
