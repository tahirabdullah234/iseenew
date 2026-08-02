import React from "react";
import "./style.css";
import Grid from "@material-ui/core/Grid";
import {
  makeStyles,
} from "@material-ui/core/styles";
import {
  Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import { useSelector } from "react-redux";

import { GraphGlocuse } from "./graphs";
import * as getdata from "../Services/graphsdata";
import { useFormik } from "formik";
import { validationSchemaBG as validationSchema } from "../Services/validations";
import { questions, answers } from "../Services/questions";

import * as model from "../Services/model";

const useStyles = makeStyles((theme) => ({
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
    textDecoration: "underline",
    textAlign: "center",
  },
  cardTitle: {
    fontFamily: "Montserrat",
    fontWeight: "bold",
    fontSize: 20,
    color: "#3585da",
    marginBottom: 12,
  },
  sectionLabel: {
    fontFamily: "Montserrat",
    fontWeight: 600,
    color: "#3585da",
    fontSize: 18,
  },
  sectionValue: {
    fontFamily: "Montserrat",
    color: "#444",
    fontSize: 18,
  },
  DEDialogBox: {
    width: "100%",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
    padding: "20px",
    marginTop: "12px",
    boxSizing: "border-box",
  },
  DEDialogBox1: {
    width: "100%",
    marginTop: "12px",
    boxSizing: "border-box",
  },
  DEDial: {
    borderRadius: "20px",
    background: "#3585da",
    boxShadow: "0 2px 6px rgba(53, 133, 218, 0.3)",
    color: "white",
    fontFamily: "Montserrat",
    fontWeight: 600,
    fontSize: 18,
    padding: "10px 36px",
    textTransform: "none",
    "&:hover": {
      background: "#2a6db8",
    },
  },
  TDialogbox: {
    width: "100%",
    background: "#fff",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
    borderRadius: "12px",
    padding: "16px",
    boxSizing: "border-box",
    height: "100%",
  },
  GLGDialogbox: {
    width: "100%",
    height: "100%",
    background: "#fff",
    fontFamily: "Montserrat",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
    borderRadius: "12px",
    padding: "16px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
  },
  graphWrapper: {
    flex: 1,
    minHeight: 0,
    width: "100%",
  },
  glucoseTable: {
    borderCollapse: "separate",
    borderSpacing: "0 4px",
    minWidth: 500,
  },
  glucoseTableHeadRow: {
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
  glucoseTableBodyRow: {
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
  BPGTitle: {
    fontFamily: "Montserrat",
    fontWeight: "bold",
    fontSize: 18,
    color: "#3585da",
    marginBottom: 12,
    textAlign: "center",
  },
  formRow: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
  },
  tableGraphWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "16px",
    width: "100%",
  },
  tableGraphItem: {
    flex: "1 1 100%",
    minWidth: 0,
    boxSizing: "border-box",
    [theme.breakpoints.up("md")]: {
      flex: "1 1 calc(50% - 8px)",
    },
  },
  bloodpressuretablecontainer: {
    width: "100%",
    maxHeight: 300,
    overflowY: "auto",
    overflowX: "auto",
  },
}));



