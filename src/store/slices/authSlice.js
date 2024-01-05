import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, ForgotPasswordAction, ResetPasswordAction, userUpdate } from "../actions/auth";

const initialState = {
    loading: false,
    userToken: null,
    error: null,
    success: false,
    refresh: false,
    isloading: false,
    isuserToken: null,
    iserror: null,
    issuccess: false,
    isrefresh: false,
    ForgotPassword: false,
    ForgotPasswordpending: false,
    ResetPassword: false,
    userupdated: false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        Logout: (state) => {
            state.isuserToken = null;
            state.issuccess = false;
            state.success = false;
            state.isrefresh = true;
            localStorage.clear();
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state, { payload }) => {
            state.loading = true;
            state.error = null;
            state.isrefresh = false;
            state.success = false;
            state.isuserToken = null;
        })

        builder.addCase(registerUser.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.isrefresh = false;
            state.userInfo = payload;
            state.userToken = payload.token;
            state.isuserToken = null;
        })

        builder.addCase(registerUser.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.success = false;
            state.isrefresh = false;
            state.isuserToken = null;
        })

        builder.addCase(loginUser.pending, (state, { payload }) => {
            state.isloading = true;
            state.iserror = null;
            state.issuccess = false;
            state.loading = false;
            state.success = false;
            state.error = null;
            state.isrefresh = false;
            state.isuserToken = null;
        })

        builder.addCase(loginUser.fulfilled, (state, { payload }) => {
            state.isloading = false;
            state.issuccess = true;
            state.iserror = null;
            state.isuserInfo = payload;
            state.isuserToken = payload.token;
            state.loading = false;
            state.success = false;
            state.error = null;
            state.isrefresh = false;
        })

        builder.addCase(loginUser.rejected, (state, { payload }) => {
            state.isloading = false;
            state.iserror = payload;
            state.issuccess = false;
            state.loading = false;
            state.success = false;
            state.error = null;
            state.isrefresh = false;
            state.isuserToken = null;
        })

        builder.addCase(ForgotPasswordAction.pending, (state, { payload }) => {
            state.ForgotPassword = false;
            state.ForgotPasswordpending = true;
        })

        builder.addCase(ForgotPasswordAction.fulfilled, (state, { payload }) => {
            state.ForgotPassword = true;
            state.ForgotPasswordpending = false;
        })

        builder.addCase(ForgotPasswordAction.rejected, (state, { payload }) => {
            state.ForgotPassword = false;
            state.ForgotPasswordpending = false;
        })

        builder.addCase(ResetPasswordAction.pending, (state, { payload }) => {
            state.ResetPassword = false;
        })

        builder.addCase(ResetPasswordAction.fulfilled, (state, { payload }) => {
            state.ResetPassword = true;
        })

        builder.addCase(ResetPasswordAction.rejected, (state, { payload }) => {
            state.ResetPassword = false;
        })

        builder.addCase(userUpdate.pending, (state, { payload }) => {
            state.userupdated = false;
        })

        builder.addCase(userUpdate.fulfilled, (state, { payload }) => {
            state.userupdated = true;
        })

        builder.addCase(userUpdate.rejected, (state, { payload }) => {
            state.userupdated = false;
        })
    }
});

export default authSlice.reducer;
export const { Logout } = authSlice.actions;
