'use client'
import React, { Fragment, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/shared/Button';
import Dialogue from '@/components/shared/Dialogue'
import DetailCard from './DetailCard';
import StatusCard from './StatusHandler';
import { IKonnectStatus } from '@/types/types';
import CheckBox from './CheckBox';
import Tooltip from '@mui/material/Tooltip';
import { BsFolderPlus, BsFolderMinus } from 'react-icons/bs';
import { useSaveVendorMutation, useDeleteSaveVendorMutation } from '@/Redux/RTK_API/Auth_Api';
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-toastify';


type CompanyData = { id: string; company_name: string; description: string; website: string; logo: string; social_media: any; saved: number };
type vendorID = { id: string };

type Props = {
  companyData: CompanyData;
  cardInnerStyle?: string; refetch: () => void;
  onCheckboxChange?: (companyData: CompanyData, isChecked: boolean) => void;
  onView?: (vendorID: vendorID) => void;
  onRemove?: void;
};

type saveVendor = { vendor_id: number };

const CompanyCard = ({ companyData, cardInnerStyle, refetch, onCheckboxChange, onView }: Props) => {
  const { token } = useAuth();
  const [isMenu, setMenu] = useState<boolean>(false)
  const [isDialogue, setDialogue] = useState<boolean>(false)
  const [SCardDialogue, setSCardDialogue] = useState<boolean>(false)
  const [status, setStatus] = useState<IKonnectStatus>({
    activeProject: false, moreInformation: false, exploring: false
  })
  const [check, SetCheck] = useState<boolean>(false)
  const truncatedDescription = companyData.description.slice(0, 100);
  const isTruncated = companyData.description.length > 150;


  // Query 
  const [saveVendor] = useSaveVendorMutation();
  const [deleteVendor] = useDeleteSaveVendorMutation();
  type ApiResponse = {
    data?: any; status?: any;
    error?: { status?: any } & (FetchBaseQueryError | SerializedError);
  };

  const handleSaveVendor = async () => {
    const formData: saveVendor = { vendor_id: +companyData.id }
    const response: ApiResponse = await saveVendor({ formData, accessToken: token });
    if (response.error && response.error.status === 500) { return toast.error("Server is busy", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true }) }
    if (response.error && response.error.status === 404) { return toast.error("Vendor not exist", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true }) }
    if (response.error && response.error.status === 403) { return toast.error("Forbidden - Limited access.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true }) }
    if (response.error && response.error.status === 400) { return toast.error("Invalid vendor id.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true }) }
    refetch();
    return toast.success("Vendor saved in list", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true })
  }

  const handleRemoveVendor = async () => {
    const formData: saveVendor = { vendor_id: +companyData.saved }
    const response: ApiResponse = await deleteVendor({ formData, accessToken: token });

    if (response.error && response.error.status === 500) { return toast.error("Server is busy", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true }) }
    if (response.error && response.error.status === 404) { return toast.error("Vendor not exist", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true }) }
    if (response.error && response.error.status === 403) { return toast.error("Forbidden - Limited access.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true }) }
    if (response.error && response.error.status === 400) { return toast.error("Invalid saved vendor ID.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true }) }
    return toast.success("Vendor removed from list.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true })
  }

  const handleCheckBoxClick = (e: React.ChangeEvent<HTMLInputElement>, companyData: CompanyData) => {
    SetCheck(e.target.checked)
    onCheckboxChange && onCheckboxChange(companyData, e.target.checked);
  }


  return (
    <Fragment>
      <div>
        <div className="w-[100%]">
          <div className={`bg-white-600 rounded-xl p-3 lg:border-[2px] border-gray-200 ${cardInnerStyle}`}>
            <div className='flex justify-between gap-2 z-[100]'>
              <CheckBox label='Compare' checked={check} onCheck={(e) => handleCheckBoxClick(e, companyData)} />
              {/* Save */}
              <Tooltip title={companyData.saved ? "Remove" : "Save"} placement='top' arrow >
                <button onClick={companyData.saved ? handleRemoveVendor : handleSaveVendor} className='w-[30px] h-[30px] flex justify-center items-center rounded-full bg-transparent hover:bg-gray-300 transition-none duration-300 text-black-500' >
                  {companyData.saved ? <BsFolderMinus /> : <BsFolderPlus />}
                </button>
              </Tooltip>
            </div>
            <div className="w-full flex justify-start items-center gap-2 my-3">
              <div className='relative w-[40px] h-[40px] rounded-full overflow-hidden bg-brand-primary_light'>
                <Image fill sizes="(max-width: 768px) 100vw, 100vw" alt="Profile picture" src={companyData.logo} priority blurDataURL="blur" className="pointer-events-none object-contain" />
              </div>
              <h5 className="text-[12px] text-brand-primary font-bold">{companyData.company_name}</h5>
            </div>
            <h6 className="mt-3 font-bold text-brand-primary text-[12px] z-[100]">Summary: </h6>
            <p className="text-[10px] md:tex-[12px] text-left">{isTruncated ? `${truncatedDescription}...` : companyData.description}</p>

            <div className="flex gap-2 mt-4 z-[10000]">
              <Button
                style="lg:p-4 p-1 max-h-[14px] shadow-inner hover:bg-black-500 bg-black-500 min-w-[40%] rounded-full m-auto text-[8px] md:text-[10px]"
                text="Konnect"
                onClick={() => { setSCardDialogue(true); setMenu(!isMenu); }}
              />
              <Button
                style="lg:px-4 px-3 max-h-[10px] shadow-inner hover:bg-black-500 bg-black-500 min-w-[40%] rounded-full m-auto text-[8px] md:text-[10px]"
                text="See More"
                onClick={() => {
                  setDialogue(true);
                  setMenu(!isMenu);
                  if (onView) {
                    const id = companyData.id;
                    onView({ id });
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <Dialogue show={SCardDialogue} onClose={() => setSCardDialogue(false)} style="bg-brand-primary max-w-[400px] flex justify-center items-center flex-col py-6" >
        <StatusCard status={status} setStatus={setStatus} companyData={companyData} />
      </Dialogue>
      <Dialogue show={isDialogue} onClose={() => setDialogue(false)} style="bg-white-600 max-w-[400px] flex justify-center items-center flex-col py-6" >
        <DetailCard website={companyData.website} description={companyData.description} img={companyData.logo} companyName={companyData.company_name} LinkedIn={companyData.social_media.linkedIn} />
      </Dialogue>
    </Fragment>
  );
};

export default CompanyCard;

