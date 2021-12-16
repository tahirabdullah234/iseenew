import React from "react";
import "./style.css";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

import * as apt from "../Services/appointment";
import { useSelector } from "react-redux";
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
  const [msg, setmsg] = React.useState([
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
  ])

  const [newmsg, setnewmsg] = React.useState('')
  const token = useSelector((state) => state.states.token)
  const isdoctor = useSelector((state) => state.states.isdoctor)

  const [otheruser, setotheruser] = React.useState(null)
  const [otheruserid, setotheruserid] = React.useState(null)

  // React.useEffect(() => alert(JSON.stringify(otheruserid)), [otheruserid])

  React.useEffect(() => {
    apt.get_users(token, isdoctor)
      .then(res => {
        if (res.data.success) {
          const chats = res.data.chats
          apt.get_msgs(token, isdoctor, res.data.chats[0])
            .then(res => {
              // alert(JSON.stringify(chats))
              if (res.data.success) {
                setotheruser(chats)
                // setmsg(res.data.msgs)
                alert(JSON.stringify(res.data.msgs))
              }
            })
        }
        // alert(JSON.stringify(res.data))
      })
  }, [token, isdoctor])

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.chatbox}>
        <Grid container>
          <Grid item xs={4} className={classes.chatbox}>
            {
              otheruser ?
                isdoctor ?
                  otheruser.map((item) => {
                    return <UserList
                      name={item.p_id.fname + ' ' + item.p_id.lname}
                      id={item.p_id._id}
                      setid={setotheruserid}
                    />
                  })
                  :
                  otheruser.map((item) => {
                    return <UserList
                      name={item.d_id.fname + ' ' + item.d_id.lname}
                      id={item.d_id._id}
                      setid={setotheruserid}
                    />
                  })
                :
                <UserList name={"No Chat Avaliable"} />

            }
          </Grid>
          <Grid item xs={8} className={classes.root1}>
            <Grid container>
              <Grid item xs={11} style={{
                margin: "auto", height: "60vh",
                overflowY: "scroll",
              }}>
                <Messages msg={msg} />
              </Grid>
              <Grid item xs={10}>
                <input
                  type="text"
                  style={{ width: "90%", height: "30px" }}
                  placeholder="Enter Message"
                  value={newmsg}
                  onChange={e => setnewmsg(e.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <Button fullWidth
                  onClick={() => {
                    setmsg([...msg, { msg: newmsg, side: false }])
                    setnewmsg('')
                  }}>Send</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

function Messages({ msg }) {

  const classes = useStyles();
  const messagesEndRef = React.useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  React.useEffect(scrollToBottom, [msg]);
  return (
    <Grid container>
      {
        msg ?
          msg.map((item) => {
            if (item.side) {
              return (
                <Grid container >
                  <Grid item xs={5} className={classes.msg}>
                    <Typography variant="body1">
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
                    <Typography variant="body1">
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
      <div ref={messagesEndRef} />
      <hr />
      <hr />
    </Grid>
  )
}


function UserList({ name, id, setid }) {
  const classes = useStyles();
  return (
    <Grid container>
      <Button
        className={classes.chatsbutton}
        onClick={() => setid(id)}
      >
        <Avatar style={{ width: "50px", height: "50px" }}>{name ? name[0] : 'A'}</Avatar>
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
              {name}
            </Typography>
          </Grid>
        </Grid>
      </Button>
    </Grid>
  )
}