import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import iseeLogo from '../Assets/isee logo white-01.png';
import blood from '../Assets/blood.svg';
import chat from '../Assets/chat (1).svg';
import report from '../Assets/document.svg';
import exit from '../Assets/exit.svg';
import heart from '../Assets/heart.svg';
import user from '../Assets/user (2).svg';
import doctor from '../Assets/doctor (1).png';
import classify from '../Assets/ISEE-01.png';
import { Grid, Typography } from '@material-ui/core';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerClose: {
        backgroundColor: '#1061B0',
        color: '#1061B0',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(10) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(12) + 1,
        },
        '&:hover': {
            width: drawerWidth,
            backgroundColor: '#1061B0',
            color: '#fff',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }
    },
    toolbar: {
        backgroundColor: '#003C72',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },

}));

export default function MainDrawer() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleDrawer = () => {
        setOpen(!open);
    };

    return (
        <div className={classes.root}>
            <Grid container>
                <Drawer variant="permanent" className={classes.drawer} classes={{ paper: classes.drawerClose }}>
                    <Grid item className={classes.toolbar}>
                        <img src={iseeLogo}
                            alt="ISEE Logo"
                            style={{ width: '100%' }}
                            onClick={handleDrawer}
                        />
                    </Grid>
                    <Divider />
                    <Grid container xs={12}>
                        <List>
                            <ListItem button key={1}>
                                <ListItemIcon>
                                    <img src={user} alt='User' style={{ width: '50px', height: '50px' }} />
                                </ListItemIcon>
                                <ListItemText primary={<Typography variant="p">USER PROFILE</Typography>} />
                            </ListItem>
                            <ListItem button key={2}>
                                <ListItemIcon>
                                    <img src={classify} alt='Classify Disease' style={{ width: '50px', height: '50px' }} />
                                </ListItemIcon>
                                <ListItemText primary={<Typography variant="p">DISEASE DETECTION<br />SYSTEM</Typography>}
                                />
                            </ListItem>
                            <ListItem button key={3}>
                                <ListItemIcon>
                                    <img src={report} alt='Reports' style={{ width: '50px', height: '50px' }} />
                                </ListItemIcon>
                                <ListItemText primary={<Typography variant="p">REPORTS</Typography>} />
                            </ListItem>
                            <ListItem button key={4}>
                                <ListItemIcon>
                                    <img src={blood} alt='Blood Glocuse' style={{ width: '50px', height: '50px' }} />
                                </ListItemIcon>
                                <ListItemText primary={<Typography variant="p">MANAGE BLOOD<br />GLUCOSE</Typography>} />
                            </ListItem>
                            <ListItem button key={5}>
                                <ListItemIcon>
                                    <img src={heart} alt='Blood Pressure' style={{ width: '50px', height: '50px' }} />
                                </ListItemIcon>
                                <ListItemText primary={<Typography variant="p">MANAGE BLOOD<br />PRESSURE</Typography>} />
                            </ListItem>
                            <ListItem button key={6}>
                                <ListItemIcon>
                                    <img src={doctor} alt='Doctor' style={{ width: '50px', height: '50px' }} />
                                </ListItemIcon>
                                <ListItemText primary={<Typography variant="p">APPOINT DOCTORS</Typography>} />
                            </ListItem>
                            <ListItem button key={7}>
                                <ListItemIcon>
                                    <img src={chat} alt='chat' style={{ width: '50px', height: '50px' }} />
                                </ListItemIcon>
                                <ListItemText primary={<Typography variant="p">MESSAGES</Typography>} />
                            </ListItem>
                            <ListItem button key={8}>
                                <ListItemIcon xs={4}>
                                    <img src={exit} alt='Logout' style={{ width: '50px', height: '50px' }} />
                                </ListItemIcon>
                                <ListItemText xs={8} primary={<Typography variant="p">LOGOUT</Typography>} />
                            </ListItem>
                        </List>
                    </Grid>
                </Drawer>
            </Grid>
        </div>
    );
}
