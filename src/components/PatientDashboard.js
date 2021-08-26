import React from "react";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Bellicon from "../Assets/bell.svg";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
const useStyles = makeStyles({
  DashboardHead: {
    width: "100%",
    borderRadius: "12px",
    background: "linear-gradient(#3585da 0%, #59c1e8 100%)",
    boxShadow: "6px 6px 10px rgba(0, 0, 0, 0.16)",
    display: "flex",
    padding: "40px",
  },
  NotificationsFont: {
    fontSize: "15px",
    color: "#fff",
  },
  BellIcon: {
    width: "50%",
    justifyContent: "flex-start",
  },
});

export function PatientDashboard() {
  const classes = useStyles();
  return (
    <div
      style={{
        background: "linear-gradient(45deg,#f9f9f9 0%, #e8e8e8 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <CssBaseline />
      <Typography
        style={{ color: "#1061B0", fontSize: "35px", fontWeight: "bold" }}
      >
        Welcome Abdullah Tahir
      </Typography>
      <Grid container xs={11}>
        <Grid container className={classes.DashboardHead}>
          <Grid item xs={6}>
            <Typography
              style={{
                fontWeight: "bold",
                fontSize: "35px",
                color: "#fff",
                textShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                textAlign: "start",
                marginBottom: "15px",
              }}
            >
              Health
            </Typography>
            <Grid
              container
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "25px",
              }}
            >
              <CircularProgress
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  width: "103px",
                  height: "101px",
                  marginRight: "10px",
                }}
              />
              <Typography
                style={{
                  fontWeight: "bold",
                  fontSize: "30px",
                  color: "#fff",
                  textShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                  textAlign: "start",
                }}
              >
                You are healthy!
              </Typography>
            </Grid>
            <Grid
              container
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Grid
                container
                md={2}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Grid
                  item
                  style={{
                    height: "15px",
                    width: "15px",
                    background: " #85fcbc",
                  }}
                />
                <Typography>Safe</Typography>
              </Grid>
              <Grid
                container
                md={2}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Grid
                  item
                  style={{
                    height: "15px",
                    width: "15px",
                    background: " #85fcbc",
                  }}
                />
                <Typography md={4}>Safe</Typography>
              </Grid>
              <Grid
                container
                md={2}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Grid
                  item
                  style={{
                    height: "15px",
                    width: "15px",
                    background: " #85fcbc",
                  }}
                />
                <Typography>Safe</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Typography
              style={{
                fontWeight: "bold",
                fontSize: "35px",
                color: "#fff",
                textShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                textAlign: "start",
                marginBottom: "10px",
              }}
            >
              Notifications
            </Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Grid item xs={4} sm={2} md={1}>
                <div className="logoDiv">
                  <img src={Bellicon} className={classes.BellIcon}></img>
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
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Grid item xs={4} sm={2} md={1}>
                <div className="logoDiv">
                  <img src={Bellicon} className={classes.BellIcon}></img>
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
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Grid item xs={4} sm={2} md={1}>
                <div className="logoDiv">
                  <img src={Bellicon} className={classes.BellIcon}></img>
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
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Grid item xs={4} sm={2} md={1}>
                <div className="logoDiv">
                  <img src={Bellicon} className={classes.BellIcon}></img>
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
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
