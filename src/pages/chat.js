import React from "react";
import "./style.css";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Message from "../Assets/messageIcon.svg";
const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg,#f9f9f9 0%, #e8e8e8 100%)",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  root1: {
    border: "1px solid #e7e7e7",
    display: "flex",
    alignItems: "center",
  },
  root2: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  chatbox: {
    width: "100%",
    minHeight: "600px",
    display: "flex",
    flexDirection: "column",
    background: "#fff",
    border: "1px solid #e7e7e7",
  },
  chatsbutton: {
    color: "rgba(53,133,218,0.8)",
    borderRadius: "0PX",
    width: "500px",
    height: "80px",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    borderBottom: "3px solid #e7e7e7",
  },
  scroll: {
    maxHeight: 500,
    overflowY: "scroll",
  },
});
export default function Chat() {
  const classes = useStyles();
  const [GLunit, setGLunit] = React.useState("mg/dl");
  const handleChange = (event) => {
    setGLunit(event.target.value);
  };
  return (
    <Grid container className={classes.root}>
      <Grid item xs={10} className={classes.chatbox}>
        <Grid container>
          <Grid item xs={3} className={classes.chatbox}>
            <Grid container>
              <Grid container className={classes.chatsbutton}>
                <Grid item xs={1}></Grid>
                <Grid item xs={6}>
                  <FormControl
                    className={classes.formControl}
                    style={{ marginTop: "16px", width: "100%" }}
                  >
                    <Select value={GLunit} onChange={handleChange}>
                      <MenuItem value="mg/dl">
                        <em>All conversations</em>
                      </MenuItem>
                      <MenuItem value="mmol/L">
                        <em>mmol/L</em>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={5}></Grid>
              </Grid>
            </Grid>
            <Grid container className={classes.scroll}>
              <Button className={classes.chatsbutton}>
                <Avatar style={{ width: "50px", height: "50px" }}>Z</Avatar>
                <Grid container>
                  <Grid item xs={1}></Grid>
                  <Grid
                    item
                    style={{ display: "flex", justifyContent: "flex-start" }}
                    xs={7}
                  >
                    <Typography
                      variant="subtitlel"
                      style={{ fontWeight: "bold", color: "#3585da" }}
                    >
                      Abdullah
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography style={{ color: "#3585da" }}>
                      3 months
                    </Typography>
                  </Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={11}>
                    <Typography
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        color: "#3585da",
                      }}
                    >
                      Me:Hello ...
                    </Typography>
                  </Grid>
                </Grid>
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={9} className={classes.root1}>
            <Grid container className={classes.root2}>
              <img src={Message} style={{ height: "70px" }}></img>
              <Typography
                variant="h4"
                style={{ fontWeight: "bold", color: "#3585da" }}
              >
                Select a conversation
              </Typography>
              <Grid xs={3} style={{ textAlign: "center" }}>
                <Typography variant="h6" style={{ color: "#3585da" }}>
                  Try selecting a conversation or searching for someone
                  specific.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
