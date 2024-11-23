import { RoleEnum } from "../../dashboard/domain/enums";

export interface AuthState {
  isAuth: boolean;
  errorMsg: string | null;
  isLoading: boolean;
  userData: {
    usuNomCom: string;
    usuNom: string;
    usuPer: RoleEnum;
  } | null;
  jwt: string | undefined;
}
