import React from "react";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: 10,
        background: "transparent",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        textAlign: "center",
    },
    heading: {
        color: "#1b9b85",
        fontWeight: "bold",
        textDecoration: "underline",
    },
    subheading: {
        color: "#1b9b85",
        fontWeight: "bold",
    },
    subheadingava: {
        color: "#1b9b85",
        fontWeight: "bold",
        margin: "auto",
    },
    uploadGrid: {
        borderRadius: 10,
        background: "#fff",
        boxShadow: "6px 6px 12px rgba(0, 0, 0, 0.16)",
        width: "90%",
        margin: "auto",
        marginTop: 20,
        padding: 20,
        justifyContent: "space-between",
    },
    uploadBtn: {
        background: "#3baa96",
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
        borderRadius: 15,
        color: "#fff",
        fontWeight: "bold",
        padding: "5px 30px 5px 30px",
    },
    avaliabetempgrid: {
        borderRadius: 10,
        background: "#fff",
        boxShadow: "6px 6px 12px rgba(0, 0, 0, 0.16)",
        width: "90%",
        margin: "auto",
        marginTop: 20,
        padding: 20,
    },
    details: {
        borderRadius: 10,
        background: "#fff",
        boxShadow: "6px 6px 12px rgba(0, 0, 0, 0.16)",
        margin: "auto",
        marginTop: 20,
        padding: 20,
        justifyContent: "space-between",
        border: "1px solid #1b9b85",
        alignItems: "center",
    },
    gridcenter: {
        margin: "auto",
    },
}))


export default function TemplateManagement() {
    const classes = useStyles();
    return (
        <Grid className={classes.root}>
            <Typography variant="h5" className={classes.heading}>TEMPLATE MANAGER</Typography>
            <Grid container className={classes.uploadGrid}>
                <Typography variant="h6" className={classes.subheading}>ADD NEW TEMPLATE</Typography>
                <Button
                    variant="contained"
                    className={classes.uploadBtn}
                    startIcon={<CloudUploadIcon />}
                >UPLOAD</Button>
            </Grid>
            <Grid item className={classes.avaliabetempgrid}>
                <Typography variant="h6" className={classes.subheadingava}>AVALIABLE TEMPLATES</Typography>
                <Grid>
                    <Grid item xs={8} className={classes.gridcenter}>
                        <AvaliableTemplateDetails />
                        <AvaliableTemplateDetails />
                        <AvaliableTemplateDetails />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

function AvaliableTemplateDetails() {
    const classes = useStyles();
    return (
        <Grid container className={classes.details}>
            <Typography variant="h6" className={classes.subheading}>TEMPLATE 1</Typography>
            <Typography variant="h6" className={classes.subheading}>21/12/2021</Typography>
            <IconButton aria-label="delete">
                <DeleteIcon />
            </IconButton>
        </Grid>
    )
}