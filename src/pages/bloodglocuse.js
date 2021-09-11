import React from 'react';

import Drawer from "../components/drawer";
import { ManageGL as MBG } from "../components/manageGlucoseLevel";
import Grid from "@material-ui/core/grid";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        background: "linear-gradient(45deg,#f9f9f9 0%, #e8e8e8 100%)",
    },
    blodpressuregrid: {
        margin: "auto"
    }
}))

export default function BG() {
    const classes = useStyles();
    return (
        <Grid container className={classes.root}>
            <Grid item xs={1}>
                <Drawer />
            </Grid>
            <Grid item xs={10} className={classes.blodpressuregrid}>
                <MBG />
            </Grid>
        </Grid>
    )
}

