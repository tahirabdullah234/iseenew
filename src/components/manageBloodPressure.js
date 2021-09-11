import React from "react";
import "./style.css";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
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
    fontFamily: "Montserrat",
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#3585da",
    textShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
  },

  DEDialogBox: {
    width: "100%",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "6px 6px 10px rgba(0, 0, 0, 0.16)",
    padding: "20px",
    marginTop: "10px",
  },
  DEDial: {
    width: "100%",
    borderRadius: "20px",
    background: "#3585da",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    color: "white",
    marginTop: "10px",
    fontFamily: "Montserrat",
  },
  TDialogbox: {
    width: "900px",
    background: "#fff",
    boxShadow: "6px 6px 10px rgba(0, 0, 0, 0.16)",
    borderRadius: "12px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "35px",
  },
  BPGDialogbox: {
    width: "100%",
    background: "#fff",
    fontFamily: "Montserrat",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    borderRadius: "12px",
    padding: "10px",
    marginTop: "35px",
  },
  Tablecontentbox: {
    borderRadius: "28px",
    background: "linear-gradient(#abd7ec 0%, #88ceea 50.42%, #59c1e8 100%)",
    boxShadow: "6px 6px 10px rgba(0, 0, 0, 0.16)",
    justifyContent: "space-between",
    marginTop: "30px",
    padding: "12px",
  },
  TableContentFont: {
    fontWeight: "bold",
    fontFamily: "Montserrat",
    color: "#fff",
  },
  BPGTitle: {
    fontFamily: "Montserrat",
    fontWeight: "bold",
    color: "#3585da",
  },
  DEDialpos: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  setTextField: { marginTop: "10px", width: "100%" },
  Gridadjust: {
    display: "flex",
    alignItems: "center",
  },
  GridAjust: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bloodpressuretableitem: {
    margin: "auto",
  },
  bloodpressuretablecontainer: {
    height: 300,
    overflowY: "scroll"
  }
});

function BPRecord() {
  const classes = useStyles();
  return (
    <Grid container className={classes.Tablecontentbox}>
      <Grid item xs={6} sm={3}>
        <Typography variant="body1" className={classes.TableContentFont}>23 mmHg</Typography>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Typography variant="body1" className={classes.TableContentFont}>23 mmHg</Typography>
      </Grid>
      <Grid xs={6} sm={3}>
        <Typography variant="body1" className={classes.TableContentFont}>10:37:51 PM</Typography>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Typography variant="body1" className={classes.TableContentFont}>21/08/2021</Typography>
      </Grid>
    </Grid>
  );
}

export function ManageBP() {
  const classes = useStyles();
  return (
    <div className="dashdiv">
      <Grid item xs={12} className={classes.DialogBox}>
        <Typography variant="h4" className={classes.sameinfont}>
          MANAGE BLOOD PRESSURE
        </Typography>
        <Grid item xs={11} className={classes.DEDialogBox}>
          <Grid container className={classes.DEDialpos}>
            <Grid item xs={9} sm={4} md={3}>
              <TextField
                label="Diastolic value"
                InputLabelProps={{
                  shrink: true,
                }}
                className={classes.setTextField}
              ></TextField>
            </Grid>
            <Grid item xs={9} sm={4} md={3}>
              <TextField
                label="Systolic value"
                InputLabelProps={{
                  shrink: true,
                }}
                className={classes.setTextField}
              ></TextField>
            </Grid>
            <Grid item xs={5} sm={2}>
              <Button className={classes.DEDial}>ADD</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={11} className={classes.Gridadjust}>
          <Grid container className={classes.GridAjust}>
            <Grid item xs={12} md={7} className={classes.TDialogbox}>
              <Typography
                variant="body1"
                className={classes.sameinfont}
              >
                BLOOD PRESSURE TABLE
              </Typography>
              <Grid container className={classes.bloodpressuretablecontainer}>
                <Grid item xs={11} className={classes.bloodpressuretableitem}>
                  <BPRecord />
                </Grid>
                <Grid item xs={11} className={classes.bloodpressuretableitem}>
                  <BPRecord />
                </Grid>
                <Grid item xs={11} className={classes.bloodpressuretableitem}>
                  <BPRecord />
                </Grid>
                <Grid item xs={11} className={classes.bloodpressuretableitem}>
                  <BPRecord />
                </Grid>
                <Grid item xs={11} className={classes.bloodpressuretableitem}>
                  <BPRecord />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4} className={classes.BPGDialogbox}>
              <Typography variant="body2" className={classes.BPGTitle}>
                BLOOD PRESSURE GRAPH
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
