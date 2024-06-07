'use client'
import React, { Fragment, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/shared/Button';
import Dialogue from '@/components/shared/Dialogue'
import DetailCard from './DetailCard';
import StatusCard from './StatusHandler';
import { IKonnectStatus } from '@/types/types';
import CheckBox from './CheckBox';
import { BsFolderPlus } from 'react-icons/bs';
import Tooltip from '@mui/material/Tooltip';

const RecommendationCard = () => {
  const [isMenu, setMenu] = useState<boolean>(false)
  const [isDialogue, setDialogue] = useState<boolean>(false)
  const [SCardDialogue, setSCardDialogue] = useState<boolean>(false)

  const [status, setStatus] = useState<IKonnectStatus>({
    activeProject: false,
    moreInformation: false,
    exploring: false
  })

  const [check, SetCheck] = useState<boolean>(false)


  return (
    <Fragment>
      <div className={`w-full lg:h-[380px] sm:h-[340px] h-[320px] px-4 py-8 bg-white-600 rounded-xl lg:border-[2px] border-gray-200 sliderCard relative`}>
        <CheckBox label='Compare' checked={check} onCheck={(e: React.ChangeEvent<HTMLInputElement>) => SetCheck(e.target.checked)} />

        <div className="w-full flex justify-start items-center gap-2 my-3">
          <div className='relative w-[40px] h-[40px] rounded-full overflow-hidden bg-brand-primary_light'>
            <Image
              fill
              sizes="(max-width: 768px) 100vw, 100vw"
              alt="Profile picture"
              src="/Company/PAlto1.png"
              priority
             placeholder ="blur"
              blurDataURL="blur"
              className="pointer-events-none object-contain"
            />
          </div>
          <h5 className="text-[14px] text-brand-primary font-bold">Facebook</h5>
        </div>
        <h6 className="font-bold text-brand-primary text-[16px]">Summary: </h6>
        <p className="xl:text-[14px] text-[12px] text-left">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut tenetur voluptates suscipit ad quasi omnis magnam est</p>
        <div className="flex justify-start items-center gap-2 xl:mt-6 mt-3">
          <Button
            style="max-h-[30px] text-[12px] w-[80px] bg-black-500 hover:bg-black-500 rounded-full"
            text="Konnect"
            onClick={() => {
              setSCardDialogue(true);
              setMenu(!isMenu);
            }}
          />
          <Button
            style="max-h-[30px] text-[12px] w-[80px] bg-black-500 hover:bg-black-500 rounded-full"
            onClick={() => {
              setDialogue(true);
              setMenu(!isMenu);
            }}
            text="See More"
          />
        </div>

        {/* Save */}
        <Tooltip title="Save" placement='top' arrow className='absolute right-3 bottom-6' >
          <button className='w-[30px] h-[30px] flex justify-center items-center rounded-full bg-transparent hover:bg-gray-300 transition-none duration-300 text-black-500' >
            <BsFolderPlus />
          </button>
        </Tooltip>

      </div>
      <Dialogue show={isDialogue} onClose={() => setDialogue(false)} style="bg-white-600 max-w-[400px] flex justify-center items-center flex-col py-6" >
        <DetailCard website={''} description={'description'} img={''} companyName={''} LinkedIn={''} />
      </Dialogue>
      <Dialogue show={SCardDialogue} onClose={() => setSCardDialogue(false)} style="bg-brand-primary max-w-[400px] flex justify-center items-center flex-col py-6" >
        <StatusCard status={status} setStatus={setStatus} companyData={[]} />
      </Dialogue>
    </Fragment>
  );
};

export default RecommendationCard;
