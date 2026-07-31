import React from "react";
import "./style.css";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import { useSelector } from "react-redux";
import * as tipsService from "../Services/tips";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  DialogBox: {
    width: "100%",
    borderRadius: 16,
    background: "#fff",
    boxShadow: "0 8px 24px rgba(16, 97, 176, 0.08)",
    padding: "28px 32px",
    boxSizing: "border-box",
    "@media (max-width: 600px)": {
      padding: "20px 16px",
    },
  },
  pageTitle: {
    fontFamily: "Montserrat",
    fontWeight: 700,
    fontSize: 26,
    color: "#3585da",
  },
  pageSubtitle: {
    fontFamily: "Montserrat",
    fontSize: 14,
    color: "#8e9bb0",
    marginTop: 4,
    marginBottom: 24,
  },
  sectionTitle: {
    display: "flex",
    alignItems: "center",
    fontFamily: "Montserrat",
    fontWeight: 700,
    fontSize: 18,
    color: "#3585da",
    marginBottom: 16,
  },
  sectionBar: {
    display: "inline-block",
    width: 5,
    height: 20,
    borderRadius: 3,
    background: "linear-gradient(45deg, #3585da 0%, #59c1e8 100%)",
    marginRight: 10,
  },
  card: {
    width: "100%",
    height: "100%",
    borderRadius: 14,
    background: "#fff",
    border: "1px solid #eef1f6",
    boxShadow: "0 4px 16px rgba(16, 97, 176, 0.08)",
    padding: "24px",
    boxSizing: "border-box",
    "@media (max-width: 600px)": {
      padding: "16px",
    },
  },
  field: {
    width: "100%",
    marginBottom: 16,
  },
  inputRoot: {
    fontFamily: "Montserrat",
  },
  button: {
    borderRadius: 10,
    background: "linear-gradient(45deg, #3585da 0%, #59c1e8 100%)",
    boxShadow: "0 6px 18px rgba(53, 133, 218, 0.35)",
    color: "#fff",
    fontWeight: 700,
    fontFamily: "Montserrat",
    letterSpacing: 1,
    textTransform: "none",
    "&:hover": {
      background: "linear-gradient(45deg, #2b74c4 0%, #49a9d6 100%)",
    },
  },
  tipCard: {
    padding: "20px 24px",
    borderRadius: 16,
    background: "linear-gradient(135deg, #f0f7ff 0%, #e3f1fb 100%)",
    boxShadow: "0 4px 12px rgba(53, 133, 218, 0.12)",
    boxSizing: "border-box",
    height: "100%",
  },
  tipCategory: {
    fontFamily: "Montserrat",
    fontWeight: 700,
    fontSize: 18,
    color: "#1061B0",
    marginBottom: 12,
  },
  tipTitle: {
    fontFamily: "Montserrat",
    fontWeight: 600,
    fontSize: 16,
    color: "#1d3557",
  },
  tipText: {
    fontFamily: "Montserrat",
    fontSize: 15,
    color: "#4a6a8a",
    marginTop: 4,
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    padding: 24,
  },
}));

