import styled from "@emotion/styled";
import { Card, CardContent, List, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Line } from "recharts";

export const WelcomeTypo = styled(Typography)({
    fontSize: 18,
    color: "text.secondary"
});

export const HeaderTypo = styled(Typography)({
    fontWeight: "700",
    fontSize: "32px",
    color: "#000",
    marginBottom: "10px",
});

export const DateBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    marginRight: "30px",
    gap: "15px",
})

export const Widget = styled(Card)({
    maxWidth: 200,
    flex: 1,
    margin: "0px 20px",
    padding: "10px",
})

export const WidgetContent = styled(CardContent)({
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: "15px",
    ":last-child": { padding: "10px" },
})

export const WidgetNumber = styled(Typography)({
    marginLeft: "5px",
    fontSize: "32px",
    color: "#01058A"
})

export const WidgetIcon = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "5px",
    flexGrow: 1,
})

// Chart
export const ChartCard = styled(Card)({
    width: "fit-content",
    paddingRight: "50px",
    marginLeft: "15px",
})

export const ChartTitle = styled(Typography)({
    textAlign: "center", margin: "15px auto",
    fontWeight: "700",
    color: "#01058A"
})

// Notification
export const NotificationCard = styled(Card)({
    maxWidth: "340px",
    height: "443px",

    "::-webkit-scrollbar": {
        width: "0",
    },
    overflowY: "scroll",
    position: 'relative'
})

export const NotiHeader = styled(Box)({
    textAlign: "center",
    backgroundColor: "#fff",
    width: "340px",
    height: "70px",
    padding: "30px 0 0 0",
    zIndex: "3000",
    position: "sticky",
    top: "0",
})

export const NotiList = styled(List)({
    width: "100%",
    maxWidth: "310px",
    bgcolor: "background.paper",
    padding: "0 15px",
})

export const CartSubTitle = styled(Typography)({
    fontSize: 15, textAlign: "center", color: "#1AA8E9"
})