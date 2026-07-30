import React from "react";
import "./style.css";
import Grid from "@material-ui/core/Grid";
import {
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
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
    fontFamily: "Montserrat",
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
    marginTop: "13px",
    "&:hover": {
      background: "rgba(53,133,218,0.7)",
    },
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
  GLGDialogbox: {
    width: "100%",
    background: "#fff",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    borderRadius: "12px",
    padding: "10px",
    marginTop: "35px",
  },
  glucoseTable: {
    borderCollapse: "separate",
    borderSpacing: "0 4px",
    minWidth: 500,
  },
  glucoseTableHeadRow: {
    "& th": {
      background: "linear-gradient(#abd7ec 0%, #88ceea 50.42%, #59c1e8 100%)",
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
    fontWeight: "bold",
    color: "#3585da",
    fontFamily: "Montserrat",
  },
  DEDialpos: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  Glucoselevel: { width: "100%" },
  radiopos: {
    display: "flex",
    justifyContent: "space-around",
    textAlign: "center",
  },
  radiosize: {
    marginTop: "16px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  radiogrp: { display: "flex", flexDirection: "row" },
  Gridadjust: {
    display: "flex",
    alignItems: "center",
  },
  GridAdjust: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bloodpressuretableitem: {
    margin: "auto",
  },
  bloodpressuretablecontainer: {
    width: "100%",
    maxHeight: 300,
    overflowY: "auto",
    overflowX: "auto",
  },
});



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

  const theme = createTheme({
    palette: {
      secondary: {
        main: "#3585da",
      },
    },
  });

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
    <ThemeProvider theme={theme}>
      <div className="dashdiv">
        <Grid item xs={12} className={classes.DialogBox}>
          <Typography
            style={{ fontSize: "32px" }}
            className={classes.sameinfont}
          >
            MANAGE BLOOD GLUCOSE
          </Typography>
          <Grid item xs={11} className={classes.DEDialogBox}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container className={classes.DEDialpos}>
                <Grid item xs={5} md={3}>
                  <TextField
                    label="GLUCOSE LEVEL"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    className={classes.Glucoselevel}
                    id="value"
                    name="value"
                    value={formik.values.value}
                    onChange={formik.handleChange}
                    error={formik.touched.value && Boolean(formik.errors.value)}
                    helperText={formik.touched.value && formik.errors.value}
                  ></TextField>
                </Grid>
                <Grid item xs={6} md={2}>
                  <FormControl
                    className={classes.formControl}
                    style={{ marginTop: "16px", width: "100%" }}
                  >
                    <Select value={GLunit} onChange={handleChange}>
                      <MenuItem value="mg/dl">
                        <em>mg/dl</em>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={11} md={3} className={classes.radiopos}>
                  <FormControl
                    component="fieldset"
                    className={classes.radiosize}
                  >
                    <RadioGroup
                      aria-label="isFasting"
                      name="isFasting"
                      value={fast}
                      onChange={handleChang}
                      className={classes.radiogrp}
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
                </Grid>
                <Grid item xs={5} sm={2}>
                  <Button type="submit" className={classes.DEDial}>
                    ADD
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Grid item xs={11} className={classes.DEDialogBox}>
            <Grid container className={classes.DEDialpos}>
              <Grid item xs={6}>
                <Typography variant="h6">
                  Fasting Sugar Level Average:
                  <Typography variant="body1">
                    {" "}
                    {fasting ? Number(fasting.fastingAvg).toFixed(3) : "No Record Avaliable"}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">
                  Random Sugar Level Average:
                  <Typography variant="body1">
                    {" "}
                    {rand ? Number(rand.randomAvg).toFixed(3) : "No Record Avaliable"}
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/*questions grid*/}
          <Grid item xs={11} className={classes.DEDialogBox}>
            <Grid container className={classes.DEDialpos}>
              <Grid item xs={12}>
                <Typography variant="h6">
                  Symptoms Based Check for Diabeties:{" "}
                </Typography>
                <Typography variant="subtitle">
                  Please Answer the following Question:
                </Typography>
              </Grid>
              <Grid item xs={11} style={{ width: "100%", margin: "auto" }}>
                <Typography variant="h6">
                  {questions ? questions[index] : ""}{" "}
                </Typography>
                <Grid item xs={11} style={{ margin: "auto" }}>
                  <FormControl component="fieldset">
                    <RadioGroup
                      value={mark}
                      onChange={(e) => {
                        ans[index] = Number(e.target.value);
                        setmark(e.target.value);
                      }}
                    >
                      <FormControlLabel
                        value="0"
                        control={<Radio />}
                        label="No"
                      />
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="Yes"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
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
                >
                  <ArrowBackIosIcon />
                  <Typography variant="caption">Prevoius</Typography>
                </IconButton>
                {index === questions.length - 1 ? (
                  <Button
                    onClick={() => {
                      getSymPred();
                    }}
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
                  >
                    <Typography variant="caption">Next</Typography>
                    <ArrowForwardIosIcon />
                  </IconButton>
                )}
                {result ? (
                  <Typography variant="body1">
                    Result Your Symptoms are {result}
                  </Typography>
                ) : (
                  <Typography variant="body1"></Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={11} className={classes.Gridadjust}>
            <Grid container className={classes.GridAdjust}>
              <Grid item xs={12} md={5} className={classes.TDialogbox}>
                <Typography variant="body1" className={classes.sameinfont}>
                  GLUCOSE LEVEL TABLE
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
              </Grid>
              <Grid item xs={12} md={6} className={classes.GLGDialogbox}>
                <Typography variant="body2" className={classes.BPGTitle}>
                  GLUCOSE LEVEL GRAPH
                </Typography>
                <Grid container style={{ margin: "auto" }}>
                  <GraphGlocuse check={check} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}
