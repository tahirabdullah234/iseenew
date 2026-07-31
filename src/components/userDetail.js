import React from "react";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

import { GraphBp, GraphGlocuse } from "./graphsUserid";
import * as auth from "../Services/auth";
import * as reps from "../Services/reports";

import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import WcIcon from "@material-ui/icons/Wc";
import CakeIcon from "@material-ui/icons/Cake";
import { setdata } from "../pages/statesSlice";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        padding: "28px 24px",
        boxSizing: "border-box",
        [theme.breakpoints.down("sm")]: { padding: "20px 14px" },
    },
    backBtn: {
        background: "linear-gradient(45deg, #3585da 0%, #59c1e8 100%)",
        color: "#fff",
        fontWeight: 700,
        fontSize: 14,
        textTransform: "none",
        borderRadius: 10,
        padding: "8px 18px",
        marginBottom: 20,
        boxShadow: "0 4px 12px rgba(53, 133, 218, 0.3)",
        "&:hover": {
            background: "linear-gradient(45deg, #2b74c4 0%, #49a9d6 100%)",
        },
    },
    profileCard: {
        width: "100%",
        borderRadius: 16,
        background: "linear-gradient(135deg, #1061b0 0%, #59c1e8 100%)",
        boxShadow: "0 8px 24px rgba(16, 97, 176, 0.25)",
        padding: "28px 32px",
        boxSizing: "border-box",
        marginBottom: 24,
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 24,
        [theme.breakpoints.down("sm")]: { padding: "20px 16px", gap: 16 },
    },
    avatar: {
        width: 84,
        height: 84,
        background: "#fff",
        color: "#1061B0",
        fontWeight: 700,
        fontSize: 32,
        flexShrink: 0,
    },
    profileName: {
        fontFamily: "Montserrat",
        fontWeight: 700,
        fontSize: 30,
        color: "#fff",
        textShadow: "0 2px 4px rgba(0,0,0,0.15)",
        [theme.breakpoints.down("sm")]: { fontSize: 22 },
    },
    profileRole: {
        fontFamily: "Montserrat",
        fontSize: 13,
        letterSpacing: "0.12em",
        color: "rgba(255,255,255,0.85)",
        textTransform: "uppercase",
        marginTop: 4,
    },
    badges: {
        marginLeft: "auto",
        display: "flex",
        gap: 16,
        flexWrap: "wrap",
        [theme.breakpoints.down("sm")]: { marginLeft: 0 },
    },
    badge: {
        background: "rgba(255,255,255,0.18)",
        border: "1px solid rgba(255,255,255,0.3)",
        borderRadius: 12,
        padding: "10px 18px",
        display: "flex",
        alignItems: "center",
        gap: 10,
        minWidth: 118,
        color: "#fff",
    },
    badgeLabel: {
        fontFamily: "Montserrat",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.85)",
    },
    badgeValue: {
        fontFamily: "Montserrat",
        fontSize: 16,
        fontWeight: 700,
        color: "#fff",
    },
    card: {
        width: "100%",
        borderRadius: 16,
        background: "#fff",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
        padding: "28px 32px",
        boxSizing: "border-box",
        marginBottom: 24,
        overflow: "hidden",
        [theme.breakpoints.down("sm")]: { padding: "20px 16px" },
    },
    sectionTitle: {
        display: "flex",
        alignItems: "center",
        fontFamily: "Montserrat",
        fontWeight: 700,
        fontSize: 20,
        color: "#3585da",
        marginBottom: 20,
    },
    sectionBar: {
        display: "inline-block",
        width: 5,
        height: 22,
        borderRadius: 3,
        background: "linear-gradient(45deg, #3585da 0%, #59c1e8 100%)",
        marginRight: 10,
    },
    infoItem: {
        borderRadius: 12,
        background: "#f7fafd",
        border: "1px solid #eef1f6",
        padding: "18px 20px",
        boxSizing: "border-box",
        height: "100%",
    },
    infoLabel: {
        fontFamily: "Montserrat",
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "#8e9bb0",
        marginBottom: 6,
    },
    infoValue: {
        fontFamily: "Montserrat",
        fontSize: 20,
        fontWeight: 700,
        color: "#2b3a55",
    },
    reportRow: {
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 18px",
        borderRadius: 12,
        background: "#f7fafd",
        border: "1px solid #eef1f6",
        marginBottom: 10,
        cursor: "pointer",
        transition: "background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
            background: "#eef4fb",
            transform: "translateX(4px)",
            boxShadow: "0 4px 12px rgba(53, 133, 218, 0.12)",
        },
        "&:last-child": { marginBottom: 0 },
    },
    reportIcon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        background: "linear-gradient(45deg, #3585da 0%, #59c1e8 100%)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },
    reportTitle: {
        fontFamily: "Montserrat",
        fontWeight: 700,
        fontSize: 15,
        color: "#2b3a55",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    reportDate: {
        fontFamily: "Montserrat",
        fontSize: 13,
        color: "#8e9bb0",
        marginTop: 2,
    },
    reportArrow: {
        marginLeft: "auto",
        color: "#3585da",
        flexShrink: 0,
    },
    emptyText: {
        fontFamily: "Montserrat",
        fontSize: 15,
        color: "#8e9bb0",
        padding: "12px 0",
    },
    graphCard: {
        width: "100%",
        height: "100%",
        borderRadius: 16,
        background: "#f7fafd",
        border: "1px solid #eef1f6",
        padding: "20px",
        boxSizing: "border-box",
    },
    graphTitle: {
        fontFamily: "Montserrat",
        fontWeight: 700,
        fontSize: 16,
        color: "#1061b0",
        marginBottom: 16,
    },
}));

