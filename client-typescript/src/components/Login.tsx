import React, { useState } from "react";
import { useAuthStore } from "../features/login/epic";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IAuthenStore } from "../features/login/epic/interface";
import { triggerNotify } from "@/utils/messages";

interface ILogin {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Login = ({ isLogin, setIsLogin }: ILogin) => {
  const [loginEpic, signUpEpic] = useAuthStore((state: IAuthenStore) => [
    state.loginEpic,
    state.signUpEpic,
  ]);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [rePassword, setRePassword] = useState();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await loginEpic({
        email,
        password,
      });
    } else {
      if (rePassword === password) {
        await signUpEpic({
          email,
          password,
        });
      } else {
        triggerNotify('Password not match')
      }
    }
  };
  const handleCheckLogin = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div className="flex flex-col justify-center py-20">
      <div className="mx-auto w-full sm:max sm:max-w-sm">
        <div>
          <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {isLogin ? "Sign in to your account" : "Create a new account"}
          </h2>
        </div>
        <div className="flex items-center justify-center mt-4 rounded-lg shadow-md hover:bg-gray-300 hover:opacity-80 cursor-pointer">
          <div className="px-4 py-3">
            <svg className="h-6 w-6" viewBox="0 0 40 40">
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#FFC107" />
              <path
                d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                fill="#FF3D00" />
              <path
                d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                fill="#4CAF50" />
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#1976D2" />
            </svg>
          </div>
          <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">Sign in with Google</h1>
        </div>
        <div className="mt-6">
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="mb-1 block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <Input
                type="email"
                placeholder="Email"
                onChange={(e: any) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <Input
                type="password"
                onChange={(e: any) => setPassword(e.target.value)}
                required
                placeholder="Password"
              />
            </div>

            {!isLogin && (
              <div>
                <label className="mb-1 block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>
                <Input
                  type="password"
                  onChange={(e: any) => setRePassword(e.target.value)}
                  required
                  placeholder="Repassword"
                />
              </div>
            )}

            <div className="flex items-center justify-center">
              <Button variant="default">{isLogin ? "Login" : "Create account"}</Button>
            </div>
          </form>
          <div className="mt-8 text-center text-sm text-gray-500">
            {isLogin ? "Don't have an account?" : "Have an account?"}
            <span
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
              onClick={() => handleCheckLogin()}
            >
              {" "}
              {isLogin ? "Sign up" : "Login"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
