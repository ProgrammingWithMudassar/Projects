'use client'
import React, { FormEvent, useState } from 'react';
import InputField from '@/components/shared/InputField';
import { UserFilter } from '@/types/types';
import Button from '@/components/shared/Button';
import Territories from "@/json/Countries.json"
import SelectDropDown from "@/components/shared/SelectDropDown";
import { BsArrowRight } from "react-icons/bs";
import RingLoader from "react-spinners/RingLoader";
import { useAuth } from '@/hooks/useAuth'
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { useRegisterInternalMutation } from '@/Redux/RTK_API/Auth_Api'
import { toast } from 'react-toastify';

interface Props {
  title: string;
  buttonName: string;
  refetch: () => void;
  onSearch: () => void;
  onClose: () => void;
}

type InternalData = {
  first_name: string;
  last_name: string;
  email: string;
  territory: { list: any[] },
  password: string,
  user_type: string;
};

type ApiResponse = {
  data?: any;
  error?: { status?: any } & (FetchBaseQueryError | SerializedError);
  status?: any;
};

const UserTableDialog = ({ title, buttonName, onSearch, refetch, onClose }: Props) => {
  const { token } = useAuth();
  const [Loading, setLoading] = useState(false);
  const [InternalRegister] = useRegisterInternalMutation();
  const [hqLocation1, setHqLocation1] = useState<any>({ countries: [], cities: [] });
  const [hqLocation2, setHqLocation2] = useState<any>({ countries: [], cities: [] });
  const [hqLocation3, setHqLocation3] = useState<any>({ countries: [], cities: [] });



  const [input, setInput] = useState<UserFilter>({
    first_name: '',
    last_name: '',
    email: '',
    country1: { value: "", label: "" },
    state1: { value: "", label: "" },
    city1: { value: "", label: "" },

    country2: { value: "", label: "" },
    state2: { value: "", label: "" },
    city2: { value: "", label: "" },

    country3: { value: "", label: "" },
    state3: { value: "", label: "" },
    city3: { value: "", label: "" },

    password: '',
    cpassword: '',
    user_type: '',
  });

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
  };

  const territories = [
    { country: input.country1?.value, state: input.state1?.value, city: input.city1?.value },
    { country: input.country2?.value, state: input.state2?.value, city: input.city2?.value },
    { country: input.country3?.value, state: input.state3?.value, city: input.city3?.value },
  ];

  const handleClear1 = () => {
    setHqLocation1({ countries: [], cities: [] });
    setInput({ ...input, country1: { value: "", label: "" }, state1: { value: "", label: "" }, city1: { value: "", label: "" } });
  };

  const handleClear2 = () => {
    setHqLocation2({ countries: [], cities: [] });
    setInput({ ...input, country2: { value: "", label: "" }, state2: { value: "", label: "" }, city2: { value: "", label: "" } });
  };

  const handleClear3 = () => {
    setHqLocation3({ countries: [], cities: [] });
    setInput({ ...input, country3: { value: "", label: "" }, state3: { value: "", label: "" }, city3: { value: "", label: "" } });
  };

  const registerInternal = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const territoriesList = territories.map(({ country, state, city }) => {
      if (country && state && city) {
        return `${city}, ${state}, ${country}`;
      }
      return '';
    }).filter(Boolean) as string[];

    const formData: InternalData = {
      first_name: input.first_name,
      last_name: input.last_name,
      email: input.email,
      territory: { list: territoriesList },
      password: input.password,
      user_type: "internal"
    };
    if (input?.password.trim() !== input?.cpassword.trim()) { setLoading(false); return toast.error("Password not matched", { position: toast.POSITION.BOTTOM_RIGHT })}
    if (input.password.trim().length < 8){ setLoading(false);  return toast.error("Passwords should be at least 8 characters long", { position: toast.POSITION.BOTTOM_RIGHT })}
   
    
    const response: ApiResponse = await InternalRegister({ formData, accessToken: token });

    if (response.error && response.error.status === 500) {
      setLoading(false);
      return toast.error("Server is busy", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
    }
    if (response.error && response.error.status === 409) {
      setLoading(false);
      return toast.error("Email already exist..", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
    }
    if (response.error && response.error.status === 403) {
      setLoading(false);
      return toast.error("Forbidden - Limited access.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
    }
    setLoading(false);
    refetch();
    onClose();
    return;
  }





  return (
    <section className="w-full flex justify-center items-center flex-col p-6 gap-4 text-left">
      <h4 className="text-2xl font-bold text-center text-white-600">{title}</h4>
      <form className='w-full flex justify-center items-center flex-col gap-4' onSubmit={registerInternal}>
        <div className='w-full grid gap-4 justify-between items-center grid-cols-2'>
          <InputField label="First Name *" type="text" id="fname" name="first_name" value={input?.first_name} onChange={inputHandler} inputStyle="w-[100%]" labelStyle="text-left text-white-600 font-medium col-span-1" required />
          <InputField label="Last Name *" type="text" id="lname" name="last_name" value={input?.last_name} onChange={inputHandler} inputStyle="w-[100%]" labelStyle="text-left text-white-600 font-medium col-span-1" required />
        </div>
        <InputField label="Email *" type="email" id="email" name="email" value={input?.email} onChange={inputHandler} inputStyle="w-[100%]" labelStyle="text-left text-white-600 font-medium" required />
        <div className='w-full border-2 border-white-300 rounded-xl p-2 grid grid-cols-3 gap-4 h-[250px]'>


          <div className='col-span-1 relative'>
            <button className='absolute right-0 mr-1 px-3 rounded-full text-white-300 bg-brand-secondary text-[14px] mt-[1px]' onClick={handleClear1} type='button'>Clear</button>
            <SelectDropDown selectedOption={input.country1} setSelectedOption={(e: { value: string; label: string } | null) => {
              const match = Territories?.find(c => c.value === e?.value);
              setHqLocation1({ ...hqLocation1, countries: match?.countries })
              setInput({ ...input, country1: e })
            }} dropdownItems={Territories} label={"Territory*"} required backgroundColor="#ffffff" labelStyle="text-white-600" menuHeight={"140px"} />
            {hqLocation1.countries.length > 0 &&
              <SelectDropDown selectedOption={input.state1} setSelectedOption={(e: { value: string; label: string } | null) => {
                const match = hqLocation1?.countries?.find((s: any) => s.value === e?.value);
                setHqLocation1({ ...hqLocation1, cities: match?.cities })
                setInput({ ...input, state1: e })
              }} dropdownItems={hqLocation1?.countries} label={"Country*"} required backgroundColor="#ffffff" labelStyle="text-white-600" menuHeight={"140px"} />}
            {hqLocation1.cities.length > 0 &&
              <SelectDropDown selectedOption={input.city1}
                setSelectedOption={(e: { value: string; label: string } | null) => setInput({ ...input, city1: e })}
                dropdownItems={hqLocation1?.cities} label={"City*"} required backgroundColor="#ffffff" labelStyle="text-white-600" menuHeight={"140px"} />
            }
          </div>


          <div className='col-span-1 relative'>
            <button className='absolute right-0 mr-1 px-3 rounded-full text-white-300 bg-brand-secondary text-[14px] mt-[1px]' type='button' onClick={handleClear2}>Clear</button>
            <SelectDropDown selectedOption={input.country2} setSelectedOption={(e: { value: string; label: string } | null) => {
              const match = Territories?.find(c => c.value === e?.value);
              setHqLocation2({ ...hqLocation2, countries: match?.countries })
              setInput({ ...input, country2: e })
            }} dropdownItems={Territories} label={"Territory*"} backgroundColor="#ffffff" labelStyle="text-white-600" menuHeight={"140px"} />
            {hqLocation2.countries.length > 0 &&
              <SelectDropDown selectedOption={input.state2} setSelectedOption={(e: { value: string; label: string } | null) => {
                const match = hqLocation2?.countries?.find((s: any) => s.value === e?.value);
                setHqLocation2({ ...hqLocation2, cities: match?.cities })
                setInput({ ...input, state2: e })
              }} dropdownItems={hqLocation2?.countries} label={"Country*"} backgroundColor="#ffffff" labelStyle="text-white-600" menuHeight={"140px"} />}
            {hqLocation2.cities.length > 0 &&
              <SelectDropDown selectedOption={input.city2}
                setSelectedOption={(e: { value: string; label: string } | null) => setInput({ ...input, city2: e })}
                dropdownItems={hqLocation2?.cities} label={"City*"} backgroundColor="#ffffff" labelStyle="text-white-600" menuHeight={"140px"} />
            }
          </div>


          <div className='col-span-1 relative'>
            <button className='absolute right-0 mr-1 px-3 rounded-full text-white-300 bg-brand-secondary text-[14px] mt-[1px]' type='button' onClick={handleClear3}>Clear</button>
            <SelectDropDown selectedOption={input.country3} setSelectedOption={(e: { value: string; label: string } | null) => {
              const match = Territories?.find(c => c.value === e?.value);
              setHqLocation3({ ...hqLocation3, countries: match?.countries })
              setInput({ ...input, country3: e })
            }} dropdownItems={Territories} label={"Territory*"} backgroundColor="#ffffff" labelStyle="text-white-600" menuHeight={"140px"} />
            {hqLocation3.countries.length > 0 &&
              <SelectDropDown selectedOption={input.state3} setSelectedOption={(e: { value: string; label: string } | null) => {
                const match = hqLocation3?.countries?.find((s: any) => s.value === e?.value);
                setHqLocation3({ ...hqLocation3, cities: match?.cities })
                setInput({ ...input, state3: e })
              }} dropdownItems={hqLocation3?.countries} label={"Country*"} backgroundColor="#ffffff" labelStyle="text-white-600" menuHeight={"140px"} />}
            {hqLocation3.cities.length > 0 &&
              <SelectDropDown selectedOption={input.city3}
                setSelectedOption={(e: { value: string; label: string } | null) => setInput({ ...input, city3: e })}
                dropdownItems={hqLocation3?.cities} label={"City*"} backgroundColor="#ffffff" labelStyle="text-white-600" menuHeight={"140px"} />
            }
          </div>
        </div>

        <div className='w-full grid gap-4 justify-between items-center grid-cols-2'>
        <InputField label="Password" type="password" id="password" name="password" value={input?.password} onChange={inputHandler} inputStyle="w-[100%]" labelStyle="text-left text-white-600 font-medium" />
        <InputField label="Confirm Password" type="password" id="cpassword" name="cpassword" value={input?.cpassword} onChange={inputHandler} inputStyle="w-[100%]" labelStyle="text-left text-white-600 font-medium" />
        </div>
        <Button text="Add Internal" disabled={Loading}
          icon={!Loading ? <BsArrowRight className="text-2xl text-white-600 rounded-full" /> : <RingLoader color={"#FFFFFF"} loading={true} size={30} />}
          type="submit" onClick={function (): void { }} style="bg-brand-secondary text-[14px] h-[40px] mx-auto mt-4" />
      </form>
    </section>
  );
};

export default UserTableDialog;
