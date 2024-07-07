import { useEffect, useState } from "react";
import { Login } from "../../components/Login";
import { useAuthStore } from "./epic";
import { IAuthenStore } from "./epic/interface";

function SignInScreen() {
  const [authToken] = useAuthStore((state: IAuthenStore) => [state.authToken]);
  const [isLogin, setIsLogin] = useState(true);
  useEffect(() => {
    if (authToken) {
      window.location.href = "/";
    }
    if (window.location.href.includes("signup")) {
      setIsLogin(false);
    }
  }, []);
  return <Login isLogin={isLogin} setIsLogin={setIsLogin} />;
}

export default SignInScreen;
