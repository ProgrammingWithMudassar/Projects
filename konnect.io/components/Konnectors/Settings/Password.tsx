"use client"
import React, { useState, FormEvent } from 'react'
import { Fragment } from "react"
import { konnectorPasswordData } from '@/types/types'
import { useKonnectorPasswordMutation } from "@/Redux/RTK_API/Auth_Api";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import InputField from "@/components/shared/InputField";
import Button from "@/components/shared/Button"
import RingLoader from "react-spinners/RingLoader";
import { BsArrowRight } from "react-icons/bs";
import { useAuth } from '@/hooks/useAuth'
import { STogglePassword } from '@/types/types';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

type PasswordData = {
    current_password: string;
    new_password: string;
};
type ApiResponse = {
    data?: any;
    error?: { status?: any } & (FetchBaseQueryError | SerializedError);
    status?: any;
};


const Password = () => {
    const { token } = useAuth();
    const [Loading, setLoading] = useState(false);
    const [Input, setInput] = useState<konnectorPasswordData>({
        current_password: "",
        new_password: "",
        rpassword: "",
    });
    const [togglePassword, SetTogglePassword] = useState<STogglePassword>({
        password: false,
        cPassword: false,
        Ppassword: false,
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput(prevState => ({ ...prevState, [name]: value }));
    };

    // Query 
    const [putPassword] = useKonnectorPasswordMutation();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (Input.new_password !== Input.rpassword) { setLoading(false); toast.error("Passwords do not match.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true }); return; }
        if (Input.new_password.length < 8) { setLoading(false); toast.error("Password must be at least 8 characters long.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true }); return; }
        setLoading(true);


        const formData: PasswordData = { current_password: Input.current_password, new_password: Input.new_password, };
        const response: ApiResponse = await putPassword({ formData, accessToken: token });
        if (response.error && response.error.status === 500) { setLoading(false); toast.error("Server is busy", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true }); return; }
        if (response.error && response.error.status === 409) { setLoading(false); toast.error("Current password not correct.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true }); return; }
        setLoading(false);
        toast.success("Password updated successfully.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
        setInput({ current_password: "", new_password: "", rpassword: "", })
    };

    return (
        <Fragment>
            <h1 className="text-[24px] text-brand-primary">Password settings</h1>
            <form onSubmit={handleSubmit} className="lg:w-[50%] w-full h-full gap-3 mt-4" >
                <div className='w-full relative'>
                    <InputField label="Current Password" type={togglePassword.Ppassword ? 'text' : 'password'} id="current_password" name="current_password" value={Input.current_password} onChange={handleChange} inputStyle="w-[100%]" labelStyle="text-brand-primary font-medium" required />
                    <button type="button" className="absolute top-[50%] right-[3%] w-[28px] h-[28px] flex justify-center items-center rounded-full hover:bg-black-300/20" onClick={() => SetTogglePassword({ ...togglePassword, Ppassword: !togglePassword.Ppassword })}>
                        {!togglePassword.Ppassword ? <AiOutlineEye size={21} /> : <AiOutlineEyeInvisible size={22} />}
                    </button>
                </div>
                <div className="w-full flex gap-3 mt-4" >
                    <div className='w-full relative'>
                        <InputField label="New Password" type={togglePassword.password ? 'text' : 'password'} id="new_password" name="new_password" value={Input.new_password} onChange={handleChange} inputStyle="w-[100%]" labelStyle="text-brand-primary font-medium" required />
                        <button type="button" className="absolute top-[50%] right-[3%] w-[28px] h-[28px] flex justify-center items-center rounded-full hover:bg-black-300/20" onClick={() => SetTogglePassword({ ...togglePassword, password: !togglePassword.password })}>
                            {!togglePassword.password ? <AiOutlineEye size={21} /> : <AiOutlineEyeInvisible size={22} />}
                        </button>
                    </div>
                    <div className='w-full relative'>
                        <InputField label="Retype New Password*" type={togglePassword.cPassword ? 'text' : 'password'} id="rpassword" name="rpassword" value={Input.rpassword} onChange={handleChange} inputStyle="w-[100%]" labelStyle="text-brand-primary font-medium" required />
                        <button type="button" className="absolute top-[50%] right-[3%] w-[28px] h-[28px] flex justify-center items-center rounded-full hover:bg-black-300/20" onClick={() => SetTogglePassword({ ...togglePassword, cPassword: !togglePassword.cPassword })}>
                            {!togglePassword.cPassword ? <AiOutlineEye size={21} /> : <AiOutlineEyeInvisible size={22} />}
                        </button>
                    </div>
                </div>
                <Button text="Save"
                    icon={!Loading ? <BsArrowRight className="text-2xl text-white-600 rounded-full" />
                        :
                        <RingLoader color={"#FFFFFF"} loading={true} size={30} />}
                    type="submit" style="bg-brand-primary text-[14px] h-[40px] mx-auto mt-4" />
            </form>
        </Fragment>
    )
}

export default Password