import React from "react";
import "./style.css";
import Grid from "@material-ui/core/Grid";
import {
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useSelector } from "react-redux";

import { GraphGlocuse } from "./graphs";
import * as getdata from "../Services/graphsdata";
import { useFormik } from "formik";
import { validationSchemaBG as validationSchema } from "../Services/validations";

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
    }
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
  Tablecontentbox: {
    width: "100%",
    borderRadius: "28px",
    background: "linear-gradient(#abd7ec 0%, #88ceea 50.42%, #59c1e8 100%)",
    boxShadow: "6px 6px 10px rgba(0, 0, 0, 0.16)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "30px",
    padding: "12px",
  },
  Tablecontenthead: {
    width: "100%",
    borderRadius: "28px",
    background: "linear-gradient(#abd7ec 0%, #88ceea 50.42%, #59c1e8 100%)",
    boxShadow: "6px 6px 10px rgba(0, 0, 0, 0.16)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "30px",
    padding: "10px",
  },
  TableContentFont: {
    fontWeight: "bold",
    fontSize: "14px",
    color: "#fff",
    fontFamily: "Montserrat",
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
    height: 300,
    overflowY: "scroll",
  }
});

function Glucoselevelrecord({ value, type, date, unit }) {
  const classes = useStyles();
  return (
    <Grid item xs={11} className={classes.Tablecontentbox}>
      <Grid item xs={6} sm={3}>
        <Typography className={classes.TableContentFont}>{value + " " + unit}</Typography>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Typography className={classes.TableContentFont}>{type}</Typography>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Typography className={classes.TableContentFont}>{date.split("T")[1].split(".")[0]}</Typography>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Typography className={classes.TableContentFont}>{date.split("T")[0]}</Typography>
      </Grid>
    </Grid>
  );
}

function Glucoselevelhead() {
  const classes = useStyles();
  return (
    <Grid item xs={11} className={classes.Tablecontenthead}>
      <Grid item xs={6} sm={3}>
        <Typography className={classes.TableContentFont}>Value</Typography>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Typography className={classes.TableContentFont}>Type</Typography>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Typography className={classes.TableContentFont}>Time</Typography>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Typography className={classes.TableContentFont}>Date</Typography>
      </Grid>
    </Grid>
  );
}

export function ManageGL() {
  const theme = createTheme({
    palette: {
      secondary: {
        main: "#3585da",
      },
    },
  });
  const [GLunit, setGLunit] = React.useState("mg/dl");

  const handleChange = (event) => {
    setGLunit(event.target.value);
  };
  const [fast, setfast] = React.useState("");
  const handleChang = (event) => {
    setfast(event.target.value);
  };
  const classes = useStyles();

  const token = useSelector((state) => state.states.token);
  const id = useSelector((state) => state.states.user._id)
  const [data, setdata] = React.useState(null);
  const [fasting, setfasting] = React.useState(null);
  const [rand, setrand] = React.useState(null);
  const [check, setcheck] = React.useState(true);

  const formik = useFormik({
    initialValues: {
      value: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      values = { ...values, patient: id, isFasting: fast === "Fasting" ? true : false, unit: GLunit }
      getdata.savebgrecord(token, values)
        .then(res => {
          if (res.data.success) {
            rows();
            getfastavg();
            getrandavg();
            setcheck(!check);
            formik.resetForm()
          }
        })
    }
  })

  const rows = () => {
    getdata.getbgrecord(token)
      .then(res => {
        if (res.data.success) {
          if (res.data.record.length > 0)
            setdata(res.data.record)
          else
            setdata([{
              value: 'No Record Found ',
              unit: "",
              dateAdded: "N/ATN/A",
              type: ""
            }])
        } else {
          setdata([{
            value: 'No Record Found ',
            unit: "",
            dateAdded: "N/ATN/A",
            type: ""
          }])
        }
      })
  }

  const getfastavg = () => {
    getdata.getfastingavg(token)
      .then(res => {
        // alert(JSON.stringify(res.data))
        if (res.data.success) {
          setfasting(res.data.avg);
        }
      })
  }

  const getrandavg = () => {
    getdata.getrandomavg(token)
      .then(res => {
        if (res.data.success) {
          setrand(res.data.avg)
        }
      })
  }

  React.useEffect(() => {
    rows();
    getfastavg();
    getrandavg();
  }, [token])

  return (
    <ThemeProvider theme={theme}>
      <div className="dashdiv">
        <Grid item xs={12} className={classes.DialogBox}>
          <Typography
            style={{ fontSize: "32px" }}
            className={classes.sameinfont}
          >
            MANAGE GLUCOSE LEVEL
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
                      <MenuItem value="mmol/L">
                        <em>mmol/L</em>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={11} md={3} className={classes.radiopos}>
                  <FormControl component="fieldset" className={classes.radiosize}>
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
                  <Button type="submit" className={classes.DEDial}>ADD</Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Grid item xs={11} className={classes.DEDialogBox}>
            <Grid container className={classes.DEDialpos}>
              <Grid item xs={6}>
                <Typography variant="h6">Fasting Sugar Level Average:
                  <Typography variant="body1"> {fasting ? fasting.fastingAvg : "No Record Avaliable"}</Typography>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">Random Sugar Level Average:
                  <Typography variant="body1"> {rand ? rand.randomAvg : "No Record Avaliable"}</Typography>
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={11} className={classes.Gridadjust}>
            <Grid container className={classes.GridAdjust}>
              <Grid item xs={12} md={5} className={classes.TDialogbox}>
                <Typography
                  variant="body1"
                  className={classes.sameinfont}
                >
                  GLUCOSE LEVEL TABLE
                </Typography>
                <Grid container>
                  <Glucoselevelhead />
                </Grid>
                <Grid container className={classes.bloodpressuretablecontainer}>
                  {
                    data ? data.map((item, index) => {
                      return (
                        <Grid item xs={11} className={classes.bloodpressuretableitem} key={index}>
                          <Glucoselevelrecord date={item.dateAdded} value={item.value} type={item.isFasting ? 'Fasting' : 'Random'} unit={item.unit} />
                        </Grid>
                      )
                    })
                      : <CircularProgress
                        style={{ marginRight: "20px", width: "50px", height: "50px" }}
                      />
                  }
                </Grid>
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
