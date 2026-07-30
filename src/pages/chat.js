import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Drawer from "../components/drawer";
import Chat from "../components/chat";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
        display: "flex",
    },
    drawerWrapper: {
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 1200,
    },
    chatArea: {
        flex: 1,
        display: "flex",
        minWidth: 0,
        marginLeft: `calc(${theme.spacing(12)}px + 1px)`,
    },
}));

export default function ChatMsg() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.drawerWrapper}>
                <Drawer />
            </div>
            <div className={classes.chatArea}>
                <Chat />
            </div>
        </div>
    );
}
