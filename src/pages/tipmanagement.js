import React from "react";

import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme, makeStyles } from '@material-ui/core/styles';
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

import SideDrawer from "../components/drawer";
import { TipManagement } from "../components/tipManagement";

const drawerCollapsed = 97;
const drawerExpanded = 280;

const useStyles = makeStyles((theme) => ({
    root: {
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e9f0 100%)",
        minHeight: "100vh",
        overflowX: "hidden",
        display: "flex",
    },
    drawerWrapper: {
        flexShrink: 0,
        transition: "width 0.3s ease",
    },
    content: {
        flex: 1,
        minWidth: 0,
        transition: "max-width 0.3s ease",
    },
    menuBtn: {
        background: "#1061B0",
        color: "#fff",
        borderRadius: 8,
        marginBottom: 12,
        alignSelf: "flex-start",
        "&:hover": { background: "#0d4d8f" },
    },
    mobileDrawer: {
        "& .MuiDrawer-paper": {
            width: 280,
            background: "#1061B0",
        },
    },
    closeBtn: {
        position: "absolute",
        top: 8,
        right: 8,
        zIndex: 1300,
        color: "#fff",
    },
}))

export default function TipManagementPage() {
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const current = drawerOpen ? drawerExpanded : drawerCollapsed;

    return (
        <Box className={classes.root}>
            {isMobile ? (
                <>
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={() => setMobileOpen(false)}
                        className={classes.mobileDrawer}
                        classes={{ paper: classes.mobileDrawer }}
                    >
                        <IconButton className={classes.closeBtn} onClick={() => setMobileOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                        <SideDrawer expanded />
                    </Drawer>
                    <Box className={classes.content}>
                        <IconButton className={classes.menuBtn} onClick={() => setMobileOpen(true)}>
                            <MenuIcon />
                        </IconButton>
                        <TipManagement />
                    </Box>
                </>
            ) : (
                <>
                    <Box
                        className={classes.drawerWrapper}
                        style={{ width: current }}
                        onMouseEnter={() => setDrawerOpen(true)}
                        onMouseLeave={() => setDrawerOpen(false)}
                    >
                        <SideDrawer />
                    </Box>
                    <Box className={classes.content} style={{ maxWidth: `calc(100% - ${current}px)` }}>
                        <TipManagement />
                    </Box>
                </>
            )}
        </Box>
    )
}
