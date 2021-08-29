import React from "react";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Bellicon from "../Assets/bell.svg";

import { Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
const useStyles = makeStyles({
  DashboardHead: {
    width: "100%",
    borderRadius: "12px",
    background: "linear-gradient(#3585da 0%, #59c1e8 100%)",
    boxShadow: "6px 6px 10px rgba(0, 0, 0, 0.16)",
    display: "flex",
    padding: "10px",
  },
  NotificationsFont: {
    fontSize: "15px",
    color: "#fff",
  },
  BellIcon: {
    width: "50%",
    justifyContent: "flex-start",
  },
  dialogBox: {
    width: "100%",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
  },
  fonttxt: {
    fontWeight: "bold",
    color: "#3585da",
    textShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
  },

  timeline: {
    fontWeight: "600",
    fontSize: "21px",
    textAlign: "center",
    color: "#3585da",
  },
  messageDisplay: {
    width: "100%",
    borderRadius: "10px",
    background: "#fff",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    padding: "5px",
  },
  sameinfont: {
    fontWeight: "bold",
    color: "#fff",
    textShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    textAlign: "start",
  },
  percir: {
    display: "flex",
    justifyContent: "flex-start",
  },
  healthconcol: {
    display: "flex",
    flexDirection: "row",
  },
  healthcolset: {
    display: "flex",
    alignItems: "center",
  },
  healthcol: {
    height: "15px",
    width: "15px",
  },
  healthcontxt: {
    fontWeight: "bold",
    fontSize: "17.5px",
    color: "#fff",
    textShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    textAlign: "start",
  },
  notifications: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  boxdis: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  BPGLtitle: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "10px",
  },
  BPGLgraph: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  setappointtxt: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  appmsg: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
  },
  msg: {
    fontWeight: "bold",
    fontSize: "19px",
    textAlign: "center",
    color: "#3585da",
    textShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
  },
  readnow: {
    fontWeight: "bold",
    fontSize: "13px",
    textAlign: "end",
    color: "#3585da",
    textShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    textDecorationLine: "underline",
  },
});

