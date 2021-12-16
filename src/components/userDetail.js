import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import { GraphBp, GraphGlocuse } from "./graphsUserid";
import * as auth from "../Services/auth";
import * as reps from "../Services/reports";

import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import report from '../Assets/reports.svg';
import { setdata } from "../pages/statesSlice";


const useStyles = makeStyles({
    root: {
        // height: "100vh",
        alignItems: "center",
        justifyContent: "center"
    },
    DialogBox: {
        width: "100%",
        borderRadius: "12px",
        background: "#fff",
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
        padding: "25px",
        margin: "auto"
    },
    button: {
        width: "95%",
        marginBottom: 10,
        fontWeight: "bold",
        marginTop: 10,
    },
    docIcon1: {
        width: 50,
        height: 50,
        paddingTop: 10,
        paddingLeft: 5,
    },
})

export default function UserInfo() {
    const classes = useStyles();
    const [user, setuser] = React.useState(null)
    const token = useSelector((state) => state.states.token)
    const location = useLocation();
    const [userId, setuserId] = React.useState(null);
    const [reports, setreports] = React.useState(null);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClick = (data) => {
        dispatch(setdata(data))
        history.push('/result')
    }

    React.useEffect(() => {
        if (location.state) {
            console.log(location.state)
            setuserId(location.state.id);
            auth.get_user(token, location.state.id)
                .then(res => {
                    const user = res.data.user
                    setuser(user)
                    if (res.data.success) {
                        reps.get_reports_user(token, user._id)
                            .then(res => {
                                if (res.data.success) {
                                    setreports(res.data.reports)
                                }
                            })
                    }
                })
        }
    }, [])

    const getAge = (dateString) => {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age
    }

    return (
        <Grid className={classes.root}>
            <Grid container className={classes.DialogBox}>
                <Grid item xs={2}>
                    <Button
                        variant="container"
                        startIcon={<ArrowBackIcon />}
                        className={classes.button}
                        onClick={() => history.goBack()}
                    >
                        Back
                    </Button>
                </Grid>
                <Grid container >
                    <Grid
                        item
                        xs={12}
                        style={{
                            textAlign: "left", textDecoration: "underline", marginBottom: "10px"
                        }}>
                        <Typography variant="h5">Basic Information: </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h6">Name: {user ? user.fname + " " + user.lname : ''}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h6">Gender: {user ? user.gender : ""}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h6">Age: {user ? getAge(user.dob.split("T")[0]) : ""}</Typography>
                    </Grid>
                </Grid>
                <hr />
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        style={{
                            textAlign: "left", textDecoration: "underline", marginBottom: "10px"
                        }}>
                        <Typography variant="h5">Reports: </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {
                            reports ?
                                reports.map((item) => {
                                    return (
                                        <Grid container onClick={() => handleClick(item.report)}>
                                            <img src={report} alt={item.title} className={classes.docIcon1} />
                                        </Grid>
                                    )
                                })
                                :
                                <Grid container>
                                    <Grid
                                        item
                                        xs={12}
                                        style={{
                                            textAlign: "left", marginBottom: "10px"
                                        }}>
                                        <Typography variant="body1">No Reports Avaliable </Typography>
                                    </Grid>
                                </Grid>
                        }
                    </Grid>
                </Grid>
                <hr />
                {
                    userId ?
                        <Grid container className={classes.BPGLtitle}>
                            <Grid
                                item
                                xs={12}
                                style={{
                                    textAlign: "left", textDecoration: "underline", marginBottom: "10px"
                                }}>
                                <Typography variant="h5">Health Information: </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography className={classes.timeline} variant="h6">
                                    BLOOD PRESSURE
                                </Typography>
                                <Grid container className={classes.graphctn}>
                                    <GraphBp userId={userId} />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography className={classes.timeline} variant="h6">
                                    GLUCOSE LEVEL
                                </Typography>
                                <Grid container className={classes.graphctn}>
                                    <GraphGlocuse userId={userId} />
                                </Grid>
                            </Grid>
                        </Grid>
                        :
                        <Grid></Grid>

                }

            </Grid>
        </Grid >
    )
}