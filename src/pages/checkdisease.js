import React from "react";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';

import Drawer from "../components/drawer";
import { RetinaScan } from "../components/Retinascan";

const useStyles = makeStyles((theme) => ({
    root: {
        background: "linear-gradient(45deg,#f9f9f9 0%, #e8e8e8 100%)",
    },
    rightgrid: {
        margin: "auto"
    }
}))

export default function Scan() {
    const classes = useStyles();
    return (
        <Grid container className={classes.root}>
            <Grid item xs={1}>
               <Drawer />
            </Grid>
            <Grid item xs={10} className={classes.rightgrid}>
                <RetinaScan />
            </Grid>
        </Grid>
    )
}