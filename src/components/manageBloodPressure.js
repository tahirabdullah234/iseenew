import React from "react";
import "./style.css";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { GraphBp } from "./graphs";
import * as getdata from "../Services/graphsdata";
import { useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

import { validationSchemaBP as validationSchema } from "../Services/validations";
import { useFormik } from "formik";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { questions, answers } from "../Services/questions";

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
    textDecoration: "underline",
    color: "#3585da",
    textShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
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
    marginTop: "10px",
    fontFamily: "Montserrat",
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
  BPGDialogbox: {
    width: "100%",
    background: "#fff",
    fontFamily: "Montserrat",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    borderRadius: "12px",
    padding: "10px",
    marginTop: "35px",
  },
  Tablecontentbox: {
    borderRadius: "28px",
    background: "linear-gradient(#abd7ec 0%, #88ceea 50.42%, #59c1e8 100%)",
    boxShadow: "6px 6px 10px rgba(0, 0, 0, 0.16)",
    justifyContent: "space-between",
    marginTop: "30px",
    padding: "12px",
  },
  TableContentFont: {
    fontWeight: "bold",
    fontFamily: "Montserrat",
    color: "#fff",
  },
  BPGTitle: {
    fontFamily: "Montserrat",
    fontWeight: "bold",
    color: "#3585da",
  },
  DEDialpos: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  setTextField: { marginTop: "10px", width: "100%" },
  Gridadjust: {
    display: "flex",
    alignItems: "center",
  },
  GridAjust: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },


  bloodpressuretablecontainer: {
    height: 300,
    overflowY: "scroll",
    marginTop: 30,
  }
});

function BPRecord({ sys, dys, date }) {
  const classes = useStyles();
  return (
    <Grid container className={classes.Tablecontentbox}>
      <Grid item xs={6} sm={3}>
        <Typography variant="body1" className={classes.TableContentFont}>{sys + " mmHg"}</Typography>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Typography variant="body1" className={classes.TableContentFont}>{dys + " mmHg"}</Typography>
      </Grid>
      <Grid xs={6} sm={3}>
        <Typography variant="body1" className={classes.TableContentFont}>{date.split("T")[1].split(".")[0]}</Typography>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Typography variant="body1" className={classes.TableContentFont}>{date.split("T")[0]}</Typography>
      </Grid>
    </Grid>
  );
}
function BPRecordhead() {
  const classes = useStyles();
  return (
    <Grid container className={classes.Tablecontentbox}>
      <Grid item xs={6} sm={3}>
        <Typography variant="body1" className={classes.TableContentFont}>SYS</Typography>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Typography variant="body1" className={classes.TableContentFont}>DYS</Typography>
      </Grid>
      <Grid xs={6} sm={3}>
        <Typography variant="body1" className={classes.TableContentFont}>Time</Typography>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Typography variant="body1" className={classes.TableContentFont}>Date</Typography>
      </Grid>
    </Grid>
  );
}

