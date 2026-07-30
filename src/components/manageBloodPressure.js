import React from "react";
import "./style.css";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from "@material-ui/core";
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

import * as model from "../Services/model"

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
  BPGDialogbox: {
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
  bpTable: {
    borderCollapse: "separate",
    borderSpacing: "0 4px",
    minWidth: 500,
  },
  bpTableHeadRow: {
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
  bpTableBodyRow: {
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
  }
}));



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
  const [result, setresult] = React.useState(null)

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

  const getSymPred = () => {
    model.get_symp_pred(token, ans)
      .then(res => {
        if (res.data.request) {
          if (res.data.prediction > 0.5 && res.data.prediction < 1) {
            setresult('Hypertensive')
          } else {
            setresult('Not Hypertensive')
          }
        }
      })
  }

  return (
    <div className="dashdiv">
      <Grid item xs={12} className={classes.DialogBox}>
        <Typography variant="h4" className={classes.sameinfont}>
          MANAGE BLOOD PRESSURE
        </Typography>
        <Grid item xs={11} className={classes.DEDialogBox}>
          <Typography className={classes.cardTitle}>
            Add Blood Pressure Record
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Box className={classes.formRow}>
              <Box flex="1 1 200px" minWidth={0}>
                <TextField
                  label="Diastolic value"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  id="dystolic"
                  name="dystolic"
                  value={formik.values.dystolic}
                  onChange={formik.handleChange}
                  error={formik.touched.dystolic && Boolean(formik.errors.dystolic)}
                  helperText={formik.touched.dystolic && formik.errors.dystolic}
                />
              </Box>
              <Box flex="1 1 200px" minWidth={0}>
                <TextField
                  label="Systolic value"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  id="systolic"
                  name="systolic"
                  value={formik.values.systolic}
                  onChange={formik.handleChange}
                  error={formik.touched.systolic && Boolean(formik.errors.systolic)}
                  helperText={formik.touched.systolic && formik.errors.systolic}
                />
              </Box>
              <Button type="submit" className={classes.DEDial}>
                ADD
              </Button>
            </Box>
          </form>
        </Grid>
        <Grid item xs={11} className={classes.DEDialogBox}>
          <Typography className={classes.cardTitle}>
            Blood Pressure Averages
          </Typography>
          <Box display="flex" flexWrap="wrap" gap="16px">
            <Box flex="1 1 200px">
              <Typography className={classes.sectionLabel}>
                Systolic Average
              </Typography>
              <Typography className={classes.sectionValue}>
                {avg ? avg.sysAvg : "No Record Available"}
              </Typography>
            </Box>
            <Box flex="1 1 200px">
              <Typography className={classes.sectionLabel}>
                Diastolic Average
              </Typography>
              <Typography className={classes.sectionValue}>
                {avg ? avg.dysAvg : "No Record Available"}
              </Typography>
            </Box>
          </Box>
        </Grid>
        {/*Questions grid */}
        <Grid item xs={11} className={classes.DEDialogBox}>
          <Typography className={classes.cardTitle}>
            Symptoms Based Check for Hypertension
          </Typography>
          <Typography style={{ marginBottom: 8, color: "#666", fontSize: 18 }}>
            Please answer the following questions:
          </Typography>
          <Box mt={1} mb={1}>
            <Typography style={{ fontWeight: 600, fontSize: 18, color: "#333" }}>
              {questions ? questions[index] : ''}
            </Typography>
          </Box>
          <FormControl component="fieldset">
            <RadioGroup
              value={mark}
              onChange={e => {
                ans[index] = Number(e.target.value);
                setmark(e.target.value)
              }}
              row
            >
              <FormControlLabel value='0' control={<Radio />} label="No" />
              <FormControlLabel value='1' control={<Radio />} label="Yes" />
            </RadioGroup>
          </FormControl>
          <Box display="flex" alignItems="center" mt={1} gap="8px">
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
            {
              index === questions.length - 1 ?
                <Button
                  onClick={() => { getSymPred() }}
                  size="small"
                  variant="contained"
                  color="primary"
                  style={{ textTransform: "none", borderRadius: 20, fontSize: 18 }}
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
                  size="small"
                >
                  <Typography variant="body2" style={{ marginRight: 2, fontSize: 18 }}>Next</Typography>
                  <ArrowForwardIosIcon fontSize="small" />
                </IconButton>}
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
                  BLOOD PRESSURE TABLE
                </Typography>
                <TableContainer className={classes.bloodpressuretablecontainer}>
                  <Table className={classes.bpTable}>
                    <TableHead>
                      <TableRow className={classes.bpTableHeadRow}>
                        <TableCell align="center">SYS</TableCell>
                        <TableCell align="center">DYS</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data ? (
                        data.map((item, index) => (
                          <TableRow key={index} className={classes.bpTableBodyRow}>
                            <TableCell align="center">{item.systolic + " mmHg"}</TableCell>
                            <TableCell align="center">{item.dystolic + " mmHg"}</TableCell>
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
              <Box className={classes.BPGDialogbox}>
                <Typography variant="body2" className={classes.BPGTitle}>
                  BLOOD PRESSURE GRAPH
                </Typography>
                <Box className={classes.graphWrapper}>
                  <GraphBp check={check} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div >
  );
}
