import React from "react";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';
import DownloadIcon from '@material-ui/icons/GetApp';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';

import SideDrawer from "../components/drawer";
import ReportTemplate from "../components/report_template";

import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { PDFExport } from '@progress/kendo-react-pdf';

import * as reps from "../Services/reports";

const drawerCollapsed = 97;
const drawerExpanded = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(45deg,#f9f9f9 0%, #e8e8e8 100%)",
    minHeight: "100vh",
    overflowX: "hidden",
    display: "flex",
  },
  drawerWrapper: {
    flexShrink: 0,
    transition: "width 0.3s ease",
  },
  content: {
    flex: 1,
    minWidth: 0,
    transition: "max-width 0.3s ease",
    padding: "24px",
    boxSizing: "border-box",
  },
  menuBtn: {
    background: "#1061B0",
    color: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    "&:hover": { background: "#0d4d8f" },
  },
  mobileDrawer: {
    "& .MuiDrawer-paper": {
      width: 280,
      background: "#1061B0",
    },
  },
  closeBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 1300,
    color: "#fff",
  },
  actionBar: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
    flexWrap: "wrap",
  },
  actionBtn: {
    background: "#fff",
    color: "#3585da",
    fontWeight: 600,
    fontSize: 15,
    textTransform: "none",
    borderRadius: 8,
    padding: "8px 20px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    border: "1px solid #e0e0e0",
    "&:hover": {
      background: "#f0f7fc",
      borderColor: "#3585da",
    },
  },
  reportContainer: {
    maxWidth: 900,
    margin: "0 auto",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function Result() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const current = drawerOpen ? drawerExpanded : drawerCollapsed;
  const history = useHistory();
  const isdoctor = useSelector((state) => state.states.isdoctor)
  const token = useSelector((state) => state.states.token)
  const data = useSelector((state) => state.states.data)
  const pdfExportComponent = React.useRef(null);

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
            type: "success"
          })
        } else {
          setsnackbar({
            ...snackbar,
            open: true,
            msg: "Report Not Saved Successfully",
            type: "warning"
          })
        }
      })
  }

  const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save();
  }

  return (
    <Box className={classes.root}>
      {isMobile ? (
        <>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            className={classes.mobileDrawer}
            classes={{ paper: classes.mobileDrawer }}
          >
            <IconButton className={classes.closeBtn} onClick={() => setMobileOpen(false)}>
              <CloseIcon />
            </IconButton>
            <SideDrawer expanded />
          </Drawer>
          <Box className={classes.content}>
            <IconButton className={classes.menuBtn} onClick={() => setMobileOpen(true)}>
              <MenuIcon />
            </IconButton>
            <Box className={classes.actionBar}>
              <Button
                startIcon={<ArrowBackIcon />}
                className={classes.actionBtn}
                onClick={() => history.goBack()}
              >
                Back
              </Button>
              {!isdoctor && (
                <Button
                  startIcon={<SaveIcon />}
                  className={classes.actionBtn}
                  onClick={saveReport}
                >
                  Save Report
                </Button>
              )}
              <Button
                startIcon={<DownloadIcon />}
                className={classes.actionBtn}
                onClick={handleExportWithComponent}
              >
                Download Report
              </Button>
            </Box>
            <Box className={classes.reportContainer}>
              <PDFExport ref={pdfExportComponent} paperSize="A4">
                <ReportTemplate />
              </PDFExport>
            </Box>
          </Box>
        </>
      ) : (
        <>
          <Box
            className={classes.drawerWrapper}
            style={{ width: current }}
            onMouseEnter={() => setDrawerOpen(true)}
            onMouseLeave={() => setDrawerOpen(false)}
          >
            <SideDrawer />
          </Box>
          <Box className={classes.content} style={{ maxWidth: `calc(100% - ${current}px)` }}>
            <Box className={classes.actionBar}>
              <Button
                startIcon={<ArrowBackIcon />}
                className={classes.actionBtn}
                onClick={() => history.goBack()}
              >
                Back
              </Button>
              {!isdoctor && (
                <Button
                  startIcon={<SaveIcon />}
                  className={classes.actionBtn}
                  onClick={saveReport}
                >
                  Save Report
                </Button>
              )}
              <Button
                startIcon={<DownloadIcon />}
                className={classes.actionBtn}
                onClick={handleExportWithComponent}
              >
                Download Report
              </Button>
            </Box>
            <Box className={classes.reportContainer}>
              <PDFExport ref={pdfExportComponent} paperSize="A4">
                <ReportTemplate />
              </PDFExport>
            </Box>
          </Box>
        </>
      )}
      <Snackbar open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert severity={snackbar.type}>
          {snackbar.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