export function PatientDashboard() {
  const classes = useStyles();
  return (
    <div className="dashdiv">
      <Typography
        style={{ color: "#1061B0", fontSize: "30px", fontWeight: "bold" }}
      >
        Welcome Abdullah Tahir
      </Typography>
      <Grid container md={10} xs={11}>
        <Grid container className={classes.DashboardHead}>
          <Grid item xs={12} sm={6}>
            <Typography
              style={{ fontSize: "35px", marginBottom: "30px" }}
              className={classes.sameinfont}
            >
              Health
            </Typography>
            <Grid
              container
              style={{ marginBottom: "40px" }}
              className={classes.healthcolset}
            >
              <CircularProgress
                style={{ marginRight: "20px", width: "103px", height: "101px" }}
                className={classes.percir}
              />
              <Typography
                className={classes.sameinfont}
                style={{ fontSize: "30px" }}
              >
                You are healthy!
              </Typography>
            </Grid>
            <Grid container className={classes.heathconcol}>
              <Grid container xs={12} md={2} className={classes.healthcolset}>
                <Grid
                  item
                  style={{ background: " #85fcbc" }}
                  className={classes.healthcol}
                />
                <Typography className={classes.healthcontxt}>Safe</Typography>
              </Grid>
              <Grid container xs={12} md={3} className={classes.healthcolset}>
                <Grid
                  item
                  style={{ background: " #ffbf6b" }}
                  className={classes.healthcol}
                />
                <Typography className={classes.healthcontxt}>
                  Be cautious
                </Typography>
              </Grid>
              <Grid container xs={12} md={3} className={classes.healthcolset}>
                <Grid
                  item
                  style={{ background: "#fa6b6b" }}
                  className={classes.healthcol}
                />
                <Typography className={classes.healthcontxt}>
                  See doctor
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              style={{ fontSize: "35px", marginBottom: "10px" }}
              className={classes.sameinfont}
            >
              Notifications
            </Typography>
            <div className={classes.notifications}>
              <Grid item xs={2} sm={2} md={1}>
                <div className="logoDiv">
                  <img
                    src={Bellicon}
                    className={classes.BellIcon}
                    alt="error found"
                  ></img>
                </div>
              </Grid>
              <Typography className={classes.NotificationsFont}>
                10:25 AM : Your last reports are ready.
              </Typography>
              <Typography
                className={classes.NotificationsFont}
                style={{ textDecorationLine: "underline" }}
              >
                Dismiss
              </Typography>
            </div>
            <div className={classes.notifications}>
              <Grid item xs={2} sm={2} md={1}>
                <div className="logoDiv">
                  <img
                    src={Bellicon}
                    className={classes.BellIcon}
                    alt="error found"
                  ></img>
                </div>
              </Grid>
              <Typography className={classes.NotificationsFont}>
                9:15 PM : Your blood pressure input is due.
              </Typography>
              <Typography
                className={classes.NotificationsFont}
                style={{ textDecorationLine: "underline" }}
              >
                Dismiss
              </Typography>
            </div>
            <div className={classes.notifications}>
              <Grid item xs={2} sm={2} md={1}>
                <div className="logoDiv">
                  <img
                    src={Bellicon}
                    className={classes.BellIcon}
                    alt="error found"
                  ></img>
                </div>
              </Grid>
              <Typography className={classes.NotificationsFont}>
                9:15 AM : Your glucose level input is due.
              </Typography>
              <Typography
                className={classes.NotificationsFont}
                style={{ textDecorationLine: "underline" }}
              >
                Dismiss
              </Typography>
            </div>
            <div className={classes.notifications}>
              <Grid item xs={2} sm={2} md={1}>
                <div className="logoDiv">
                  <img
                    src={Bellicon}
                    className={classes.BellIcon}
                    alt="error found"
                  ></img>
                </div>
              </Grid>
              <Typography className={classes.NotificationsFont}>
                5:21 PM : Your Appointment is due.
              </Typography>
              <Typography
                className={classes.NotificationsFont}
                style={{ textDecorationLine: "underline" }}
              >
                Dismiss
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid container className={classes.boxdis} md={10} xs={11}>
        <Grid
          container
          sm={7}
          xs={12}
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            marginTop: "20px",
          }}
          className={classes.dialogBox}
        >
          <Grid
            item
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography
              style={{ fontSize: "23px" }}
              className={classes.fonttxt}
            >
              WEEKLY STATISTICS
            </Typography>
            <Typography className={classes.timeline}>
              JUL 21 - JUL 28
            </Typography>
          </Grid>
          <Grid item className={classes.BPGLtitle}>
            <Typography className={classes.timeline}>BLOOD PRESSURE</Typography>
            <Typography className={classes.timeline}> GLUCOSE LEVEL</Typography>
          </Grid>
          <Grid
            container
            className={classes.BPGLgraph}
            style={{ marginTop: "5px" }}
          >
            <Grid container xs={2} className={classes.healthcolset}>
              <Grid
                item
                style={{ background: "#6a6cb9" }}
                className={classes.healthcol}
              />
              <Typography>SBP</Typography>
            </Grid>
            <Grid container xs={4} className={classes.healthcolset}>
              <Grid
                item
                style={{ background: "#ef8282" }}
                className={classes.healthcol}
              />
              <Typography>DBP</Typography>
            </Grid>
            <Grid container xs={3} className={classes.healthcolset}>
              <Grid
                item
                style={{ background: "#ecabab" }}
                className={classes.healthcol}
              />
              <Typography>Random</Typography>
            </Grid>
            <Grid container xs={2} className={classes.healthcolset}>
              <Grid
                item
                style={{ background: "#f7d9a1" }}
                className={classes.healthcol}
              />
              <Typography>Fasting</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid sm={4} xs={12} className={classes.appmsg} container>
          <Grid
            container
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "10px",
            }}
            className={classes.dialogBox}
          >
            <Typography
              style={{ fontSize: "23px", textAlign: "center" }}
              className={classes.fonttxt}
            >
              LATEST APPOINTMENT
            </Typography>
            <Grid container className={classes.setappointtxt}>
              <Grid sm={12} md={4} item>
                <Typography
                  style={{ fontSize: "23px", textAlign: "center" }}
                  className={classes.fonttxt}
                >
                  AUG 21
                </Typography>
                <Typography
                  style={{ fontSize: "35px", textAlign: "center" }}
                  className={classes.fonttxt}
                >
                  2021
                </Typography>
              </Grid>
              <Grid sm={12} md={8} item>
                <Typography
                  style={{ fontSize: "23px", textAlign: "start" }}
                  className={classes.fonttxt}
                >
                  Dr. Aslam Jamshaid
                </Typography>
                <Typography
                  style={{ fontSize: "16px", textAlign: "start" }}
                  className={classes.fonttxt}
                >
                  Senior ophtalmologist
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            style={{
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
              marginTop: "20px",
              padding: "10px",
            }}
            className={classes.dialogBox}
          >
            <Typography
              style={{ fontSize: "23px", textAlign: "center" }}
              className={classes.fonttxt}
            >
              MESSAGES
            </Typography>

            <Grid item xs={9} className={classes.messageDisplay}>
              <Typography className={classes.msg}>
                Your latest reports are ready
              </Typography>
              <Typography className={classes.readnow}>READ NOW</Typography>
            </Grid>
            <Grid
              item
              xs={9}
              style={{ marginTop: "15px" }}
              className={classes.messageDisplay}
            >
              <Typography className={classes.msg}>
                Your appointment with Dr. Aslam jamshaid is ready
              </Typography>
              <Typography className={classes.readnow}>READ NOW</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
