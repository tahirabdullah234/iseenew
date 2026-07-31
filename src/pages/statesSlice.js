import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "isee_auth";

const loadAuth = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return stored && typeof stored === "object" ? stored : {};
  } catch (err) {
    return {};
  }
};

const savedAuth = loadAuth();

const saveAuth = (state) => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        islogin: state.islogin,
        isdoctor: state.isdoctor,
        user: state.user,
        name: state.name,
        token: state.token,
      })
    );
  } catch (err) {
    // ignore storage errors (e.g. private mode)
  }
};

// redux to manage states easily
export const stateSlice = createSlice({
  name: "states",
  initialState: {
    islogin: savedAuth.islogin || false,
    user: savedAuth.user || {},
    token: savedAuth.token || "",
    isdoctor: savedAuth.isdoctor || false,
    name: savedAuth.name || "",
    data: null,
    doctors: null,
    requesteddocs: [],
    recieved_requests: null,
    appointments: null,
    msg: null,
  },
  reducers: {
    setrecivedreq: (state, action) => {
      state.recieved_requests = action.payload;
    },
    setappointments: (state, action) => {
      state.appointments = action.payload;
    },
    login: (state) => {
      state.islogin = true;
      saveAuth(state);
    },
    logout: (state) => {
      state.islogin = false;
      state.isdoctor = false;
      state.user = {};
      state.token = "";
      state.name = "";
      state.data = null;
      localStorage.removeItem(STORAGE_KEY);
    },
    settoken: (state, action) => {
      state.token = action.payload;
      saveAuth(state);
    },
    setuser: (state, action) => {
      state.user = action.payload;
      state.name = action.payload.fname + " " + action.payload.lname;
      saveAuth(state);
    },
    setphoto: (state, action) => {
      state.user.photo = action.payload;
      saveAuth(state);
    },
    setdoctortrue: (state) => {
      state.isdoctor = true;
      saveAuth(state);
    },
    setdoctorfalse: (state) => {
      state.isdoctor = false;
      saveAuth(state);
    },
    setdata: (state, action) => {
      state.data = action.payload;
    },
    setrequesteddoc: (state, action) => {
      state.requesteddocs = action.payload;
    },
    setdoctors: (state, action) => {
      state.doctors = action.payload;
    },
    setmsg: (state, action) => {
      state.msg = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  login,
  logout,
  settoken,
  setuser,
  setphoto,
  setdoctortrue,
  setdoctorfalse,
  setdata,
  setrequesteddoc,
  setdoctors,
  setrecivedreq,
  setappointments,
  setmsg,
} = stateSlice.actions;

export default stateSlice.reducer;
