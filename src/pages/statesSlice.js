import { createSlice } from "@reduxjs/toolkit";
// redux to manage states easily
export const stateSlice = createSlice({
  name: "states",
  initialState: {
    islogin: false,
    user: {},
    token: "",
    isdoctor: false,
    name: "",
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
    },
    logout: (state) => {
      state.islogin = false;
    },
    settoken: (state, action) => {
      state.token = action.payload;
    },
    setuser: (state, action) => {
      state.user = action.payload;
      state.name = action.payload.fname + " " + action.payload.lname;
    },
    setdoctortrue: (state) => {
      state.isdoctor = true;
    },
    setdoctorfalse: (state) => {
      state.isdoctor = false;
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
