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
  title: {
    fontWeight: "bold",
    fontSize: "23px",
    textAlign: "center",
    color: "#3585da",
    textShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
  },

  timeline: {
    fontWeight: "600",
    fontSize: "21px",
    textAlign: "center",
    color: "#3585da",
  },
  SBP: {
    background: "#6a6cb9",
  },
  DBP: {
    background: "#ef8282",
  },
  Random: {
    background: "#ecabab",
  },
  Fasting: {
    background: "#f7d9a1",
  },
  messageDisplay: {
    width: "100%",
    borderRadius: "10px",
    background: "#fff",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    padding: "5px",
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
        style={{ color: "#1061B0", fontSize: "30px", fontWeight: "bold" }}
      >
        Welcome Abdullah Tahir
      </Typography>
      <Grid container md={10} xs={11}>
        <Grid container className={classes.DashboardHead}>
          <Grid item xs={12} sm={6}>
            <Typography
              style={{
                fontWeight: "bold",
                fontSize: "35px",
                color: "#fff",
                textShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                textAlign: "start",
                marginBottom: "30px",
              }}
            >
              Health
            </Typography>
            <Grid
              container
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "40px",
              }}
            >
              <CircularProgress
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  width: "103px",
                  height: "101px",
                  marginRight: "20px",
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
                xs={12}
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
                <Typography
                  style={{
                    fontWeight: "bold",
                    fontSize: "17.5px",
                    color: "#fff",
                    textShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                    textAlign: "start",
                  }}
                >
                  Safe
                </Typography>
              </Grid>
              <Grid
                container
                xs={12}
                md={3}
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
                    background: " #ffbf6b",
                  }}
                />
                <Typography
                  style={{
                    fontWeight: "bold",
                    fontSize: "17.5px",
                    color: "#fff",
                    textShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                    textAlign: "start",
                  }}
                >
                  Be cautious
                </Typography>
              </Grid>
              <Grid
                container
                xs={12}
                md={3}
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
                    background: "#fa6b6b",
                  }}
                />
                <Typography
                  style={{
                    fontWeight: "bold",
                    fontSize: "17.5px",
                    color: "#fff",
                    textShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                    textAlign: "start",
                  }}
                >
                  See doctor
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
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
              <Grid item xs={2} sm={2} md={1}>
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
              <Grid item xs={2} sm={2} md={1}>
                <div className="logoDiv">
                  <img src={Bellicon} className={classes.BellIcon}></img>
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
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Grid item xs={2} sm={2} md={1}>
                <div className="logoDiv">
                  <img src={Bellicon} className={classes.BellIcon}></img>
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
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Grid item xs={2} sm={2} md={1}>
                <div className="logoDiv">
                  <img src={Bellicon} className={classes.BellIcon}></img>
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
      <Grid
        container
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "space-between",
        }}
        md={10}
        xs={11}
      >
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
            <Typography className={classes.title}>WEEKLY STATISTICS</Typography>
            <Typography className={classes.timeline}>
              JUL 21 - JUL 28
            </Typography>
          </Grid>
          <Grid
            item
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "10px",
            }}
          >
            <Typography className={classes.timeline}>BLOOD PRESSURE</Typography>
            <Typography className={classes.timeline}> GLUCOSE LEVEL</Typography>
          </Grid>
          <Grid
            container
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: "5px",
            }}
          >
            <Grid
              container
              xs={2}
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
                  background: "#6a6cb9",
                }}
              />
              <Typography>SBP</Typography>
            </Grid>
            <Grid
              container
              xs={4}
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
                  background: "#ef8282",
                }}
              />
              <Typography>DBP</Typography>
            </Grid>
            <Grid
              container
              xs={3}
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
                  background: "#ecabab",
                }}
              />
              <Typography>Random</Typography>
            </Grid>
            <Grid
              container
              xs={2}
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
                  background: "#f7d9a1",
                }}
              />
              <Typography>Fasting</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          sm={4}
          xs={12}
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
          }}
          container
        >
          <Grid
            container
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "10px",
            }}
            className={classes.dialogBox}
          >
            <Typography className={classes.title}>
              LATEST APPOINTMENT
            </Typography>
            <Grid
              container
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Grid sm={12} md={4} item>
                <Typography className={classes.title}>AUG 21</Typography>
                <Typography
                  style={{
                    fontWeight: "bold",
                    fontSize: "35px",
                    textAlign: "center",
                    color: "#3585da",
                    textShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                  }}
                >
                  2021
                </Typography>
              </Grid>
              <Grid sm={12} md={8} item>
                <Typography
                  style={{
                    fontWeight: "bold",
                    fontSize: "23px",
                    textAlign: "start",
                    color: "#3585da",
                    textShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                  }}
                >
                  Dr. Aslam Jamshaid
                </Typography>
                <Typography
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    textAlign: "start",
                    color: "#3585da",
                    textShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                  }}
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
            <Typography className={classes.title}>MESSAGES</Typography>

            <Grid item xs={9} className={classes.messageDisplay}>
              <Typography
                style={{
                  fontWeight: "bold",
                  fontSize: "19px",
                  textAlign: "center",
                  color: "#3585da",
                  textShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                }}
              >
                Your latest reports are ready
              </Typography>
              <Typography
                style={{
                  fontWeight: "bold",
                  fontSize: "13px",
                  textAlign: "end",
                  color: "#3585da",
                  textShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                  textDecorationLine: "underline",
                }}
              >
                READ NOW
              </Typography>
            </Grid>
            <Grid
              item
              xs={9}
              style={{ marginTop: "15px" }}
              className={classes.messageDisplay}
            >
              <Typography
                style={{
                  fontWeight: "bold",
                  fontSize: "19px",
                  textAlign: "center",
                  color: "#3585da",
                  textShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                }}
              >
                Your appointment with Dr. Aslam jamshaid is ready
              </Typography>
              <Typography
                style={{
                  fontWeight: "bold",
                  fontSize: "13px",
                  textAlign: "end",
                  color: "#3585da",
                  textShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                  textDecorationLine: "underline",
                }}
              >
                READ NOW
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
