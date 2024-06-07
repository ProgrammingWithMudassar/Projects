'use client'
import { Fragment, useEffect, useState } from "react";
import Wrapper from "@/components/shared/Wrapper";
import EmailVerifier from "@/components/ForgetPassword/EmailVerifier";
import OtpVerifier from '@/components/ForgetPassword/OtpVerifier'
import PasswordVerifier from "@/components/ForgetPassword/PasswordVerifier";
import { useRouter, useSearchParams } from "next/navigation";
import { parseCookies } from "nookies";

const RecoverPassword = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const user_type = searchParams.get('user_type');
    const [step, setStep] = useState<number>(1);

    const stepActionHandler = (data: number) => {
        if (data === 4) {
            router.push("/konnector/explore");
        }
        else {
            setStep(data);
        }
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

    return (
        <Fragment>
            <Wrapper
                id="Login_Konnector"
                outerContainerStyle="lg:h-[calc(100vh+90px)] h-screen bg-[url('/Login/bg.png')] bg-center bg-cover bg-no-repeat bg-white-600 md:mt-[-95px] mt-[-60px]"
                innerContainerStyle="flex justify-center items-center"
            >
                <div className="lg:w-[50%] w-[80%] backdrop:flex justify-center items-start flex-col">
                    <div className="flex justify-center items-center flex-col">
                        <h1 className="text-black-500 md:text-[56px] text-[30px] md:leading-[70px] leading-[40px] font-semibold">
                            Forget Password
                        </h1>
                        <p className="text-black-300 md:text-[20px] text-[14px] text-center mt-6">
                            {step === 1 ? "Enter your email." : step === 2 ? "Enter the 6-digit code you received." : "Enter your new password and confirm it."}
                        </p>
                        <div className="md:mt-8 mt-4 md:w-[70%] w-full">
                            {step === 1 && (
                                <EmailVerifier onStepChange={stepActionHandler} user_type={user_type} />
                            )}
                            {step === 2 && (
                                <OtpVerifier onStepChange={stepActionHandler} user_type={user_type} />
                            )}
                            {step === 3 && (
                                <PasswordVerifier onStepChange={stepActionHandler} user_type={user_type} />
                            )}
                        </div>
                    </div>
                </div>
            </Wrapper>
        </Fragment>
    );
};

export default RecoverPassword;
