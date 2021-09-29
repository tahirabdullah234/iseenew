import React from "react";

import { Bar as Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import * as getdata from "../Services/graphsdata";

import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  perci: {
    margin: "auto",
  },
}));

export function GraphGlocuse() {
  const token = useSelector((state) => state.states.token);
  const [data, setdata] = React.useState(null);
  const classes = useStyles();
  React.useEffect(() => {
    console.log(token);
    getdata.getglocusedata(token).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        setdata(res.data.record);
      }
    });
  }, [token]);

  return (
    <div style={{ margin: "auto" }}>
      {data ? (
        <Grid item xs={12}>
          <Line
            data={{
              labels: data.fdates,
              datasets: [
                {
                  label: "FASTING LEVEL",
                  backgroundColor: "rgba(20, 122, 214, 0.3)",
                  borderColor: "rgba(20, 122, 214, 0.5)",
                  borderWidth: 2,
                  data: data.fasting,
                },
                {
                  label: "RANDOM LEVEL",
                  backgroundColor: "rgba(121, 210, 222, 0.3)",
                  borderColor: "rgba(121, 210, 222, 0.5)",
                  borderWidth: 2,
                  data: data.random,
                },
              ],
            }}
            height={300}
            options={{
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
              plugins: {
                legend: {
                  labels: {
                    fontSize: 25,
                  },
                  position: "bottom",
                },
                fullSize: true,
              },
              elements: {
                line: {
                  tension: 0.4,
                },
              },
            }}
          />
        </Grid>
      ) : (
        <CircularProgress
          style={{ marginRight: "20px", width: "103px", height: "101px" }}
          className={classes.percir}
        />
      )}
    </div>
  );
}

export function GraphBp() {
  const token = useSelector((state) => state.states.token);
  const [data, setdata] = React.useState(null);
  const classes = useStyles();

  React.useEffect(() => {
    console.log(token);
    getdata.getbpdata(token).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        setdata(res.data.record);
      }
    });
  }, [token]);

  // systolic upper - 120 ideal
  // distlic lower - 80 ideal

  return (
    <div style={{ margin: "auto" }}>
      {data ? (
        <Grid item xs={12}>
          <Line
            data={{
              labels: data.dates,
              datasets: [
                {
                  label: "SYSTOLIC LEVEL",
                  backgroundColor: "rgba(20, 122, 214, 0.3)",
                  borderColor: "rgba(20, 122, 214, 0.5)",
                  borderWidth: 2,
                  data: data.systolic,
                },
                {
                  label: "DISTOLIC LEVEL",
                  backgroundColor: "rgba(236, 102, 102, 0.3)",
                  borderColor: "rgba(236, 102, 102, 0.5)",
                  borderWidth: 2,
                  data: data.dystolic,
                },
              ],
            }}
            height={300}
            options={{
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
              plugins: {
                legend: {
                  labels: {
                    fontSize: 25,
                  },
                  position: "bottom",
                },
                fullSize: true,
              },
              elements: {
                line: {
                  tension: 0.4,
                },
              },
            }}
          />
        </Grid>
      ) : (
        <CircularProgress
          style={{ marginRight: "20px", width: "103px", height: "101px" }}
          className={classes.percir}
        />
      )}
    </div>
  );
}
