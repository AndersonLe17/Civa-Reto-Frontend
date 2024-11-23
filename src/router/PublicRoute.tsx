import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store/store";

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuth } = useSelector((state: RootState) => state.auth);

  return isAuth ? <Navigate to={localStorage.getItem("lastPath") || "/dashboard"} /> : children;
};
