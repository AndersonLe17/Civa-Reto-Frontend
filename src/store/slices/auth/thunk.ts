import { axiosLogin } from "../../../config";
import { JWTBackend } from "../../../dashboard/domain/interfaces/auth";
import { tokenDecode } from "../../../utils";
import { AppDispatch, RootState } from "../../store";
import {
  setAuthLogin,
  setAuthLogout,
  setErrorMsg,
  startLoading,
} from "./auth.slice";

export type AuthData = {
  username: string;
  password: string;
};

export const authLogin = (authData: AuthData) => {
  return async (dispatch: AppDispatch, _getState: () => RootState) => {
    dispatch(startLoading());
    // TODO: realizar peticion http
    const res = await axiosLogin
      .post("/login", undefined, {
        auth: { username: authData.username, password: authData.password },
      })
      .then((res) => res.data)
      .catch((err) => err.response.data);

    if (res.code === 401) {
      dispatch(setErrorMsg(res.errors[0].msg));
      return;
    }
    const { jwt } = res.payload;
    const { sub, name, scope }: JWTBackend = tokenDecode<JWTBackend>(jwt);
    dispatch(
      setAuthLogin({
        userData: {
          usuNomCom: name,
          usuNom: sub,
          usuPer: scope,
        },
        token: jwt,
      })
    );
  };
};

export const authLogout = () => {
  return async (dispatch: AppDispatch, _getState: () => RootState) => {
    dispatch(startLoading());
    // TODO: realizar peticion http
    axiosLogin.post("/auth/logout");
    dispatch(setAuthLogout());
  };
};
