"use client"
import { Fragment, useState, FormEvent, useEffect } from "react";
import Wrapper from "@/components/shared/Wrapper";
import Button from "@/components/shared/Button";
import { ILogin } from "@/types/types";
import { useRouter } from "next/navigation";
import InputField from "@/components/shared/InputField";
import Link from "next/link";
import { useLoginMutation } from "@/Redux/RTK_API/Auth_Api";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { toast } from 'react-toastify';
import RingLoader from "react-spinners/RingLoader";
import { BsArrowRight } from "react-icons/bs";
import { setCookie } from 'nookies';
import { useAuth } from "@/hooks/useAuth";
import { parseCookies } from "nookies";
import { useSearchParams } from 'next/navigation'


const Login = () => {
  const searchParams = useSearchParams();
  const user_type = searchParams.get('user_type');
  const { setUser, setToken } = useAuth()
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState<ILogin>({ email: "", password: "" });

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
  };

  // Query 
  const [postLogin] = useLoginMutation();
  type ApiResponse = {
    data?: any;
    error?: { status?: any } & (FetchBaseQueryError | SerializedError);
    status?: any;
  };

  useEffect(() => {
    if (!user_type) return router.replace("/")
    const cookies = parseCookies();
    const token = cookies.accessToken;
    const user = JSON.parse(cookies.userData || "{}");
    if (token && user) {
      return router.push("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const response: ApiResponse = await postLogin({ input, user_type });
    if (response.error && response.error.status === 500) { setIsLoading(false); return toast.error("Server is busy", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true }) }
    if (response.error && response.error.status === 403) { setIsLoading(false); return toast.error("Verification failed, Contact to Konnect.io support.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true }) }
    if (response.error && response.error.status === 401) { setIsLoading(false); return toast.info("Please check your mailbox or spam for verification.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true }) }
    if (response.error && response.error.status === 404) { setIsLoading(false); return toast.error("Email not exist.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true }) }
    if (response.error && response.error.status === 400) { setIsLoading(false); return toast.error("Incorrect password.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true }) }
    const AuthUser = response.data;
    const currentTime = Math.floor(Date.now() / 1000);
    const expiryTime = Math.floor(new Date(AuthUser?.expiry_at).getTime() / 1000);
    const maxAge = expiryTime - currentTime;

    // Save data into cookies using nookies
    setCookie(null, 'accessToken', AuthUser.accessToken, { maxAge, path: '/' });
    setCookie(null, 'userData', JSON.stringify(AuthUser.user), { maxAge, path: '/' });
    setToken(AuthUser.accessToken);
    setUser(AuthUser.user)
    if (AuthUser?.user?.role === "konnector")
      return router.push('/konnector/explore')
    else if (AuthUser?.user?.role === "vendor") {
      if (!AuthUser?.user?.subscriptionStatus)
        return router.push("/subscription");
      return router.push('/vendor/dashboard')
    }
    else if (AuthUser?.user?.role === "admin")
      return router.push('/admin/vendor')
    else return router.push('/internal/konnects')
  };


  return (
    <Fragment>
      <Wrapper
        id="Login_Konnector"
        outerContainerStyle="lg:h-[calc(100vh+90px)] h-screen bg-[url('/Login/bg.png')] bg-center bg-cover bg-no-repeat bg-white-600 md:mt-[-95px] mt-[-60px]"
        innerContainerStyle="flex justify-center items-center"
      >
        <div className=" flex justify-center items-center flex-col">
          <h1 className="text-black-500 md:text-[56px] text-[30px] md:leading-[70px] leading-[40px] font-semibold">Welcome back</h1>
          <p className="text-black-300 md:text-[20px] text-[14px] text-center my-6">Login or sign up to start Konnecting.</p>
          <form className="w-full flex justify-start items-start flex-col gap-2" onSubmit={login}>
            <InputField
              onChange={inputHandler}
              value={input.email}
              label="Email*"
              name={"email"}
              type={'text'}
              required
              labelStyle="text-brand-primary font-medium"
              inputStyle="w-full"
            />
            <div className="w-full relative flex items-center">
              <InputField
                onChange={inputHandler}
                value={input.password}
                label="Password*"
                name={"password"}
                type={showPassword ? 'text' : 'password'}
                required
                labelStyle="text-brand-primary font-medium"
                inputStyle="w-full"
              /><div className="mt-7 absolute right-3 opacity-50 cursor-pointer" onClick={handleTogglePassword}>
                {showPassword ? <AiOutlineEyeInvisible size={25} /> : <AiOutlineEye size={25} />}
              </div>
            </div>
            <div className="w-full flex justify-between items-center mt-2" >
              <Link href={"/register/konnector"} className="text-[14px] text-black-300/80 hover:text-black-300" >
                Have an account? <span className="font-medium" >Sign Up</span>
              </Link>
              <Link href={`/auth/forgetpassword/?user_type=${user_type}`} className="text-[14px] text-black-300/80 hover:text-black-300 font-medium" >
                Forget password
              </Link>
            </div>
            <Button text="Get Konnected" disabled={isLoading} icon={!isLoading ? <BsArrowRight className="text-2xl text-white-600 rounded-full" /> : <RingLoader color={"#FFFFFF"} loading={true} size={30} />} type="submit" onClick={function (): void { }} style="bg-brand-primary text-[14px] h-[40px] mx-auto mt-4" />
          </form>
        </div>
      </Wrapper>
    </Fragment>
  );
};

export default Login;
