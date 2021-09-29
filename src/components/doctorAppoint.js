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
        position: 'absolute',
        paddingTop: 10,
        paddingLeft: 5,
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
        marginTop: 20,
        borderRadius: 10,
        color: "#1061b0",
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)"
    },
    innerGrid: {
        flexDirection: 'row',
    },
    infoGrid: {
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

export default function DoctorCard() {

    const classes = useStyles(theme);

    return (
        <Grid container className={classes.root}>
            <Avatar src={maleDoc} alt='Male Doctor Avatar' className={classes.docIcon} />
            <Card variant="outlined" className={classes.textBackground}>
                <Grid container className={classes.innerGrid}>
                    <Typography variant='body1' display='block' aling="center" className={classes.drTitle}>
                        DR FAISAL JAWED
                        <Typography variant='caption' display='block'>
                            Senior Doctor
                        </Typography>
                    </Typography>
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
                        <img src={report} alt="Report" className={classes.docIcon1} />
                        <img src={report} alt="Report" className={classes.docIcon1} />
                        <img src={report} alt="Report" className={classes.docIcon1} />
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
                    />
                </Grid>
                <Grid container className={classes.button}>
                    <Button
                        variant="contained"
                        disableElevation
                        className={classes.inbutton}
                    >
                        APPOINT DOCTOR
                    </Button>
                </Grid>
            </Card>
        </Grid>
    )
}