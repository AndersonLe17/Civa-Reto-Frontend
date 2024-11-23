import { RoleEnum } from "../../enums";

export interface JWTBackend {
  sub: string;
  scope: RoleEnum;
  iss: string;
  name: string;
  exp: number;
}
