import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { GraphBp, GraphGlocuse } from "./graphsUserid";
import Reports from "./reportsuser";
import * as auth from "../Services/auth";

import { useSelector } from "react-redux";
import { useLocation } from "react-router";


const useStyles = makeStyles({

})

export default function UserInfo() {
    const classes = useStyles();
    const [user, setuser] = React.useState(null)
    const token = useSelector((state) => state.states.token)
    const location = useLocation();
    const [userId, setuserId] = React.useState(null);

    React.useEffect(() => {
        if (location.state) {
            console.log(location.state)
            setuserId(location.state.id);
            auth.get_user(token, location.state.id)
                .then(res => {
                    if (res.data.success) {
                        setuser(res.data.user)
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
        <Grid>
            <Grid container>
                <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Typography variant="h4">Basic Information: </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="body1">Name: {user ? user.fname + " " + user.lname : ''}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="body1">Gender: {user ? user.gender : ""}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="body1">Age: {user ? getAge(user.dob.split("T")[0]) : ""}</Typography>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <Reports />
                </Grid>
            </Grid>
            {
                userId ?
                    <Grid container className={classes.BPGLtitle}>
                        <Grid item xs={12} md={6}>
                            <Typography className={classes.timeline}>
                                BLOOD PRESSURE
                            </Typography>
                            <Grid container className={classes.graphctn}>
                                <GraphBp userId={userId} />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography className={classes.timeline}>
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
    )
}