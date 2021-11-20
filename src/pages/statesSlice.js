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
  },
  reducers: {
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
} = stateSlice.actions;

export default stateSlice.reducer;
