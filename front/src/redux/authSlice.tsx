// src/redux/authSlice.tsx
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    token: string | null;
    user: any | null;
}

const initialState: AuthState = {
    token: null,
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
