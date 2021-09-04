import React from "react";
import "./style.css";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
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
    padding: "10px",
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
    padding: "12px",
  },
  Reportheader: {
    width: "100%",
    borderRadius: "12px",
    background: "linear-gradient(45deg,#59c1e8 0%, #3585da 100%)",
    boxShadow: "6px 6px 10px rgba(0, 0, 0, 0.16)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "35px",
    padding: "12px",
  },
  TableContentFont: {
    fontWeight: "bold",
    fontSize: "14px",
    color: "#fff",
  },
});
export function Reports() {
  const classes = useStyles();
  return (
    <div className="dashdiv">
      <Grid item xs={12} sm={11} className={classes.DialogBox}>
        <Typography style={{ fontSize: "30px" }} className={classes.sameinfont}>
          REPORTS
        </Typography>

        <Grid item xs={12} sm={11} className={classes.TDialogbox}>
          <Grid item xs={11} md={10} className={classes.Reportheader}>
            <Typography className={classes.TableContentFont}>SR</Typography>
            <Typography className={classes.TableContentFont}>
              REPORT NAME
            </Typography>
            <Typography className={classes.TableContentFont}>DATE</Typography>
            <Typography className={classes.TableContentFont}>TIME</Typography>
            <Typography className={classes.TableContentFont}>
              ACTIONS
            </Typography>
          </Grid>
          <Grid item xs={11} md={10} className={classes.Tablecontentbox}>
            <Typography className={classes.TableContentFont}>01</Typography>
            <Typography className={classes.TableContentFont}>
              ISEE_3581_240821
            </Typography>
            <Typography className={classes.TableContentFont}>
              24/08/2021
            </Typography>
            <Typography className={classes.TableContentFont}>
              10:27:31 AM
            </Typography>
            <Typography className={classes.TableContentFont}>
              DOWNLOAD
            </Typography>
          </Grid>
          <Grid item xs={11} md={10} className={classes.Tablecontentbox}>
            <Typography className={classes.TableContentFont}>01</Typography>
            <Typography className={classes.TableContentFont}>
              ISEE_3581_240821
            </Typography>
            <Typography className={classes.TableContentFont}>
              24/08/2021
            </Typography>
            <Typography className={classes.TableContentFont}>
              10:27:31 AM
            </Typography>
            <Typography className={classes.TableContentFont}>
              DOWNLOAD
            </Typography>
          </Grid>
          <Grid item xs={11} md={10} className={classes.Tablecontentbox}>
            <Typography className={classes.TableContentFont}>01</Typography>
            <Typography className={classes.TableContentFont}>
              ISEE_3581_240821
            </Typography>
            <Typography className={classes.TableContentFont}>
              24/08/2021
            </Typography>
            <Typography className={classes.TableContentFont}>
              10:27:31 AM
            </Typography>
            <Typography className={classes.TableContentFont}>
              DOWNLOAD
            </Typography>
          </Grid>
          <Grid item xs={11} md={10} className={classes.Tablecontentbox}>
            <Typography className={classes.TableContentFont}>01</Typography>
            <Typography className={classes.TableContentFont}>
              ISEE_3581_240821
            </Typography>
            <Typography className={classes.TableContentFont}>
              24/08/2021
            </Typography>
            <Typography className={classes.TableContentFont}>
              10:27:31 AM
            </Typography>
            <Typography className={classes.TableContentFont}>
              DOWNLOAD
            </Typography>
          </Grid>
          <Grid
            item
            xs={11}
            md={10}
            style={{ marginBottom: "30px" }}
            className={classes.Tablecontentbox}
          >
            <Typography className={classes.TableContentFont}>01</Typography>
            <Typography className={classes.TableContentFont}>
              ISEE_3581_240821
            </Typography>
            <Typography className={classes.TableContentFont}>
              24/08/2021
            </Typography>
            <Typography className={classes.TableContentFont}>
              10:27:31 AM
            </Typography>
            <Typography className={classes.TableContentFont}>
              DOWNLOAD
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
