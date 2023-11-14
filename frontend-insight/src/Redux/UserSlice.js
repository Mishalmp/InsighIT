import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userinfo: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userinfo = action.payload.userinfo;
    },
    LogoutDetails: (state, action) => {
      state.userinfo = {};
    },
    setUpdateInfo:(state,action)=>{
        state.userinfo={
            ...state.userinfo,
            ...action.payload.updatedData.userinfo
        }
    }
  },
});

export const { setUserInfo, LogoutDetails,setUpdateInfo } = userSlice.actions;
export default userSlice.reducer;
