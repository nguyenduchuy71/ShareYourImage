import React, { useState } from "react";
import { useAuthStore } from "@/features/login/epic";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IAuthenStore } from "@/features/login/epic/interface";
import { triggerNotify } from "@/utils/messages";
import ForgetPassword from "@/components/ForgetPassword";
import logo from '@/assets/img/logo.png'
import { ImageItem } from "./ImageItem";

interface ILogin {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Login = ({ isLogin, setIsLogin }: ILogin) => {
  const [loginEpic, signUpEpic] = useAuthStore((state: IAuthenStore) => [
    state.loginEpic,
    state.signUpEpic,
  ]);
  const [open, setOpen] = useState(false);
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
    <div className="h-screen flex flex-col justify-center items-center px-6">
      <div className="w-[400px] sm:max sm:max-w-sm border-2 border-[#ABF600] px-4 rounded-md ">
        <div className="flex flex-col items-center">
          <ImageItem imageSrc={logo} imageAlt='logo' customStyle="object-cover w-28 h-28 rounded-full bg-none md:bg-[#1D1D1D]" />
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight">
            {isLogin ? "Login" : "Create an account"}
          </h2>
        </div>
        <div className="my-2">
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <p className="mb-1 block text-sm font-medium leading-6">
                Username
              </p>
              <Input
                type="email"
                placeholder="Email"
                onChange={(e: any) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <p className="mb-1 block text-sm font-medium leading-6">
                Password
              </p>
              <Input
                type="password"
                onChange={(e: any) => setPassword(e.target.value)}
                required
                placeholder="Password"
              />
              {isLogin && <React.Fragment>
                <p className="text-[#ABF600] mt-1 text-sm text-right cursor-pointer font-semibold hover:underline" onClick={() => setOpen(true)}>Forget password?</p>
                <ForgetPassword open={open} setOpen={setOpen} />
              </React.Fragment>}
            </div>

            {!isLogin && (
              <div>
                <p className="mb-1 block text-sm font-medium leading-6">
                  Confirm Password
                </p>
                <Input
                  type="password"
                  onChange={(e: any) => setRePassword(e.target.value)}
                  required
                  placeholder="Repassword"
                />
              </div>
            )}

            <div className="flex items-center justify-center">
              <Button className="bg-[#ABF600] text-black font-bold hover:text-white hover:border-2 border-[#ABF600]">{isLogin ? "Login" : "Create account"}</Button>
            </div>
          </form>
          <div className="mt-2 text-center text-sm text-white">
            {isLogin ? "Don't have an account?" : "Have an account?"}
            <span
              className="font-semibold leading-6 cursor-pointer hover:underline"
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
