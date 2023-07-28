import styled from "@emotion/styled";
import { TimelineItem } from "@mui/lab";
import { Box, Card, Paper, Typography } from "@mui/material";

export const TaskBoard = styled(Card)({
    width: "350px", height: "420px",
    "::-webkit-scrollbar": {
        width: "0"
    },
    overflowY: "scroll",
})


export const BoardTitle = styled(Typography)({
    textAlign: "center",
    fontWeight: "700",
    fontSize: "22px",
    color: "#000",
    marginTop: "15px",
})

export const BoardSubTitle = styled(Typography)({
    fontSize: 15, textAlign: "center"
})

// Past Board
export const NotiPaper = styled(Paper)({
    display: "flex",
    alignItems: "center",
    padding: "20px 10px",
    margin: "10px 20px",
})

export const OverdueNoti = styled(Box)({
    display: "flex",
    alignItems: "center",
    color: "red",
    gap: "3px",
})

// Today Board
export const LeftTimeLineItem = styled(TimelineItem)({
    "&::before": { content: "none" }
})

export const WarningNoti = styled(Box)({
    display: "flex",
    alignItems: "center",
    color: "#ffbf00",
})

// Future Board
export const FutureNoti = styled(Box)({
    display: "flex",
    alignItems: "center",
    color: "#159947",
})