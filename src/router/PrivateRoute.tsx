import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { tokenDecode } from "../utils";
import { JWTBackend } from "../dashboard/domain/interfaces/auth";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuth, jwt } = useSelector((state: RootState) => state.auth);
  const [, setCookie, remove] = useCookies();
  const { pathname, search } = useLocation();

  const lastPath = `${pathname}${search}`;
  localStorage.setItem("lastPath", lastPath);
  useEffect(
    () =>
      jwt
        ? setCookie("token", jwt, {
            expires: new Date(tokenDecode<JWTBackend>(jwt).exp * 1000),
            path: "/",
          })
        : remove("jwt"),
    [jwt]
  );

  return isAuth ? children : <Navigate to="/auth/login" />;
};
