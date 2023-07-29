import styled from "@emotion/styled";
import { Card, CardActions, Typography } from "@mui/material";
import { Box } from "@mui/system";

export const ProjectCardContent = styled(Card)({
    maxWidth: "100%",
    borderRadius: "none",
    boxShadow: "none",
    marginBottom: "50px",
})

export const ProjectTitle = styled(Typography)({
    textAlign: "center",
    fontWeight: "700",
    fontSize: "32px",
    color: "#01058A",
    marginBottom: "10px",
})

export const ProjectInfoBox = styled(Box)({
    width: "40%",
    margin: "20px auto",
})

export const ProjectInfoItem = styled(Box)({
    width: "100%",
    display: "flex",
    alignItems: "center",
})

export const CardActionStyled = styled(CardActions)({
    display: { xs: "none", md: "flex" }, justifyContent: "center"
})