import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import iseelogo from "../Assets/whiteisee.png";
import view from "../Assets/view.svg";
import guideline from "../Assets/guideline.svg";

import * as model from "../Services/model";
import { useSelector, useDispatch } from "react-redux";
import { setdata } from "../pages/statesSlice";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    padding: 16,
  },
  card: {
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
    background: "#fff",
    boxShadow: "0 4px 20px rgba(16,97,176,0.15)",
  },
  banner: {
    background:
      "linear-gradient(45deg,#1061b0 0%, #1f74bb 17.4%, #4eb2df 72.29%, #59c1e8 100%)",
    padding: "28px 28px 44px",
    color: "#fff",
    textAlign: "center",
  },
  bannerLogo: {
    height: 44,
  },
  bannerTitle: {
    fontFamily: "Montserrat",
    fontWeight: 700,
    fontSize: 26,
    marginTop: 12,
    [theme.breakpoints.down("xs")]: {
      fontSize: 20,
    },
  },
  bannerSub: {
    fontFamily: "Montserrat",
    fontSize: 18,
    opacity: 0.92,
    marginTop: 6,
    [theme.breakpoints.down("xs")]: {
      fontSize: 15,
    },
  },
  bannerBadge: {
    display: "inline-block",
    fontFamily: "Montserrat",
    fontWeight: 600,
    fontSize: 18,
    letterSpacing: "0.12em",
    background: "rgba(255,255,255,0.18)",
    border: "1px solid rgba(255,255,255,0.45)",
    padding: "4px 14px",
    borderRadius: 999,
    marginTop: 14,
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
    },
  },
  stepsRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "-22px 28px 0",
    position: "relative",
    zIndex: 2,
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 2px 12px rgba(16,97,176,0.12)",
    padding: "14px 20px",
  },
  stepItem: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  stepCircle: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Montserrat",
    fontWeight: 700,
    fontSize: 18,
    [theme.breakpoints.down("xs")]: {
      width: 30,
      height: 30,
      fontSize: 14,
    },
  },
  stepDone: {
    background: "#43a047",
    color: "#fff",
  },
  stepActive: {
    background: "linear-gradient(45deg,#3585da,#59c1e8)",
    color: "#fff",
    boxShadow: "0 2px 8px rgba(53,133,218,0.4)",
  },
  stepPending: {
    background: "#e3ecf5",
    color: "#8aa6c4",
  },
  stepLabel: {
    fontFamily: "Montserrat",
    fontWeight: 600,
    fontSize: 18,
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
    },
  },
  connector: {
    width: 36,
    height: 2,
    background: "#e3ecf5",
    margin: "0 10px",
  },
  connectorDone: {
    background: "#43a047",
  },
  body: {
    padding: "26px 28px 30px",
  },
  patientPanel: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 14,
    padding: 18,
    background: "#f0f7fc",
    border: "1px solid #d6e6f7",
    borderRadius: 14,
    marginBottom: 20,
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: "1fr",
    },
  },
  patientTitle: {
    gridColumn: "1 / -1",
    fontFamily: "Montserrat",
    fontWeight: 700,
    fontSize: 18,
    letterSpacing: "0.1em",
    color: "#1061b0",
    [theme.breakpoints.down("xs")]: {
      fontSize: 15,
    },
  },
  fieldInput: {
    fontFamily: "Montserrat",
    fontSize: 18,
    [theme.breakpoints.down("xs")]: {
      fontSize: 16,
    },
  },
  preview: {
    border: "2px dashed #a9c9ea",
    borderRadius: 14,
    background: "linear-gradient(180deg,#f6fafd 0%, #eaf3fb 100%)",
    minHeight: 300,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  previewImg: {
    maxWidth: "100%",
    maxHeight: 320,
    borderRadius: 10,
    objectFit: "contain",
  },
  previewIcon: {
    width: 74,
    opacity: 0.9,
    filter:
      "brightness(0) saturate(100%) invert(34%) sepia(63%) saturate(3276%) hue-rotate(189deg) brightness(94%) contrast(90%)",
  },
  previewText: {
    fontFamily: "Montserrat",
    fontSize: 18,
    color: "#6b8cab",
    marginTop: 12,
    [theme.breakpoints.down("xs")]: {
      fontSize: 15,
    },
  },
  fileBar: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: "#f0f7fc",
    border: "1px solid #d6e6f7",
    borderRadius: 10,
    padding: "10px 14px",
    marginTop: 16,
  },
  fileName: {
    flex: 1,
    fontFamily: "Montserrat",
    fontSize: 18,
    color: "#333",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    [theme.breakpoints.down("xs")]: {
      fontSize: 15,
    },
  },
  actionRow: {
    display: "flex",
    gap: 14,
    marginTop: 22,
    flexWrap: "wrap",
  },
  uploadBtn: {
    flex: 1,
    minWidth: 180,
    background: "#fff",
    color: "#3585da",
    fontWeight: 700,
    fontSize: 18,
    borderRadius: 12,
    padding: "12px 20px",
    border: "2px solid #3585da",
    fontFamily: "Montserrat",
    letterSpacing: "0.04em",
    [theme.breakpoints.down("xs")]: {
      fontSize: 15,
    },
    "&:hover": {
      background: "#f0f7fc",
    },
  },
  classifyBtn: {
    flex: 1,
    minWidth: 180,
    background: "linear-gradient(45deg,#3585da,#59c1e8)",
    color: "#fff",
    fontWeight: 700,
    fontSize: 18,
    borderRadius: 12,
    padding: "12px 20px",
    fontFamily: "Montserrat",
    letterSpacing: "0.04em",
    boxShadow: "0 3px 10px rgba(53,133,218,0.35)",
    [theme.breakpoints.down("xs")]: {
      fontSize: 15,
    },
    "&:hover": {
      background: "linear-gradient(45deg,#2d76c4,#4db0d8)",
    },
  },
  guideBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    margin: "22px auto 0",
    color: "#3585da",
    textDecoration: "underline",
    fontFamily: "Montserrat",
    fontSize: 18,
    cursor: "pointer",
    background: "none",
    border: "none",
    [theme.breakpoints.down("xs")]: {
      fontSize: 15,
    },
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function RetinaScan() {
  const classes = useStyles();
  const fileInput = React.useRef(null);
  const [scan, setscan] = React.useState(null);
  const [loader, setloader] = React.useState(false);
  const [snackbar, setsnackbar] = React.useState({ open: false, msg: "" });
  const token = useSelector((state) => state.states.token);
  const user = useSelector((state) => state.states.user);
  const isdoctor = useSelector((state) => state.states.isdoctor);
  const dispatch = useDispatch();
  const history = useHistory();

  const [patient, setPatient] = React.useState({
    name: "",
    id: "",
    gender: "",
    dob: "",
  });

  const step = loader ? 2 : scan ? 1 : 0;
  const scanSrc = scan && scan.filename ? `/${scan.filename}` : null;

  const handleClick = () => {
    if (fileInput.current) fileInput.current.click();
  };

  const handleChange = (event) => {
    event.preventDefault();
    const file = fileInput.current && fileInput.current.files[0];
    if (!file) return;
    const data = new FormData();
    data.append("file", file);
    model.upload_file(token, data).then((res) => {
      if (res.data) setscan(res.data);
    });
  };

  const handleRemove = () => {
    setscan(null);
    if (fileInput.current) fileInput.current.value = "";
  };

  const patientOverrides = () => ({
    patientName: patient.name,
    patientId: patient.id,
    patientGender: patient.gender,
    patientDob: patient.dob,
  });

  const handleClassifyImage = () => {
    if (!scan || !fileInput.current.files[0]) return;
    const data = new FormData();
    data.append("file", fileInput.current.files[0]);
    setloader(true);
    model.get_prediction(token, data).then((res) => {
      setloader(false);
      if (res.data.success) {
        const result = {
          u_id: isdoctor ? patient.id : user._id,
          scan: fileInput.current.files[0].name,
          prediction: res.data.label[0],
          probability: res.data.accuracy,
        };
        if (isdoctor) Object.assign(result, patientOverrides());
        model.new_dataset(token, result).then((res_data) => {
          if (res_data.data.success) {
            const merged = isdoctor
              ? { ...res_data.data.data, ...patientOverrides() }
              : res_data.data.data;
            dispatch(setdata(merged));
            history.push("/result");
          }
        });
      }
    });
  };

  const handleClose = () => setsnackbar((s) => ({ ...s, open: false }));
  const showGuide = () =>
    setsnackbar({
      open: true,
      msg:
        "1. Click UPLOAD IMAGE to select a retina scan. 2. Preview the uploaded scan. 3. Click CLASSIFY IMAGE to run diabetic retinopathy detection.",
    });

  const steps = ["Upload", "Preview", "Analyze"];

  return (
    <Box className={classes.container}>
      <Box className={classes.card}>
        <Box className={classes.banner}>
          <img src={iseelogo} className={classes.bannerLogo} alt="ISEE" />
          <Typography className={classes.bannerTitle}>
            {isdoctor ? "DR SCREENING FOR PATIENT" : "DISEASE DETECTION SYSTEM"}
          </Typography>
          <Typography className={classes.bannerSub}>
            {isdoctor
              ? "Upload a patient's retina scan and screen it for diabetic retinopathy."
              : "Upload your retina scan and let ISEE detect diabetic retinopathy for you."}
          </Typography>
          <span className={classes.bannerBadge}>
            {isdoctor ? "DOCTOR SCREENING MODE" : "PATIENT SELF-CHECK"}
          </span>
        </Box>

        <Box className={classes.stepsRow}>
          {steps.map((label, i) => (
            <React.Fragment key={label}>
              {i > 0 && (
                <Box className={`${classes.connector} ${step > i ? classes.connectorDone : ""}`} />
              )}
              <Box className={classes.stepItem}>
                <Box
                  className={`${classes.stepCircle} ${
                    step > i ? classes.stepDone : step === i ? classes.stepActive : classes.stepPending
                  }`}
                >
                  {step > i ? <CheckIcon style={{ fontSize: 20 }} /> : i + 1}
                </Box>
                <Typography
                  className={classes.stepLabel}
                  style={{ color: step >= i ? "#1061b0" : "#8aa6c4" }}
                >
                  {label}
                </Typography>
              </Box>
            </React.Fragment>
          ))}
        </Box>

        <Box className={classes.body}>
          {isdoctor && (
            <Box className={classes.patientPanel}>
              <Typography className={classes.patientTitle}>
                PATIENT DETAILS — SCREENING FOR
              </Typography>
              <TextField
                size="small"
                variant="outlined"
                label="Patient Name"
                value={patient.name}
                onChange={(e) => setPatient({ ...patient, name: e.target.value })}
                InputProps={{ classes: { input: classes.fieldInput } }}
              />
              <TextField
                size="small"
                variant="outlined"
                label="Patient ID"
                value={patient.id}
                onChange={(e) => setPatient({ ...patient, id: e.target.value })}
                InputProps={{ classes: { input: classes.fieldInput } }}
              />
              <TextField
                size="small"
                variant="outlined"
                label="Gender"
                value={patient.gender}
                onChange={(e) => setPatient({ ...patient, gender: e.target.value })}
                InputProps={{ classes: { input: classes.fieldInput } }}
              />
              <TextField
                size="small"
                variant="outlined"
                label="Date Of Birth"
                value={patient.dob}
                onChange={(e) => setPatient({ ...patient, dob: e.target.value })}
                InputProps={{ classes: { input: classes.fieldInput } }}
              />
            </Box>
          )}

          <Box className={classes.preview}>
            {loader ? (
              <>
                <CircularProgress style={{ color: "#3585da", width: 52, height: 52 }} />
                <Typography className={classes.previewText}>Analyzing your scan...</Typography>
              </>
            ) : scanSrc ? (
              <img src={scanSrc} className={classes.previewImg} alt="Retina scan preview" />
            ) : (
              <>
                <img src={view} className={classes.previewIcon} alt="" />
                <Typography className={classes.previewText}>
                  {isdoctor
                    ? "Upload the patient's retina scan to begin"
                    : "Upload a retina scan to begin"}
                </Typography>
              </>
            )}
          </Box>

          {scan && (
            <Box className={classes.fileBar}>
              <InsertDriveFileIcon style={{ color: "#3585da", fontSize: 22 }} />
              <Typography className={classes.fileName}>{scan.filename || "Scan"}</Typography>
              <IconButton size="small" onClick={handleRemove}>
                <CloseIcon style={{ fontSize: 22 }} />
              </IconButton>
            </Box>
          )}

          <Box className={classes.actionRow}>
            <Button className={classes.uploadBtn} onClick={handleClick}>
              UPLOAD IMAGE
            </Button>
            <input
              type="file"
              ref={fileInput}
              accept="image/*"
              onChange={handleChange}
              style={{ display: "none" }}
            />
            <Button
              className={classes.classifyBtn}
              disabled={!scan || loader}
              onClick={handleClassifyImage}
              style={
                scan && !loader ? {} : { opacity: 0.45, boxShadow: "none", cursor: "not-allowed" }
              }
            >
              {loader ? "ANALYZING..." : "CLASSIFY IMAGE"}
            </Button>
          </Box>

          <button className={classes.guideBtn} onClick={showGuide} type="button">
            <img
              src={guideline}
              style={{
                width: 18,
                filter:
                  "brightness(0) saturate(100%) invert(34%) sepia(63%) saturate(3276%) hue-rotate(189deg) brightness(94%) contrast(90%)",
              }}
              alt=""
            />
            HOW TO USE ISEE.
          </button>
        </Box>

        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="info">
            {snackbar.msg}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
