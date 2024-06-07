'use client'
import React, { useState, useEffect } from "react"; // Import useState
import OTPInput from "react-otp-input";
import InputField from "@/components/shared/InputField";
import Button from "@/components/shared/Button";
import Link from "next/link";
import { useVerifyOTPMutation } from "@/Redux/RTK_API/Auth_Api";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { toast } from 'react-toastify';
import RingLoader from "react-spinners/RingLoader";
import { BsArrowRight } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useSelector } from 'react-redux';
import { RootState } from "@/Redux/Store/Store";

type Props = {
  onStepChange: (step: number) => void;
  user_type: string | null
}

const EmailVerifier = ({ onStepChange, user_type }: Props) => {
  // states 
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const [countdown, setCountdown] = useState(600)

  // useEffect 
  useEffect(() => {
    const timer = setInterval(() => { setCountdown((prevCountdown) => prevCountdown - 1); }, 1000);
    if (countdown <= 0) { window.location.reload(); clearInterval(timer); }
    return () => clearInterval(timer);
  }, [countdown, router]);
  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  // Redux state 
  interface CounterState {
    userID: number;
    userType: string;
  }
  const counterState: CounterState = useSelector((state: RootState) => state.counter);
  const ID = counterState.userID;
  const Type = counterState.userType;

  // Query 
  const [postVerifyOTP] = useVerifyOTPMutation();
  type ApiResponse = {
    data?: any;
    error?: { status?: any } & (FetchBaseQueryError | SerializedError);
    status?: any;
  };

  const handleSubmit = async () => {
    const stepNumber = 3;
    setIsLoading(true);
    const formData = {
      otp: otp,
      user_type: Type,
      user_id: ID
    }
    const response: ApiResponse = await postVerifyOTP(formData);


    if (response.error && response.error.status === 500) {
      return toast.error("Server is busy", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
    }
    if (response.error && response.error.status === 404) {
      return toast.error("Please enter correct mail.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
    }

    setIsLoading(false);
    onStepChange(stepNumber);
  };


  return (
    <div>

      <form onSubmit={handleSubmit}>
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props) => (
            <input
              {...props}
              style={{
                width: "50px",
                height: "50px",
                margin: "auto",
                textAlign: "center",
              }}
            />
          )}
        />
        <div className="w-full flex justify-between items-center mt-2">
          <div className="text-center text-lg text-gray-600 ml-3">
            {minutes >= 0 ? `Time remaining: ${minutes}:${seconds < 10 ? `0${seconds}` : seconds}` : null}
          </div>
        </div>
        <Button text="Submit" disabled={isLoading} icon={!isLoading ? <BsArrowRight className="text-2xl text-white-600 rounded-full" /> : <RingLoader color={"#FFFFFF"} loading={true} size={30} />} type="submit" onClick={handleSubmit} style="bg-brand-primary text-[14px] h-[40px] mx-auto mt-4" />
      </form>
    </div>
  );
};

export default EmailVerifier;
