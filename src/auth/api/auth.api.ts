import { Cookies } from "react-cookie";
import { axiosLogin } from "../../config";
import { tokenDecode } from "../../utils";
import { JWTBackend } from "../../dashboard/domain/interfaces/auth";

export const authApi = async (): Promise<boolean> => {
  const res = await axiosLogin
    .post("/auth")
    .then((res) => res.data)
    .catch((err) => err.response.data);

  if (res.code !== 200) return false;
  const cookies = new Cookies(null, {
    expires: new Date(tokenDecode<JWTBackend>(res.payload).exp * 1000),
    path: "/",
  });
  cookies.set("token", res.payload);

  return true;
};
