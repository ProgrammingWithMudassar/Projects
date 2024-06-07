'use client'
import React, { Fragment, useState } from "react";
import Button from "@/components/shared/Button";
import FormIkInput from "@/components/shared/FormikInput";
import { NewPassword } from "@/types/types";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useRecoverPasswordMutation } from "@/Redux/RTK_API/Auth_Api";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { useSelector } from 'react-redux';
import { RootState } from "@/Redux/Store/Store";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'


type Props = {
  onStepChange: (step: number) => void;
  user_type: string | null
};

function PasswordVerifier({ user_type }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const initialValues: NewPassword = { NewPassword: "", ConfirmPassword: "" };
  const validationSchema = Yup.object().shape({
    NewPassword: Yup.string().required('Password is required'),
    ConfirmPassword: Yup.string().required('Confirm Password is required')
  })

  const handleTogglePassword = () => setShowPassword(!showPassword);
  const handleToggleCPassword = () => setShowCPassword(!showCPassword);

  // Redux state 
  interface CounterState { userID: number }
  const counterState: CounterState = useSelector((state: RootState) => state.counter);
  const ID = counterState.userID;

  // Query 
  const [postRecoverPassword] = useRecoverPasswordMutation();
  type ApiResponse = {
    data?: any;
    error?: { status?: any } & (FetchBaseQueryError | SerializedError);
    status?: any;
  };

  const handleSubmit = async (values: NewPassword, { setSubmitting }: any) => {
    setIsLoading(true);
    if (values.NewPassword !== values.ConfirmPassword) {
      setIsLoading(false);
      toast.error("Passwords should be same.");
      return;
    }
    else {
      const formData = {
        password: values.NewPassword,
        user_id: ID,
        user_type
      }
      const response: ApiResponse = await postRecoverPassword(formData);
      if (response.error && response.error.status === 500) { setIsLoading(false); toast.error("Srever error", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true }); return; }
      else { setIsLoading(false); router.push('/auth/login') }
    }
  };


  return (
    <Fragment>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} >
        {({ isSubmitting }) => (
          <Form>

            <div className="w-full relative flex items-center">
              <FormIkInput label="New Password" type={showPassword ? 'text' : 'password'} id="NewPassword" name="NewPassword" inputStyle="border p-2" labelStyle="text-brand-primary font-medium" mendatory={true} />
              <div className="mt-7 absolute right-3 opacity-50 cursor-pointer" onClick={handleTogglePassword}>
                {showPassword ? <AiOutlineEye size={25} /> : <AiOutlineEyeInvisible size={25} />}
              </div>
            </div>

            <div className="w-full relative flex items-center">
              <FormIkInput label="Confirm Password" type={showCPassword ? 'text' : 'password'} id="ConfirmPassword" name="ConfirmPassword" inputStyle="border p-2" labelStyle="text-brand-primary font-medium" mendatory={true} />
              <div className="mt-7 absolute right-3 opacity-50 cursor-pointer" onClick={handleToggleCPassword}>
                {showCPassword ? <AiOutlineEye size={25} /> : <AiOutlineEyeInvisible size={25} />}
              </div>
            </div>
            <Button text="Change Password" type="submit" disabled={isSubmitting} onClick={function (): void { }} style="bg-brand-primary my-6 rounded-full md:text-[16px] text-[14px] m-auto" />
          </Form>
        )}
      </Formik>
    </Fragment>
  );
}

export default PasswordVerifier;
