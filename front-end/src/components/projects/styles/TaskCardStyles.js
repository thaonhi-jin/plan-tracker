import styled from "@emotion/styled";
import { Box, Checkbox, Paper, Typography } from "@mui/material";

export const PaperStyle = styled(Paper)({
    width: "256px",
    height: "fit-content",
    padding: "12px 12px",
    margin: "12px 0",
    borderRadius: "7px",
})

export const TaskName = styled(Typography)({
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    flexGrow: 4,
    color: "#000",
})

export const TaskDateBox = styled(Box)({
    width: "100%",
    display: "flex",
    alignItems: "center",
    margin: "10px 3px",
})

export const CompletedCheckbox = styled(Box)({
    width: "100%",
    display: "flex",
    alignItems: "center",
    margin: "10px 0",
})

export const CheckboxStyled = styled(Checkbox)({
    width: "20px",
    height: "20px",
    flexGrow: 1,
})

export const CompletedTypo = styled(Typography)({
    flexGrow: 10,
    fontSize: "14px"
})