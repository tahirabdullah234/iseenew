import React from "react";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography, Box, Hidden } from "@material-ui/core";
import { Notifications } from "./Notification";
import { Each } from "./eachnotification";
import { GraphGlocuse, GraphBp } from "./graphsUserid";
import { useSelector } from "react-redux";

import { Doughnut } from "react-chartjs-2";
import * as chart from "../Services/graphsdata";
import * as apts from "../Services/appointment";
import Chip from "@material-ui/core/Chip";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import MessageIcon from "@material-ui/icons/Message";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

const useStyles = makeStyles((theme) => ({
  welcome: {
    color: "#1061B0",
    fontSize: "48px",
    fontWeight: 700,
    marginBottom: 24,
    textAlign: "left",
    [theme.breakpoints.down("sm")]: { fontSize: "28px" },
  },
  healthCard: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    background: "linear-gradient(135deg, #3585da 0%, #59c1e8 100%)",
    boxShadow: "0 8px 24px rgba(53, 133, 218, 0.25)",
    padding: "24px 28px",
    boxSizing: "border-box",
    overflow: "hidden",
  },
  healthTitle: {
    fontWeight: 700,
    fontSize: 42,
    color: "#fff",
    textShadow: "0 2px 4px rgba(0,0,0,0.12)",
    marginBottom: 16,
    textAlign: "left",
    [theme.breakpoints.down("sm")]: { fontSize: 26 },
  },
  healthStatus: {
    fontWeight: 700,
    fontSize: 36,
    color: "#fff",
    textShadow: "0 2px 4px rgba(0,0,0,0.12)",
    textAlign: "left",
    marginLeft: 16,
    [theme.breakpoints.down("sm")]: { fontSize: 22 },
  },
  healthDot: {
    height: 14,
    width: 14,
    borderRadius: "50%",
    marginRight: 8,
  },
  healthLabel: {
    fontWeight: 600,
    fontSize: 22,
    color: "#fff",
    textShadow: "0 2px 4px rgba(0,0,0,0.12)",
    [theme.breakpoints.down("sm")]: { fontSize: 16 },
  },
  healthLegend: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  sectionTitle: {
    fontWeight: 700,
    fontSize: 20,
    color: "#3585da",
  },
  cardWhite: {
    width: "100%",
    borderRadius: 16,
    background: "#fff",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
    padding: "32px 36px",
    minHeight: 500,
    boxSizing: "border-box",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: { padding: "20px 16px", minHeight: 400 },
  },
  statTitle: {
    fontWeight: 700,
    fontSize: 32,
    color: "#3585da",
    [theme.breakpoints.down("sm")]: { fontSize: 22 },
  },
  dateRange: {
    fontWeight: 600,
    fontSize: 20,
    color: "#3585da",
    textAlign: "right",
    [theme.breakpoints.down("sm")]: { fontSize: 14 },
  },
  graphLabel: {
    fontWeight: 700,
    fontSize: 24,
    color: "#3585da",
    textAlign: "center",
    marginBottom: 8,
    [theme.breakpoints.down("sm")]: { fontSize: 17 },
  },
  infoCard: {
    padding: "16px 20px",
    borderRadius: 16,
    background: "#fff",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
    boxSizing: "border-box",
    width: "100%",
    overflow: "hidden",
  },
  infoCardTitle: {
    fontSize: 30,
    fontWeight: 700,
    color: "#3585da",
    marginBottom: 12,
    display: "flex",
    alignItems: "center",
    gap: 8,
    [theme.breakpoints.down("sm")]: { fontSize: 20 },
  },
  infoValue: {
    fontSize: 22,
    fontWeight: 600,
    color: "#3585da",
    [theme.breakpoints.down("sm")]: { fontSize: 16 },
  },
  infoSub: {
    fontSize: 20,
    color: "#3585da",
    marginTop: 4,
    [theme.breakpoints.down("sm")]: { fontSize: 14 },
  },
  infoDate: {
    fontSize: 18,
    color: "#5a9bd5",
    marginTop: 8,
    [theme.breakpoints.down("sm")]: { fontSize: 13 },
  },
  infoEmpty: {
    fontSize: 20,
    color: "#5a9bd5",
    [theme.breakpoints.down("sm")]: { fontSize: 14 },
  },
}));

