import React from "react";
import "./style.css";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Bellicon from "../Assets/bell.svg";
import Messageicon from "../Assets/messageIcon.svg";
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
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "30px",
    padding: "10px",
  },
  Reportheader: {
    width: "100%",
    borderRadius: "12px",
    background: "linear-gradient(45deg,#59c1e8 0%, #3585da 100%)",
    boxShadow: "6px 6px 10px rgba(0, 0, 0, 0.16)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "30px",
    padding: "10px",
  },
  TableContentFont: {
    fontWeight: "bold",
    fontSize: "14px",
    color: "#fff",
  },
  appmsg: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
  },
  msg: {
    fontWeight: "bold",
    fontSize: "19px",
    textAlign: "start",
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
  messageBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  msgimg: {
    width: "7%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
function PatientRequest() {
  const classes = useStyles();
  return (
    <Grid item xs={11} className={classes.Tablecontentbox}>
      <Typography className={classes.TableContentFont}>39009101</Typography>
      <Typography className={classes.TableContentFont}>MR. A. ASLAM</Typography>
      <Typography className={classes.TableContentFont}>21/08/2021</Typography>
      <Typography className={classes.TableContentFont}>REPORT</Typography>
      <Typography className={classes.TableContentFont}>ACCEPT</Typography>
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
            <Grid
              container
              style={{ marginTop: "10px" }}
              className={classes.AppAdjust1}
            >
              <Grid item xs={3} className={classes.Apptxt}>
                <Typography className={classes.sameinfont1}>
                  AUG 22 2021 3:15 PM
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography className={classes.sameinfont1}>
                  ALEEM KHAN
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography className={classes.sameinfont2}>
                  MEETING LINK
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              style={{ marginTop: "20px" }}
              className={classes.AppAdjust1}
            >
              <Grid item xs={3} className={classes.Apptxt}>
                <Typography className={classes.sameinfont1}>
                  AUG 22 2021 3:15 PM
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography className={classes.sameinfont1}>
                  ALEEM KHAN
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography className={classes.sameinfont2}>
                  MEETING LINK
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              style={{ marginTop: "20px" }}
              className={classes.AppAdjust1}
            >
              <Grid item xs={3} className={classes.Apptxt}>
                <Typography className={classes.sameinfont1}>
                  AUG 22 2021 3:15 PM
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography className={classes.sameinfont1}>
                  ALEEM KHAN
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography className={classes.sameinfont2}>
                  MEETING LINK
                </Typography>
              </Grid>
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
          <Typography
            style={{ fontSize: "35px" }}
            className={classes.sameinfont3}
          >
            Notifications
          </Typography>
          <div className={classes.notifications}>
            <Grid item xs={2} sm={1}>
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
            <Grid item xs={2} sm={1}>
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
            <Grid item xs={2} sm={1}>
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
            <Grid item xs={2} sm={1}>
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
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          <Grid item xs={11} className={classes.Reportheader}>
            <Typography className={classes.TableContentFont}>
              PATIENT ID
            </Typography>
            <Typography className={classes.TableContentFont}>
              PATIENT NAME
            </Typography>
            <Typography className={classes.TableContentFont}>
              APP. DATE
            </Typography>
            <Typography className={classes.TableContentFont}>REPORT</Typography>
            <Typography className={classes.TableContentFont}>ACTION</Typography>
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

          <Grid
            item
            xs={10}
            style={{ marginTop: "9px" }}
            className={classes.messageDisplay}
          >
            <Grid item className={classes.messageBox}>
              <img
                src={Messageicon}
                className={classes.msgimg}
                alt="error occured"
              />
              <Typography className={classes.msg}>A.ASLAM:</Typography>
              <Typography className={classes.msg}>Please review ...</Typography>
            </Grid>
            <Typography className={classes.readnow}>READ NOW</Typography>
          </Grid>
          <Grid
            item
            xs={10}
            style={{ marginTop: "19px" }}
            className={classes.messageDisplay}
          >
            <Grid item className={classes.messageBox}>
              <img
                src={Messageicon}
                className={classes.msgimg}
                alt="error occured"
              />
              <Typography className={classes.msg}>A.ASLAM:</Typography>
              <Typography className={classes.msg}>Please review ...</Typography>
            </Grid>
            <Typography className={classes.readnow}>READ NOW</Typography>
          </Grid>
          <Grid
            item
            xs={10}
            style={{ marginTop: "19px" }}
            className={classes.messageDisplay}
          >
            <Grid item className={classes.messageBox}>
              <img
                src={Messageicon}
                className={classes.msgimg}
                alt="error occured"
              />
              <Typography className={classes.msg}>A.ASLAM:</Typography>
              <Typography className={classes.msg}>Please review ...</Typography>
            </Grid>
            <Typography className={classes.readnow}>READ NOW</Typography>
          </Grid>
          <Grid
            item
            xs={10}
            style={{ marginTop: "19px" }}
            className={classes.messageDisplay}
          >
            <Grid item className={classes.messageBox}>
              <img
                src={Messageicon}
                className={classes.msgimg}
                alt="error occured"
              />
              <Typography className={classes.msg}>A.ASLAM:</Typography>
              <Typography className={classes.msg}>Please review ...</Typography>
            </Grid>
            <Typography className={classes.readnow}>READ NOW</Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
