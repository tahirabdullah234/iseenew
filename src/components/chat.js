import React from "react";
import "./style.css";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles({
  root: {
    // background: "linear-gradient(45deg,#f9f9f9 0%, #e8e8e8 100%)",
    // minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderRadius: "30px",
    padding: "10px",
    // margin: "auto",

  },
  root1: {
    border: "1px solid #e7e7e7",
    display: "flex",
    alignItems: "center",
    padding: "10px"
  },
  root2: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  chatbox: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    background: "#fff",
    border: "1px solid #e7e7e7",
    borderRadius: "5px",
  },
  chatsbutton: {
    color: "rgba(53,133,218,0.8)",
    borderRadius: "0px",
    height: "80px",
    width: "100%",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    borderBottom: "3px solid #e7e7e7",
  },
  scroll: {
    maxHeight: '',
    overflowY: "scroll",
  },
  msg: {
    borderRadius: "15px",
    marginBottom: "5px",
    border: "2px solid #e7e7e7",
    padding: "0px 10px 0px 10px",
    alignItems: "center"
  },
});

export default function Chat() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={10} className={classes.chatbox}>
        <Grid container>
          <Grid item xs={3} className={classes.chatbox}>
            <Grid container>
              <Button className={classes.chatsbutton}>
                <Avatar style={{ width: "50px", height: "50px" }}>A</Avatar>
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
                </Grid>
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={9} className={classes.root1}>
            <Grid container>
              <Grid item xs={11} style={{
                margin: "auto", height: "60vh",
                overflowY: "scroll",
              }}>
                <Messages />
              </Grid>
              <Grid item xs={10}>
                <input type="text" style={{ width: "90%", height: "30px" }} />
              </Grid>
              <Grid item xs={2}>
                <Button fullWidth>Send</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid >
  );
}

function Messages() {
  const msg = [
    {
      msg: "Hello I am Abdulah jan Khan",
      side: true
    },
    {
      msg: "test1",
      side: false
    },
    {
      msg: "test",
      side: true
    },
    {
      msg: "test1",
      side: false
    },
    {
      msg: "test",
      side: true
    },
    {
      msg: "test1",
      side: false
    },
    {
      msg: "test",
      side: true
    },
    {
      msg: "test1",
      side: false
    },
    {
      msg: "test",
      side: true
    },
    {
      msg: "test1",
      side: false
    },
    {
      msg: "test1",
      side: false
    },
    {
      msg: "test",
      side: true
    },
    {
      msg: "test1",
      side: false
    },
  ]
  const classes = useStyles();
  return (
    <Grid container>
      {
        msg ?
          msg.map((item) => {
            if (item.side) {
              return (
                <Grid container >
                  <Grid item xs={5} className={classes.msg}>
                    <Typography variant="body2">
                      {item.msg}
                    </Typography>
                    <br />
                  </Grid>
                  <Grid item xs={7}>
                  </Grid>
                </Grid>
              )
            } else {
              return (
                <Grid container>
                  <Grid item xs={7}>
                  </Grid>
                  <Grid item xs={5} className={classes.msg}>
                    <Typography variant="body2">
                      {item.msg}
                    </Typography>
                    <br />
                  </Grid>
                </Grid>
              )
            }
          })
          :
          <Grid></Grid>
      }
    </Grid>
  )
}
