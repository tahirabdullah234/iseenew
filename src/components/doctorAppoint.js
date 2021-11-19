import React from 'react';

import { makeStyles, createTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import maleDoc from '../Assets/doctor_logo.svg';
import report from '../Assets/reports.svg';

import * as rep from "../Services/reports";
import * as apt from "../Services/appointment";

import { useSelector, useDispatch } from "react-redux";

import { setrequesteddoc, setdoctors } from "../pages/statesSlice";

const theme = createTheme({
    typography: {
        fontFamily: "Montserrat"
    },
});

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        background: '#fff',
    },
    docIcon: {
        width: 60,
        height: 60,
    },
    docIcon1: {
        width: 50,
        height: 50,
        paddingTop: 10,
        paddingLeft: 5,
    },
    textBackground: {
        backgroundColor: 'rgba(128,128,128,0.05)',
        padding: 10,
        width: 'auto',
        borderRadius: 10,
        color: "#1061b0",
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)"
    },
    innerGrid: {
        flexDirection: "row",
    },
    innerGriditem: {
        padding: "20px 0px 0px 20px"
    }, infoGrid: {
        flexDirection: 'column'
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    drTitle: {
        marginLeft: 60,
        fontWeight: "bold",
    },
    drDesc: {
        bottom: 35,
        fontWeight: "bold",
    },
    reportsGrid: {
        backgroundColor: "#fff",
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
        borderRadius: 15,
    },
    bottomGrids: {
        marginTop: 20,
        padding: 5,
    },
    messageBox: {
        backgroundColor: "#fff",
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)"
    },
    Profiletxt: {
        fontWeight: "bold",
        textAlign: "left",
        color: "#1061b0",
    },
    inbutton: {
        borderRadius: "12px",
        background: "#3585da",
        boxshadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
        color: "#fff",
        "&:hover": {
            background: "rgba(53,133,218,0.7)",
        }
    },
}));

export default function DoctorCard({ name, id, onClose }) {

    const classes = useStyles(theme);
    const token = useSelector((state) => state.states.token)
    const user = useSelector((state) => state.states.user)
    const pname = useSelector((state) => state.states.name)
    const [reports, setreports] = React.useState(null);
    const [msg, setmsg] = React.useState("")
    const dispatch = useDispatch();


    React.useEffect(() => {
        rep.get_reports(token)
            .then(res => {
                if (res.data.success) {
                    setreports(res.data.reports)
                } else {
                    setreports(null)
                }
            })
    }, [token])

    const handelRequest = () => {
        const data = {
            p_id: user._id,
            d_id: id,
            msg: msg,
            name: pname,
        }
        apt.add_appointment(token, data)
            .then(res => {
                if (res.data.success) {
                    apt.get_doctors(token)
                        .then(res => {
                            const data = res.data
                            console.log(data)
                            apt.get_requests(token)
                                .then(response => {
                                    if (response.data.success) {
                                        console.log(response.data)
                                        dispatch(setdoctors(data))
                                        dispatch(setrequesteddoc(response.data.data))
                                        // setstate({ ...state, doctor: data, requested: response.data.data })
                                    } else {
                                        dispatch(setdoctors(data))
                                        dispatch(setrequesteddoc([]))
                                        // setstate({ ...state, doctor: xdata, requested: [] })
                                    }
                                })
                        })
                    alert("Request Sent")
                    onClose();
                }
            })
    }

    return (
        <Grid container className={classes.root}>
            <Card variant="outlined" className={classes.textBackground}>
                <Grid container>
                    <Avatar
                        src={maleDoc}
                        alt="Male Doctor Avatar"
                        className={classes.docIcon}
                    />
                    <Grid item className={classes.innerGriditem}>
                        <Typography
                            variant="body1"
                            display="block"
                            className={classes.Profiletxt}
                        >
                            DR {name}
                        </Typography>
                        <Typography
                            variant="caption"
                            display="block"
                            className={classes.Profiletxt}
                        >
                            Senior Doctor
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container className={classes.infoGrid}>
                    <Typography variant='body2' aling='left' className={classes.drDesc}>
                        MBBS, MRCCGO
                    </Typography>
                    <Typography variant='body2'>
                        10 YEARS of experience in treating disease related to opthamology
                    </Typography>
                    <Typography variant='body2'>
                        PMCD ID: 123456-S
                    </Typography>
                </Grid>

                <Grid item xs={12} className={classes.bottomGrids}>
                    <Typography variant="body1">
                        ATTACH REPORTS
                    </Typography>
                    <Grid item xs={12} className={classes.reportsGrid} >
                        {
                            reports ?
                                <img src={report} alt="Report" className={classes.docIcon1} />
                                :
                                <Typography vartiant="h5">No Reports to Attach</Typography>
                        }
                    </Grid>
                </Grid>
                <Grid item xs={12} className={classes.bottomGrids}>
                    <Typography variant="body1">
                        MESSAGE
                    </Typography>
                    <OutlinedInput
                        multiline
                        fullWidth
                        maxRows={5}
                        minRows={5}
                        placeholder="Write message here..."
                        className={classes.messageBox}
                        value={msg}
                        onChange={e => setmsg(e.target.value)}
                    />
                </Grid>
                <Grid container className={classes.button}>
                    <Button
                        variant="contained"
                        disableElevation
                        className={classes.inbutton}
                        onClick={handelRequest}
                    >
                        APPOINT DOCTOR
                    </Button>
                </Grid>
            </Card>
        </Grid>
    )
}