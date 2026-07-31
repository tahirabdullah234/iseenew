import React from "react";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
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
    background: "linear-gradient(45deg,#f5f7fa 0%, #e4e9f0 100%)",
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
    padding: "24px 32px",
    boxSizing: "border-box",
    [theme.breakpoints.down("sm")]: { padding: "16px 14px" },
  },
  menuBtn: {
    background: "#1061B0",
    color: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    "&:hover": { background: "#0d4d8f" },
    [theme.breakpoints.down("sm")]: {
      marginTop: -16,
      marginLeft: -14,
    },
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
  pageHeader: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginBottom: 20,
    flexWrap: "wrap",
  },
  backBtn: {
    background: "#fff",
    color: "#3585da",
    fontWeight: 600,
    fontSize: 15,
    textTransform: "none",
    borderRadius: 10,
    padding: "8px 16px",
    boxShadow: "0 2px 8px rgba(16,97,176,0.12)",
    border: "1px solid #e0e8f2",
    "&:hover": {
      background: "#f0f7fc",
      borderColor: "#3585da",
    },
  },
  headerText: {
    flex: 1,
    minWidth: 220,
  },
  sectionBar: {
    display: "inline-block",
    width: 5,
    height: 24,
    borderRadius: 3,
    background: "linear-gradient(45deg, #3585da 0%, #59c1e8 100%)",
    marginRight: 12,
    verticalAlign: "middle",
  },
  pageTitle: {
    fontFamily: "Montserrat",
    fontWeight: 700,
    fontSize: 24,
    color: "#1061b0",
    [theme.breakpoints.down("sm")]: { fontSize: 19 },
  },
  pageSub: {
    fontFamily: "Montserrat",
    fontSize: 14,
    color: "#8e9bb0",
    marginTop: 4,
    marginLeft: 17,
  },
  actions: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    marginLeft: "auto",
  },
  saveBtn: {
    background: "linear-gradient(45deg, #3585da 0%, #59c1e8 100%)",
    color: "#fff",
    fontWeight: 700,
    fontSize: 15,
    textTransform: "none",
    borderRadius: 10,
    padding: "10px 22px",
    boxShadow: "0 6px 18px rgba(53, 133, 218, 0.35)",
    "&:hover": {
      background: "linear-gradient(45deg, #2b74c4 0%, #49a9d6 100%)",
      boxShadow: "0 8px 22px rgba(53, 133, 218, 0.45)",
    },
  },
  downloadBtn: {
    background: "#fff",
    color: "#3585da",
    fontWeight: 700,
    fontSize: 15,
    textTransform: "none",
    borderRadius: 10,
    padding: "10px 22px",
    boxShadow: "0 2px 8px rgba(16,97,176,0.12)",
    border: "1px solid #3585da",
    "&:hover": {
      background: "#f0f7fc",
    },
  },
  reportContainer: {
    width: "100%",
    margin: "0 auto",
    background: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 12px 32px rgba(16, 97, 176, 0.18)",
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

  const header = (
    <Box className={classes.pageHeader}>
      <Button
        startIcon={<ArrowBackIcon />}
        className={classes.backBtn}
        onClick={() => history.goBack()}
      >
        Back
      </Button>
      <Box className={classes.headerText}>
        <Typography className={classes.pageTitle}>
          <span className={classes.sectionBar} />
          Screening Report
        </Typography>
        <Typography className={classes.pageSub}>
          Review the auto-generated diabetic retinopathy screening result below
        </Typography>
      </Box>
      <Box className={classes.actions}>
        {!isdoctor && (
          <Button
            startIcon={<SaveIcon />}
            className={classes.saveBtn}
            onClick={saveReport}
          >
            Save Report
          </Button>
        )}
        <Button
          startIcon={<DownloadIcon />}
          className={classes.downloadBtn}
          onClick={handleExportWithComponent}
        >
          Download
        </Button>
      </Box>
    </Box>
  );

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
            {header}
            <Box className={classes.reportContainer}>
              <PDFExport ref={pdfExportComponent} paperSize="A4" margin={0}>
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
            {header}
            <Box className={classes.reportContainer}>
              <PDFExport ref={pdfExportComponent} paperSize="A4" margin={0}>
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
