import React from "react";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import Drawer from "../components/drawer";
import Chat from "../components/chat";

const useStyles = makeStyles((theme) => ({
    root: {
        background: "linear-gradient(45deg,#f9f9f9 0%, #e8e8e8 100%)",
        height: "100vh",
    },
    rightgrid: {
        margin: "auto",
    },
}));

export default function ChatMsg() {
    const classes = useStyles();
    return (
        <Grid container className={classes.root}>
            <Grid item xs={1}>
                <Drawer />
            </Grid>
            <Grid item xs={10} className={classes.rightgrid}>
                <Chat />
            </Grid>
        </Grid>
    );
}