export function PatientDashboard() {
  const classes = useStyles();
  const name = useSelector((state) => state.states.name);
  const userId = useSelector((state) => state.states.user._id);
  const token = useSelector((state) => state.states.token);
  const date = new Date(Date.now()).toLocaleDateString();
  var olddate = new Date();
  olddate.setDate(olddate.getDate() - 7);
  olddate = olddate.toLocaleDateString();
  const [health, sethealth] = React.useState(null)
  const [apt, setapt] = React.useState(null)
  const [latestMsg, setLatestMsg] = React.useState(null)
  React.useEffect(() => {
    chart.getbpavg(token)
      .then(res => {
        if (res.data.success) {
          const bp_avg = res.data.avg;
          chart.getfastingavg(token)
            .then(res => {
              if (res.data.success) {
                const fastavg = res.data.avg
                chart.getrandomavg(token)
                  .then(res => {
                    const randomavg = res.data.avg
                    var checker = (bp_avg.sysAvg - 120) + (bp_avg.dysAvg - 80) + (randomavg.randomAvg - 200) + (fastavg.fastingAvg - 120)
                    if (checker <= 0) {
                      sethealth({ value: 100, color: "#85fcbc" })
                    } else {
                      checker /= 100
                      checker = 100 - checker
                      if (checker > 70) {
                        sethealth({ value: checker, color: "#85fcbc" })
                      } else if (checker > 50) {
                        sethealth({ value: checker, color: "#ffbf6b" })
                      } else {
                        sethealth({ value: checker > 10 ? checker : 10, color: "#fa6b6b" })
                      }
                    }
                  })
              }
            })
        }
      })
  }, [])
  React.useEffect(() => {
    apts.get_apponitment_p(token)
      .then(res => {
        if (res.data.success) {
          setapt(res.data.data)
        }
      })
  }, [])
  React.useEffect(() => {
    apts.get_latest_message(token)
      .then(res => {
        if (res.data.success && res.data.msg) {
          setLatestMsg(res.data.msg)
        }
      })
  }, [])

  return (
    <div className="dashdiv">
      <Typography className={classes.welcome}>
        Welcome, {name}
      </Typography>

      <Grid container spacing={3} alignItems="stretch">
        <Hidden lgUp>
          <Grid item xs={12} style={{ display: "flex" }}>
            <div className={classes.healthCard}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography className={classes.healthTitle} variant="h4">
                    Health
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Box width="45%" style={{ maxWidth: 160 }}>
                      <Doughnut
                        data={{
                          datasets: [
                            {
                              label: ["Health LEVEL"],
                              backgroundColor: [health ? health.color : "#85fcbc", "rgba(255,255,255,0.15)"],
                              borderColor: "transparent",
                              borderRadius: 6,
                              data: health ? [health.value, 100 - health.value] : [85, 15]
                            },
                          ]
                        }}
                      />
                    </Box>
                    <Typography className={classes.healthStatus} variant="h5">
                      You are healthy!
                    </Typography>
                  </Box>
                  <div className={classes.healthLegend}>
                    <Box display="flex" alignItems="center">
                      <Box className={classes.healthDot} style={{ background: "#85fcbc" }} />
                      <Typography className={classes.healthLabel}>Safe</Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <Box className={classes.healthDot} style={{ background: "#ffbf6b" }} />
                      <Typography className={classes.healthLabel}>Be cautious</Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <Box className={classes.healthDot} style={{ background: "#fa6b6b" }} />
                      <Typography className={classes.healthLabel}>See doctor</Typography>
                    </Box>
                  </div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Notifications />
                  <Box mt={1}>
                    {apt ? (
                      apt.map((item) => (
                        <Each key={item._id} data={item} />
                      ))
                    ) : (
                      <Each />
                    )}
                  </Box>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12} md={6} style={{ display: "flex" }}>
            <div className={classes.infoCard}>
              <Typography className={classes.infoCardTitle}>
                <CalendarTodayIcon style={{ fontSize: 18 }} />
                Latest Appointment
              </Typography>
              {apt && apt.length > 0 ? (
                <>
                  <Typography className={classes.infoValue}>
                    {apt[0].doctorName || "Doctor"}
                  </Typography>
                  <Typography className={classes.infoSub}>
                    {new Date(apt[0].date).toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })} @ {apt[0].time}
                  </Typography>
                </>
              ) : (
                <Typography className={classes.infoEmpty}>
                  No upcoming appointments
                </Typography>
              )}
            </div>
          </Grid>
          <Grid item xs={12} md={6} style={{ display: "flex" }}>
            <div className={classes.infoCard}>
              <Typography className={classes.infoCardTitle}>
                <MessageIcon style={{ fontSize: 18 }} />
                Latest Message
              </Typography>
              {latestMsg ? (
                <>
                  <Typography className={classes.infoValue}>
                    {latestMsg.d_id ? "Dr. " + latestMsg.d_id.fname + " " + latestMsg.d_id.lname : "Doctor"}
                  </Typography>
                  <Typography className={classes.infoSub} style={{ wordBreak: "break-word" }}>
                    {latestMsg.msg}
                  </Typography>
                  <Typography className={classes.infoDate}>
                    {new Date(latestMsg.createdAt).toLocaleDateString([], { month: "short", day: "numeric" }) + " " + new Date(latestMsg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </Typography>
                </>
              ) : (
                <Typography className={classes.infoEmpty}>
                  No messages from doctor
                </Typography>
              )}
            </div>
          </Grid>
        </Hidden>
        <Hidden mdDown>
          <Grid item md={8} style={{ display: "flex" }}>
            <div className={classes.healthCard}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography className={classes.healthTitle} variant="h4">
                    Health
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Box width="45%" style={{ maxWidth: 160 }}>
                      <Doughnut
                        data={{
                          datasets: [
                            {
                              label: ["Health LEVEL"],
                              backgroundColor: [health ? health.color : "#85fcbc", "rgba(255,255,255,0.15)"],
                              borderColor: "transparent",
                              borderRadius: 6,
                              data: health ? [health.value, 100 - health.value] : [85, 15]
                            },
                          ]
                        }}
                      />
                    </Box>
                    <Typography className={classes.healthStatus} variant="h5">
                      You are healthy!
                    </Typography>
                  </Box>
                  <div className={classes.healthLegend}>
                    <Box display="flex" alignItems="center">
                      <Box className={classes.healthDot} style={{ background: "#85fcbc" }} />
                      <Typography className={classes.healthLabel}>Safe</Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <Box className={classes.healthDot} style={{ background: "#ffbf6b" }} />
                      <Typography className={classes.healthLabel}>Be cautious</Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <Box className={classes.healthDot} style={{ background: "#fa6b6b" }} />
                      <Typography className={classes.healthLabel}>See doctor</Typography>
                    </Box>
                  </div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Notifications />
                  <Box mt={1}>
                    {apt ? (
                      apt.map((item) => (
                        <Each key={item._id} data={item} />
                      ))
                    ) : (
                      <Each />
                    )}
                  </Box>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item md={4} style={{ display: "flex" }}>
            <Box display="flex" flexDirection="column" style={{ gap: 16, width: "100%" }}>
              <div className={classes.infoCard}>
                <Typography className={classes.infoCardTitle}>
                  <CalendarTodayIcon style={{ fontSize: 18 }} />
                  Latest Appointment
                </Typography>
                {apt && apt.length > 0 ? (
                  <>
                    <Typography className={classes.infoValue}>
                      {apt[0].doctorName || "Doctor"}
                    </Typography>
                    <Typography className={classes.infoSub}>
                      {new Date(apt[0].date).toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })} @ {apt[0].time}
                    </Typography>
                  </>
                ) : (
                  <Typography className={classes.infoEmpty}>
                    No upcoming appointments
                  </Typography>
                )}
              </div>
              <div className={classes.infoCard}>
                <Typography className={classes.infoCardTitle}>
                  <MessageIcon style={{ fontSize: 18 }} />
                  Latest Message
                </Typography>
                {latestMsg ? (
                  <>
                    <Typography className={classes.infoValue}>
                      {latestMsg.d_id ? "Dr. " + latestMsg.d_id.fname + " " + latestMsg.d_id.lname : "Doctor"}
                    </Typography>
                    <Typography className={classes.infoSub} style={{ wordBreak: "break-word" }}>
                      {latestMsg.msg}
                    </Typography>
                    <Typography className={classes.infoDate}>
                      {new Date(latestMsg.createdAt).toLocaleDateString([], { month: "short", day: "numeric" }) + " " + new Date(latestMsg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </Typography>
                  </>
                ) : (
                  <Typography className={classes.infoEmpty}>
                    No messages from doctor
                  </Typography>
                )}
              </div>
            </Box>
          </Grid>
        </Hidden>

        <Grid item xs={12}>
          <div className={classes.cardWhite}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography className={classes.statTitle}>
                WEEKLY STATISTICS
              </Typography>
              <Typography className={classes.dateRange}>
                {olddate + " to " + date}
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography className={classes.graphLabel}>
                  BLOOD PRESSURE
                </Typography>
                <GraphBp height={340} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography className={classes.graphLabel}>
                  GLUCOSE LEVEL
                </Typography>
                <GraphGlocuse height={340} />
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
