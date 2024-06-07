'use client'
import React from 'react';
import Button from "@/components/shared/Button"
import ChartButton from '@/components/shared/ChartButton';
import { BsCloudDownload } from "react-icons/bs";
import PieChartHandler from '@/components/Vendor/Dashboard/PieChartHandler';
import TeamActivityCart from '@/components/Vendor/Dashboard/TeamActivityCart';
import InteractionCard from '@/components/shared/InteractionCard';
import CompanyMetrics from '@/components/Vendor/Snippets/CompanyMetrics';
import Label from '@/components/Vendor/Snippets/Label';
import Lines from "@/json/Lines.json"
import Link from 'next/link';
import LinesChart from '@/components/Vendor/Dashboard/LinesChart';
import GlobalInteractions from '@/components/Vendor/Dashboard/GlobalInteractions';
import { useVendorStatsWidgetsQuery, useVendorStatsSnippetsQuery } from "@/Redux/RTK_API/Auth_Api";
import { useAuth } from '@/hooks/useAuth'
import { Skeleton } from '@mui/material'

const Dashboard = () => {
  const { token } = useAuth();
  // Query 
  const { data, isLoading, isSuccess, refetch } = useVendorStatsWidgetsQuery({ accessToken: token });
  const { data: VSData, isLoading: VSLoading, isSuccess: VSSuccess, refetch: VSRetch } = useVendorStatsSnippetsQuery({ accessToken: token });
  const averageCompanySizeData = data?.averageCompanySize ? Object.entries(data.averageCompanySize)?.map(([label, value]) => {
    const stringValue: string = typeof value === 'string' ? value : String(value);
    return {
      id: label,
      label: label,
      value: parseInt(stringValue),
      color: "#07689F"
    };
  }) : [];

  const Data = [...averageCompanySizeData];
  const isAverageCompanySizeDataEmpty = averageCompanySizeData.length === 0;
  const percentage = parseFloat(data?.teamActivity);
  const TA = 100 - percentage;
  const RTA = 100 - TA;

  const TeamData = [
    { id: 'stepdown', label: 'StepDown', value: RTA, color: '#f7f7f7' },
    { id: 'TeamActivity', label: 'TeamActivity', value: TA, color: 'rgba(7, 104, 159, 0.30)' }
  ]

  const formattedTeamData = TeamData?.map((item) => {
    let color = '#f7f7f7';
    if (item.id === 'TeamActivity') {
      if (item.value < 30) { color = 'red' }
      else if (item.value >= 30 && item.value < 60) { color = '#F7E401' }
      else if (item.value >= 60 && item.value < 80) { color = '#07689F' }
      else { color = '#04D81D' }
    }
    return { ...item, color: color };
  });


  const dummyData = [
    { title: 'Total Konnects', number: VSData?.allRecordsCount },
    { title: 'Konnects this quarter', number: VSData?.lastMonthCount },
    { title: 'Expired Konnects', number: VSData?.lastThreeMonthsCount },
    { title: 'Total Views', number: VSData?.viewCount },
  ]; 

  return (
    <section className="w-full flex justify-center items-center flex-col gap-4">
      <div className='w-full flex items-center justify-between'>
        <h1 className="lg:text-[24px] text-[16px] text-brand-primary">Dashboard</h1>
        <Button style="bg-brand-primary font-medium md:text-[12px] text-[12px] h-[28px]" onClick={() => { }} text="Download Report" type="submit" icon={<BsCloudDownload className="text-lg text-white-600" />} />
      </div>
      <div className="w-full grid md:grid-cols-4 gap-1 md:gap-4">
        {dummyData?.map((data, index) => (<CompanyMetrics key={index} loading={VSLoading} title={data.title} number={data.number} />))}
      </div>
      <div className="w-full grid xl:grid-cols-2 grid-cols-1 gap-4 mt-2">
        <aside className='w-full h-[calc(100vh-56px)] grid grid-cols-1 grid-rows-2 gap-4'>
          <div className='w-full h-full' >
            <Label text='Global Interaction View' />
            {isLoading ?
              <Skeleton sx={{ borderRadius: "16px" }} width={"100%"} height={'auto'} />
              :
              <div className='w-full h-[calc(100%-56px)] bg-white-300 rounded-xl shadow-sm text-center overflow-hidden mt-4 relative group'>
                <GlobalInteractions />
              </div>
            }
          </div>
          <div className='w-full h-full' >
            <Label text='Actual & Goal Average' />
            <div className='w-full h-[calc(100%-56px)] bg-white-300 rounded-xl shadow-sm overflow-hidden mt-4'>
              <div className='h-[36px] flex justify-center items-center gap-4'>
                <ChartButton onClick={() => { }} text="Day" type={"button"} />
                <ChartButton onClick={() => { }} text="Monthly" type={"button"} />
                <ChartButton onClick={() => { }} text="Quarterly" type={"button"} />
                <ChartButton onClick={() => { }} text="Yearly" type={"button"} />
              </div>
              <div className='w-full h-[calc(100%-40px)] relative group' >
                <LinesChart data={Lines} />
                <Link href={"/vendor/dashboard/global_view"} className='lg:block hidden transition-all duration-500 px-2 py-1 text-[12px] text-white-600 bg-black-300 rounded-full absolute right-5 -bottom-10 group-hover:bottom-5' >
                  See more
                </Link>
              </div>
            </div>
          </div>
        </aside>

        <aside className='w-full h-full grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='w-full h-full grid grid-cols-1 grid-rows-3 gap-4'>
            {isLoading ? (
              <Skeleton sx={{ borderRadius: "16px" }} width={"100%"} height={'auto'} />
            ) : averageCompanySizeData.length === 0 ? (
              <div className="w-full h-full flex justify-center items-center flex-col bg-white-300 p-2 text-center rounded-xl shadow-md">
                <h4 className='text-xl font-bold text-brand-primary'>Waiting for konnetor to Contact.</h4>
              </div>
            ) : (
              <div className="w-full h-full flex justify-center items-center flex-col bg-white-300 p-2 text-center rounded-xl shadow-md">
                <div className='w-full h-[calc(100%-28px)]'>
                  <h4 className='text-xl font-bold text-brand-primary'>AVG Company Size</h4>
                  <PieChartHandler data={Data} innerRadiusData={0.4} cornerRadiusData={4} />
                </div>
              </div>
            )}
                 {isLoading ? <Skeleton sx={{ borderRadius: "16px" }} width={"100%"} height={'auto'} /> :
              <div className="w-full flex justify-center items-center flex-col bg-white-300 p-2 text-center rounded-xl shadow-md">
                <InteractionCard title={"Team Activity"} number={`${percentage}%`} style='h-full' />
              </div>
            }
            {isLoading ? <Skeleton sx={{ borderRadius: "16px" }} width={"100%"} height={'auto'} /> :
              <div className="w-full flex justify-center items-center flex-col bg-white-300 p-2 text-center rounded-xl shadow-md">
                <InteractionCard title={"Konnectors Revealed"} number={data?.konnectors_revealed} style='h-full' />
              </div>
            }
          </div>
          <div className='w-full h-full grid grid-cols-1 grid-rows-3 gap-4'>
            {isLoading ? <Skeleton sx={{ borderRadius: "16px" }} width={"100%"} height={'auto'} /> : <InteractionCard title={"Active Projects"} number={data?.active_projects} style='h-full' />}
            {isLoading ? <Skeleton sx={{ borderRadius: "16px" }} width={"100%"} height={"auto"} /> : <InteractionCard title={"More Information"} number={data?.moreInfo} style='h-full' />}
            {isLoading ? <Skeleton sx={{ borderRadius: "16px" }} width={"100%"} height={"auto"} /> : <InteractionCard title={"Exploring"} number={data?.exploring} style='h-full' />}
          </div>
        </aside>
      </div>

    </section>
  );
};

export default Dashboard;


