import React from "react";
import "./style.css";
import Grid from "@material-ui/core/Grid";
import {
  Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';

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
    fontFamily: "Montserrat",
    fontWeight: "bold",
    color: "#3585da",
    textAlign: "center",
    textDecoration: "underline",
  },
  cardTitle: {
    fontFamily: "Montserrat",
    fontWeight: "bold",
    fontSize: 20,
    color: "#3585da",
    marginBottom: 12,
  },
  TDialogbox: {
    width: "100%",
    background: "#fff",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
    borderRadius: "12px",
    padding: "16px",
    boxSizing: "border-box",
    marginTop: "12px",
  },
  reportsTable: {
    borderCollapse: "separate",
    borderSpacing: "0 4px",
    minWidth: 500,
  },
  reportsTableHeadRow: {
    "& th": {
      background: "linear-gradient(45deg,#59c1e8 0%, #3585da 100%)",
      color: "#fff",
      fontWeight: "bold",
      fontFamily: "Montserrat",
      fontSize: 18,
      padding: "12px 16px",
      borderBottom: "none",
    },
    "& th:first-child": {
      borderTopLeftRadius: 28,
      borderBottomLeftRadius: 28,
    },
    "& th:last-child": {
      borderTopRightRadius: 28,
      borderBottomRightRadius: 28,
    },
  },
  reportsTableBodyRow: {
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.06)",
    borderRadius: 8,
    "& td": {
      background: "#fff",
      color: "#444",
      fontFamily: "Montserrat",
      fontWeight: 500,
      fontSize: 17,
      padding: "10px 16px",
      borderBottom: "none",
    },
    "& td:first-child": {
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
    },
    "& td:last-child": {
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
    },
    "&:hover td": {
      background: "#f0f7fc",
    },
  },
  reportlistcontainer: {
    width: "100%",
    maxHeight: "60vh",
    overflowY: "auto",
    overflowX: "auto",
  },
  actionIcon: {
    color: "#3585da",
    padding: 4,
    "&:hover": {
      background: "rgba(53, 133, 218, 0.1)",
    },
  },
});

export default function Reports({ userId }) {
  const classes = useStyles();
  const token = useSelector((state) => state.states.token);
  const dispatch = useDispatch();
  const history = useHistory();
  const [reports, setreports] = React.useState(null);
  React.useEffect(() => {
    rep.get_reports_user(token, userId)
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

  const handleView = (data) => {
    dispatch(setdata(data))
    history.push('/result')
  }

  return (
    <div className="dashdiv">
      <Grid item xs={12} className={classes.DialogBox}>
        <Typography variant="h4" className={classes.sameinfont}>
          REPORTS
        </Typography>
        <Grid item xs={12} className={classes.TDialogbox}>
          <Typography className={classes.cardTitle}>
            All Reports
          </Typography>
          <TableContainer className={classes.reportlistcontainer}>
            <Table className={classes.reportsTable}>
              <TableHead>
                <TableRow className={classes.reportsTableHeadRow}>
                  <TableCell align="center">SR</TableCell>
                  <TableCell>Report Name</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reports ? (
                  reports.map((item, index) => (
                    <TableRow key={index} className={classes.reportsTableBodyRow}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.date.split('T')[0]}</TableCell>
                      <TableCell>{item.date.split('T')[1]}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          className={classes.actionIcon}
                          size="small"
                          onClick={() => handleView(item.report)}
                        >
                          <VisibilityOutlinedIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center" style={{ border: "none", background: "transparent" }}>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}
