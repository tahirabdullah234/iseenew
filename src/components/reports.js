import React from "react";
import "./style.css";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";

import { makeStyles } from "@material-ui/core/styles";

import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';

import * as rep from "../Services/reports";
import { useSelector, useDispatch } from "react-redux";
import { setdata } from "../pages/statesSlice";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  DialogBox: {
    width: "100%",
    borderRadius: "30px",
    background: "#fff",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  sameinfont: {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#3585da",
    textShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
  },
  TDialogbox: {
    width: "100%",
    background: "#fff",
    boxShadow: "6px 6px 10px rgba(0, 0, 0, 0.16)",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20px",
  },
  Tablecontentbox: {
    width: "100%",
    borderRadius: "10px",
    background: "linear-gradient(45deg,#59c1e8 0%, #59c1e8 100%)",
    filter: "drop-shadow(6px 6px 10px rgba(0, 0, 0, 0.16))",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "35px",
    padding: "0px 15px 0px 15px",
    margin: "auto",
  },
  Reportheader: {
    width: "100%",
    borderRadius: "12px",
    background: "linear-gradient(45deg,#59c1e8 0%, #3585da 100%)",
    boxShadow: "6px 6px 10px rgba(0, 0, 0, 0.16)",
    display: "flex",
    alignItems: "center",
    marginTop: "35px",
    padding: "15px",
  },
  TableContentFont: {
    fontWeight: "bold",
    fontSize: "14px",
    color: "#fff",
  },
  reportlistcontainer: {
    marginBottom: "30px",
    height: "60vh",
    overflowY: "scroll",
    margin: "auto",
  }
});

function Report({ name, date, index, data }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = () => {
    dispatch(setdata(data))
    history.push('/result')
  }
  return (
    <Grid
      item
      xs={11}
      className={classes.Tablecontentbox}
    >
      <Grid container style={{ alignItems: "center" }}>
        <Grid item xs={4} sm={2} style={{ textAlign: 'start' }}>
          <Typography className={classes.TableContentFont}>{index}</Typography>
        </Grid>
        <Grid item xs={8} sm={4} style={{ textAlign: 'start' }}>
          <Typography className={classes.TableContentFont}>
            {name}
          </Typography>
        </Grid>
        <Grid item xs={4} sm={2} style={{ textAlign: 'start' }}>
          <Typography className={classes.TableContentFont}>{date.split('T')[0]}</Typography>
        </Grid>
        <Grid item xs={4} sm={2} style={{ textAlign: 'start' }}>
          <Typography className={classes.TableContentFont}>{date.split('T')[1]}</Typography>
        </Grid>
        <Grid item xs={4} sm={2} style={{ textAlign: 'start' }}>
          <IconButton>
            <CloudDownloadOutlinedIcon style={{ color: "#fff" }} />
          </IconButton>
          <Typography display="inline" style={{ color: "#fff", fontWeight: "bold" }}>|</Typography>
          <IconButton
            onClick={handleClick}
          >
            <VisibilityOutlinedIcon style={{ color: "#fff" }} />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
}
export function Reports() {
  const classes = useStyles();
  const token = useSelector((state) => state.states.token);
  const [reports, setreports] = React.useState(null);
  React.useEffect(() => {
    rep.get_reports(token)
      .then(res => {
        if (res.data.success) {
          console.log(res.data)
          setreports(res.data.reports)
        } else {
          setreports([{
            title: "No Reports Found",
            date: "N/ATN/A"
          }])
        }
      })
  }, [token])

  return (
    <div className="dashdiv">
      <Grid item xs={12} className={classes.DialogBox}>
        <Typography variant="h4" className={classes.sameinfont}>
          REPORTS
        </Typography>

        <Grid item xs={12} className={classes.TDialogbox}>
          <Grid item xs={11} className={classes.Reportheader}>
            <Grid container>
              <Grid item xs={4} sm={2} style={{ textAlign: 'start' }}>
                <Typography className={classes.TableContentFont}>SR</Typography>
              </Grid>
              <Grid item xs={8} sm={4} style={{ textAlign: 'start' }}>
                <Typography className={classes.TableContentFont}>
                  REPORT NAME
                </Typography>
              </Grid>

              <Grid item xs={4} sm={2} style={{ textAlign: 'start' }}>
                <Typography className={classes.TableContentFont}>DATE</Typography>
              </Grid>
              <Grid item xs={4} sm={2} style={{ textAlign: 'start' }}>
                <Typography className={classes.TableContentFont}>TIME</Typography>
              </Grid>
              <Grid item xs={4} sm={2} style={{ textAlign: 'start' }}>
                <Typography className={classes.TableContentFont}>
                  ACTIONS
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container className={classes.reportlistcontainer}>
            {
              reports ?
                reports.map((item, index) => {
                  return <Report name={item.title} date={item.date} index={index + 1} data={item.report} />
                })
                :
                <CircularProgress
                  style={{ marginRight: "20px", width: "103px", height: "101px" }}
                  className={classes.percir}
                />
            }
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
