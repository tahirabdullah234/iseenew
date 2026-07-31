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
        border: "1px solid #dfe6ee",
        background: "#fff",
        borderRadius: 12,
        overflow: "hidden",
    },
    header: {
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        background: "linear-gradient(45deg,#1061b0 0%, #3585da 100%)",
        color: "#fff",
        padding: "22px 24px",
    },
    brand: {
        display: "flex",
        alignItems: "center",
        gap: 10,
    },
    brandMark: {
        width: 34,
        height: 34,
        borderRadius: 10,
        background: "#fff",
        color: "#1061b0",
        fontWeight: 800,
        fontSize: 15,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Montserrat",
    },
    headerTitle: {
        fontFamily: "Montserrat",
        fontWeight: "bold",
        fontSize: 19,
        lineHeight: 1.25,
    },
    headerTitle2: {
        fontFamily: "Montserrat",
        fontSize: 12.5,
        opacity: 0.92,
        marginTop: 2,
        letterSpacing: "0.03em",
    },
    headerSub: {
        fontFamily: "Montserrat",
        fontSize: 14,
        fontWeight: 600,
        opacity: 0.95,
        textAlign: "right",
        [theme.breakpoints.down(750)]: {
            textAlign: "left",
        },
    },
    sectionTitle: {
        display: "flex",
        alignItems: "center",
        background: "#f0f7fc",
        color: "#1061b0",
        padding: "12px 20px",
        fontFamily: "Montserrat",
        fontWeight: 700,
        fontSize: 15.5,
        letterSpacing: "0.02em",
        textTransform: "uppercase",
    },
    sectionBar: {
        display: "inline-block",
        width: 4,
        height: 16,
        borderRadius: 2,
        background: "linear-gradient(45deg,#3585da 0%, #59c1e8 100%)",
        marginRight: 10,
    },
    infoGrid: {
        padding: "18px 24px",
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
        alignItems: "baseline",
        marginBottom: 8,
    },
    infoLabel: {
        fontFamily: "Montserrat",
        fontWeight: 600,
        fontSize: 13.5,
        color: "#8e9bb0",
        minWidth: 118,
        textTransform: "uppercase",
        letterSpacing: "0.04em",
    },
    infoValue: {
        fontFamily: "Montserrat",
        fontSize: 14,
        color: "#1d3557",
        fontWeight: 600,
        wordBreak: "break-word",
    },
    divider: {
        border: "none",
        borderTop: "1px solid #e8edf3",
        margin: 0,
    },
    resultSection: {
        padding: "18px 24px",
    },
    resultRow: {
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 16,
        marginTop: 6,
    },
    resultLabel: {
        fontFamily: "Montserrat",
        fontWeight: 600,
        fontSize: 15,
        color: "#444",
    },
    resultText: {
        fontFamily: "Montserrat",
        fontSize: 16,
        color: "#1d3557",
        lineHeight: 1.5,
        flex: "1 1 220px",
    },
    resultBadge: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        borderRadius: 999,
        padding: "9px 22px",
        fontFamily: "Montserrat",
        fontWeight: 800,
        fontSize: 15,
        letterSpacing: "0.08em",
        color: "#fff",
    },
    badgeDot: {
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: "#fff",
    },
    scanSection: {
        padding: "16px 24px 20px",
    },
    scanLabel: {
        fontFamily: "Montserrat",
        fontWeight: 700,
        fontSize: 14,
        color: "#1d3557",
        marginBottom: 10,
        textTransform: "uppercase",
        letterSpacing: "0.04em",
    },
    scanFlex: {
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        gap: 16,
        [theme.breakpoints.up(750)]: {
            flexDirection: "row",
            alignItems: "center",
        },
    },
    scanImage: {
        width: 170,
        height: 170,
        objectFit: "cover",
        borderRadius: 14,
        border: "3px solid #e8edf3",
        boxShadow: "0 4px 14px rgba(16,97,176,0.15)",
    },
    scanTextWrap: {
        flex: 1,
    },
    scanMeta: {
        fontFamily: "Montserrat",
        fontSize: 14,
        color: "#4a6a8a",
        marginBottom: 6,
    },
    scanNote: {
        fontFamily: "Montserrat",
        fontSize: 14,
        fontWeight: 700,
        color: "#1d3557",
        marginTop: 12,
        padding: "10px 14px",
        borderRadius: 10,
        background: "#f0f7fc",
        display: "inline-block",
    },
    recSection: {
        padding: "16px 24px 20px",
    },
    recTitle: {
        fontFamily: "Montserrat",
        fontWeight: 700,
        fontSize: 15,
        color: "#1d3557",
        marginBottom: 8,
        textTransform: "uppercase",
        letterSpacing: "0.04em",
    },
    recItem: {
        paddingTop: 2,
        paddingBottom: 2,
    },
    recBullet: {
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
    },
    recNumber: {
        width: 20,
        height: 20,
        borderRadius: "50%",
        background: "linear-gradient(45deg,#3585da 0%, #59c1e8 100%)",
        color: "#fff",
        fontWeight: 700,
        fontSize: 11,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        marginTop: 2,
    },
    recText: {
        fontFamily: "Montserrat",
        fontSize: 14,
        color: "#333",
        lineHeight: 1.55,
    },
    noteSection: {
        padding: "16px 24px",
        background: "#fff8e1",
        borderTop: "1px solid #ffe082",
    },
    noteText: {
        fontFamily: "Montserrat",
        fontSize: 13,
        color: "#6d5200",
        lineHeight: 1.55,
    },
    footer: {
        padding: "12px 24px",
        background: "#f7f9fc",
        borderTop: "1px solid #e8edf3",
        textAlign: "center",
    },
    footerText: {
        fontFamily: "Montserrat",
        fontSize: 12,
        color: "#8e9bb0",
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
    const positive = String(data.prediction) !== "0"
    const badgeColor = positive ? "#e53935" : "#2e9e63"
    const badgeLabel = positive ? "POSITIVE" : "NEGATIVE"

    const recommendations = [
        "Return for retinal imaging within 12 months.",
        "As per ADA recommendations, emphasize the importance of controlling blood sugar, cholesterol and blood pressure as well the importance of routine follow-up with an ophthalmologist regardless of whether visual symptoms are present or absent.",
        "This screening was completed on " + date + ".",
    ]

    return (
        <Grid item xs={12} className={classes.border}>
            <Grid container className={classes.header}>
                <Box>
                    <Box className={classes.brand}>
                        <Box className={classes.brandMark}>ISEE</Box>
                        <Box>
                            <Typography className={classes.headerTitle}>
                                ISEE | Diabetic Retinopathy Detection System
                            </Typography>
                            <Typography className={classes.headerTitle2}>
                                Smart Eye Health Screening Platform
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Typography className={classes.headerSub}>
                    Diabetic Retinopathy
                    <br />
                    Screening Report
                </Typography>
            </Grid>
            <Typography className={classes.sectionTitle}>
                <span className={classes.sectionBar} />
                Patient Information
            </Typography>
            <Grid container className={classes.infoGrid}>
                <Grid item xs={12} className={classes.infoColumn}>
                    <Box className={classes.infoRow}>
                        <Typography className={classes.infoLabel}>Patient ID</Typography>
                        <Typography className={classes.infoValue}>{patientId}</Typography>
                    </Box>
                    <Box className={classes.infoRow}>
                        <Typography className={classes.infoLabel}>Report ID</Typography>
                        <Typography className={classes.infoValue}>{data._id}</Typography>
                    </Box>
                    <Box className={classes.infoRow}>
                        <Typography className={classes.infoLabel}>Date</Typography>
                        <Typography className={classes.infoValue}>{date}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} className={classes.infoColumn}>
                    <Box className={classes.infoRow}>
                        <Typography className={classes.infoLabel}>Patient Name</Typography>
                        <Typography className={classes.infoValue}>{patientName}</Typography>
                    </Box>
                    <Box className={classes.infoRow}>
                        <Typography className={classes.infoLabel}>Date Of Birth</Typography>
                        <Typography className={classes.infoValue}>{patientDob}</Typography>
                    </Box>
                    <Box className={classes.infoRow}>
                        <Typography className={classes.infoLabel}>Gender</Typography>
                        <Typography className={classes.infoValue}>{patientGender}</Typography>
                    </Box>
                </Grid>
            </Grid>
            <hr className={classes.divider} />
            <Box className={classes.resultSection}>
                <Typography className={classes.sectionTitle} style={{ margin: "-18px -24px 6px" }}>
                    <span className={classes.sectionBar} />
                    Screening Summary
                </Typography>
                <Box className={classes.resultRow}>
                    <Typography className={classes.resultLabel}>Screening Result:</Typography>
                    <Typography className={classes.resultText}>
                        {positive
                            ? "Positive for referable diabetic retinopathy."
                            : "Negative for referable diabetic retinopathy."}
                    </Typography>
                    <Box className={classes.resultBadge} style={{ background: badgeColor }}>
                        <span className={classes.badgeDot} />
                        {badgeLabel}
                    </Box>
                </Box>
            </Box>
            <hr className={classes.divider} />
            <Box className={classes.scanSection}>
                <Typography className={classes.scanLabel}>
                    Patient Eye Scan
                </Typography>
                <Box className={classes.scanFlex}>
                    <img
                        src={`http://localhost:5000/images/${data.scan}`}
                        alt="Eye Scan"
                        className={classes.scanImage}
                    />
                    <Box className={classes.scanTextWrap}>
                        <Typography className={classes.scanMeta}>
                            <strong>Report ID:</strong> {data._id}
                        </Typography>
                        <Typography className={classes.scanMeta}>
                            <strong>Date:</strong> {date}
                        </Typography>
                        <Box className={classes.scanNote} style={{ color: badgeColor }}>
                            {positive
                                ? "Apparent signs of DR detected."
                                : "No apparent signs of DR detected."}
                        </Box>
                    </Box>
                </Box>
            </Box>
            <hr className={classes.divider} />
            <Box className={classes.recSection}>
                <Typography className={classes.recTitle}>
                    Plan and Recommendations
                </Typography>
                <List disablePadding>
                    {recommendations.map((rec, i) => (
                        <ListItem key={i} className={classes.recItem} disableGutters>
                            <ListItemText
                                primary={
                                    <Box className={classes.recBullet}>
                                        <span className={classes.recNumber}>{i + 1}</span>
                                        <Typography className={classes.recText}>
                                            {rec}
                                        </Typography>
                                    </Box>
                                }
                            />
                        </ListItem>
                    ))}
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
            <Box className={classes.footer}>
                <Typography className={classes.footerText}>
                    ISEE | Diabetic Retinopathy Screening Report
                </Typography>
            </Box>
        </Grid>
    )
}