export function TipManagement() {
  const classes = useStyles();
  const token = useSelector((state) => state.states.token);
  const [categories, setCategories] = React.useState(null);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    msg: "",
    type: "",
  });
  const [catName, setCatName] = React.useState("");
  const [tip, setTip] = React.useState({ cat_id: "", title: "", text: "" });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ ...snackbar, open: false });
  };

  const loadTips = React.useCallback(() => {
    tipsService.get_tips().then((res) => {
      if (res.data.success) setCategories(res.data.categories);
      else setCategories([]);
    });
  }, []);

  React.useEffect(() => {
    loadTips();
  }, [loadTips]);

  const handleAddCategory = () => {
    if (!catName.trim()) {
      setSnackbar({ open: true, msg: "Please enter a category name", type: "warning" });
      return;
    }
    tipsService.add_tip_category(catName.trim()).then((res) => {
      setSnackbar({
        open: true,
        msg: res.data.message || (res.data.success ? "Category Added" : "Failed"),
        type: res.data.success ? "success" : "error",
      });
      if (res.data.success) {
        setCatName("");
        loadTips();
      }
    });
  };

  const handleAddTip = () => {
    if (!tip.cat_id || !tip.title.trim() || !tip.text.trim()) {
      setSnackbar({ open: true, msg: "Please fill all tip fields", type: "warning" });
      return;
    }
    tipsService.add_tip_detail(token, {
      id: tip.cat_id,
      title: tip.title.trim(),
      text: tip.text.trim(),
    }).then((res) => {
      setSnackbar({
        open: true,
        msg: res.data.message || (res.data.success ? "Tip Added" : "Failed"),
        type: res.data.success ? "success" : "error",
      });
      if (res.data.success) {
        setTip({ cat_id: "", title: "", text: "" });
        loadTips();
      }
    });
  };

  return (
    <div className="dashdiv">
      <Grid item xs={12} className={classes.DialogBox}>
        <Typography className={classes.pageTitle}>
          MANAGE HEALTH TIPS
        </Typography>
        <Typography className={classes.pageSubtitle}>
          Create tip categories and add health tips for your patients.
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <div className={classes.card}>
              <Typography className={classes.sectionTitle}>
                <span className={classes.sectionBar} />
                Add Category
              </Typography>
              <TextField
                label="Category Name"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                InputProps={{ classes: { input: classes.inputRoot } }}
                className={classes.field}
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddCategory()}
              />
              <Button
                className={classes.button}
                variant="contained"
                disableElevation
                fullWidth
                onClick={handleAddCategory}
              >
                ADD CATEGORY
              </Button>
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <div className={classes.card}>
              <Typography className={classes.sectionTitle}>
                <span className={classes.sectionBar} />
                Add Tip
              </Typography>
              <TextField
                select
                label="Category"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                InputProps={{ classes: { input: classes.inputRoot } }}
                className={classes.field}
                value={tip.cat_id}
                onChange={(e) => setTip({ ...tip, cat_id: e.target.value })}
              >
                {categories && categories.length > 0 ? (
                  categories.map((cat) => (
                    <MenuItem key={cat._id} value={cat._id}>
                      {cat.category}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="" disabled>
                    No categories available
                  </MenuItem>
                )}
              </TextField>
              <TextField
                label="Tip Title"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                InputProps={{ classes: { input: classes.inputRoot } }}
                className={classes.field}
                value={tip.title}
                onChange={(e) => setTip({ ...tip, title: e.target.value })}
              />
              <TextField
                label="Tip Description"
                variant="outlined"
                multiline
                rows={3}
                InputLabelProps={{ shrink: true }}
                InputProps={{ classes: { input: classes.inputRoot } }}
                className={classes.field}
                value={tip.text}
                onChange={(e) => setTip({ ...tip, text: e.target.value })}
              />
              <Button
                className={classes.button}
                variant="contained"
                disableElevation
                fullWidth
                onClick={handleAddTip}
              >
                ADD TIP
              </Button>
            </div>
          </Grid>

          <Grid item xs={12}>
            <div className={classes.card}>
              <Typography className={classes.sectionTitle}>
                <span className={classes.sectionBar} />
                Existing Tips
              </Typography>
              {categories === null ? (
                <div className={classes.loader}>
                  <CircularProgress style={{ color: "#3585da" }} />
                </div>
              ) : categories.length > 0 ? (
                <Grid container spacing={3}>
                  {categories.map((cat) => (
                    <Grid item xs={12} md={6} lg={4} key={cat._id}>
                      <div className={classes.tipCard}>
                        <Typography className={classes.tipCategory}>
                          {cat.category}
                        </Typography>
                        {cat.tips && cat.tips.length > 0 ? (
                          cat.tips.map((tipItem) => (
                            <Box key={tipItem._id} mb={2}>
                              <Typography className={classes.tipTitle}>
                                {tipItem.title}
                              </Typography>
                              <Typography className={classes.tipText}>
                                {tipItem.text}
                              </Typography>
                            </Box>
                          ))
                        ) : (
                          <Typography className={classes.tipText}>
                            No tips added yet
                          </Typography>
                        )}
                      </div>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography className={classes.tipText}>
                  No tip categories available yet.
                </Typography>
              )}
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert severity={snackbar.type}>{snackbar.msg}</Alert>
      </Snackbar>
    </div>
  );
}
