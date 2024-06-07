"use client"
import { FormEvent, Fragment, useEffect, useState } from "react";
import Wrapper from "@/components/shared/Wrapper";
import Button from "@/components/shared/Button";
import { BsArrowRight, BsArrowRightCircleFill } from "react-icons/bs";
import InputField from "@/components/shared/InputField";
import { useAddLoginCredentialsMutation, useVendorLoginWithPinMutation } from "@/Redux/RTK_API/Auth_Api";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import RingLoader from "react-spinners/RingLoader";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { parseCookies, setCookie } from 'nookies';
import { useAuth } from '@/hooks/useAuth'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { Tooltip, IconButton } from '@mui/material';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import Dialogue from "@/components/shared/Dialogue";
import { LogError } from "@/lib/LogFiles";


const features = [
    { original: "Unlimited, organic source of ", design: "self-qualifying leads" },
    { original: "exposure - no paid advertising", design: "Unbiased " },
    { original: "Company-wide ", design: "KPI tracking" },
    { original: "discovery, let users come to YOU", design: "Redefine " },
];
type ApiResponse = {
    data?: any;
    error?: { status?: any, data?: any; } & (FetchBaseQueryError | SerializedError);
    status?: any;
};
type UserData = {
    unique_id: string;
}


const Vendor = () => {
    const { setUser, setToken } = useAuth()
    const [isMenu, setMenu] = useState<boolean>(false)
    const [isDialogue, setDialogue] = useState<boolean>(false)
    const [Loading, setLoading] = useState({
        verifyPin: false,
        addCredentials: false
    });
    const [konnectorID, setKonnectorID] = useState('');
    const [vendorID, setVendorID] = useState(null)
    const [togglePassword, setTogglePassword] = useState({ password: false });
    const router = useRouter();

    const [input, setInput] = useState({
        email: "",
        password: "",
        cPassword: ""
    });
    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput({ ...input, [name]: value });
    };


    // Query 
    const [vendorLoginWithPin] = useVendorLoginWithPinMutation();
    const [addVendorLoginCredentials] = useAddLoginCredentialsMutation();

    const loginWithPin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading({ ...Loading, verifyPin: true });
        const formData: UserData = { unique_id: konnectorID };
        try {
            const response: ApiResponse = await vendorLoginWithPin(formData);

            if (response.error && response.error.status === 500) {
                setLoading({ ...Loading, verifyPin: false });
                return toast.error("Server is busy", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
            }
            if (response.error && response.error.status === 404) {
                setLoading({ ...Loading, verifyPin: false });
                return toast.error("Pin is not valid", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
            }
            if (response.error && response.error.status === 400) {
                setLoading({ ...Loading, verifyPin: false });
                return toast.error("Pin is required.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
            }
            setLoading({ ...Loading, verifyPin: false });
            if (response && response.data && response?.data?.user_id) {
                setVendorID(response?.data?.user_id);
                setDialogue(true);
                setKonnectorID("")
                return;
            }
            return toast.error("Unable to verify pin, please contact us.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
        } catch (error) {
            LogError("/views/Auth/Vendor.tsx(loginWithPin)", error)
            return toast.error("Connection failed", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
        }
        // const AuthUser = response.data;
        // const currentTime = Math.floor(Date.now() / 1000);
        // const expiryTime = Math.floor(new Date(AuthUser?.expiry_at).getTime() / 1000);
        // const maxAge = expiryTime - currentTime;
        // // Save data into cookies using nookies
        // setCookie(null, 'accessToken', AuthUser.accessToken, { maxAge, path: '/' });
        // setCookie(null, 'userData', JSON.stringify(AuthUser.user), { maxAge, path: '/' });
        // setToken(AuthUser.accessToken);
        // setUser(AuthUser.user)
        // router.push('/vendor/dashboard')
        // setLoading(false);
    };

    const addLoginCredentials = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!vendorID) return toast.warn("Error, try again", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
        if (input.password.trim() !== input.cPassword.trim()) return toast.warn("Password not matched", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
        if (input.password.length < 8) return toast.warn("Password should greater than equal to 8 characters.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
        setLoading({ ...Loading, addCredentials: true });
        const formData = { email: input.email, password: input.password };
        try {
            const response: ApiResponse = await addVendorLoginCredentials({ formData, vendorID });
            if (response.error && response.error.status === 500) {
                setLoading({ ...Loading, addCredentials: false });
                return toast.error("Server is busy", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
            }
            if (response.error && response.error.status === 400) {
                setLoading({ ...Loading, addCredentials: false });
                console.log(response)
                return toast.error(response?.error?.data?.message, { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
            }
            if (response.error && response.error.status === 409) {
                setLoading({ ...Loading, addCredentials: false });
                return toast.error("Email already exist.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
            }
            if (response.data?.message === "Credentials added, you can login now.") return router.push("/auth/login/?user_type=admin");
            setDialogue(false);
            setKonnectorID('');
            toast.info(response.data?.message, { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
        } catch (error) {
            LogError("/views/Auth/Vendor.tsx(addLoginCredentials)", error)
            return toast.error("Connection failed", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
        }
    }

    useEffect(() => {
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
                id="Login_Vendor"
                outerContainerStyle="lg:h-[calc(100vh+90px)] lg:py-0 py-16 bg-[url('/SignUp/bg.png')] bg-center bg-cover bg-no-repeat bg-white-600 lg:-mt-[120px] -mt-[70px] relative"
                innerContainerStyle="grid md:grid-cols-2 gap-12 justify-center items-center lg:pt-[120px] pt-[70px]"
            >
                <aside className="w-full flex flex-col items-start justify-start lg:gap-6 gap-4">
                    <div className="w-full flex items-center justify-start lg:gap-4 gap-2">
                        <BsArrowRightCircleFill className="lg:text-[28px] text-[16px] text-brand-primary" />
                        <p className="lg:text-[26px] text-[14px] font-light lg:leading-[39px] leading-[20px] text-brand-tertiary">{features[0].original} <span className="lg:text-[26px] text-[14px] lg:block inline text-brand-primary_light font-semibold ">{features[0].design}</span> </p>
                    </div>
                    <div className="w-full flex items-center justify-start lg:gap-4 gap-2">
                        <BsArrowRightCircleFill className="lg:text-[28px] text-[16px] text-brand-primary" />
                        <p className="lg:text-[26px] text-[14px] text-brand-primary_light font-semibold lg:leading-[39px] leading-[20px]">{features[1].design}<span className="lg:text-[26px] text-[14px] text-brand-tertiary font-light">{features[1].original}</span></p>
                    </div>
                    <div className="w-full flex items-center justify-start lg:gap-4 gap-2">
                        <BsArrowRightCircleFill className="lg:text-[28px] text-[16px] text-brand-primary" />
                        <p className="lg:text-[26px] text-[14px] font-light lg:leading-[39px] leading-[20px] text-brand-tertiary"> {features[2].original} <span className="lg:text-[26px] text-[14px] text-brand-primary_light font-semibold">{features[2].design}</span> </p>
                    </div>
                    <div className="w-full flex items-center justify-start lg:gap-4 gap-2">
                        <BsArrowRightCircleFill className="lg:text-[28px] text-[16px] text-brand-primary" />
                        <p className="lg:text-[26px] text-[14px] font-semibold text-brand-primary_light lg:leading-[39px] leading-[20px] ">{features[3].design}<span className="lg:text-[26px] text-[14px] text-brand-tertiary font-light">{features[3].original}</span> </p>
                    </div>
                </aside>
                <form onSubmit={loginWithPin}>
                    <div className="w-full flex justify-center items-center flex-col gap-8" >
                        <h2 className="text-brand-primary lg:text-[28px] text-[16px] lg:leading-[39px] leading-[20px] font-semibold text-center">Enter your 16 digit unique ID issued by Konnect.io</h2>
                        <div className="lg:w-[85%] w-full flex justify-center items-center flex-col gap-2">
                            <div className="w-full relative">
                                <Tooltip title="16-digit unique ID issued by konnect.io can only be used to get the vendors credentials" className="absolute top-[20px] right-[3.7%] cursor-pointer" placement="top" arrow>
                                    <button ><AiOutlineInfoCircle size={20} /></button>
                                </Tooltip>
                                <InputField label="16-Digit Unique ID" type={togglePassword.password ? 'text' : 'password'} id="konnectorID" name="konnectorID" value={konnectorID} onChange={(e) => setKonnectorID(e.target.value)} inputStyle="w-[100%]" labelStyle="text-brand-primary font-medium" outerContainerStyle="mt-4" maximumLength={"16"} required />
                                <button type="button" onClick={() => setTogglePassword({ password: !togglePassword.password })}
                                    className={`absolute top-[63%] right-[3%] w-[28px] flex justify-center items-center rounded-full hover:bg-black-300/20`}>
                                    {!togglePassword.password ? <AiOutlineEye size={21} /> : <AiOutlineEyeInvisible size={21} />}
                                </button>
                            </div>
                        </div>
                        <Button type="submit" text="Get Konnected" icon={!Loading.verifyPin ? <BsArrowRight className="text-2xl text-white-600" /> : <RingLoader color={"#FFFFFF"} loading={true} size={30} />} onClick={function (): void { }} style="bg-brand-primary text-[14px] h-[40px] mx-auto" />
                    </div>
                </form>
            </Wrapper>

            <Dialogue show={isDialogue} onClose={() => setDialogue(false)} style='max-w-[500px]'>
                <form onSubmit={addLoginCredentials} className='bg-white-300 px-6 pt-8 pb-4 flex justify-center items-center flex-col gap-4' >
                    <InputField
                        onChange={inputHandler}
                        value={input.email}
                        label="Email"
                        name={"email"}
                        type={'email'}
                        required
                        labelStyle="text-brand-primary font-medium text-left"
                        inputStyle="w-full"
                    />
                    <div className="w-full grid grid-cols-2 gap-4" >
                        <InputField
                            onChange={inputHandler}
                            value={input.password}
                            label="Password"
                            name={"password"}
                            type={'password'}
                            required
                            labelStyle="text-brand-primary font-medium text-left"
                            inputStyle="w-full"
                        />
                        <InputField
                            onChange={inputHandler}
                            value={input.cPassword}
                            label="Confirm password"
                            name={"cPassword"}
                            type={'password'}
                            required
                            labelStyle="text-brand-primary font-medium text-left"
                            inputStyle="w-full"
                        />
                    </div>
                    <Button text="Submit" disabled={Loading.addCredentials}
                        icon={!Loading.addCredentials ? <BsArrowRight className="text-2xl text-white-600 rounded-full" />
                            :
                            <RingLoader color={"#FFFFFF"} loading={true} size={30} />}
                        type="submit" onClick={() => { }} style="bg-brand-primary text-[14px] h-[40px] mx-auto mt-4"
                    />
                </form>
            </Dialogue>
        </Fragment>
    )
};

export default Vendor;
