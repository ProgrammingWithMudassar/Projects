'use client'
import React, { useState, ChangeEvent } from "react";
import InputField from "@/components/shared/InputField";
import Button from "@/components/shared/Button";
import Link from "next/link";
import FormIkInput from "@/components/shared/FormikInput";
import { EmailVerify } from '@/types/types'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useEmailOTPMutation } from "@/Redux/RTK_API/Auth_Api";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import RingLoader from "react-spinners/RingLoader";
import { BsArrowRight } from "react-icons/bs";



type Props = {
  onStepChange: (step: number) => void;
  user_type: string | null
}

const EmailVerifier = ({ onStepChange, user_type }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const initialValues: EmailVerify = { email: "" };
  const validationSchema = Yup.object().shape({ email: Yup.string().required('Email is required') })

  // Query 
  const [postEmailOTP] = useEmailOTPMutation();
  type ApiResponse = {
    data?: any;
    error?: { status?: any } & (FetchBaseQueryError | SerializedError);
    status?: any;
  };

  const handleSubmit = async (values: EmailVerify, { setSubmitting }: any) => {
    const stepNumber = 2;
    setIsLoading(true);
    const formData = { ...values, user_type };
    const response: ApiResponse = await postEmailOTP(formData);


    if (response.error && response.error.status === 500) {
      setIsLoading(false);
      return toast.error("Server is busy", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
    }
    if (response.error && response.error.status === 404) {
      setIsLoading(false);
      return toast.error("Please enter correct mail.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
    }
    setIsLoading(false);
    const userData = {
      ID: parseInt(response.data.user_id),
      Type: response.data.user_Type,
    };
    onStepChange(stepNumber);
  };



  return (
    <div>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} >
        {({ isSubmitting }) => (
          <Form>
            <FormIkInput label="Email" type="email" id="email" name="email" inputStyle="border p-2" labelStyle="text-brand-primary font-medium" mendatory={true} />
            <div className="w-full flex justify-between items-center mt-2 mb-2">
              <div className="text-[14px] text-black-300/80">
                Have an account?{" "}
                <Link href={"/register/konnector"} className="font-semibold" >
                  SignUp
                </Link>
              </div>
            </div>
            <Button text="Send OTP" disabled={isLoading} icon={
              !isLoading ?
                <BsArrowRight className="text-2xl text-white-600 rounded-full" />
                :
                <RingLoader color={"#FFFFFF"} loading={true} size={30} />
            } type="submit" onClick={function (): void { }} style="bg-brand-primary text-[14px] h-[40px] mx-auto" />
          </Form>
        )}
      </Formik>

    </div>
  );
};

export default EmailVerifier;
