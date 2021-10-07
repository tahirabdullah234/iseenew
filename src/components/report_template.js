import React from "react";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"

import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        justifyContent: "space-between",
        backgroundColor: "#003C72",
        color: "#fff",
        padding: "10px",
    },
    maincontainer: {
        backgroundColor: "rgba(40,44,52,0.2)",
        padding: "10px",
    },
    patientInfo: {
        justifyContent: "space-around",
        color: "#282c34",
        textDecoration: "underline",
        padding: "10px",
    },
    fontbold: {
        fontWeight: "bold",
    },
    resultgrid: {
        padding: "0px 10px 0px 10px",
        color: "#282c34",
    },
    margin5: {
        marginLeft: "5px",
        marginRight: "5px",
    },

}))

export default function Template() {
    const classes = useStyles();
    const user = useSelector((state) => state.states.user)
    const data = useSelector((state) => state.states.data)
    const name = useSelector((state) => state.states.name)

    return (
        <Grid item xs={12}>
            <Grid container className={classes.root}>
                <Typography vatiant="h4">
                    ISEE | Diabetic Retinopahty Detection System
                </Typography>
                <Typography vatiant="h4">
                    Diabetic Retinopathy Screening Report
                </Typography>
            </Grid>
            <Grid container className={classes.maincontainer}>
                <Typography vatiant="h6">
                    Patient Information:
                </Typography>
            </Grid>
            <Grid container className={classes.patientInfo}>
                <Grid item xs={6}>
                    <Grid container>
                        <Typography vatiant="body1" className={classes.fontbold}>
                            Patient ID:
                        </Typography>
                        <Typography vatiant="body1">
                            {user._id}
                        </Typography>
                    </Grid>
                    <Grid container>
                        <Typography vatiant="body1" className={classes.fontbold}>
                            Report ID:
                        </Typography>
                        <Typography vatiant="body1">
                            {data._id}
                        </Typography>
                    </Grid>
                    <Grid container>
                        <Typography vatiant="body1" className={classes.fontbold}>
                            Date:
                        </Typography>
                        <Typography vatiant="body1">
                            {data.date}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container>
                        <Typography vatiant="body1" className={classes.fontbold}>
                            Patient Name:
                        </Typography>
                        <Typography vatiant="body1">
                            {name}
                        </Typography>
                    </Grid>
                    <Grid container>
                        <Typography vatiant="body1" className={classes.fontbold}>
                            Date Of Birth:
                        </Typography>
                        <Typography vatiant="body1">
                            {user.dob.slice(0, 10)}
                        </Typography>
                    </Grid>
                    <Grid container>
                        <Typography vatiant="body1" className={classes.fontbold}>
                            Gender:
                        </Typography>
                        <Typography vatiant="body1">
                            {user.gender}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <hr />
            <Grid container className={classes.resultgrid}>
                <Typography variant="h6" style={{ "textDecoration": "underline" }}>
                    Diabetic Retinopathy Screening Summary:
                </Typography>
                <Typography variant="body1" className={classes.margin5}>
                    Screening Result:
                </Typography>
                <Typography variant="body1" className={classes.margin5}>
                    Negative for referable diabetic retinopathy.
                </Typography>
            </Grid>
            <Grid conatiner justifyContent="space-evenly">
                <Grid container className={classes.resultgrid}>
                    <Typography variant="body1" className={classes.margin5}>
                        Patient Eye Scan:
                    </Typography>
                    <Typography variant="body1">
                        No apparent signs of DR detected [0.0]
                    </Typography>
                    <img
                        src={data ? `http://localhost:5000/images/${data.scan}` : ''}
                        alt="Eye Scan"
                        style={{
                            width: "128px",
                            height: "128px",
                            objectFit: "cover",
                            borderRadius: "50%",
                        }}
                    />
                </Grid>
                <hr />
                <Grid container className={classes.margin5}>
                    <Typography variant="body1">
                        Plan and Recommendations:
                    </Typography>
                    <List>
                        <ListItem>
                            <ListItemText primary={
                                <Typography variant="body1">
                                    Return for retinal imaging within 12 months.
                                </Typography>
                            } />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={
                                <Typography variant="body1">
                                    As per ADA recommendations, emphasize the importance of
                                    controlling blood sugar, cholesterol and blood pressure as well
                                    the importance of routine follow-up with an ophthalmologist
                                    regardless of whether visual symptoms are present or absent.
                                </Typography>
                            } />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={
                                <Typography variant="body1">
                                    Report Date: {data.date}
                                </Typography>
                            } />
                        </ListItem>
                    </List>
                </Grid>
                <Grid container className={classes.resultgrid}>
                    <Typography variant="h6">
                        Note: This report is automatically generated using iSee DR
                        Classifier and only provides a Diabetic Retinopathy (DR)
                        screeningassessment. This 1/1 screening does not take place of a
                        regular eye examination for the purpose of assessing the presence of
                        age-related macular degeneration, glaucoma, cataract, anterior
                        segment diseases or other possible vision threatening conditions
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}