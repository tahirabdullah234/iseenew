import React from "react";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { Notifications } from "./Notification";
import { Each } from "./eachnotification";
import { Message } from "./message";
import { GraphGlocuse, GraphBp } from "./graphsUserid";
import { useSelector } from "react-redux";

import { Doughnut } from "react-chartjs-2";
import * as chart from "../Services/graphsdata";
import * as apts from "../Services/appointment";

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
  msgimg: {
    width: "10%",
    marginTop: "2px",
  },
});

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
                    // alert(checker, bp_avg.sysAvg, bp_avg.dysAvg, randomavg.randomAvg, fastavg.fastingAvg)
                    // alert(fastavg.fastingAvg)
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

  return (
    <div className="dashdiv">
      <Typography
        style={{ color: "#1061B0", fontSize: "30px", fontWeight: "bold" }}
      >
        Welcome , {name}
      </Typography>
      <Grid container>
        <Grid container className={classes.DashboardHead}>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="h3"
              style={{ marginBottom: "30px" }}
              className={classes.sameinfont}
            >
              Health
            </Typography>
            <Grid
              container
              style={{ marginBottom: "40px" }}
              className={classes.healthcolset}
            >
              <Grid container style={{ width: "20vh" }}>
                <Doughnut
                  data={
                    {
                      label: ['Health'],
                      datasets: [
                        {
                          label: ["Health LEVEL"],
                          backgroundColor: [health ? health.color : "#85fcbc", "transparent"],
                          borderColor: "transparent",
                          borderRadius: 5,
                          data: health ? [health.value, 100 - health.value] : [85, 15]
                        },
                      ]
                    }
                  }
                />
              </Grid>
              <Typography className={classes.sameinfont} variant="h4">
                You are healthy!
              </Typography>
            </Grid>
            <Grid container className={classes.heathconcol}>
              <Grid item xs={12} md={2} className={classes.healthcolset}>
                <Grid
                  item
                  style={{ background: "#85fcbc", marginRight: "5px" }}
                  className={classes.healthcol}
                />
                <Typography className={classes.healthcontxt}>Safe</Typography>
              </Grid>
              <Grid item xs={12} md={3} className={classes.healthcolset}>
                <Grid
                  item
                  style={{ background: "#ffbf6b", marginRight: "5px" }}
                  className={classes.healthcol}
                />
                <Typography className={classes.healthcontxt}>
                  Be cautious
                </Typography>
              </Grid>
              <Grid item xs={12} md={3} className={classes.healthcolset}>
                <Grid
                  item
                  style={{ background: "#fa6b6b", marginRight: "5px" }}
                  className={classes.healthcol}
                />
                <Typography className={classes.healthcontxt}>
                  See doctor
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Notifications />
            {
              apt ?
                apt.map((item) => {
                  return (
                    <Each data={item} />
                  )
                })
                :
                <Each />
            }
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid container className={classes.boxdis}>
          <Grid
            item
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
              container
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                style={{ fontSize: "23px" }}
                className={classes.fonttxt}
              >
                WEEKLY STATISTICS
              </Typography>
              <Typography className={classes.timeline}>
                {olddate + " to " + date}
              </Typography>
            </Grid>
            <Grid container className={classes.BPGLtitle}>
              <Grid item xs={12} md={6}>
                <Typography className={classes.timeline}>
                  BLOOD PRESSURE
                </Typography>
                <Grid container className={classes.graphctn}>
                  <GraphBp />
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography className={classes.timeline}>
                  GLUCOSE LEVEL
                </Typography>
                <Grid container className={classes.graphctn}>
                  <GraphGlocuse />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={1}></Grid>

        </Grid>
      </Grid>
    </div>
  );
}
