import React from "react";
import "./style.css";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import SendIcon from "@material-ui/icons/Send";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import io from "socket.io-client";

import * as apt from "../Services/appointment";
import { useSelector } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import photo1 from "../Assets/user1-photo.png";
import photo2 from "../Assets/user2-photo.png";
import photo3 from "../Assets/user3-photo.png";
import photo4 from "../Assets/user4-photo.png";
import photo5 from "../Assets/user5-photo.png";

const userPhotos = [null, photo1, photo2, photo3, photo4, photo5];

function getUserPhoto(item, isdoctor) {
  const userObj = isdoctor ? item.p_id : item.d_id;
  if (userObj && userObj.photo >= 1 && userObj.photo <= 5) {
    return userPhotos[userObj.photo];
  }
  return null;
}

const avatarColors = [
  "#e53935", "#d81b60", "#8e24aa", "#5e35b1", "#3949ab",
  "#1e88e5", "#039be5", "#00acc1", "#00897b", "#43a047",
  "#7cb342", "#c0ca33", "#fdd835", "#ffb300", "#fb8c00",
  "#f4511e", "#6d4c41", "#757575", "#546e7a", "#e91e63",
];

function getAvatarColor(name) {
  if (!name) return avatarColors[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

const useStyles = makeStyles((theme) => ({
  wrapper: {
    flex: 1,
    display: "flex",
    overflow: "hidden",
    background: "#fff",
    margin: 0,
  },
  sidebar: {
    width: 360,
    minWidth: 360,
    borderRight: "1px solid #f0f0f0",
    display: "flex",
    flexDirection: "column",
    background: "#fafbfc",
  },
  sidebarHeader: {
    padding: "24px 24px 16px",
    borderBottom: "1px solid #f0f0f0",
    background: "#fff",
  },
  sidebarTitle: {
    fontWeight: 700,
    fontSize: 22,
    color: "#1a1a2e",
  },
  userList: {
    flex: 1,
    overflowY: "auto",
    "&::-webkit-scrollbar": { width: 4 },
    "&::-webkit-scrollbar-thumb": { background: "#e0e0e0", borderRadius: 4 },
  },
  userItem: {
    display: "flex",
    alignItems: "center",
    padding: "16px 24px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    borderLeft: "3px solid transparent",
    "&:hover": {
      background: "#f0f4ff",
    },
  },
  userItemActive: {
    background: "#eef3fe",
    borderLeft: "3px solid #3585da",
  },
  userInfo: {
    marginLeft: 14,
    flex: 1,
    minWidth: 0,
  },
  userName: {
    fontWeight: 600,
    fontSize: 14,
    color: "#1a1a2e",
  },
  userPreview: {
    fontSize: 13,
    color: "#8e8e93",
    marginTop: 2,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  mainPanel: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    background: "#f8f9fc",
  },
  chatHeader: {
    display: "flex",
    alignItems: "center",
    padding: "16px 24px",
    borderBottom: "1px solid #f0f0f0",
    background: "#fff",
    minHeight: 72,
  },
  chatHeaderInfo: {
    marginLeft: 14,
  },
  chatHeaderName: {
    fontWeight: 600,
    fontSize: 16,
    color: "#1a1a2e",
  },
  chatHeaderStatus: {
    fontSize: 12,
    color: "#34c759",
  },
  messageArea: {
    flex: 1,
    overflowY: "auto",
    padding: "24px 32px",
    "&::-webkit-scrollbar": { width: 4 },
    "&::-webkit-scrollbar-thumb": { background: "#e0e0e0", borderRadius: 4 },
  },
  messageRow: {
    display: "flex",
    marginBottom: 16,
    alignItems: "flex-end",
  },
  messageRowSent: {
    justifyContent: "flex-end",
  },
  messageAvatar: {
    width: 32,
    height: 32,
    fontSize: 13,
    fontWeight: 600,
    flexShrink: 0,
  },
  messageAvatarSpacer: {
    width: 32,
    flexShrink: 0,
  },
  messageContent: {
    maxWidth: "60%",
    margin: "0 10px",
  },
  messageBubble: {
    padding: "10px 16px",
    borderRadius: 18,
    fontSize: 14,
    lineHeight: 1.45,
    wordBreak: "break-word",
  },
  messageBubbleReceived: {
    background: "#fff",
    border: "1px solid #e8e8ec",
    color: "#1a1a2e",
    borderBottomLeftRadius: 4,
  },
  messageBubbleSent: {
    background: "linear-gradient(135deg, #3585da, #1c6bc0)",
    color: "#fff",
    borderBottomRightRadius: 4,
  },
  messageTime: {
    fontSize: 11,
    marginTop: 4,
    opacity: 0.7,
  },
  messageTimeSent: {
    textAlign: "right",
    color: "#8e8e93",
  },
  messageTimeReceived: {
    color: "#8e8e93",
  },
  inputArea: {
    display: "flex",
    alignItems: "center",
    padding: "16px 24px",
    borderTop: "1px solid #f0f0f0",
    background: "#fff",
    gap: 12,
  },
  input: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: 14,
    padding: "12px 18px",
    borderRadius: 24,
    background: "#f2f3f7",
    color: "#1a1a2e",
    "&::placeholder": {
      color: "#8e8e93",
    },
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    background: "linear-gradient(135deg, #3585da, #1c6bc0)",
    color: "#fff",
    "&:hover": {
      background: "linear-gradient(135deg, #1c6bc0, #1557a0)",
    },
    "&.Mui-disabled": {
      background: "#d0d0d0",
    },
  },
  emptyState: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#8e8e93",
    gap: 12,
  },
  emptyIcon: {
    width: 88,
    height: 88,
    borderRadius: "50%",
    background: "#eef3fe",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 36,
    marginBottom: 8,
  },
  noChat: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    color: "#8e8e93",
    fontSize: 14,
  },
}));

