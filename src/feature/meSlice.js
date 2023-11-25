import { createSlice } from "@reduxjs/toolkit";

const IME = {
  id: "",
  nickname: "",
  email: "",
  profileImageUrl: "",
  isLogin: false,
};

export const meSlice = createSlice({
  name: "me",
  initialState: { ...IME },
  reducers: {
    setMe: (state, { payload }) => {
      state.id = payload.id;
      state.nickname = payload.nickname;
      state.email = payload.email;
      state.profileImageUrl = payload.profileImageUrl;
      state.isLogin = true;
    },
    setProfile: (state, { payload }) => {
      state.profileImageUrl = payload.profileImageUrl;
    },
    setLogout: (state) => {
      state.id = "";
      state.nickname = "";
      state.email = "";
      state.profileImageUrl = "";
      state.isLogin = false;
    },
    setLogin: (state, { payload }) => {
      state.profileImageUrl = payload.profileImageUrl;
      state.isLogin = true;
    },
  },
});

export const { setMe, setProfile, setLogout, setLogin } = meSlice.actions;

export default meSlice.reducer;
