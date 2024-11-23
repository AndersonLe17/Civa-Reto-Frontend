import { jwtDecode } from "jwt-decode";

export const tokenDecode = <T>(token: string): T => {
  const createDecode: T = jwtDecode(token);
  return createDecode;
};
