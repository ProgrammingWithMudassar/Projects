'use client'
import React, { useState, useEffect, ChangeEvent } from 'react';
import Search from '@/components/shared/Search';
import Recommendation from '@/components/Konnectors/Explore/Recommendation';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';
import 'swiper/css/autoplay'
import { useExploreAllVendorsQuery, useSaveViewsMutation } from "@/Redux/RTK_API/Auth_Api";
import Pagination from "@mui/material/Pagination";
import { useAuth } from '@/hooks/useAuth';
import CompanyCard from '@/components/shared/CompanyCard';
import { IVendorsData } from '@/types/types';
import Skeleton from '@mui/material/Skeleton';
import { PiSmileySad } from "react-icons/pi";
import Dialogue from '@/components/shared/Dialogue'
import Image from 'next/image';
import { FaLinkedin, FaFacebook, FaGlobe } from 'react-icons/fa';
import Button from '@/components/shared/Button'
import { TiTick } from 'react-icons/ti';
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

type ApiResponse = {
  data?: any;
  error?: { status?: any } & (FetchBaseQueryError | SerializedError);
  status?: any;
};


const Explore = () => {
  const { token, user } = useAuth();
  const [searchValue, setSearchValue] = useState('');
  const [activePage, setActivePage] = useState<number>(1);
  const [isDialogue, setDialogue] = useState<boolean>(false)
  const [isWarningDialogue, setIsWarningDialogue] = useState<boolean>(false)
  const [vendorsData, setVendorsData] = useState<IVendorsData>({
    currentPage: 1,
    totalItems: 0,
    totalPages: 0,
    vendors: []
  });
  const [compair] = useState([])

  // Query 
  const { data, isLoading, isSuccess, refetch } = useExploreAllVendorsQuery({
    page: activePage,
    search: searchValue,
    new: 0,
    accessToken: token
  });
  const [saveView] = useSaveViewsMutation();

  useEffect(() => {
    if (isSuccess) {
      return setVendorsData(data);
    }
  }, [isSuccess, activePage, searchValue, data]);

  const [selectedCompanyData, setSelectedCompanyData] = useState<any>([]);

  const handleCheckboxChange = (companyData: any, isChecked: boolean) => {
    setDialogue(false);
    if (isChecked) {
      if (!selectedCompanyData.find((data: any) => data.id === companyData.id)) {
        setSelectedCompanyData([...selectedCompanyData, companyData]);
      }
    } else {
      const updatedSelectedCompanyData = selectedCompanyData.filter((data: any) => data.id !== companyData.id);
      setSelectedCompanyData(updatedSelectedCompanyData);
    }
  };

  const handleCompare = () => {
    if (selectedCompanyData.length === 2) { setDialogue(true); setIsWarningDialogue(false); return }
    if (selectedCompanyData.length > 2) { setDialogue(false); setIsWarningDialogue(true); return }
    setDialogue(false);
    setIsWarningDialogue(true);
  };

  const handleSaveView = async (vendorID: any) => {
    const formData = {
      vendor_id: vendorID?.id
    }
    const response: ApiResponse = await saveView({ accessToken: token, formData });
  }


  return (
    <section className="w-full min-h-[calc(100vh-140px)]">
      <Recommendation />
      <div className="w-full md:h-[50px] lg:flex lg:justify-between items-center block mt-10">
        <h1 className="lg:text-[24px] text-[16px] text-brand-primary">Explore Vendor</h1>
        <div className="m-atuo md:m-0 relative flex items-center gap-2">
          <button className='bg-brand-primary px-8 py-2 rounded-full text-white-600'>Click</button>
          <Search value={searchValue} onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)} />
          {
            selectedCompanyData.length === 2 &&
            <button className="bg-brand-primary my-6 rounded-full md:text-[16px] text-[14px] h-[38px] px-8 text-center text-white-600" onClick={handleCompare}>Compare</button>
          }
        </div>
      </div>
      {
        isLoading ? <div className='grid grid-cols-5 gap-4 mt-4' >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => <Skeleton
            key={item}
            sx={{ bgcolor: 'white', borderRadius: "12px" }}
            variant="rounded"
            width="100%"
            height={233}
          />)}
        </div> : vendorsData.vendors && vendorsData.vendors.length > 0 ? (
          <div className="grid grid-cols-5 gap-4 mt-4" >
            {vendorsData.vendors.map((data: any, index: number) => (
              <CompanyCard key={index} companyData={data} refetch={refetch} onCheckboxChange={handleCheckboxChange} onView={handleSaveView} />
            ))}
          </div>
        ) :
          <div className='w-full flex justify-center items-center flex-col text-[18px] font-semibold text-brand-primary my-10' >
            <PiSmileySad className='text-[100px] text-center' /> Nothing to show
          </div>
      }
      <div className="mt-2 lg:mt-4 flex justify-center lg:justify-end">
        <Pagination
          count={vendorsData.totalPages}
          page={vendorsData.currentPage}
          variant="outlined" shape="rounded"
          onChange={(event: ChangeEvent<unknown>, page: number): void => { setActivePage(page) }}
          color="primary" />
      </div>

      <Dialogue show={isDialogue} onClose={() => setDialogue(false)} style="bg-white-600 max-w-[800px] flex justify-center items-center flex-col py-6" >
        <div className="w-[800px] flex max-h-[85vh] ">
          <aside className='w-[50%] text-center flex flex-col gap-2 p-4'>
            <div className='w-full h-[140px] flex justify-center items-center flex-col'>
              <div className="w-[70px] h-[100px] flex justify-center items-center overflow-hidden pointer-events-none m-auto" >
                <Image src={selectedCompanyData[0]?.logo} alt="" width={100} height={100} sizes='' className="object-cover" />
              </div>
              <p className='text-[24px] text-brand-primary font-semibold'>{selectedCompanyData[0]?.company_name}</p>
            </div>
            <p className='text-[16px]'>
              {selectedCompanyData[0]?.description?.slice(0, 150)}
              {selectedCompanyData[0]?.description && selectedCompanyData[0]?.description.length > 15 ? '...' : ''}
            </p>
            <div className='w-full h-[150px] overflow-y-scroll hide-scrollbar text-left border rounded-lg pl-2'>
              <p className='text-[16px] text-brand-primary font-semibold mt-2'>Categories:</p>
              <ul className='pl-2'>
                {
                  selectedCompanyData[0]?.categories?.list?.map((category: any, index: number) => (<li key={index} className="flex items-center gap-1"><TiTick className="text-Black-600 text-brand-primary" size={20} /> {category}</li>))
                }
              </ul>
            </div>
            <div className='m-auto w-[80%]  mt-4  flex justify-end items-center gap-4 flex-col pt-2'>
              <div className='flex gap-4'>
                <a href={`${selectedCompanyData[0]?.social_media?.linkedIn}`} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin size={30} className='text-brand-primary' />
                </a>
                <a href={`${selectedCompanyData[0]?.website}`} target="_blank" rel="noopener noreferrer">
                  <FaGlobe size={30} className='text-brand-primary' />
                </a>
              </div>
            </div>
          </aside>
          <aside className="w-[50%] border-l-2 text-center flex flex-col gap-2 p-4">
            <div className='w-full h-[140px] text-center flex justify-center items-center flex-col'>
              <div className="w-[70px] h-[100px] flex justify-center items-center overflow-hidden pointer-events-none m-auto" >
                <Image src={selectedCompanyData[1]?.logo} alt="" width={100} height={100} sizes='' className="object-cover w-[150px] m-auto" />
              </div>
              <p className='text-[24px] text-brand-primary font-semibold'>{selectedCompanyData[1]?.company_name}</p>
            </div>
            <p className='text-[16px]'>
              {selectedCompanyData[1]?.description?.slice(0, 150)}
              {selectedCompanyData[1]?.description && selectedCompanyData[0]?.description.length > 15 ? '...' : ''}
            </p>
            <div className='w-full h-[150px] overflow-y-scroll hide-scrollbar text-left border rounded-lg pl-2'>
              <p className='text-[16px] text-brand-primary font-semibold mt-2'>Categories:</p>
              <ul className='pl-2'>
                {selectedCompanyData[1]?.categories?.list?.map((category: any, index: number) => (<li key={index} className="flex items-center gap-1"><TiTick className="text-Black-600 text-brand-primary" size={20} /> {category}</li>))}
              </ul>
            </div>
            <div className='m-auto w-[80%] mt-4 flex justify-end items-center gap-4 flex-col pt-2'>
              <div className='flex gap-4'>
                <a href={`${selectedCompanyData[1]?.social_media?.linkedIn}`} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin size={30} className='text-brand-primary' />
                </a>
                <a href={`${selectedCompanyData[1]?.website}`} target="_blank" rel="noopener noreferrer">
                  <FaGlobe size={30} className='text-brand-primary' />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </Dialogue>
    </section>
  );
};

export default Explore;