export function ManageGL() {
  const classes = useStyles();
  const token = useSelector((state) => state.states.token);
  const id = useSelector((state) => state.states.user._id);
  const [data, setdata] = React.useState(null);
  const [fasting, setfasting] = React.useState(null);
  const [rand, setrand] = React.useState(null);
  const [check, setcheck] = React.useState(true);
  const [ans] = React.useState(answers);
  const [mark, setmark] = React.useState("");
  const [GLunit, setGLunit] = React.useState("mg/dl");
  const [index, setindex] = React.useState(0);
  const [fast, setfast] = React.useState("");
  const [result, setresult] = React.useState(null);

  const handleChange = (event) => {
    setGLunit(event.target.value);
  };
  const handleChang = (event) => {
    setfast(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      value: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      values = {
        ...values,
        patient: id,
        isFasting: fast === "Fasting" ? true : false,
        unit: GLunit,
      };
      getdata.savebgrecord(token, values).then((res) => {
        if (res.data.success) {
          rows();
          getfastavg();
          getrandavg();
          setcheck(!check);
          formik.resetForm();
        }
      });
    },
  });

  const rows = () => {
    getdata.getbgrecord(token).then((res) => {
      if (res.data.success) {
        if (res.data.record.length > 0) setdata(res.data.record);
        else
          setdata([
            {
              value: "No Record Found ",
              unit: "",
              dateAdded: "N/ATN/A",
              type: "",
            },
          ]);
      } else {
        setdata([
          {
            value: "No Record Found ",
            unit: "",
            dateAdded: "N/ATN/A",
            type: "",
          },
        ]);
      }
    });
  };

  const getfastavg = () => {
    getdata.getfastingavg(token).then((res) => {
      // alert(JSON.stringify(res.data))
      if (res.data.success) {
        setfasting(res.data.avg);
      }
    });
  };

  const getrandavg = () => {
    getdata.getrandomavg(token).then((res) => {
      if (res.data.success) {
        setrand(res.data.avg);
      }
    });
  };

  React.useEffect(() => {
    rows();
    getfastavg();
    getrandavg();
  }, [token]);

  const getSymPred = () => {
    model.get_symp_pred(token, ans).then((res) => {
      if (res.data.request) {
        if (res.data.prediction > 0 && res.data.prediction < 0.51) {
          setresult("Diabetic");
        } else {
          setresult("Not Diabetic");
        }
      }
    });
  };

  return (
      <div className="dashdiv">
        <Grid item xs={12} className={classes.DialogBox}>
          <Typography variant="h4" className={classes.sameinfont}>
            MANAGE BLOOD GLUCOSE
          </Typography>
          <Grid item xs={11} className={classes.DEDialogBox}>
            <Typography className={classes.cardTitle}>
              Add Blood Glucose Record
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Box className={classes.formRow}>
                <Box flex="1 1 200px" minWidth={0}>
                  <TextField
                    label="Glucose Value"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    id="value"
                    name="value"
                    value={formik.values.value}
                    onChange={formik.handleChange}
                    error={formik.touched.value && Boolean(formik.errors.value)}
                    helperText={formik.touched.value && formik.errors.value}
                  />
                </Box>
                <Box flex="1 1 140px" minWidth={0}>
                  <FormControl fullWidth style={{ marginTop: 0 }}>
                    <InputLabel shrink>Unit</InputLabel>
                    <Select value={GLunit} onChange={handleChange}>
                      <MenuItem value="mg/dl">
                        <em>mg/dl</em>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box display="flex" alignItems="center" gap="8px">
                  <FormControl component="fieldset">
                    <RadioGroup
                      value={fast}
                      onChange={handleChang}
                      row
                    >
                      <FormControlLabel
                        value="Random"
                        control={<Radio />}
                        label="Random"
                      />
                      <FormControlLabel
                        value="Fasting"
                        control={<Radio />}
                        label="Fasting"
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
                <Button type="submit" className={classes.DEDial}>
                  ADD
                </Button>
              </Box>
            </form>
          </Grid>
          <Grid item xs={11} className={classes.DEDialogBox}>
            <Typography className={classes.cardTitle}>
              Blood Glucose Averages
            </Typography>
            <Box display="flex" flexWrap="wrap" gap="16px">
              <Box flex="1 1 200px">
                <Typography className={classes.sectionLabel}>
                  Fasting Average
                </Typography>
                <Typography className={classes.sectionValue}>
                  {fasting ? Number(fasting.fastingAvg).toFixed(3) : "No Record Available"}
                </Typography>
              </Box>
              <Box flex="1 1 200px">
                <Typography className={classes.sectionLabel}>
                  Random Average
                </Typography>
                <Typography className={classes.sectionValue}>
                  {rand ? Number(rand.randomAvg).toFixed(3) : "No Record Available"}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={11} className={classes.DEDialogBox}>
            <Typography className={classes.cardTitle}>
              Symptoms Based Check for Diabetes
            </Typography>
            <Typography style={{ marginBottom: 8, color: "#666", fontSize: 18 }}>
              Please answer the following questions:
            </Typography>
            <Box mt={1} mb={1}>
              <Typography style={{ fontWeight: 600, fontSize: 18, color: "#333" }}>
                {questions ? questions[index] : ""}
              </Typography>
            </Box>
            <FormControl component="fieldset">
              <RadioGroup
                value={mark}
                onChange={(e) => {
                  ans[index] = Number(e.target.value);
                  setmark(e.target.value);
                }}
                row
              >
                <FormControlLabel value="0" control={<Radio />} label="No" />
                <FormControlLabel value="1" control={<Radio />} label="Yes" />
              </RadioGroup>
            </FormControl>
            <Box display="flex" alignItems="center" justifyContent="center" mt={1} style={{ gap: 16 }}>
              <IconButton
                aria-label="previous question"
                component="span"
                onClick={() => {
                  if (index > 0) {
                    setindex(index - 1);
                    setmark("");
                  }
                }}
                disabled={index === 0}
                size="small"
              >
                <ArrowBackIosIcon fontSize="small" />
                <Typography variant="body2" style={{ marginLeft: 2, fontSize: 18 }}>Previous</Typography>
              </IconButton>
              {index === questions.length - 1 ? (
                <Button
                  onClick={() => { getSymPred() }}
                  size="small"
                  variant="contained"
                  color="primary"
                  style={{ textTransform: "none", borderRadius: 20, fontSize: 18 }}
                >
                  Submit
                </Button>
              ) : (
                <IconButton
                  aria-label="next question"
                  component="span"
                  onClick={() => {
                    if (index < questions.length - 1 && mark !== "") {
                      setindex(index + 1);
                      setmark("");
                    }
                  }}
                  disabled={index === questions.length - 1}
                  size="small"
                >
                  <Typography variant="body2" style={{ marginRight: 2, fontSize: 18 }}>Next</Typography>
                  <ArrowForwardIosIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
            {result && (
              <Box mt={1}>
                <Typography style={{ fontWeight: 600, color: "#3585da", fontSize: 18 }}>
                  Result: Your symptoms indicate you are {result}
                </Typography>
              </Box>
            )}
          </Grid>
          <Grid item xs={11} className={classes.DEDialogBox1}>
            <Box className={classes.tableGraphWrapper}>
              <Box className={classes.tableGraphItem}>
                <Box className={classes.TDialogbox}>
                  <Typography
                    variant="body1"
                    className={classes.cardTitle}
                  >
                    BLOOD GLUCOSE TABLE
                  </Typography>
                  <TableContainer className={classes.bloodpressuretablecontainer}>
                    <Table className={classes.glucoseTable}>
                      <TableHead>
                        <TableRow className={classes.glucoseTableHeadRow}>
                          <TableCell align="center">Value</TableCell>
                          <TableCell align="center">Type</TableCell>
                          <TableCell>Time</TableCell>
                          <TableCell>Date</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data ? (
                          data.map((item, index) => (
                            <TableRow key={index} className={classes.glucoseTableBodyRow}>
                              <TableCell align="center">{item.value + " " + item.unit}</TableCell>
                              <TableCell align="center">{item.isFasting ? "Fasting" : "Random"}</TableCell>
                              <TableCell>{item.dateAdded.split("T")[1].split(".")[0]}</TableCell>
                              <TableCell>{item.dateAdded.split("T")[0]}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4} align="center" style={{ border: "none", background: "transparent" }}>
                              <CircularProgress />
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Box>
              <Box className={classes.tableGraphItem}>
                <Box className={classes.GLGDialogbox}>
                  <Typography variant="body2" className={classes.BPGTitle}>
                    BLOOD GLUCOSE GRAPH
                  </Typography>
                  <Box className={classes.graphWrapper}>
                    <GraphGlocuse check={check} />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </div>
  );
}
