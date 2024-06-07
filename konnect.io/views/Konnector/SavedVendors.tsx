'use client'
import React, { Fragment, useState, ChangeEvent } from "react";
import CompanyCard from "@/components/shared/CompanyCard";
import Pagination from "@mui/material/Pagination";
import Search from "@/components/shared/Search";
import { BsFilterRight } from 'react-icons/bs';
import NewFilters from "@/components/Konnectors/New/Filters";
import { useSavedVendorsQuery } from "@/Redux/RTK_API/Auth_Api";
import { useAuth } from "@/hooks/useAuth";
import Skeleton from '@mui/material/Skeleton';
import { PiSmileySad } from "react-icons/pi"


const SavedVendors = () => {
    const { token } = useAuth()
    const [filter, setFilters] = useState<boolean>(false)
    const [selectedCategories, setSelectedCategories] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [activePage, setActivePage] = useState<number>(1);
    const [vendorsData, setVendorsData] = useState({
        currentPage: 1,
        totalPages: 0,
        savedVendors: []
    });

    // Query 
    const { data, isLoading, isSuccess, refetch } = useSavedVendorsQuery({
        page: activePage,
        accessToken: token
    });

    return (
        <Fragment>
            <div className="max-w-full min-h-[calc(100vh-140px)]">
                <div className="w-full lg:flex lg:justify-between block">
                    <h1 className="lg:text-[24px] text-[16px] text-brand-primary">Save Vendors</h1>
                    <div className="m-auto md:m-0 relative">
                        <div className="mr-12  lg:mr-16">
                            <Search value={searchValue} onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)} />
                        </div>
                        <BsFilterRight className="absolute right-3 top-1/2 transform -translate-y-1/2 text-Black-600 cursor-pointer" size={32} onClick={() => setFilters(true)} />
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
                    </div> : isSuccess && data?.savedVendors?.length > 0 ?
                        <div className="grid grid-cols-5 gap-4 mt-4" >
                            {data?.savedVendors?.map((item: any, index: number) => <CompanyCard key={index} companyData={item} refetch={() => refetch()} />)}
                        </div>
                        :
                        <div className='w-full flex justify-center items-center flex-col text-[18px] font-semibold text-brand-primary my-10' >
                            <PiSmileySad className='text-[100px] text-center' />
                            Nothing to show
                        </div>
                }
            </div>
            <div className="mt-2 lg:mt-4 flex justify-center lg:justify-end">
                <Pagination color="primary" count={data?.totalPages} page={data?.currentPage} variant="outlined" shape="rounded" onChange={(event: ChangeEvent<unknown>, page: number): void => { setActivePage(page) }} />
            </div>
            <NewFilters open={filter} setOpen={setFilters} onCategoryChange={(categories: React.SetStateAction<string>) => setSelectedCategories(categories)} />
        </Fragment>
    );
};

export default SavedVendors;
