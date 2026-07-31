import React from "react";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    border: {
        border: "1px solid #ddd",
        background: "#fff",
        borderRadius: 8,
        overflow: "hidden",
    },
    header: {
        justifyContent: "space-between",
        background: "linear-gradient(45deg,#59c1e8 0%, #3585da 100%)",
        color: "#fff",
        padding: "16px 20px",
    },
    headerTitle: {
        fontFamily: "Montserrat",
        fontWeight: "bold",
        fontSize: 20,
    },
    headerSub: {
        fontFamily: "Montserrat",
        fontSize: 16,
        opacity: 0.9,
    },
    sectionTitle: {
        fontFamily: "Montserrat",
        fontWeight: "bold",
        fontSize: 18,
        color: "#3585da",
        padding: "12px 20px",
        background: "#f0f7fc",
    },
    scanTextWrap: {
        marginTop: 12,
        [theme.breakpoints.up(750)]: {
            marginTop: 0,
            marginLeft: 24,
        },
    },
    scanFlex: {
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        [theme.breakpoints.up(750)]: {
            flexDirection: "row",
            alignItems: "center",
        },
    },
    infoGrid: {
        padding: "16px 20px",
    },
    infoColumn: {
        flexBasis: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        padding: 0,
        [theme.breakpoints.up(750)]: {
            flexBasis: "50%",
            maxWidth: "50%",
        },
    },
    infoRow: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 6,
    },
    infoLabel: {
        fontFamily: "Montserrat",
        fontWeight: 600,
        fontSize: 15,
        color: "#555",
        minWidth: 130,
    },
    infoValue: {
        fontFamily: "Montserrat",
        fontSize: 15,
        color: "#333",
    },
    divider: {
        border: "none",
        borderTop: "1px solid #e0e0e0",
        margin: 0,
    },
    resultSection: {
        padding: "16px 20px",
    },
    resultTitle: {
        fontFamily: "Montserrat",
        fontWeight: "bold",
        fontSize: 17,
        color: "#3585da",
        marginBottom: 8,
        textDecoration: "underline",
    },
    resultSub: {
        fontFamily: "Montserrat",
        fontWeight: 600,
        fontSize: 16,
        color: "#444",
        marginBottom: 4,
    },
    resultValue: {
        fontFamily: "Montserrat",
        fontSize: 16,
        color: "#333",
        marginBottom: 12,
    },
    scanSection: {
        padding: "0 20px 16px",
    },
    scanLabel: {
        fontFamily: "Montserrat",
        fontWeight: 600,
        fontSize: 15,
        color: "#555",
        marginBottom: 8,
    },
    scanImage: {
        width: 160,
        height: 160,
        objectFit: "cover",
        borderRadius: 12,
        border: "2px solid #e0e0e0",
    },
    recSection: {
        padding: "0 20px 16px",
    },
    recTitle: {
        fontFamily: "Montserrat",
        fontWeight: 600,
        fontSize: 16,
        color: "#444",
        marginBottom: 4,
    },
    recItem: {
        paddingTop: 2,
        paddingBottom: 2,
    },
    recText: {
        fontFamily: "Montserrat",
        fontSize: 15,
        color: "#333",
    },
    noteSection: {
        padding: "16px 20px",
        background: "#fff8e1",
        borderTop: "1px solid #ffe082",
    },
    noteText: {
        fontFamily: "Montserrat",
        fontSize: 14,
        color: "#6d5200",
        lineHeight: 1.5,
    },
}))