function formatTime(date) {
  if (!date) return "";
  const d = new Date(date);
  const now = new Date();
  const isToday =
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear();
  if (isToday) {
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  return d.toLocaleDateString([], { month: "short", day: "numeric" }) + " " + d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function getUserName(item, isdoctor, currentUser) {
  if (isdoctor) {
    return item.p_id.fname + " " + item.p_id.lname;
  }
  return item.d_id.fname + " " + item.d_id.lname;
}

function getUserInitials(name) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name[0].toUpperCase();
}

export default function Chat() {
  const classes = useStyles();
  const [msg, setmsg] = React.useState([]);
  const [newmsg, setnewmsg] = React.useState("");
  const [editingId, setEditingId] = React.useState(null);
  const [editText, setEditText] = React.useState("");
  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const [menuMsgId, setMenuMsgId] = React.useState(null);
  const [selectMode, setSelectMode] = React.useState(false);
  const [selectedIds, setSelectedIds] = React.useState([]);
  const [showTimeId, setShowTimeId] = React.useState(null);
  const token = useSelector((state) => state.states.token);
  const isdoctor = useSelector((state) => state.states.isdoctor);
  const user = useSelector((state) => state.states.user);

  const [socket] = React.useState(io("ws://localhost:8900"));

  const [otheruser, setotheruser] = React.useState(null);
  const [otheruserid, setotheruserid] = React.useState(null);
  const [activeUser, setActiveUser] = React.useState(null);

  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(scrollToBottom, [msg]);

  React.useEffect(() => {
    socket.emit("addUser", { id: user._id });
  }, []);

  const sendMsg = () => {
    if (newmsg.length === 0) return;
    var data = {};
    if (isdoctor) {
      data = {
        d_id: user._id,
        p_id: otheruserid,
        msg: newmsg,
        patient: false,
      };
    } else {
      data = {
        p_id: user._id,
        d_id: otheruserid,
        msg: newmsg,
        patient: true,
      };
    }
    setmsg([...msg, { ...data, _id: String(Math.random()), createdAt: new Date().toISOString() }]);
    setnewmsg("");
    apt.newMessage(token, data).then((res) => {
      if (res.data.success) {
        socket.emit("sendmsg", res.data.msg);
      }
    });
  };

  React.useEffect(() => {
    const handler = (newmsg) => {
      const match = isdoctor
        ? newmsg.d_id === user._id && newmsg.p_id === otheruserid
        : newmsg.p_id === user._id && newmsg.d_id === otheruserid;
      if (match) setmsg((prev) => [...prev, newmsg]);
    };
    socket.on("newmsg", handler);
    return () => socket.off("newmsg", handler);
  }, [socket, isdoctor, user._id, otheruserid]);

  React.useEffect(() => {
    apt.get_users(token, isdoctor).then((res) => {
      if (res.data.success) {
        const chats = res.data.chats;
        if (chats.length > 0) {
          const first = chats[0];
          const firstId = isdoctor ? first.p_id._id : first.d_id._id;
          setotheruser(chats);
          setActiveUser(0);
          setotheruserid(firstId);
          apt.get_msgs(token, isdoctor, first).then((res2) => {
            if (res2.data.success) {
              setmsg(res2.data.msgs);
            }
          });
        }
      }
    });
  }, [token, isdoctor]);

  const handleUserClick = (index, item) => {
    setActiveUser(index);
    const id = isdoctor ? item.p_id._id : item.d_id._id;
    setotheruserid(id);
    apt.get_msgs(token, isdoctor, item).then((res) => {
      if (res.data.success) {
        setmsg(res.data.msgs);
      }
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMsg();
  };

  const handleDelete = (msg_id) => {
    apt.delete_msg(token, msg_id).then((res) => {
      if (res.data.success) {
        setmsg((prev) => prev.filter((m) => m._id !== msg_id));
      }
    });
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setEditText(item.msg);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const saveEdit = () => {
    if (!editText.trim()) return;
    apt.edit_msg(token, editingId, editText).then((res) => {
      if (res.data.success) {
        setmsg((prev) =>
          prev.map((m) => (m._id === editingId ? { ...m, msg: editText } : m))
        );
        setEditingId(null);
        setEditText("");
      }
    });
  };

  const toggleSelectMode = () => {
    setSelectMode((prev) => !prev);
    setSelectedIds([]);
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    apt.bulk_delete_msgs(token, selectedIds).then((res) => {
      if (res.data.success) {
        setmsg((prev) => prev.filter((m) => !selectedIds.includes(m._id)));
        setSelectedIds([]);
        setSelectMode(false);
      }
    });
  };

  const handleDeleteConversation = () => {
    if (!otheruserid) return;
    apt.delete_conversation(token, otheruserid).then((res) => {
      if (res.data.success) {
        setmsg([]);
      }
    });
  };

  const toggleTime = (id) => {
    setShowTimeId((prev) => (prev === id ? null : id));
  };

  const activeUserName = activeUser !== null && otheruser
    ? getUserName(otheruser[activeUser], isdoctor)
    : null;
  const activePhoto = activeUser !== null && otheruser
    ? getUserPhoto(otheruser[activeUser], isdoctor)
    : null;

  return (
    <div className={classes.wrapper}>
      <div className={classes.sidebar}>
        <div className={classes.sidebarHeader}>
          <Typography className={classes.sidebarTitle}>Messages</Typography>
        </div>
        <div className={classes.userList}>
          {otheruser ? (
            otheruser.map((item, index) => {
              const name = getUserName(item, isdoctor);
              const color = getAvatarColor(name);
              const photo = getUserPhoto(item, isdoctor);
              return (
                <div
                  key={index}
                  className={`${classes.userItem} ${activeUser === index ? classes.userItemActive : ""}`}
                  onClick={() => handleUserClick(index, item)}
                >
                  <Badge
                    overlap="circle"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                    color="secondary"
                  >
                    {photo ? (
                      <Avatar src={photo} style={{ width: 44, height: 44, backgroundColor: color }} />
                    ) : (
                      <Avatar style={{ width: 44, height: 44, fontWeight: 600, fontSize: 16, background: color }}>
                        {getUserInitials(name)}
                      </Avatar>
                    )}
                  </Badge>
                  <div className={classes.userInfo}>
                    <Typography className={classes.userName}>
                      {isdoctor ? name : "DR. " + name}
                    </Typography>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={classes.noChat}>No conversations yet</div>
          )}
        </div>
      </div>

      <div className={classes.mainPanel}>
        {otheruserid ? (
          <>
            <div className={classes.chatHeader}>
              {selectMode ? (
                <>
                  <IconButton size="small" onClick={toggleSelectMode} style={{ marginRight: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>Cancel</span>
                  </IconButton>
                  <Typography style={{ fontWeight: 600, fontSize: 16 }}>
                    {selectedIds.length} selected
                  </Typography>
                </>
              ) : (
                <>
                  {activePhoto ? (
                    <Avatar src={activePhoto} style={{ width: 40, height: 40, backgroundColor: activeUserName ? getAvatarColor(activeUserName) : "#bdbdbd" }} />
                  ) : (
                    <Avatar style={{ width: 40, height: 40, fontWeight: 600, fontSize: 15, background: activeUserName ? getAvatarColor(activeUserName) : "#bdbdbd" }}>
                      {activeUserName ? getUserInitials(activeUserName) : "?"}
                    </Avatar>
                  )}
                  <div className={classes.chatHeaderInfo}>
                    <Typography className={classes.chatHeaderName}>
                      {isdoctor ? activeUserName : "DR. " + (activeUserName || "")}
                    </Typography>
                  </div>
                  <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
                    <IconButton size="small" onClick={toggleSelectMode} title="Select messages">
                      <DeleteSweepIcon />
                    </IconButton>
                    <IconButton size="small" onClick={handleDeleteConversation} title="Delete conversation">
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </>
              )}
            </div>

            <div className={classes.messageArea}>
              {msg.map((item, idx) => {
                const isSent = isdoctor ? !item.patient : item.patient;
                const prevIsSent = idx > 0 ? (isdoctor ? !msg[idx - 1].patient : msg[idx - 1].patient) : null;
                const isNewGroup = idx > 0 && isSent !== prevIsSent;
                return (
                  <div
                    key={item._id}
                    className={`${classes.messageRow} ${isSent ? classes.messageRowSent : ""}`}
                    style={{ alignItems: "center" }}
                  >
                    {selectMode && (
                      <Checkbox
                        checked={selectedIds.includes(item._id)}
                        onChange={() => toggleSelect(item._id)}
                        size="small"
                      />
                    )}
                    {!selectMode && editingId !== item._id && (
                      <>
                        <IconButton
                          size="small"
                          onClick={(e) => { setMenuAnchor(e.currentTarget); setMenuMsgId(item._id); }}
                          style={{ width: 28, height: 28, opacity: 0.5, alignSelf: isSent ? "flex-end" : "flex-start" }}
                        >
                          <MoreVertIcon style={{ fontSize: 16 }} />
                        </IconButton>
                        <Menu
                          anchorEl={menuAnchor}
                          open={Boolean(menuAnchor) && menuMsgId === item._id}
                          onClose={() => { setMenuAnchor(null); setMenuMsgId(null); }}
                        >
                          {isSent && (
                            <MenuItem onClick={() => { startEdit(item); setMenuAnchor(null); setMenuMsgId(null); }}>
                              <EditIcon style={{ fontSize: 16, marginRight: 8 }} /> Edit
                            </MenuItem>
                          )}
                          <MenuItem onClick={() => { handleDelete(item._id); setMenuAnchor(null); setMenuMsgId(null); }}>
                            <DeleteIcon style={{ fontSize: 16, marginRight: 8 }} /> Delete
                          </MenuItem>
                        </Menu>
                      </>
                    )}
                    {!isSent && isNewGroup && (
                      activePhoto ? (
                        <Avatar src={activePhoto} className={classes.messageAvatar} style={{ backgroundColor: activeUserName ? getAvatarColor(activeUserName) : "#bdbdbd" }} />
                      ) : (
                        <Avatar className={classes.messageAvatar} style={{ background: activeUserName ? getAvatarColor(activeUserName) : "#bdbdbd", alignSelf: "flex-end" }}>
                          {activeUserName ? getUserInitials(activeUserName) : "?"}
                        </Avatar>
                      )
                    )}
                    {!isSent && !isNewGroup && (
                      <div className={classes.messageAvatarSpacer} />
                    )}
                    <div className={classes.messageContent}>
                      {editingId === item._id ? (
                        <div style={{ display: "flex", gap: 8 }}>
                          <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyPress={(e) => { if (e.key === "Enter") saveEdit(); }}
                            className={classes.input}
                            autoFocus
                          />
                          <IconButton size="small" onClick={saveEdit} style={{ color: "#3585da" }}>
                            <SendIcon style={{ fontSize: 18 }} />
                          </IconButton>
                          <IconButton size="small" onClick={cancelEdit} style={{ color: "#999" }}>
                            <span style={{ fontSize: 12, fontWeight: 600 }}>Cancel</span>
                          </IconButton>
                        </div>
                      ) : (
                        <>
                          <div
                            className={`${classes.messageBubble} ${
                              isSent ? classes.messageBubbleSent : classes.messageBubbleReceived
                            }`}
                            onClick={() => toggleTime(item._id)}
                            style={{ cursor: "pointer" }}
                          >
                            {item.msg}
                          </div>
                          {showTimeId === item._id && (
                            <div
                              className={`${classes.messageTime} ${
                                isSent ? classes.messageTimeSent : classes.messageTimeReceived
                              }`}
                            >
                              {formatTime(item.createdAt)}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {selectMode ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "12px 24px", borderTop: "1px solid #f0f0f0", background: "#fff", gap: 8 }}>
                <IconButton
                  onClick={handleBulkDelete}
                  disabled={selectedIds.length === 0}
                  style={{ color: selectedIds.length > 0 ? "#e53935" : "#ccc" }}
                >
                  <DeleteIcon />
                </IconButton>
                <Typography style={{ fontSize: 14, color: selectedIds.length > 0 ? "#e53935" : "#ccc", fontWeight: 600 }}>
                  Delete Selected ({selectedIds.length})
                </Typography>
              </div>
            ) : (
              <div className={classes.inputArea}>
                <input
                  className={classes.input}
                  type="text"
                  placeholder="Type a message..."
                  value={newmsg}
                  onChange={(e) => setnewmsg(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <IconButton
                  className={classes.sendButton}
                  onClick={sendMsg}
                  disabled={newmsg.length === 0}
                  size="small"
                >
                  <SendIcon style={{ fontSize: 18 }} />
                </IconButton>
              </div>
            )}
          </>
        ) : (
          <div className={classes.emptyState}>
            <div className={classes.emptyIcon}>≡ƒÆ¼</div>
            <Typography variant="h6" style={{ fontWeight: 600, color: "#1a1a2e" }}>
              Your Messages
            </Typography>
            <Typography variant="body2">
              Select a conversation to start chatting
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}
