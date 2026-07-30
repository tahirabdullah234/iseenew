import React from "react";

import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import Drawer from "../components/drawer";
import Chat from "../components/chat";

const drawerCollapsed = 97;
const drawerExpanded = 280;

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
        display: "flex",
        overflowX: "hidden",
    },
    drawerWrapper: {
        flexShrink: 0,
        transition: "width 0.3s ease",
    },
    chatArea: {
        flex: 1,
        display: "flex",
        minWidth: 0,
        transition: "max-width 0.3s ease",
    },
}));

export default function ChatMsg() {
    const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const current = drawerOpen ? drawerExpanded : drawerCollapsed;
    return (
        <Box className={classes.root}>
            <Box
                className={classes.drawerWrapper}
                style={{ width: current }}
                onMouseEnter={() => setDrawerOpen(true)}
                onMouseLeave={() => setDrawerOpen(false)}
            >
                <Drawer />
            </Box>
            <Box className={classes.chatArea} style={{ maxWidth: `calc(100% - ${current}px)` }}>
                <Chat />
            </Box>
        </Box>
    );
}
