'use client'
import React, { useState } from 'react'
import Button from "@/components/shared/Button"
import InteractionCard from '@/components/shared/InteractionCard'
import CompanyMetrics from '@/components/Vendor/Snippets/CompanyMetrics'
import { BsArrowRight } from "react-icons/bs";
import UserTable from '@/components/Vendor/Users/Filters'
import { useAuth } from '@/hooks/useAuth'
import KonnectorTable from '@/components/Vendor/Users/KonnectorTable/KonnectorTable'
import { useVendorStatsSnippetsQuery } from "@/Redux/RTK_API/Auth_Api";
import Link from 'next/link'

const Users = () => {
  const { user, token } = useAuth()
  const { data: VSData, isLoading: VSLoading, isSuccess: VSSuccess, refetch: VSRetch } = useVendorStatsSnippetsQuery({ accessToken: token });


  const dummyData = [
    { title: 'Total Konnects', number: VSData?.allRecordsCount },
    { title: 'Konnects this quarter', number: VSData?.lastMonthCount },
    { title: 'Expired Konnects', number: VSData?.lastThreeMonthsCount },
    { title: 'Total Views', number: VSData?.viewCount },
  ];

  return (
    <section className='w-full h-full'>
      <div className="w-full grid md:grid-cols-5 gap-1 md:gap-4">
        {dummyData.map((data, index) => (<CompanyMetrics key={index} title={data.title} loading={false} number={data.number} />))}
      </div>
      <div className='w-full mt-4 grid grid-rows gap-4' >


        {/* Internals table  */}
        <UserTable title={"Internals"} />



        {/* Konnector table  */}
        <KonnectorTable title={"Chat Unassigned"} />


        <aside className='w-full md:w-[80%] h-full gap-4 m-auto'>
          <div>
            <div className='w-full grid-cols-1 grid lg:grid-cols-3 gap-4 mt-2'>
              <InteractionCard title={"Active Projects"} number={2342} style='h-full' />
              <InteractionCard title={"Active Projects"} number={2342} style='h-full' />
              <InteractionCard title={"Active Projects"} number={2342} style='h-full' />
            </div>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-4 mt-4">
            <h4 className='w-full text-left md:col-span-2 col-span-1'>{user?.first_name}</h4>
            {dummyData.map((data, index) => (<CompanyMetrics key={index} loading={false} title={data.title} number={data.number} />))}
          </div>

          <div className='w-[100%] md:w-[50%] m-auto flex justify-center items-center flex-col lg:flex-row gap-4 mt-4'>
            <Button style="bg-brand-primary font-medium md:text-[12px] text-[10px]" onClick={() => { }} text="Download Report" type="button" icon={<BsArrowRight className="text-2xl text-white-600" />} />
            <Link href={"/internal/konnects"} >
              <Button style="bg-brand-primary font-medium md:text-[12px] text-[10px]" onClick={() => { }} text="Profile" type="button" icon={<BsArrowRight className="text-2xl text-white-600" />} />
            </Link>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default Users
