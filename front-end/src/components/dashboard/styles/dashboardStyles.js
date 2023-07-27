import styled from "@emotion/styled";
import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";

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
    marginRight: "100px",
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
    fontSize: "32px"
})

export const WidgetIcon = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "5px",
    flexGrow: 1,
})

export const ChartTitle = styled(Typography)({
    textAlign: "center", marginBottom: "15px"
})