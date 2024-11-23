import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../../../utils/cookie.util";
import { tokenDecode } from "../../../utils";
import { authApi } from "../../../auth/api/auth.api";
import { JWTBackend } from "../../../dashboard/domain/interfaces/auth";
import { AuthState } from "../../states/auth.state";

const initialState: AuthState = {
  isAuth: getCookie("token") === undefined ? await authApi() : true,
  errorMsg: null,
  isLoading: false,
  userData:
    getCookie("token") !== undefined
      ? {
          usuNomCom: tokenDecode<JWTBackend>(getCookie("token")!).name,
          usuNom: tokenDecode<JWTBackend>(getCookie("token")!).sub,
          usuPer: tokenDecode<JWTBackend>(getCookie("token")!).scope,
        }
      : null,
  jwt: getCookie("token"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    setErrorMsg: (state, action) => {
      state.errorMsg = action.payload;
      state.isLoading = false;
    },
    setAuthLogin: (state, action) => {
      state.isLoading = false;
      state.isAuth = true;
      state.userData = action.payload.userData;
      state.jwt = action.payload.token;
    },
    setAuthLogout: (state) => {
      state.isLoading = false;
      state.isAuth = false;
      state.userData = null;
      state.jwt = undefined;
    },
  },
});

export const { startLoading, setErrorMsg, setAuthLogin, setAuthLogout } = authSlice.actions;
