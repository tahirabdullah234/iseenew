import React from "react";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import Drawer from "../components/drawer";
import { PatientDashboard } from "../components/PatientDashboard";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(135deg, #f5f7fa 0%, #e4e9f0 100%)",
    minHeight: "100vh",
    overflowX: "hidden",
    maxWidth: "100%",
  },
  content: {
    padding: 0,
  },
}));

export default function Patient() {
    const classes = useStyles();
    return (
        <Grid container className={classes.root}>
            <Grid item xs={1}>
                <Drawer />
            </Grid>
            <Grid item xs={11} className={classes.content}>
                <PatientDashboard />
            </Grid>
        </Grid>
    )
}
