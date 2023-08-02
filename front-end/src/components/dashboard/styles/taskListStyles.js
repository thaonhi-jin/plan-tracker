import styled from "@emotion/styled";
import { TimelineItem } from "@mui/lab";
import { Box, Card, Paper, Typography } from "@mui/material";

export const TaskBoard = styled(Card)({
    width: "350px", height: "470px",
    "::-webkit-scrollbar": {
        width: "0"
    },
    overflowY: "scroll",
    position: 'relative'
})

export const BoardHeader = styled(Box)({
    padding: "15px 0",
    backgroundColor: "#fff",
    zIndex: "300",
    position: "sticky",
    top: "0",
})


export const BoardTitle = styled(Typography)({
    textAlign: "center",
    fontWeight: "700",
    fontSize: "22px",
    color: "#01058A",

})

export const BoardSubTitle = styled(Typography)({
    fontSize: 15, textAlign: "center",
    color: "#1AA8E9"
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
    color: "#FC5A5A",
    gap: "3px",
})

// Today Board
export const LeftTimeLineItem = styled(TimelineItem)({
    "&::before": { content: "none" }
})

export const WarningNoti = styled(Box)({
    display: "flex",
    alignItems: "center",
    color: "#0DA2FF",
})

// Future Board
export const FutureNoti = styled(Box)({
    display: "flex",
    alignItems: "center",
    color: "#3DD598",
})