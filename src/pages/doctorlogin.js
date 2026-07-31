import React from "react";
import "./style.css";
import { Header } from "../components/header";
import doctorlogo from "../Assets/Doclogo.png";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { useFormik } from 'formik';
import { validationSchemaLogin as validationSchema } from "../Services/validations";
import * as auth from "../Services/auth";
import { useDispatch } from "react-redux";
import { login, setuser, settoken, setdoctorfalse } from "./statesSlice";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from "react-router";

const useStyles = makeStyles({
  card: {
    display: "flex",
    width: "min(880px, 92%)",
    marginTop: 96,
    marginBottom: 48,
    background: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    boxShadow: "0 24px 60px rgba(2, 32, 71, 0.35)",
    "@media (max-width: 600px)": {
      width: "94%",
    },
  },
  banner: {
    flex: "1 1 40%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    padding: 48,
    boxSizing: "border-box",
    background: "linear-gradient(135deg, #1061b0 0%, #59c1e8 100%)",
    "@media (max-width: 600px)": {
      display: "none",
    },
  },
  bannerIcon: {
    width: 140,
    height: 140,
    borderRadius: "50%",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 12px 30px rgba(0, 30, 70, 0.3)",
  },
  bannerImg: {
    width: "55%",
  },
  bannerText: {
    fontFamily: "Montserrat",
    fontSize: 20,
    fontWeight: 700,
    color: "#fff",
    textAlign: "center",
  },
  bannerSub: {
    fontFamily: "Montserrat",
    fontSize: 13,
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
  },
  formPanel: {
    flex: "1 1 60%",
    padding: "48px 44px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxSizing: "border-box",
    "@media (max-width: 600px)": {
      padding: "32px 20px",
      alignItems: "center",
      textAlign: "center",
    },
  },
  formTitle: {
    fontFamily: "Montserrat",
    fontWeight: 700,
    fontSize: 26,
    color: "#1061b0",
  },
  formSubtitle: {
    fontFamily: "Montserrat",
    fontSize: 14,
    color: "#8e9bb0",
    marginTop: 4,
    marginBottom: 26,
  },
  field: {
    width: "100%",
    marginBottom: 16,
  },
  inputRoot: {
    fontFamily: "Montserrat",
  },
  button: {
    width: "100%",
    height: 48,
    borderRadius: 12,
    background: "linear-gradient(45deg, #3585da 0%, #59c1e8 100%)",
    color: "#fff",
    fontWeight: 700,
    fontSize: 15,
    letterSpacing: 1,
    textTransform: "none",
    marginTop: 8,
    boxShadow: "0 6px 18px rgba(53, 133, 218, 0.35)",
    "&:hover": {
      background: "linear-gradient(45deg, #2b74c4 0%, #49a9d6 100%)",
      boxShadow: "0 8px 22px rgba(53, 133, 218, 0.45)",
    },
  },
  link: {
    fontFamily: "Montserrat",
    fontSize: 14,
    fontWeight: 600,
    color: "#3585da",
    cursor: "pointer",
    marginTop: 14,
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function DoctorLogin() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const dispatch = useDispatch();
  const history = useHistory();

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

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      auth.login(values)
        .then(res => {
          console.log(res.data)
          if (res.data.success && res.data.user.isDoctor) {
            setsnackbar({
              ...snackbar,
              open: true,
              msg: "Login Successfull",
              type: "success"
            })
            setTimeout(() => {
              dispatch(login());
              dispatch(setuser(res.data.user));
              dispatch(settoken(res.data.token));
            }, 1000)
          } else if (!res.data.user.isDoctor && res.data.success) {
            setsnackbar({
              ...snackbar,
              open: true,
              msg: "You are not A Doctor",
              type: "error"
            })
          } else {
            setsnackbar({
              ...snackbar,
              open: true,
              msg: "Invalid Credentials",
              type: "error"
            })
          }
        })
        .catch(err => {
          setsnackbar({
            ...snackbar,
            open: true,
            msg: "Invalid Credentials",
            type: "error"
          })
        })
    },
  });

  const classes = useStyles();
  return (
    <div className="container">
      <Header />
      <div className={classes.card}>
        <div className={classes.banner}>
          <div className={classes.bannerIcon}>
            <img src={doctorlogo} className={classes.bannerImg} alt="Doctor Logo" />
          </div>
          <Typography className={classes.bannerText}>Welcome Back, Doctor</Typography>
          <Typography className={classes.bannerSub}>
            Login to access your dashboard and patients.
          </Typography>
        </div>
        <div className={classes.formPanel}>
          <Typography className={classes.formTitle}>Doctor Login</Typography>
          <Typography className={classes.formSubtitle}>
            Enter your credentials to continue
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="Email Address"
              id="username"
              name="username"
              variant="outlined"
              className={classes.field}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                classes: { input: classes.inputRoot },
              }}
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              className={classes.field}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                classes: { input: classes.inputRoot },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button type="submit" variant="contained" disableElevation className={classes.button}>
              LOGIN
            </Button>
            <Typography
              variant="body2"
              className={classes.link}
              onClick={() => history.push('/forgotpassword')}
            >
              Forgot Password?
            </Typography>
            <Typography
              variant="body2"
              className={classes.link}
              onClick={() => history.push('/register')}
            >
              New User SignUp Here
            </Typography>
            <Typography
              variant="body2"
              className={classes.link}
              onClick={() => dispatch(setdoctorfalse())}
            >
              Not A Doctor?
            </Typography>
          </form>
        </div>
      </div>
      <Snackbar open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert severity={snackbar.type}>
          {snackbar.msg}
        </Alert>
      </Snackbar>
    </div>
  );
}
