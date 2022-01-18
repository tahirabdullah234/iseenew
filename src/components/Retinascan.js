import React from "react";
import "./style.css";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import iseelogo from "../Assets/whiteisee.png";
import view from "../Assets/view.svg";
import guideline from "../Assets/guideline.svg";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import * as model from "../Services/model";
import { useSelector, useDispatch } from "react-redux";
import { setdata } from "../pages/statesSlice";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  DialogBox: {
    width: "100%",
    borderRadius: "12px",
    background:
      "linear-gradient(45deg,#1061b0 0%, #1f74bb 17.4%, #4eb2df 72.29%, #59c1e8 100%)",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    padding: "25px",
  },
  headerfont: {
    fontSize: "33px",
    color: "#fff",
    fontWeight: "bold",
    marginTop: "15px",
  },
  guideline: {
    fontSize: "15px",
    color: "#fff",
    textDecorationLine: "underline",
  },
  Button: {
    width: "93%",
    borderRadius: "12px",
    background: "#3585da",
    color: "#fff",
    fontWeight: "bold",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    marginTop: "20px",
  },
  butpos: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
  },
  guidepos: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "50px",
  },
});

export function RetinaScan() {
  const classes = useStyles();
  const [fileInput, setfileinput] = React.useState(React.createRef());
  const [scan, setscan] = React.useState(null);
  const token = useSelector((state) => state.states.token);
  const user = useSelector((state) => state.states.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [loader, setloader] = React.useState(false);

  const handleClick = () => {
    fileInput.current.click();
  };

  const handleChange = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("file", fileInput.current.files[0]);
    model.upload_file(token, data).then((res) => {
      setscan(res.data);
    });
  };

  const handleClassifyImage = () => {
    const data = new FormData();
    data.append("file", fileInput.current.files[0]);
    setloader(!loader);
    model.get_prediction(token, data).then((res) => {
      if (res.data.success) {
        const result = {
          u_id: user._id,
          scan: fileInput.current.files[0].name,
          prediction: res.data.label[0],
          probability: res.data.accuracy,
        };
        model.new_dataset(token, result).then((res_data) => {
          if (res_data.data.success) {
            dispatch(setdata(res_data.data.data));
            history.push("/result");
          }
        });
      }
    });
  };

  return (
    <div className="dashdiv">
      <Grid item md={6} sm={8} xs={11} className={classes.DialogBox}>
        <img src={iseelogo} className="iseewhitelogo" alt="error found"></img>
        <Typography className={classes.headerfont}>
          DISEASE DETECTION SYSTEM
        </Typography>
        {loader ? (
          <CircularProgress
            style={{ marginRight: "20px", width: "103px", height: "101px" }}
          />
        ) : (
          <img
            src={scan ? `/${scan.filename}` : view}
            className="view"
            alt="error found"
          ></img>
        )}
        <Grid item md={4} className={classes.butpos}>
          <Button className={classes.Button} onClick={handleClick}>
            UPLOAD IMAGE
          </Button>
          <input
            type="file"
            ref={fileInput}
            accept="image/*"
            onChange={handleChange}
            style={{ display: "none" }}
          />
          <Button className={classes.Button} onClick={handleClassifyImage}>
            CLASSIFY IMAGE
          </Button>
        </Grid>
        {/* <div className={classes.guidepos}>
          <img src={guideline} className="guideimg" alt="error found"></img>
          <Typography className={classes.guideline}>
            HOW TO USE ISEE.
          </Typography>
        </div> */}
      </Grid>
    </div>
  );
}
