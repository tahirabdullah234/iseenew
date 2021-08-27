import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import maleDoc from '../Assets/doctor-male.png';
// import femaleDoc from '../Assets/doctor-female.png';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        background: '#fff',
    },
    docIcon: {
        width: 70,
        height: 70,
        position: 'absolute'
    },
    textBackground: {
        // background: "linear-gradient(180deg, #fff 1%, rgba(128,128,128,0.1) 20%)",
        backgroundColor: 'rgba(128,128,128,0.09)',
        padding: 10,
        width: 'auto',
        marginTop: 20,
        borderRadius: 10,
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
        alignItems: 'center'
    },
    drTitle: {
        marginLeft: 60,
    },
    drDesc: {
        bottom: 35
    }
}));

export default function DoctorCard() {

    const classes = useStyles();

    return (
        <Grid container className={classes.root} sm={4}>
            <Avatar src={maleDoc} alt='Male Doctor Avatar' className={classes.docIcon} />
            <Grid container className={classes.textBackground}>
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
            </Grid>
            <hr />
        </Grid>
    )
}