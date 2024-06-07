"use client"
import React, { useState, useEffect } from 'react'
import Button from "@/components/shared/Button"
import Textarea from "@/components/shared/Textarea"
import { ISettings } from "@/types/types"
import { Fragment } from "react"
import { PersonalInformation } from '@/types/types'
import CompanyOptions from '@/json/Territories.json'
import SelectDropDown from "@/components/shared/SelectDropDown";
import { useKonnectorPersonalMutation, useRegisterPersonalQuery } from "@/Redux/RTK_API/Auth_Api";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import InputField from "@/components/shared/InputField";
import { useAuth } from '@/hooks/useAuth'
import { Skeleton } from '@mui/material'
import Territories from "@/json/Countries.json"
import RingLoader from "react-spinners/RingLoader";
import { BsArrowRight } from "react-icons/bs";



type Props = {
    input: ISettings
    inputHandler: (e: any) => void
}
type ApiResponse = {
    data?: any;
    error?: { status?: any } & (FetchBaseQueryError | SerializedError);
    status?: any;
};
type UserData = {
    first_name: string;
    last_name: string;
    email: string;
    recovery_email: string;
    company_name: string;
    hq_location?: string | undefined;
    phone_no: string;
    bio: string;
};
interface City {
    value: string;
    label: string;
}

interface State {
    value: string;
    label: string;
    cities: City[];
}

interface Country {
    value: string;
    label: string;
    countries: State[];
}
const Personal = () => {
    const { token } = useAuth();
    const [Loading, setLoading] = useState(false);
    const [Input, setInput] = useState<PersonalInformation>({
        FirstName: '', LastName: '',
        Phone: '', CompanyName: '',
        country: { value: "", label: "" },
        state: { value: "", label: "" },
        city: { value: "", label: "" },
        CompanyEmail: '', RecoveryEmail: '',
        Bio: '',
    });

    const [hqLocation, setHqLocation] = useState<any>({
        countries: [],
        cities: []
    });

    const { data, isLoading, refetch } = useRegisterPersonalQuery({ accessToken: token });
    const [putPersonalData] = useKonnectorPersonalMutation();


    useEffect(() => {
        if (data && data.personalInformation) {
            const { first_name, last_name, email, phone_no, company_name, bio, hq_location, recovery_email } = data.personalInformation;
            const [city, state, country] = hq_location.split(',').map((part: string) => part.trim());

            const selectedCountry = Territories.find((countryData: any) => countryData.value === country);
            const selectedState = selectedCountry?.countries.find((stateData: any) => stateData.value === state);
            const selectedCity = selectedState?.cities.find((cityData: any) => cityData.value === city);

            setInput({
                FirstName: first_name,
                LastName: last_name, Phone: phone_no,
                CompanyName: company_name,
                country: { value: selectedCountry?.value ?? "", label: selectedCountry?.label ?? "" },
                state: { value: selectedState?.value ?? "", label: selectedState?.label ?? "" },
                city: { value: selectedCity?.value ?? "", label: selectedCity?.label ?? "" },
                CompanyEmail: email,
                RecoveryEmail: recovery_email ? recovery_email : "",
                Bio: bio || '',
            });
        }
    }, [data]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput(prevState => ({ ...prevState, [name]: value }));
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData: UserData = {
            first_name: Input.FirstName,
            last_name: Input.LastName,
            email: Input.CompanyEmail,
            recovery_email: Input.RecoveryEmail,
            company_name: Input.CompanyName,
            hq_location: `${Input.city?.value}, ${Input?.state?.value}, ${Input.country?.value}`,
            phone_no: Input.Phone,
            bio: Input.Bio,
        };
        const response: ApiResponse = await putPersonalData({ formData, accessToken: token });
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
        refetch();
        setLoading(false);
        return toast.success("Record Updated successfully.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true })
    };

    console.log("data", Input.country);
    

    return (
        <Fragment>
            <h1 className="text-[24px] text-brand-primary">Personal information</h1>
            <form onSubmit={handleSubmit} className="w-full h-full grid grid-cols-12 lg:gap-10 gap-3 mt-4 ">
                <aside className="w-full flex flex-col col-span-6 gap-3 ">
                    <InputField isLoading={isLoading} label='First Name' type="text" name="FirstName" value={Input.FirstName} onChange={handleChange} required labelStyle="text-brand-primary" inputStyle="capitalize" />
                    <InputField isLoading={isLoading} label='Last Name' type="text" name="LastName" value={Input.LastName} onChange={handleChange} required labelStyle="text-brand-primary" inputStyle="capitalize" />
                    <InputField isLoading={isLoading} label='Phone Number' type="text" name="Phone" value={Input.Phone} onChange={handleChange} required labelStyle="text-brand-primary" />

                    {/* Country  */}
                    <SelectDropDown
                        isLoading={isLoading}
                        selectedOption={Input.country}
                        setSelectedOption={(e: { value: string; label: string } | null) => {
                            const match = Territories?.find(c => c.value === e?.value);
                            setHqLocation({ ...hqLocation, countries: match?.countries })
                            const selectedCountry = match?.countries?.find((country: any) => country.value === e?.value);
                            setInput({ ...Input, country: e })
                        }}
                        dropdownItems={Territories} 
                        label={"Territory*"} 
                        backgroundColor="#ffffff"
                        menuHeight={"200px"}
                        required 
                    />
                    {/* State  */}
                    <SelectDropDown isLoading={isLoading} selectedOption={Input.state}
                        setSelectedOption={(e: { value: string; label: string } | null) => {
                            const match = hqLocation?.countries?.find((s: any) => s.value === e?.value);
                            setHqLocation({ ...hqLocation, cities: match?.cities })
                            setInput({ ...Input, state: e })
                        }} dropdownItems={hqLocation?.countries} label={"Country*"} required backgroundColor="#ffffff"
                        menuHeight={"200px"}
                    />
                    {/* City  */}
                    <SelectDropDown isLoading={isLoading} selectedOption={Input.city} setSelectedOption={(e: { value: string; label: string } | null) => { setInput({ ...Input, city: e }); }}
                        dropdownItems={hqLocation?.cities} label={"City*"} required backgroundColor="#ffffff"
                        menuHeight={"200px"}
                    />
                    <InputField isLoading={isLoading} label='Company Name' type="text" name="CompanyName" value={Input.CompanyName} onChange={handleChange} required labelStyle="text-brand-primary" />
                    <InputField isLoading={isLoading} label='Company Email' type="email" name="CompanyEmail" value={Input.CompanyEmail} onChange={handleChange} required labelStyle="text-brand-primary" isDisabled={true} />
                    <InputField isLoading={isLoading} label='Recovery Email' type="email" name="RecoveryEmail" value={Input.RecoveryEmail} onChange={handleChange} required labelStyle="text-brand-primary" />
                </aside>
                <aside className="w-full flex flex-col col-span-6 gap-3">
                    {isLoading ? <Skeleton sx={{ borderRadius: "16px" }} width={"100%"} height={300} /> : <Textarea name="Bio" onChange={handleChange} value={Input.Bio} label="Optional bio for vendors to see" id="Bio" />}
                </aside>
                {isLoading ?
                    <Skeleton sx={{ borderRadius: "16px" }} width={"100%"} height={50} /> :
                    <Button text="Save" icon={!Loading ? <BsArrowRight className="text-2xl text-white-600 rounded-full" /> : <RingLoader color={"#FFFFFF"} loading={true} size={30} />} type="submit" style=" bg-brand-primary text-[14px] h-[40px] mx-auto" />}
            </form>
        </Fragment>
    )
}

export default Personal