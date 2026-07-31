import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';

import maleDoc from '../Assets/doctor_logo.svg';
import report from '../Assets/reports.svg';

import * as rep from "../Services/reports";
import * as apt from "../Services/appointment";

import { useSelector, useDispatch } from "react-redux";

import { setrequesteddoc, setdoctors } from "../pages/statesSlice";

const useStyles = makeStyles((theme) => ({
    root: {
        background: '#fff',
    },
    card: {
        width: "100%",
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 8px 30px rgba(16,97,176,0.25)",
        background: "#fff",
        padding: "24px",
        boxSizing: "border-box",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    headerTitle: {
        fontFamily: "Montserrat",
        fontWeight: "bold",
        fontSize: 20,
        color: "#1061b0",
        "@media (max-width: 700px)": {
            fontSize: 17,
        },
    },
    closeBtn: {
        color: "#999",
        padding: 4,
        "&:hover": {
            background: "#f0f4f8",
            color: "#1061b0",
        },
    },
    docRow: {
        display: "flex",
        alignItems: "center",
        gap: 14,
        background: "linear-gradient(45deg,#1061b0 0%, #4eb2df 100%)",
        borderRadius: 12,
        padding: "14px 16px",
        marginBottom: 20,
    },
    docIcon: {
        width: 52,
        height: 52,
        background: "rgba(255,255,255,0.2)",
        border: "2px solid rgba(255,255,255,0.6)",
    },
    docName: {
        fontFamily: "Montserrat",
        fontWeight: 700,
        fontSize: 18,
        color: "#fff",
        "@media (max-width: 700px)": {
            fontSize: 16,
        },
    },
    docRole: {
        fontFamily: "Montserrat",
        fontSize: 18,
        color: "rgba(255,255,255,0.85)",
        "@media (max-width: 700px)": {
            fontSize: 15,
        },
    },
    sectionLabel: {
        fontFamily: "Montserrat",
        fontWeight: 600,
        fontSize: 18,
        color: "#888",
        textTransform: "uppercase",
        letterSpacing: 0.5,
        marginBottom: 8,
        "@media (max-width: 700px)": {
            fontSize: 15,
        },
    },
    attachBox: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "#f5f8fc",
        borderRadius: 12,
        padding: "12px 14px",
        border: "1px dashed #bcd4ec",
        marginBottom: 20,
    },
    attachIcon: {
        width: 36,
        height: 36,
    },
    attachText: {
        fontFamily: "Montserrat",
        fontSize: 18,
        color: "#666",
        "@media (max-width: 700px)": {
            fontSize: 15,
        },
    },
    noReportsText: {
        fontFamily: "Montserrat",
        fontSize: 18,
        color: "#999",
        fontStyle: "italic",
        "@media (max-width: 700px)": {
            fontSize: 15,
        },
    },
    messageBox: {
        width: "100%",
        marginBottom: 20,
    },
    inputRoot: {
        fontFamily: "Montserrat",
        fontSize: 18,
        "@media (max-width: 700px)": {
            fontSize: 15,
        },
    },
    button: {
        display: "flex",
        justifyContent: "center",
    },
    inbutton: {
        borderRadius: "12px",
        background: "#3585da",
        boxShadow: "0 3px 8px rgba(53,133,218,0.35)",
        color: "#fff",
        fontFamily: "Montserrat",
        fontWeight: 700,
        fontSize: 18,
        textTransform: "none",
        padding: "10px 22px",
        "@media (max-width: 700px)": {
            fontSize: 15,
        },
        "&:hover": {
            background: "#2b74c4",
        }
    },
}));

export default function DoctorCard({ name, id, onClose }) {

    const classes = useStyles();
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
                                    } else {
                                        dispatch(setdoctors(data))
                                        dispatch(setrequesteddoc([]))
                                    }
                                })
                        })
                    onClose();
                }
            })
    }

    return (
        <Grid container className={classes.root}>
            <Card variant="outlined" className={classes.card}>
                <div className={classes.header}>
                    <Typography className={classes.headerTitle}>
                        Appointment Request
                    </Typography>
                    <Button className={classes.closeBtn} onClick={onClose}>
                        <CloseIcon />
                    </Button>
                </div>
                <Divider />
                <div style={{ paddingTop: 20 }}>
                    <div className={classes.docRow}>
                        <Avatar
                            src={maleDoc}
                            alt="Male Doctor Avatar"
                            className={classes.docIcon}
                        />
                        <div>
                            <Typography className={classes.docName}>
                                DR {name}
                            </Typography>
                            <Typography className={classes.docRole}>
                                Senior Doctor
                            </Typography>
                        </div>
                    </div>

                    <Typography className={classes.sectionLabel}>
                        Attach Reports
                    </Typography>
                    <div className={classes.attachBox}>
                        {
                            reports ?
                                <>
                                    <img src={report} alt="Report" className={classes.attachIcon} />
                                    <Typography className={classes.attachText}>
                                        {reports.length} report{reports.length > 1 ? "s" : ""} ready to attach
                                    </Typography>
                                </>
                                :
                                <Typography className={classes.noReportsText}>
                                    No Reports to Attach
                                </Typography>
                        }
                    </div>

                    <Typography className={classes.sectionLabel}>
                        Message
                    </Typography>
                    <TextField
                        className={classes.messageBox}
                        InputProps={{ classes: { input: classes.inputRoot } }}
                        placeholder="Write a message to the doctor..."
                        multiline
                        fullWidth
                        minRows={4}
                        maxRows={6}
                        variant="outlined"
                        value={msg}
                        onChange={e => setmsg(e.target.value)}
                    />
                    <div className={classes.button}>
                        <Button
                            variant="contained"
                            disableElevation
                            startIcon={<EventAvailableIcon />}
                            className={classes.inbutton}
                            onClick={handelRequest}
                        >
                            APPOINT DOCTOR
                        </Button>
                    </div>
                </div>
            </Card>
        </Grid>
    )
}
