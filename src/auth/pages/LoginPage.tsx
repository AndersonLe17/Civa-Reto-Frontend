import { useSelector } from "react-redux";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { RootState } from "../../store";
import { useLogin } from "../hooks";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { AlertCircle } from "lucide-react";

export const LoginPage = () => {
  const { errorMsg } = useSelector((state: RootState) => state.auth);

  const { username, password, submitHandler, onInputChange } = useLogin({
    username: "",
    password: "",
  });

  return (
    <div className="overflow-hidden bg-background shadow">
      <div className="container relative grid h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900"></div>
          <div className="relative z-20 flex items-center">
            <img className="w-40" src="/civa-logo.png" alt="Civa" />
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">“Desarrollado con React 18 + shadcn/ui”</p>
              <footer className="text-sm">AndersonLe</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-4xl font-semibold tracking-tight">Login</h1>
              <p className="text-base text-muted-foreground">
                Ingrese sus credenciales para iniciar sesión
              </p>
            </div>

            <div className="grid gap-6">
              <form onSubmit={submitHandler}>
                <div className="grid gap-5">
                  <div className="grid gap-2">
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      value={username}
                      onChange={onInputChange}
                      placeholder="Username"
                    />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={onInputChange}
                      placeholder="Password"
                    />
                  </div>
                  <Button type="submit">Login</Button>
                </div>
              </form>
            </div>
            {errorMsg && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Alerta</AlertTitle>
                <AlertDescription>{errorMsg}</AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
