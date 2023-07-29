import styled from "@emotion/styled";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

export const TaskListHeader = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "5px 30px",
})

export const TaskListTitle = styled(Typography)({
    textAlign: "center",
    fontWeight: "700",
    fontSize: "20px",
    color: "#000",
})

export const ListGrid = styled(Grid)({
    padding: "30px 0px"
})

export const StatusTitle = styled(Typography)({
    fontWeight: "600",
    color: "#828FA3",
    fontSize: "16px",
    letterSpacing: "0.15em",
    alignItems: "center",
    margin: "0 10px",
})