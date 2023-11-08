import { createSlice } from "@reduxjs/toolkit";

const IME = {
    id: "",
    nickname: "",
    email: "",
    profileImageUrl: "",
    isLogin: false

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
        },
        setLogin: (state, { payload }) => {

            state.isLogin = payload
        },
        setLogout: (state) => {
            state.id = '';
            state.nickname = '';
            state.email = '';
            state.profileImageUrl = '';
            state.isLogin = false
        }
    },
});

export const { setMe, setLogin, setLogout } = meSlice.actions;

export default meSlice.reducer;