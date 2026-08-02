import React from "react";
import "./style.css";
import Grid from "@material-ui/core/Grid";
import {
  Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';

import * as rep from "../Services/reports";
import { useSelector, useDispatch } from "react-redux";
import { setdata } from "../pages/statesSlice";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  DialogBox: {
    width: "100%",
    borderRadius: "30px",
    background: "#fff",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "calc(100vh - 48px)",
    boxSizing: "border-box",
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
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minHeight: 0,
  },
  reportsTable: {
    borderCollapse: "separate",
    borderSpacing: "0 4px",
    minWidth: 500,
    [theme.breakpoints.down("md")]: {
      minWidth: 760,
    },
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
    [theme.breakpoints.down("md")]: {
      "& th": {
        minWidth: 130,
      },
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
    [theme.breakpoints.down("md")]: {
      "& td": {
        minWidth: 130,
      },
    },
  },
  reportlistcontainer: {
    width: "100%",
    flex: 1,
    minHeight: 0,
    overflowY: "auto",
    overflowX: "auto",
  },
  emptyBox: {
    flex: 1,
    minHeight: 0,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontFamily: "Montserrat",
    fontSize: 22,
    color: "#5a9bd5",
  },
  viewBtn: {
    textTransform: "none",
    fontWeight: 600,
    fontSize: 15,
    color: "#3585da",
    padding: "2px 0",
    minWidth: 0,
    "&:hover": {
      background: "transparent",
      textDecoration: "underline",
    },
  },
}));

export function Reports() {
  const classes = useStyles();
  const token = useSelector((state) => state.states.token);
  const dispatch = useDispatch();
  const history = useHistory();
  const [reports, setreports] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(12);
  React.useEffect(() => {
    rep.get_reports(token)
      .then(res => {
        if (res.data.success) {
          console.log(res.data)
          setreports(res.data.reports)
        } else {
          setreports([])
        }
        setPage(0)
      })
  }, [token])

  const handleView = (data) => {
    dispatch(setdata(data))
    history.push('/result')
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const paginatedReports = reports
    ? reports.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : null

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
          {reports && reports.length > 0 ? (
            <>
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
                    {paginatedReports ? (
                      paginatedReports.map((item, index) => (
                        <TableRow key={index} className={classes.reportsTableBodyRow}>
                          <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                          <TableCell>{item.title}</TableCell>
                          <TableCell>{item.date.split('T')[0]}</TableCell>
                          <TableCell>{item.date.split('T')[1]}</TableCell>
                          <TableCell align="center">
                            <Button
                              className={classes.viewBtn}
                              startIcon={<VisibilityOutlinedIcon fontSize="small" />}
                              onClick={() => handleView(item.report)}
                            >
                              View
                            </Button>
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
              <TablePagination
                component="div"
                count={reports ? reports.length : 0}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[12, 24, 48]}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </>
          ) : reports === null ? (
            <div className={classes.emptyBox}>
              <CircularProgress />
            </div>
          ) : (
            <div className={classes.emptyBox}>
              <Typography className={classes.emptyText}>
                No Reports Found
              </Typography>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
