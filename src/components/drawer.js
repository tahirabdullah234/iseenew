import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

import iseeLogo from "../Assets/isee logo white-01.png";
import iseeLogoCompact from "../Assets/ISEE-01.png";
import blood from "../Assets/blood.svg";
import chat from "../Assets/chat (1).svg";
import report from "../Assets/document.svg";
import exit from "../Assets/exit.svg";
import heart from "../Assets/heart.svg";
import user from "../Assets/user (2).svg";
import appointment from "../Assets/appointment.svg";
import dashboard from "../Assets/dashboard.png";
import view from "../Assets/view.svg";
import guideline from "../Assets/guideline.svg";

import photo1 from "../Assets/user1-photo.png";
import photo2 from "../Assets/user2-photo.png";
import photo3 from "../Assets/user3-photo.png";
import photo4 from "../Assets/user4-photo.png";
import photo5 from "../Assets/user5-photo.png";

import { useSelector, useDispatch } from "react-redux";
import { useHistory, useRouteMatch } from "react-router";
import { logout, setphoto } from "../pages/statesSlice";
import * as auth from "../Services/auth";

const userPhotos = [null, photo1, photo2, photo3, photo4, photo5];

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
  },
  paper: {
    backgroundColor: "#1061B0",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    borderRight: "none",
    boxShadow: "2px 0 8px rgba(0,0,0,0.08)",
    height: "100%",
  },
  drawer: {
    flexShrink: 0,
    whiteSpace: "nowrap",
    width: "100%",
  },
  drawerClose: {
    width: theme.spacing(10) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(12) + 1,
    },
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    "& $sectionLabel": {
      opacity: 1,
      textAlign: "center",
      padding: "14px 0 4px",
    },
    "& $itemText": {
      opacity: 0,
      width: 0,
      flex: "0 0 0",
    },
    "& $userText": {
      opacity: 0,
      width: 0,
      marginLeft: 0,
    },
    "& $navItem": {
      justifyContent: "center",
      padding: "10px 0",
    },
    "& $iconWrap": {
      marginRight: 0,
    },
    "& $userCard": {
      justifyContent: "center",
      padding: "14px 8px",
    },
    "& $divider": {
      opacity: 0,
    },
    "& $logoWide": {
      display: "none",
    },
    "& $logoCompact": {
      display: "block",
    },
    "&:hover": {
      width: drawerWidth,
      backgroundColor: "#1061B0",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      "& $sectionLabel": {
        opacity: 1,
        textAlign: "left",
        padding: "16px 24px 6px",
      },
      "& $itemText": {
        opacity: 1,
        width: "auto",
        flex: "1 1 auto",
      },
      "& $userText": {
        opacity: 1,
        width: "auto",
        marginLeft: 12,
      },
      "& $navItem": {
        justifyContent: "flex-start",
        padding: "10px 20px",
      },
      "& $iconWrap": {
        marginRight: 16,
      },
      "& $userCard": {
        justifyContent: "flex-start",
        padding: "14px 16px",
      },
      "& $divider": {
        opacity: 1,
      },
      "& $logoWide": {
        display: "block",
      },
      "& $logoCompact": {
        display: "none",
      },
    },
  },
  drawerOpen: {
    width: drawerWidth,
    overflowX: "hidden",
  },
  toolbar: {
    backgroundColor: "#003C72",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0, 1),
    flexShrink: 0,
    ...theme.mixins.toolbar,
    cursor: "pointer",
  },
  logoWide: {
    display: "block",
    width: 100,
  },
  logoCompact: {
    display: "none",
    width: 40,
  },
  userCard: {
    display: "flex",
    alignItems: "center",
    padding: "14px 16px",
    borderBottom: "1px solid rgba(255,255,255,0.14)",
    flexShrink: 0,
    minHeight: 64,
    overflow: "hidden",
  },
  avatar: {
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    color: "#1061B0",
    fontWeight: 700,
    fontSize: 16,
    flexShrink: 0,
  },
  avatarBtn: {
    position: "relative",
    padding: 0,
    flexShrink: 0,
    "&:hover $avatarOverlay": {
      opacity: 1,
    },
  },
  avatarOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: "50%",
    background: "rgba(0,0,0,0.5)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
    transition: "opacity 0.2s ease",
    cursor: "pointer",
  },
  userText: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 12,
    minWidth: 0,
    overflow: "hidden",
    transition: "opacity 0.2s ease",
  },
  userName: {
    fontSize: 14,
    fontWeight: 700,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: 170,
  },
  userRole: {
    fontSize: 11,
    letterSpacing: "0.08em",
    color: "rgba(255,255,255,0.6)",
    textTransform: "uppercase",
    marginTop: 2,
  },
  body: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
  },
  nav: {
    flex: 1,
    overflowY: "auto",
    paddingBottom: 8,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.12em",
    color: "rgba(255,255,255,0.5)",
    textTransform: "uppercase",
    padding: "16px 24px 6px",
    whiteSpace: "nowrap",
    transition: "opacity 0.2s ease",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    padding: "10px 20px",
    position: "relative",
    transition: "background-color 0.2s ease, padding 0.2s ease",
    "&.MuiListItem-button:hover": {
      backgroundColor: "rgba(255,255,255,0.08)",
    },
    "&$navItemActive": {
      backgroundColor: "rgba(255,255,255,0.15)",
      "&.MuiListItem-button:hover": {
        backgroundColor: "rgba(255,255,255,0.15)",
      },
      "&::before": {
        content: '""',
        position: "absolute",
        left: 0,
        top: "50%",
        transform: "translateY(-50%)",
        width: 4,
        height: 28,
        borderRadius: "0 2px 2px 0",
        backgroundColor: "#fff",
      },
    },
  },
  navItemActive: {},
  iconWrap: {
    width: 28,
    height: 28,
    flexShrink: 0,
    marginRight: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "margin-right 0.2s ease",
  },
  icon: {
    width: 28,
    height: 28,
    objectFit: "contain",
  },
  itemText: {
    fontSize: 14,
    fontWeight: 500,
    color: "rgba(255,255,255,0.85)",
    whiteSpace: "nowrap",
    minWidth: 0,
    overflow: "hidden",
    transition: "opacity 0.2s ease",
  },
  itemTextActive: {
    color: "#fff",
    fontWeight: 700,
  },
  bottom: {
    flexShrink: 0,
  },
  divider: {
    backgroundColor: "rgba(255,255,255,0.14)",
    transition: "opacity 0.2s ease",
  },
}));

