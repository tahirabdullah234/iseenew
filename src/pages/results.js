import React from "react";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';
import DownloadIcon from '@material-ui/icons/GetApp';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';

import Drawer from "../components/drawer";
import ReportTemplate from "../components/report_template";

import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';

import * as reps from "../Services/reports";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(45deg,#f9f9f9 0%, #e8e8e8 100%)",
  },
  rightgrid: {
    margin: "auto",
  },
  button: {
    width: "95%",
    background: "#003C72",
    marginBottom: 10,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 10,
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function Result() {
  const classes = useStyles();
  const history = useHistory();
  const isdoctor = useSelector((state) => state.states.isdoctor)
  const token = useSelector((state) => state.states.token)
  const data = useSelector((state) => state.states.data)
  const pdfExportComponent = React.useRef(null);
  const contentArea = React.useRef(null);

  const [snackbar, setsnackbar] = React.useState({
    open: false,
    msg: "",
    type: ""
  })

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setsnackbar({ ...snackbar, open: false });
  };

  const saveReport = () => {
    reps.save_report(token, data)
      .then(res => {
        if (res.data.success) {
          setsnackbar({
            ...snackbar,
            open: true,
            msg: "Report Saved Successfully",
            type: "Success"
          })
        } else {
          setsnackbar({
            ...snackbar,
            open: true,
            msg: "Report Save Not Successfully",
            type: "info"
          })
        }
      })
  }

  const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save();
  }

  const handleExportWithFunction = (event) => {
    savePDF(contentArea.current, {fileName:"DR-Report", paperSize: "Legal" });
  }
  return (
    <Grid container className={classes.root}>
      <Grid item xs={1}>
        <Drawer />
      </Grid>
      <Grid item xs={8} className={classes.rightgrid}>
        <Grid container>
          <Grid item xs={2}>
            <Button
              variant="container"
              startIcon={<ArrowBackIcon />}
              className={classes.button}
              onClick={() => history.goBack()}
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={4}>
            {
              !isdoctor ?
                <Button
                  variant="container"
                  startIcon={<SaveIcon />}
                  className={classes.button}
                  onClick={saveReport}
                >
                  Save Report
                </Button>
                : <div></div>}
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="container"
              startIcon={<DownloadIcon />}
              className={classes.button}
              onClick={handleExportWithComponent}
            >
              Download Report
            </Button>
          </Grid>
        </Grid>
        <Grid container>
          <PDFExport ref={pdfExportComponent} paperSize="A4">
            <ReportTemplate />
          </PDFExport>
        </Grid>
      </Grid>
      <Snackbar open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert severity={snackbar.type}>
          {snackbar.msg}
        </Alert>
      </Snackbar>

    </Grid>
  );
}
