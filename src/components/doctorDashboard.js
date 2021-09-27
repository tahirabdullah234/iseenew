import React from "react";
import "./style.css";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Notifications } from "./Notification";
import { Each } from "./eachnotification";
import { Message } from "./message";
const useStyles = makeStyles({
  DialogBox: {
    width: "100%",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
  },
  DashboardHead: {
    width: "100%",
    borderRadius: "12px",
    background: "linear-gradient(#3585da 0%, #59c1e8 100%)",
    boxShadow: "6px 6px 10px rgba(0, 0, 0, 0.16)",
  },
  sameinfont: {
    fontWeight: "bold",
    color: "#3585da",
    textShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
  },
  sameinfont1: { color: "#1061B0", fontWeight: "bold", fontSize: "19px" },
  sameinfont2: {
    color: "#1061B0",
    fontSize: "19px",
    textDecorationLine: "underline",
  },
  sameinfont3: {
    fontWeight: "bold",
    color: "#fff",
    textShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    textAlign: "start",
  },
  NotificationsFont: {
    fontSize: "15px",
    color: "#fff",
  },
  BellIcon: {
    width: "50%",
    justifyContent: "flex-start",
  },
  notifications: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "1px",
  },
  Tablecontentbox: {
    width: "100%",
    borderRadius: "10px",
    background: "linear-gradient(45deg,#59c1e8 0%, #59c1e8 100%)",
    filter: "drop-shadow(6px 6px 10px rgba(0, 0, 0, 0.16))",
    display: "flex",
    marginTop: "30px",
    padding: "10px",
  },
  Reportheader: {
    width: "100%",
    borderRadius: "12px",
    background: "linear-gradient(45deg,#59c1e8 0%, #3585da 100%)",
    boxShadow: "6px 6px 10px rgba(0, 0, 0, 0.16)",
    display: "flex",
    marginTop: "30px",
    padding: "10px",
  },
  TableContentFont: {
    fontWeight: "bold",
    fontSize: "14px",
    color: "#fff",
    textAlign: "start",
  },
  appmsg: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
  },
  fonttxt: {
    fontWeight: "bold",
    color: "#3585da",
    textShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
  },
  messageDisplay: {
    width: "100%",
    borderRadius: "10px",
    background: "#fff",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    padding: "5px",
  },
  AllGridsAdjust: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  AppAdjust: {
    display: "flex",
    flexDirection: "column",
  },
  AppAdjust1: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  Apptxt: { display: "flex", textAlign: "start" },
});
function PatientRequest() {
  const classes = useStyles();
  return (
    <Grid item xs={11} className={classes.Tablecontentbox}>
      <Grid container>
        <Grid item xs={4} sm={2} className={classes.TableContentFont}>
          <Typography>39009101</Typography>
        </Grid>
        <Grid item xs={5} sm={3} className={classes.TableContentFont}>
          <Typography>MR. A. ASLAM ghadjl</Typography>
        </Grid>
        <Grid item xs={3} sm={3} className={classes.TableContentFont}>
          <Typography>21/08/2021</Typography>
        </Grid>
        <Grid item xs={4} sm={2} className={classes.TableContentFont}>
          <Typography>REPORT</Typography>
        </Grid>
        <Grid item xs={8} sm={2} className={classes.TableContentFont}>
          <Typography>ACCEPT</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
function Appointments() {
  const classes = useStyles();
  return (
    <Grid container className={classes.AppAdjust1}>
      <Grid item xs={4} className={classes.Apptxt}>
        <Typography className={classes.sameinfont1}>
          AUG 22 2021 3:15 PM
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography className={classes.sameinfont1}>ALEEM KHAN</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography className={classes.sameinfont2}>MEETING LINK</Typography>
      </Grid>
    </Grid>
  );
}
export function DoctorDashboard() {
  const classes = useStyles();
  return (
    <div className="dashdiv">
      <Typography style={{ fontSize: "30px" }} className={classes.sameinfont1}>
        WELCOME DR. FAISAL
      </Typography>
      <Grid container className={classes.AllGridsAdjust}>
        <Grid
          item
          md={6}
          xs={11}
          style={{ marginTop: "10px", padding: "10px" }}
          className={classes.DialogBox}
        >
          <Typography
            style={{ fontSize: "26px" }}
            className={classes.sameinfont}
          >
            APPOINTMENTS
          </Typography>
          <Grid item className={classes.AppAdjust}>
            <Grid container style={{ marginTop: "10px" }}>
              <Appointments />
            </Grid>
            <Grid container style={{ marginTop: "20px" }}>
              <Appointments />
            </Grid>
            <Grid container style={{ marginTop: "20px" }}>
              <Appointments />
            </Grid>
            <Grid container style={{ marginTop: "20px" }}>
              <Appointments />
            </Grid>
            <Grid container style={{ marginTop: "20px" }}>
              <Appointments />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          md={5}
          xs={11}
          style={{ marginTop: "10px", padding: "10px" }}
          className={classes.DashboardHead}
        >
          <Notifications />
          <Each />
          <Each />
          <Each />
          <Each />
        </Grid>
        <Grid
          item
          md={6}
          xs={11}
          className={classes.DialogBox}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "20px",
          }}
        >
          <Grid item xs={11} className={classes.Reportheader}>
            <Grid container>
              <Grid item xs={4} sm={2} className={classes.TableContentFont}>
                <Typography>PATIENT ID</Typography>
              </Grid>
              <Grid item xs={5} sm={3} className={classes.TableContentFont}>
                <Typography>PATIENT NAME</Typography>
              </Grid>
              <Grid item xs={3} sm={3} className={classes.TableContentFont}>
                <Typography>APP. DATE</Typography>
              </Grid>
              <Grid item xs={4} sm={2} className={classes.TableContentFont}>
                <Typography>REPORT</Typography>
              </Grid>
              <Grid item xs={8} sm={2} className={classes.TableContentFont}>
                <Typography>ACTION</Typography>
              </Grid>
            </Grid>
          </Grid>
          <PatientRequest />
          <PatientRequest />
          <PatientRequest />
          <Grid
            container
            style={{ marginBottom: "30px", justifyContent: "center" }}
          >
            <PatientRequest />
          </Grid>
        </Grid>
        <Grid
          item
          md={5}
          xs={11}
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "15px",
          }}
          className={classes.DialogBox}
        >
          <Typography
            style={{ fontSize: "23px", textAlign: "center" }}
            className={classes.fonttxt}
          >
            MESSAGES
          </Typography>

          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
        </Grid>
      </Grid>
    </div>
  );
}
