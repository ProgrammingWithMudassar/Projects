'use client'
import React, { FormEvent, Fragment, useEffect, useRef, useState } from 'react';
import Textarea from "@/components/shared/Textarea";
import InputField from "@/components/shared/InputField";
import Button from "@/components/shared/Button";
import { VendorRegister } from '@/types/types';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { IoIosDoneAll } from 'react-icons/io';
import CategoriesMetaData from "@/json/Categories.json"
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { usePostVendorMutation, useCompanyDataMutation } from '@/Redux/RTK_API/Auth_Api';
import SelectDropDown from "@/components/shared/SelectDropDown";
import Territories from "@/json/Countries.json";
import { BsArrowRight } from "react-icons/bs";
import RingLoader from "react-spinners/RingLoader";
import { useAuth } from '@/hooks/useAuth'
import UploadToCloudinary from '@/lib/UploadToCloudinary';
import { LogError } from '@/lib/LogFiles';


type ApiResponse = {
    data?: any;
    error?: { status?: any } & (FetchBaseQueryError | SerializedError);
    status?: any;
};

type UserData = {
    company_name: string;
    logo: any;
    website: string;
    address: string;
    social_media: any;
    categories: any;
    description: string;
    whitePaper: any;
};


const RegisterNewVendor = () => {
    const { token } = useAuth();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const whitepaperInputRef = useRef<HTMLInputElement>(null);
    const [Loading, setLoading] = useState(false);
    const [hqLocation, setHqLocation] = useState<any>({ countries: [], cities: [] });
    const [inputs, setInputs] = useState<VendorRegister>({
        CompanyName: '',
        country: { value: "", label: "" },
        state: { value: "", label: "" },
        city: { value: "", label: "" },
        categories: { list: [] },
        LinkedInURL: '',
        WebsiteURL: '',
        Summary: '',
        companyLogo: undefined,
        whitePaper: undefined,
    });
    // Query 
    const [RegisterVendor] = usePostVendorMutation();
    const [CompanyInfo] = useCompanyDataMutation();

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs({ ...inputs, [name]: value });
    };



    const registerUser = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Heelo")
        if (!inputs.companyLogo) return toast.warn("Upload logo please.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
        setLoading(true);
        const formData: UserData = {
            company_name: inputs.CompanyName,
            logo: inputs.companyLogo,
            website: inputs.WebsiteURL,
            address: `${inputs.city?.value}, ${inputs?.state?.value}, ${inputs.country?.value}`,
            social_media: { linkedIn: inputs.LinkedInURL },
            categories: inputs.categories,
            description: inputs.Summary,
            whitePaper: inputs.whitePaper
        };

        const response: ApiResponse = await RegisterVendor({ formData, accessToken: token });

        if (response.error && response.error.status === 500) {
            setLoading(false);
            return toast.error("Server is busy", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
        }
        if (response.error && response.error.status === 400) {
            setLoading(false);
            return toast.error("Credentials required.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
        }
        if (response.error && response.error.status === 403) {
            setLoading(false);
            return toast.error("Forbidden - Limited access.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
        }
        setLoading(false);
        toast.success("Vendor added successfully.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
        setInputs({
            CompanyName: '',
            country: { value: "", label: "" },
            state: { value: "", label: "" },
            city: { value: "", label: "" },
            categories: { list: [] },
            LinkedInURL: '',
            WebsiteURL: '',
            Summary: '',
            companyLogo: undefined,
            whitePaper: undefined,
        })
    }

    const companyLogo = (data: any) => {
        let logo = "";
        logo = data[0]?.formats[0]?.src
        data.map((logo: any) => {
            if (logo.theme === "light")
                logo = logo.formats[0].src
        })
        return logo
    }

    const getCompanyData = async () => {
        if (!inputs.CompanyName) return toast.error("Company name is required.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
        const response: ApiResponse = await CompanyInfo({
            formData: {
                company_name: inputs.CompanyName
            }, accessToken: token
        });
        if (response.error && response.error.status === 500) return toast.error("Server is busy", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
        if (response.error && response.error.status === 404) return toast.warn("No data found.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
        const logo = companyLogo(response?.data?.logos)
        setInputs({
            ...inputs, Summary: response?.data?.longDescription ? response?.data?.longDescription : "", companyLogo: logo, WebsiteURL: response?.data?.domain ? response?.data?.domain : ""
        })
    };

    const uploadAssetsToCloudinary = async (selectedFile: File | undefined) => {
        try {
            const attachment = await UploadToCloudinary(selectedFile, process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD, process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET, process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER);
            setInputs({ ...inputs, companyLogo: attachment })
        } catch (error) {
            LogError("Admin/Register(uploadAssetsToCloudinary)", error)
        }
    }


    return (
        <div className='w-full h-full'>
            <h1 className="lg:text-[24px] text-[16px] text-brand-primary my-2">Add New Vendor</h1>
            <form className="grid grid-cols-12 gap-6" onSubmit={registerUser}>
                <aside className='col-span-12 md:col-span-6 flex flex-col justify-start items-center gap-2'>
                    <div className='w-full flex justify-between items-end gap-4'>
                        <InputField label="Company Name*" type="text" id="CompanyName" name="CompanyName" value={inputs?.CompanyName} onChange={inputHandler} inputStyle="w-[100%]" labelStyle="text-brand-primary font-medium" required />
                        <Button text="Get Info" type="button" onClick={getCompanyData} style="bg-brand-primary text-[14px] h-[40px] mx-auto mt-4" />
                    </div>
                    <Textarea name="Summary" value={inputs.Summary} onChange={inputHandler} label="Summary" id="Summary" />
                    <SelectDropDown selectedOption={inputs.country} setSelectedOption={(e: { value: string; label: string } | null) => {
                        const match = Territories?.find(c => c.value === e?.value);
                        setHqLocation({ ...hqLocation, countries: match?.countries })
                        setInputs({ ...inputs, country: e })
                    }} dropdownItems={Territories} label={"Territory*"} required backgroundColor="#ffffff" menuHeight={"200px"} />


                    {hqLocation.countries.length > 0 &&
                        <SelectDropDown selectedOption={inputs.state} setSelectedOption={(e: { value: string; label: string } | null) => {
                            const match = hqLocation?.countries?.find((s: any) => s.value === e?.value);
                            setHqLocation({ ...hqLocation, cities: match?.cities })
                            setInputs({ ...inputs, state: e })
                        }} dropdownItems={hqLocation?.countries} label={"Country*"} required backgroundColor="#ffffff" menuHeight={"200px"} />}


                    {hqLocation.cities.length > 0 &&
                        <SelectDropDown selectedOption={inputs.city}
                            setSelectedOption={(e: { value: string; label: string } | null) => setInputs({ ...inputs, city: e })}
                            dropdownItems={hqLocation?.cities} label={"City*"} required backgroundColor="#ffffff" menuHeight={"200px"} />
                    }

                    <InputField label="LinkedIn URL*" type="text" id="LinkedInURL" name="LinkedInURL" value={inputs?.LinkedInURL} onChange={inputHandler} inputStyle="w-[100%]" labelStyle="text-brand-primary font-medium" />
                    <InputField label="Website URL*" type="text" id="WebsiteURL" name="WebsiteURL" value={inputs?.WebsiteURL} onChange={inputHandler} inputStyle="w-[100%]" labelStyle="text-brand-primary font-medium" />
                </aside>
                <aside className='col-span-12 md:col-span-6 '>
                    <p className='text-[16px] font-medium text-brand-primary mb-2'>Company logo</p>
                    <div className='relative' >
                        <button
                            type='button'
                            onClick={() => {
                                if (fileInputRef.current) {
                                    fileInputRef.current.click();
                                }
                            }} className="w-full h-[120px] flex flex-col items-center justify-center bg-white-600 rounded-lg">

                            {
                                inputs.companyLogo ? <>
                                    <IoIosDoneAll className='text-[36px] text-gray-400' />
                                    <p className='text-xs text-gray-500 dark:text-gray-400' >{inputs.companyLogo}</p>
                                </> : <>
                                    <AiOutlineCloudUpload className='text-[28px] text-gray-400' />
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG</p>
                                </>
                            }
                        </button>
                        <input ref={fileInputRef}
                            type="file"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const selectedFile = event.target.files?.[0];
                                if (selectedFile) {
                                    const acceptedFormats = ['image/svg+xml', 'image/png', 'image/jpeg'];
                                    if (acceptedFormats.includes(selectedFile.type)) {
                                        uploadAssetsToCloudinary(selectedFile)
                                    } else {
                                        toast.warn("Allowed only SVG, PNG, JPG", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
                                    }
                                }
                            }}
                            accept="image/svg+xml, image/png, image/jpeg" className="hidden"  />
                    </div>

                    <p className='text-[16px]  font-medium text-brand-primary my-2'>Category</p>
                    <div className='w-full grid grid-cols-2 justify-start items-center bg-white-600 rounded-xl my-2 p-4 gap-2'>
                        {
                            CategoriesMetaData?.map((c: any, index: number) => <div key={index} className='flex justify-start items-center gap-2' >
                                <label className="container w-[1.2em] h-[1.2em] bg-gray-300">
                                    <input name={c.value} type="checkbox" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        const Checked = e.target.checked;
                                        const name = e.target.name as string;
                                        const categories = inputs?.categories.list;

                                        if (Checked) {
                                            const index = categories?.findIndex((item: any) => item === name);
                                            if (typeof name === 'string' && index === -1) { categories?.push(name) }
                                            setInputs({ ...inputs, categories: { list: categories }});
                                        } else {
                                            setInputs({  ...inputs,
                                                categories: { list: categories?.filter((item: any) => item !== name)}
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
                                <label htmlFor='checkbox' className="text-[14px]">{c.label}</label>
                            </div>)
                        }
                    </div>
                </aside>
                <div className='col-span-12 text-center'>
                    <Button text="Save" disabled={Loading}
                        icon={!Loading ? <IoIosDoneAll className="text-2xl text-white-600 rounded-full" />
                            :
                            <RingLoader color={"#FFFFFF"} loading={true} size={30} />}
                        type="submit" onClick={function (): void { }} style="bg-brand-primary text-[14px] h-[40px] mx-auto mt-4"
                    />
                </div>
            </form >
        </div >
    );
};

export default RegisterNewVendor;