const initials = (name) =>
    name
        ? name
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map((word) => word[0].toUpperCase())
            .join("")
        : "ISEE";

const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d.getTime())) return String(date).split("T")[0];
    return d.toLocaleDateString([], { year: "numeric", month: "long", day: "numeric" });
};

export default function UserInfo() {
    const classes = useStyles();
    const [user, setuser] = React.useState(null)
    const token = useSelector((state) => state.states.token)
    const location = useLocation();
    const [userId, setuserId] = React.useState(null);
    const [reports, setreports] = React.useState(null);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClick = (data) => {
        dispatch(setdata(data))
        history.push('/result')
    }

    React.useEffect(() => {
        if (location.state) {
            setuserId(location.state.id);
            auth.get_user(token, location.state.id)
                .then(res => {
                    const user = res.data.user
                    setuser(user)
                    if (res.data.success) {
                        reps.get_reports_user(token, user._id)
                            .then(res => {
                                if (res.data.success) {
                                    setreports(res.data.reports)
                                }
                            })
                    }
                })
        }
    }, [token, location.state])

    const getAge = (dateString) => {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age
    }

    const fullName = user ? user.fname + " " + user.lname : "";

    return (
        <div className={classes.root}>
            <Button
                className={classes.backBtn}
                startIcon={<ArrowBackIcon />}
                onClick={() => history.goBack()}
            >
                Back
            </Button>

            <div className={classes.profileCard}>
                <Avatar className={classes.avatar}>{initials(fullName)}</Avatar>
                <Box>
                    <Typography className={classes.profileName}>{fullName}</Typography>
                    <Typography className={classes.profileRole}>Patient Profile</Typography>
                </Box>
                <div className={classes.badges}>
                    <div className={classes.badge}>
                        <WcIcon fontSize="small" />
                        <Box>
                            <Typography className={classes.badgeLabel}>Gender</Typography>
                            <Typography className={classes.badgeValue}>{user ? user.gender : "—"}</Typography>
                        </Box>
                    </div>
                    <div className={classes.badge}>
                        <CakeIcon fontSize="small" />
                        <Box>
                            <Typography className={classes.badgeLabel}>Age</Typography>
                            <Typography className={classes.badgeValue}>
                                {user ? getAge(user.dob.split("T")[0]) : "—"}
                            </Typography>
                        </Box>
                    </div>
                </div>
            </div>

            <div className={classes.card}>
                <Typography className={classes.sectionTitle}>
                    <span className={classes.sectionBar} />
                    Basic Information
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <div className={classes.infoItem}>
                            <Typography className={classes.infoLabel}>Full Name</Typography>
                            <Typography className={classes.infoValue}>{user ? fullName : "—"}</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <div className={classes.infoItem}>
                            <Typography className={classes.infoLabel}>Gender</Typography>
                            <Typography className={classes.infoValue}>{user ? user.gender : "—"}</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <div className={classes.infoItem}>
                            <Typography className={classes.infoLabel}>Age</Typography>
                            <Typography className={classes.infoValue}>{user ? getAge(user.dob.split("T")[0]) : "—"}</Typography>
                        </div>
                    </Grid>
                </Grid>
            </div>

            <div className={classes.card}>
                <Typography className={classes.sectionTitle}>
                    <span className={classes.sectionBar} />
                    Reports
                </Typography>
                {
                    reports && reports.length > 0 ?
                        reports.map((item) => (
                            <div
                                key={item._id || item.title}
                                className={classes.reportRow}
                                onClick={() => handleClick(item.report)}
                            >
                                <div className={classes.reportIcon}>
                                    <InsertDriveFileOutlinedIcon fontSize="small" />
                                </div>
                                <Box style={{ minWidth: 0, flex: 1 }}>
                                    <Typography className={classes.reportTitle}>{item.title}</Typography>
                                    <Typography className={classes.reportDate}>{formatDate(item.date)}</Typography>
                                </Box>
                                <ChevronRightIcon className={classes.reportArrow} />
                            </div>
                        ))
                        :
                        <Typography className={classes.emptyText}>No Reports Available</Typography>
                }
            </div>

            {
                userId ?
                    <div className={classes.card}>
                        <Typography className={classes.sectionTitle}>
                            <span className={classes.sectionBar} />
                            Health Information
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <div className={classes.graphCard}>
                                    <Typography className={classes.graphTitle}>Blood Pressure</Typography>
                                    <GraphBp userId={userId} />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <div className={classes.graphCard}>
                                    <Typography className={classes.graphTitle}>Glucose Level</Typography>
                                    <GraphGlocuse userId={userId} />
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    :
                    null
            }
        </div>
    )
}
