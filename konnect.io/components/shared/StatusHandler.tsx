'use client'
import React, { Fragment, useState } from 'react';
import SwitchBtn from './SwitchBtn';
import { IKonnectStatus } from '@/types/types';
import Button from './Button';
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from "next/navigation";
import { AiFillMessage } from 'react-icons/ai';


type Props = {
  status: IKonnectStatus;
  setStatus: (e: IKonnectStatus) => void;
  companyData: any;
};
type UserData = { vendor_id: any; interaction_type: string };

const StatusHandler = ({ status, setStatus, companyData }: Props) => {
  const { token, user } = useAuth();
  const router = useRouter();
  const [interactionType, setInteractionType] = useState<string>('');

  const handleSwitchBtnClick = (type: string) => {
    if (type === interactionType) { return }
    setInteractionType(type);
    setStatus({
      activeProject: type === 'active_project',
      moreInformation: type === 'more_information',
      exploring: type === 'exploring'
    });
  };



  return (
    <Fragment>
      <h4 className='text-[14px] lg:text-[22px] text-white-600 font-bold w-[60%] m-auto'>Update your Konnector Status:</h4>
      <div className='flex flex-col justify-center items-center gap-4 mt-8'>
        <div className='flex justify-center items-center'>
          <SwitchBtn active={interactionType === 'active_project'} setActive={() => handleSwitchBtnClick('active_project')} />
          <span className='ml-4 w-[130px] text-left text-white-600'>Active Project</span>
        </div>
        <div className='flex justify-center items-center'>
          <SwitchBtn active={interactionType === 'more_information'} setActive={() => handleSwitchBtnClick('more_information')} />
          <span className='ml-4 w-[130px] text-left text-white-600'>More Information</span>
        </div>
        <div className='flex justify-center items-center'>
          <SwitchBtn active={interactionType === 'exploring'} setActive={() => handleSwitchBtnClick('exploring')} />
          <span className='ml-4 w-[130px] text-left text-white-600'>Exploring</span>
        </div>
        {interactionType && (
          <Button text="Let's Chat" icon={<AiFillMessage className="text-2xl text-white-600 rounded-full" />} type="button" onClick={() => {
            router.push(`/konnector/konnects/?user_id=${user?.id}&vendor_id=${companyData.id}&interaction_type=${interactionType}&user_profile_icon=${companyData.logo}&user_company=${user?.company_name}&vendor_profile_icon=${companyData.logo}&vendor_company=${companyData?.company_name}`)
          }} style="bg-brand-secondary text-[14px] h-[40px] mx-auto mt-4" />
        )} </div>
    </Fragment>
  );
};

export default StatusHandler;
