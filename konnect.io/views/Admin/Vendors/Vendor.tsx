"use client"
import React, { ChangeEvent, useState, useEffect } from 'react'
import AdminStats from '@/components/Admin/Snippets/SnippetStatCard';
import { useAllVendorForAdminQuery } from '@/Redux/RTK_API/Auth_Api'
import { useAuth } from '@/hooks/useAuth'
import Search from '@/components/shared/Search';
import Link from 'next/link';
import Button from '@/components/shared/Button'
import TableHeader from "@/components/Table/Admin_Vendor/TableHeader";
import TableRow from "@/components/Table/Admin_Vendor/TableRow";
import Pagination from '@mui/material/Pagination';
import WaveSkeleton from '@/components/shared/WaveSkeleton';
import { PiSmileySad } from 'react-icons/pi';
import MiniSnippets from '@/components/Admin/Snippets/MiniSnippets';


const Vendor = () => {
  const [searchValue, setSearchValue] = useState('');
  const [activePage, setActivePage] = useState<number>(1);
  const { token } = useAuth();

  // Query 
  const { data, isLoading, isSuccess, refetch, isError } = useAllVendorForAdminQuery({
    page: activePage,
    search: searchValue,
    accessToken: token
  });

  useEffect(() => {
    refetch();
  }, [refetch])

  return (
    <section className="w-full overflow-hidden">
      <MiniSnippets />
      {/* <Table heads={heads} data={data} tableTitle="Vendors" route='/admin/vendor/register' /> */}
      <div className='w-[90vw] xs:w-[9vw5] md:w-full bg-white-300 rounded-2xl overflow-auto p-4'>
        <div className='w-full flex justify-between items-center sm:flex-row'>
          <h4 className="md:text-[22px] text-[18px] text-brand-primary py-2">All Vendors</h4>
          <div className="flex justify-between items-center gap-1 md:gap-4">
            <Search value={searchValue} onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)} />
            {
              <Link href={"/admin/vendor/register"} >
                <Button style="bg-brand-primary font-medium md:text-[16px] text-[14px] h-[40px]" onClick={() => { }} text="Add New" type="submit" />
              </Link>
            }
          </div>

        </div>
        <div className="w-full h-[300px] mt-2 overflow-auto rounded-tl-xl rounded-tr-xl">
          <TableHeader headers={["Company Name", "Address", "Action"]} />
          <div className="w-full h-[calc(100%-50px)] md:overflow-auto">
            {isLoading && [1, 2, 3, 4, 5, 6].map((i) => <WaveSkeleton key={i} styles='h-[35px] mt-1' />)}
            {(isError || data?.vendors?.length === 0) && <div className='w-full flex justify-center items-center flex-col text-[18px] font-semibold text-brand-primary my-10' >
              <PiSmileySad className='text-[100px] text-center' /> Nothing to show
            </div>}
            {isSuccess && <TableRow data={data?.vendors} refetch={refetch} />}
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <Pagination color="primary" count={data?.totalPages} page={data?.currentPage} variant="outlined" shape="rounded" onChange={(event: ChangeEvent<unknown>, page: number): void => { setActivePage(page) }} />
        </div>
      </div>
    </section>
  )
}

export default Vendor