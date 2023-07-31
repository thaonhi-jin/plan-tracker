import styled from "@emotion/styled";
import { Drawer, List, ListItem, ListItemButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AdbIcon from "@mui/icons-material/Adb";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

const sidebarWidth = 230;
export const SideBar = styled(Drawer)({
    width: sidebarWidth,
    height: "100vh",
    "& > div": { borderRight: "none" },
})

export const SideBarContent = styled(List)({
    width: sidebarWidth,
    height: "100vh",
    backgroundColor: "#00024C",
    overflow: "hidden",
    paddingRight: "20px",

    "::-webkit-scrollbar": {
        width: "0",
    },
    overflowY: "scroll",
})

export const LogoAppContainer = styled(ListItem)({
    padding: "16px 10px",
    width: "230px",
    maxWidth: "250px",
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "#00024C",
    zIndex: 3000,
    height: "95px",
})

export const LogoApp = styled(Box)({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 0",
})

export const LogoIcon = styled(AdbIcon)({
    flexGrow: 1,
    fontSize: "28px",
    display: { xs: "none", md: "flex" },
    color: "#0DA2FF",
    marginRight: "5px"
})

export const LogoTitle = styled(Typography)({
    flexGrow: 5,
    display: { xs: "none", md: "flex" },
    fontFamily:
        "ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
    fontWeight: 700,
    color: "#fff",
    textDecoration: "none",
    fontSize: "28px",
    ":hover": {
        color: "#0DA2FF",
    },
})

export const ProjectList = styled(ListItem)({
    position: 'fixed',
    top: 95,
    left: 0,
    backgroundColor: "#00024C",
    zIndex: 4000,
    width: 250,
    padding: "14px 16px 0px 16px",
})

export const AllProjectBox = styled(Box)({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
})

export const AllProjectContent = styled(Typography)({
    color: "#1AA8E9",
    fontSize: "20px",
    fontWeight: "700"
})

export const AddIconStyle = styled(AddBoxOutlinedIcon)({
    color: "#1AA8E9",
    ":hover": {
        backgroundColor: "#0DA2FF",
        color: "#fff",
        borderRadius: "5px",
    },
})

export const ProjectItem = styled(ListItemButton)({
    display: "flex",
    alignItems: "flex-start",
    padding: "16px 16px",
    borderRadius: "0 10px 10px 0",
    margin: "10px 0",
    ":hover": {
        backgroundColor: "#8cd3ff",
        color: "#1AA8E9",
    },
    color: "#fff",
})

export const ProjectItemTitle = styled(Typography)({
    fontSize: "18px",
    fontWeight: "500"
})