export default function Template() {
    const classes = useStyles();
    const user = useSelector((state) => state.states.user) || {}
    const data = useSelector((state) => state.states.data) || {}
    const name = useSelector((state) => state.states.name)
    const date = String(data.date || "").split("T")[0]
    const dob = String(user.dob || "").slice(0, 10)
    const patientId = data.patientId || user._id
    const patientName = data.patientName || name
    const patientDob = data.patientDob || dob
    const patientGender = data.patientGender || user.gender

    return (
        <Grid item xs={12} className={classes.border}>
            <Grid container className={classes.header}>
                <Typography className={classes.headerTitle}>
                    ISEE | Diabetic Retinopathy Detection System
                </Typography>
                <Typography className={classes.headerSub}>
                    Diabetic Retinopathy Screening Report
                </Typography>
            </Grid>
            <Typography className={classes.sectionTitle}>
                Patient Information
            </Typography>
            <Grid container className={classes.infoGrid}>
                <Grid item xs={12} className={classes.infoColumn}>
                    <Box className={classes.infoRow}>
                        <Typography className={classes.infoLabel}>Patient ID:</Typography>
                        <Typography className={classes.infoValue}>{patientId}</Typography>
                    </Box>
                    <Box className={classes.infoRow}>
                        <Typography className={classes.infoLabel}>Report ID:</Typography>
                        <Typography className={classes.infoValue}>{data._id}</Typography>
                    </Box>
                    <Box className={classes.infoRow}>
                        <Typography className={classes.infoLabel}>Date:</Typography>
                        <Typography className={classes.infoValue}>{date}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} className={classes.infoColumn}>
                    <Box className={classes.infoRow}>
                        <Typography className={classes.infoLabel}>Patient Name:</Typography>
                        <Typography className={classes.infoValue}>{patientName}</Typography>
                    </Box>
                    <Box className={classes.infoRow}>
                        <Typography className={classes.infoLabel}>Date Of Birth:</Typography>
                        <Typography className={classes.infoValue}>{patientDob}</Typography>
                    </Box>
                    <Box className={classes.infoRow}>
                        <Typography className={classes.infoLabel}>Gender:</Typography>
                        <Typography className={classes.infoValue}>{patientGender}</Typography>
                    </Box>
                </Grid>
            </Grid>
            <hr className={classes.divider} />
            <Box className={classes.resultSection}>
                <Typography className={classes.resultTitle}>
                    Diabetic Retinopathy Screening Summary
                </Typography>
                <Typography className={classes.resultSub}>
                    Screening Result:
                </Typography>
                <Typography className={classes.resultValue}>
                    {
                        String(data.prediction) === "0" ?
                            "Negative for referable diabetic retinopathy."
                            :
                            "Positive for referable diabetic retinopathy."
                    }
                </Typography>
            </Box>
            <hr className={classes.divider} />
            <Box className={classes.scanSection}>
                <Typography className={classes.scanLabel}>
                    Patient Eye Scan:
                </Typography>
                <Box className={classes.scanFlex}>
                    <img
                        src={`http://localhost:5000/images/${data.scan}`}
                        alt="Eye Scan"
                        className={classes.scanImage}
                    />
                    <Box className={classes.scanTextWrap}>
                        <Typography className={classes.recText}>
                            <strong>Report ID:</strong> {data._id}
                        </Typography>
                        <Typography className={classes.recText} style={{ marginTop: 8 }}>
                            <strong>Date:</strong> {date}
                        </Typography>
                        <Typography className={classes.recText} style={{ marginTop: 12 }}>
                            {data.prediction >= 1
                                ? "Apparent signs of DR detected."
                                : "No apparent signs of DR detected."}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <hr className={classes.divider} />
            <Box className={classes.recSection}>
                <Typography className={classes.recTitle}>
                    Plan and Recommendations:
                </Typography>
                <List disablePadding>
                    <ListItem className={classes.recItem} disableGutters>
                        <ListItemText
                            primary={
                                <Typography className={classes.recText}>
                                    Return for retinal imaging within 12 months.
                                </Typography>
                            }
                        />
                    </ListItem>
                    <ListItem className={classes.recItem} disableGutters>
                        <ListItemText
                            primary={
                                <Typography className={classes.recText}>
                                    As per ADA recommendations, emphasize the importance of
                                    controlling blood sugar, cholesterol and blood pressure as well
                                    the importance of routine follow-up with an ophthalmologist
                                    regardless of whether visual symptoms are present or absent.
                                </Typography>
                            }
                        />
                    </ListItem>
                    <ListItem className={classes.recItem} disableGutters>
                        <ListItemText
                            primary={
                                <Typography className={classes.recText}>
                                    Report Date: {date}
                                </Typography>
                            }
                        />
                    </ListItem>
                </List>
            </Box>
            <hr className={classes.divider} />
            <Box className={classes.noteSection}>
                <Typography className={classes.noteText}>
                    Note: This report is automatically generated using iSee DR
                    Classifier and only provides a Diabetic Retinopathy (DR)
                    screening assessment. This screening does not take the place of a
                    regular eye examination for the purpose of assessing the presence of
                    age-related macular degeneration, glaucoma, cataract, anterior
                    segment diseases or other possible vision threatening conditions.
                </Typography>
            </Box>
        </Grid>
    )
}