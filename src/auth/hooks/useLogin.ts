import { useAppDispatch } from "../../store/hook";
import { AuthData, authLogin } from "../../store/slices/auth";
import { useForm } from "./useForm";

export const useLogin = (authData: AuthData) => {
  const dispatch = useAppDispatch();
  const { onInputChange, formState } = useForm(authData);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(authLogin(formState));
  };

  return {
    ...formState,
    onInputChange,
    submitHandler,
  };
};