export function ManageBP() {
  const classes = useStyles();
  const token = useSelector((state) => state.states.token);
  const id = useSelector((state) => state.states.user._id);
  const [data, setdata] = React.useState(null);
  const [avg, setavg] = React.useState(null);
  const [check, setcheck] = React.useState(true);
  const [ans] = React.useState(answers);
  const [mark, setmark] = React.useState('')
  const [index, setindex] = React.useState(0);


  const formik = useFormik({
    initialValues: {
      systolic: '',
      dystolic: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      values = { ...values, patient: id }
      console.log(values)
      getdata.savebprecord(token, values)
        .then(res => {
          if (res.data.success) {
            rows();
            getBpavg();
            setcheck(!check)
            formik.resetForm()
          }
        })
    }
  })

  const rows = () => {
    getdata.getbprecord(token)
      .then(res => {
        if (res.data.success) {
          console.log(res.data)
          if (res.data.record.length > 0)
            setdata(res.data.record)
          else
            setdata([{
              systolic: 'No Record Found ',
              dystolic: "No Record Found",
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

  const getBpavg = () => {
    getdata.getbpavg(token)
      .then(res => {
        if (res.data.success) {
          setavg(res.data.avg)
        } else {
          setavg(null)
        }
      })
  }

  React.useEffect(() => {
    rows();
    getBpavg();
  }, [token])

  return (
    <div className="dashdiv">
      <Grid item xs={12} className={classes.DialogBox}>
        <Typography variant="h4" className={classes.sameinfont}>
          MANAGE BLOOD PRESSURE
        </Typography>
        <Grid item xs={11} className={classes.DEDialogBox}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container className={classes.DEDialpos}>
              <Grid item xs={9} sm={4} md={3}>
                <TextField
                  label="Diastolic value"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.setTextField}
                  id="dystolic"
                  name="dystolic"
                  value={formik.values.dystolic}
                  onChange={formik.handleChange}
                  error={formik.touched.dystolic && Boolean(formik.errors.dystolic)}
                  helperText={formik.touched.dystolic && formik.errors.dystolic}
                ></TextField>
              </Grid>
              <Grid item xs={9} sm={4} md={3}>
                <TextField
                  label="Systolic value"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.setTextField}
                  id="systolic"
                  name="systolic"
                  value={formik.values.systolic}
                  onChange={formik.handleChange}
                  error={formik.touched.systolic && Boolean(formik.errors.systolic)}
                  helperText={formik.touched.systolic && formik.errors.systolic}
                ></TextField>
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
              <Typography variant="h6">Systolic Blood Pressure Average:
                <Typography variant="body1"> {avg ? avg.sysAvg : "No Record Avaliable"}</Typography>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Diastolic Blood Pressure Average:
                <Typography variant="body1"> {avg ? avg.dysAvg : "No Record Avaliable"}</Typography>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/*Questions grid */}
        <Grid item xs={11} className={classes.DEDialogBox}>
          <Grid container className={classes.DEDialpos}>
            <Grid item xs={12}>
              <Typography variant="h6">Symptoms Based Check for Hypertension: </Typography>
              <Typography variant="subtitle">Please Answer the following Question:</Typography>
            </Grid>
            <Grid item xs={11} style={{ width: "100%", margin: "auto" }}>
              <Typography variant="h6">{questions ? questions[index] : ''} </Typography>
              <Grid item xs={11} style={{ margin: "auto" }}>
                <FormControl component="fieldset">
                  <RadioGroup
                    value={mark}
                    onChange={e => {
                      ans[index] = Number(e.target.value);
                      setmark(e.target.value)
                    }}
                  >
                    <FormControlLabel
                      value='0'
                      control={<Radio />}
                      label="No"
                    />
                    <FormControlLabel
                      value='1'
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
                  if (index > 0 && mark !== "") {
                    setindex(index - 1);
                    setmark("");
                  }
                }}
                disabled={index === 0}
              >
                <ArrowBackIosIcon />
                <Typography variant="caption">Prevoius</Typography>
              </IconButton>
              {
                index === questions.length - 1 ?
                  <Button
                    onClick={() =>
                      alert(JSON.stringify(ans))
                    }
                  >
                    Submit
                  </Button>
                  :
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
                  </IconButton>}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={11} className={classes.Gridadjust}>
          <Grid container className={classes.GridAjust}>
            <Grid item xs={12} md={5} className={classes.TDialogbox}>
              <Typography
                variant="body1"
                className={classes.sameinfont}
              >
                BLOOD PRESSURE TABLE
              </Typography>
              <Grid container>
                <BPRecordhead />
              </Grid>
              <Grid container className={classes.bloodpressuretablecontainer}>
                {
                  data ? data.map((item, index) => {
                    return (
                      <Grid item xs={11} className={classes.bloodpressuretableitem}>
                        <BPRecord date={item.dateAdded} dys={item.dystolic} sys={item.systolic} key={index} />
                      </Grid>
                    )
                  })
                    : <CircularProgress
                      style={{ marginRight: "20px", width: "50px", height: "50px" }}
                    />
                }
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} className={classes.BPGDialogbox}>
              <Typography variant="body2" className={classes.BPGTitle}>
                BLOOD PRESSURE GRAPH
              </Typography>
              <Grid container className={classes.graphctn}>
                <GraphBp check={check} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
