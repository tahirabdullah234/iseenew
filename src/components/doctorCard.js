import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import maleDoc from '../Assets/doctor_logo.svg';
// import femaleDoc from '../Assets/doctor-female.png';

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
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 10,
    },
    drTitle: {
        marginLeft: 60,
    },
    drDesc: {
        bottom: 35,
    },
    gridContainer: {
        borderWidth: 2,
        borderColor: "black",
    }
}));

export default function DoctorCard() {
    const classes = useStyles();

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
                </Grid>
                <Grid container className={classes.button}>
                    <Button variant='contained' disableElevation>
                        APPOINT DOCTOR
                    </Button>
                </Grid>
            </Card>
        </Grid>
    );
}
