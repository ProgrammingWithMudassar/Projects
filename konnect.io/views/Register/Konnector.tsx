"use client"
import { FormEvent, Fragment, useEffect, useState } from "react";
import Wrapper from "@/components/shared/Wrapper";
import Button from "@/components/shared/Button";
import Image from "next/image";
import { BsArrowRightCircleFill, BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import { IKonnectorRegister, ITogglePassword } from '@/types/types'
import SelectDropDown from "@/components/shared/SelectDropDown";
import { toast } from 'react-toastify';
import { useRegisterKonnectorMutation } from "@/Redux/RTK_API/Auth_Api";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { CompanySizeOptions } from '@/json/Options/Options'
import InputField from "@/components/shared/InputField";
import RingLoader from "react-spinners/RingLoader";
import { LogError, LogInfo } from "@/lib/LogFiles";
import { useRouter } from 'next/navigation';
import Territories from "@/json/Countries.json";
import Dialogue from "@/components/shared/Dialogue";
import CategoriesMetaData from "@/json/Categories.json"
import { parseCookies } from "nookies";

const features = [
    "No costs/hidden fees",
    "Engage on YOUR terms",
    "Protect personal information",
    "Personalized & catered for YOU ",
];
type ApiResponse = {
    data?: any;
    error?: { status?: any } & (FetchBaseQueryError | SerializedError);
    status?: any;
};

const Vendor = () => {
    const router = useRouter()
    const [postRegister] = useRegisterKonnectorMutation();
    const [isLoading, setIsLoading] = useState(false);
    const [category, setCategory] = useState(false);
    const [hqLocation, setHqLocation] = useState<any>({
        countries: [],
        cities: []
    });
    const [togglePassword, SetTogglePassword] = useState<ITogglePassword>({ password: false, cPassword: false });
    const [input, setInput] = useState<IKonnectorRegister>({
        first_name: "",
        last_name: "",
        email: "",
        company_name: "",
        company_size: { value: "", label: "" },
        country: { value: "", label: "" },
        state: { value: "", label: "" },
        city: { value: "", label: "" },
        categories: { list: [] },
        phone_no: "",
        password: "",
        cPassword: "",
    });
    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput({ ...input, [name]: value });
    };

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCategory(true)
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

    const registerUser = async () => {
        const formData: any = { ...input };
        if (formData?.password.trim() !== formData?.cPassword.trim()) return toast.error("Password not matched", { position: toast.POSITION.BOTTOM_RIGHT })
        if (formData.password.trim().length < 8) return toast.error("Passwords should be at least 8 characters long", { position: toast.POSITION.BOTTOM_RIGHT })
        delete formData.cPassword;
        formData.company_size = input.company_size?.value;
        formData.hq_location = `${input.city?.value}, ${input.state?.value}, ${input.country?.value}`;
        formData.user_type = "konnector";
        formData.country = formData.country?.value;
        delete formData.city;
        delete formData.state;
        delete formData.country;
        setIsLoading(true);
        try {
            const response: ApiResponse = await postRegister(formData);
            if (response.error && response.error.status === 500) {
                return toast.error("Server is busy", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
            }
            if (response.error && response.error.status === 409) {
                return toast.error("Email is already exist.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
            }
            if (response.error && response.error.status === 400) {
                return toast.warn("Password must be greater then or equal to 8 characters.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
            }
            if (response.data.message === "User registered.")
                router.push('/auth/login');
            else {
                setInput({
                    first_name: "",
                    last_name: "",
                    email: "",
                    company_name: "",
                    company_size: { value: "", label: "" },
                    country: { value: "", label: "" },
                    state: { value: "", label: "" },
                    city: { value: "", label: "" },
                    categories: { list: [] },
                    phone_no: "",
                    password: "",
                    cPassword: "",
                })
                setCategory(false);
                return toast.info(response.data.message, { position: toast.POSITION.BOTTOM_RIGHT })
            }
        } catch (error) {
            LogError("views/Register/Konnector.tsx", error)
            toast.error("Unable to register, try again later!", { position: toast.POSITION.BOTTOM_RIGHT })
            setIsLoading(false);
        }
    };


    return (
        <Fragment>
            <Wrapper
                id="SignUp_Vendor"
                outerContainerStyle="py-16 bg-[url('/Login/bg.jpg')] bg-center bg-cover bg-no-repeat bg-white-600 lg:-mt-[120px] -mt-[70px] relative"
                innerContainerStyle="grid lg:grid-cols-2 gap-16 justify-center items-center lg:pt-[120px] pt-[70px]">
                <div className="w-full backdrop:flex justify-center items-start flex-col m-auto">
                    <div className="bg-white-300 rounded-xl md:p-6 p-4 ">
                        <div className="w-full flex items-center justify-center gap-2">
                            <Image src={"/simple-logo.svg"} className="object-fill" alt="Konnect.io logo" width={60} height={60} sizes="" />
                            <h3 className="md:text-[18px] text-[14px] font-medium text-black-600 mt-2">Please enter the following information.</h3>
                        </div>
                        <form className="w-full flex justify-center items-center gap-4 flex-col" onSubmit={submit}>
                            <div className="w-full grid grid-cols-2 gap-4" >
                                <InputField onChange={inputHandler} value={input.first_name} label="First name*" name={"first_name"} type={'text'} required labelStyle="text-brand-primary font-medium" inputStyle="w-full" />
                                <InputField onChange={inputHandler} value={input.last_name} label="Last name*" name={"last_name"} type={'text'} required labelStyle="text-brand-primary font-medium" inputStyle="w-full" />
                            </div>
                            <InputField onChange={inputHandler} value={input.email} label="Company email*" name={"email"} type={'email'} required labelStyle="text-brand-primary font-medium" inputStyle="w-full" />
                            <InputField onChange={inputHandler} value={input.company_name} label="Company name*" name={"company_name"} type={'text'} required labelStyle="text-brand-primary font-medium" inputStyle="w-full" />

                            <SelectDropDown selectedOption={input.country} setSelectedOption={(e: { value: string; label: string } | null) => {
                                const match = Territories?.find(c => c.value === e?.value);
                                setHqLocation({ ...hqLocation, countries: match?.countries })
                                setInput({ ...input, country: e })
                            }} dropdownItems={Territories} label={"Territory*"} required backgroundColor="#ffffff" menuHeight={"200px"} />


                            {hqLocation.countries.length > 0 &&
                                <SelectDropDown selectedOption={input.state} setSelectedOption={(e: { value: string; label: string } | null) => {
                                    const match = hqLocation?.countries?.find((s: any) => s.value === e?.value);
                                    setHqLocation({ ...hqLocation, cities: match?.cities })
                                    setInput({ ...input, state: e })
                                }} dropdownItems={hqLocation?.countries} label={"Country*"} required backgroundColor="#ffffff" menuHeight={"200px"} />}


                            {hqLocation.cities.length > 0 &&
                                <SelectDropDown selectedOption={input.city}
                                    setSelectedOption={(e: { value: string; label: string } | null) => setInput({ ...input, city: e })}
                                    dropdownItems={hqLocation?.cities} label={"City*"} required backgroundColor="#ffffff" menuHeight={"200px"} />
                            }

                            <SelectDropDown selectedOption={input.company_size} setSelectedOption={(e: { value: string; label: string } | null) => setInput({ ...input, company_size: e })}
                                dropdownItems={CompanySizeOptions} label={"Company size*"}
                                required backgroundColor="#ffffff" menuHeight={"200px"} />
                            <InputField
                                onChange={inputHandler}
                                value={input.phone_no}
                                label="Phone number*"
                                name={"phone_no"}
                                type={'text'}
                                required
                                labelStyle="text-brand-primary font-medium"
                                inputStyle="w-full"
                            />
                            <div className="w-full grid grid-cols-2 gap-4" >
                                <div className="w-full relative" >
                                    <InputField
                                        onChange={inputHandler}
                                        value={input.password}
                                        label="Password*"
                                        name={"password"}
                                        type={togglePassword.password ? 'text' : 'password'}
                                        required
                                        labelStyle="text-brand-primary font-medium"
                                        inputStyle="w-full"
                                    />
                                    <button type="button" className="absolute top-[50%] right-[3%] w-[28px] h-[28px] flex justify-center items-center rounded-full hover:bg-black-300/20" onClick={() => SetTogglePassword({ ...togglePassword, password: !togglePassword.password })}>
                                        {!togglePassword.password ? <AiOutlineEye size={21} /> : <AiOutlineEyeInvisible size={22} />}
                                    </button>
                                </div>
                                <div className="w-full relative" >
                                    <InputField
                                        onChange={inputHandler}
                                        value={input.cPassword}
                                        label="Confirm password*"
                                        name={"cPassword"}
                                        type={togglePassword.cPassword ? 'text' : 'password'}
                                        required
                                        labelStyle="text-brand-primary font-medium"
                                        inputStyle="w-full"
                                    />
                                    <button type="button" className="absolute top-[50%] right-[3%] w-[28px] h-[28px] flex justify-center items-center rounded-full hover:bg-black-300/20" onClick={() => SetTogglePassword({ ...togglePassword, cPassword: !togglePassword.cPassword })}>
                                        {!togglePassword.cPassword ? <AiOutlineEye size={21} /> : <AiOutlineEyeInvisible size={22} />}
                                    </button>
                                </div>
                            </div>
                            <div className="w-full flex justify-between items-center mt-2" >
                                <div className="text-[14px] text-black-300/80" >Have an account? <Link href={"/auth/login/?user_type=konnector"} className="font-semibold underline hover:text-black-300" >Login</Link></div>
                                <Link href={"/auth/forgetpassword"} className="text-[14px] text-black-300/80 font-medium hover:text-black-300" >
                                    Forget password
                                </Link>
                            </div>
                            <Button text="Next" disabled={isLoading}
                                icon={<BsArrowRight className="text-2xl text-white-600 rounded-full" />}
                                type="submit" onClick={function (): void { }} style="bg-brand-primary text-[14px] h-[40px] mx-auto mt-4"
                            />
                        </form>
                    </div>
                </div>
                <aside className="w-full flex flex-col items-start justify-start md:gap-5 gap-4 md:pt-10">
                    <h1 className="md:text-[42px] text-[32px] font-semibold text-black-500">Yup, that’s all we need. You’re done.</h1>
                    <h3 className="md:text-[30px] text-[16px] font-medium text-brand-primary">Benefits of being a Konnector?</h3>
                    <div className="flex justify-start items-start flex-col md:gap-4 gap-3">
                        {features?.map((item: string, index: number) => (
                            <div
                                key={index} className="w-full flex items-center justify-start md:gap-4 gap-2">
                                <BsArrowRightCircleFill className="md:text-2xl text-xl text-brand-primary" />
                                <p className="md:text-lg text-[16px] text-brand-primary">{item}</p>
                            </div>
                        ))}
                    </div>
                </aside>
            </Wrapper>

            {/* Category dialogue */}
            <Dialogue show={category} onClose={() => setCategory(!category)} style="max-w-[500px]" >
                <div className="w-full flex justify-center items-center flex-col bg-white-600 md:p-8 p-6" >
                    <h2 className="md:text-[18px] text-[14px] font-medium text-black-600 mt-2">Select your interested categories.</h2>
                    <div className='w-full grid grid-cols-2 justify-start items-center bg-white-600 rounded-xl my-2 p-4 gap-2'>
                        {
                            CategoriesMetaData?.map((c: any, index: number) => <div key={index} className='flex justify-start items-center gap-2' >
                                <label className="container w-[1.2em] h-[1.2em] bg-gray-300">
                                    <input name={c.value} type="checkbox" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        const Checked = e.target.checked;
                                        const name = e.target.name as string;
                                        const categories = input?.categories.list;

                                        if (Checked) {
                                            const index = categories?.findIndex((item: any) => item === name);
                                            if (typeof name === 'string' && index === -1) {
                                                categories?.push(name);
                                            }
                                            setInput({
                                                ...input,
                                                categories: { list: categories }
                                            });
                                        } else {
                                            setInput({
                                                ...input,
                                                categories: {
                                                    list: categories?.filter((item: any) => item !== name)
                                                }
                                            });
                                        }

                                    }} />
                                    <div className="checkmark w-[1.2em] h-[1.2em]"></div>
                                    <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg" className="celebrate">
                                        <polygon points="0,0 10,10"></polygon>
                                        <polygon points="0,25 10,25"></polygon>
                                        <polygon points="0,50 10,40"></polygon>
                                        <polygon points="50,0 40,10"></polygon>
                                        <polygon points="50,25 40,25"></polygon>
                                        <polygon points="50,50 40,40"></polygon>
                                    </svg>
                                </label>
                                <label htmlFor='checkbox' className="text-[14px] text-start">{c.label}</label>
                            </div>)
                        }
                    </div>
                    <Button text="Get Konnected" disabled={isLoading}
                        icon={!isLoading ? <BsArrowRight className="text-2xl text-white-600 rounded-full" />
                            :
                            <RingLoader color={"#FFFFFF"} loading={true} size={30} />}
                        type="button" onClick={registerUser} style="bg-brand-primary text-[14px] h-[40px] mx-auto mt-4"
                    />
                </div>
            </Dialogue>
        </Fragment>
    );
};

export default Vendor