const initials = (fullName) =>
  fullName
    ? fullName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0].toUpperCase())
        .join("")
    : "ISEE";

const userSections = [
  {
    title: "Main",
    items: [
      { to: "/", exact: true, icon: dashboard, label: "Dashboard" },
      { to: "/checkdisease", icon: view, label: "Disease Detection" },
    ],
  },
  {
    title: "Health",
    items: [
      { to: "/reports", icon: report, label: "Reports" },
      { to: "/bloodglocuse", icon: blood, label: "Blood Glucose" },
      { to: "/bloodpressure", icon: heart, label: "Blood Pressure" },
      { to: "/appointdoctor", icon: appointment, label: "Appoint Doctors" },
    ],
  },
  {
    title: "Account",
    items: [
      { to: "/editprofile", icon: user, label: "User Profile" },
      { to: "/messages", icon: chat, label: "Messages" },
    ],
  },
];

const doctorSections = [
  {
    title: "Main",
    items: [
      { to: "/", exact: true, icon: dashboard, label: "Dashboard" },
      { to: "/checkdisease", icon: view, label: "Disease Detection" },
      { to: "/tips", icon: guideline, label: "Manage Tips" },
    ],
  },
  {
    title: "Account",
    items: [
      { to: "/editprofile", icon: user, label: "Profile" },
      { to: "/messages", icon: chat, label: "Messages" },
    ],
  },
];

const SideNavItem = ({ to, exact, icon, label, onClick }) => {
  const classes = useStyles();
  const history = useHistory();
  const match = useRouteMatch(to ? { path: to, exact } : { path: "__none__" });

  const itemClass = match
    ? `${classes.navItem} ${classes.navItemActive}`
    : classes.navItem;
  const textClass = match
    ? `${classes.itemText} ${classes.itemTextActive}`
    : classes.itemText;

  const handleClick = () => {
    if (onClick) onClick();
    else if (to) history.push(to);
  };

  return (
    <ListItem button className={itemClass} onClick={handleClick}>
      <span className={classes.iconWrap}>
        <img src={icon} alt={label} className={classes.icon} />
      </span>
      <span className={textClass}>{label}</span>
    </ListItem>
  );
};

export default function MainDrawer({ expanded }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const isdoctor = useSelector((state) => state.states.isdoctor);
  const name = useSelector((state) => state.states.name);
  const user = useSelector((state) => state.states.user);
  const token = useSelector((state) => state.states.token);
  const fileInputRef = React.useRef(null);
  const sections = isdoctor ? doctorSections : userSections;
  const userPhoto =
    user && typeof user.photo === "string"
      ? user.photo
      : user && user.photo >= 1 && user.photo <= 5
        ? userPhotos[user.photo]
        : null;

  const paperClass = expanded
    ? `${classes.paper} ${classes.drawerOpen}`
    : `${classes.paper} ${classes.drawerClose}`;

  const handleLogout = () => {
    dispatch(logout());
    history.push("/");
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file || !user || !user._id) return;
    auth.upload_profile_picture(token, file)
      .then((res) => {
        if (res.data && res.data.filename) {
          dispatch(setphoto("/" + res.data.filename + "?t=" + Date.now()));
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.root}>
      <Drawer
        variant="permanent"
        className={classes.drawer}
        classes={{ paper: paperClass }}
      >
        <div className={classes.toolbar} onClick={() => history.push("/")}>
          <img src={iseeLogo} alt="ISEE Logo" className={classes.logoWide} />
          <img
            src={iseeLogoCompact}
            alt="ISEE Logo"
            className={classes.logoCompact}
          />
        </div>
        <div className={classes.userCard}>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handlePhotoChange}
          />
          <IconButton
            className={classes.avatarBtn}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
          >
            {userPhoto ? (
              <Avatar src={userPhoto} className={classes.avatar} />
            ) : (
              <Avatar className={classes.avatar}>{initials(name)}</Avatar>
            )}
            <span className={classes.avatarOverlay}>
              <PhotoCameraIcon fontSize="small" />
            </span>
          </IconButton>
          <div className={classes.userText}>
            <span className={classes.userName}>{name || "ISEE User"}</span>
            <span className={classes.userRole}>
              {isdoctor ? "Doctor" : "Patient"}
            </span>
          </div>
        </div>
        <div className={classes.body}>
          <nav className={classes.nav}>
            {sections.map((section) => (
              <div key={section.title}>
                <div className={classes.sectionLabel}>{section.title}</div>
                {section.items.map((item) => (
                  <SideNavItem key={item.label} {...item} />
                ))}
              </div>
            ))}
          </nav>
          <div className={classes.bottom}>
            <Divider className={classes.divider} />
            <SideNavItem icon={exit} label="Logout" onClick={handleLogout} />
          </div>
        </div>
      </Drawer>
    </div>
  );
}
