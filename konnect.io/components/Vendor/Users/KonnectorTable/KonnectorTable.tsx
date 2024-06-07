'use client'
import React, { ChangeEvent, useState } from 'react';
import Pagination from "@mui/material/Pagination";
import Button from '@/components/shared/Button'
import Dialogue from '@/components/shared/Dialogue';
import UserTableDialog from '../../Snippets/UserTableDialog';
import Search from '@/components/shared/Search';
import TableHeader from './KonnectorTableHeader'
import TableRow from './KonnectorTableRow'
import { useGetAllInternalsQuery, useInternalsWithoutPaginationQuery, useVendorUnsignedChatsQuery, useVendorAssignChatMutation } from "@/Redux/RTK_API/Auth_Api";
import { useAuth } from '@/hooks/useAuth'
import { PiSmileySad } from 'react-icons/pi';
import { RingLoader } from 'react-spinners';
import WaveSkeleton from '@/components/shared/WaveSkeleton';
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

interface User {
    id: number;
    name: string;
    Territory: string;
    setups?: string[];
}

type Props = {
    title?: string
}

type ApiResponse = {
    data?: any; status?: any;
    error?: { status?: any } & (FetchBaseQueryError | SerializedError);
};
const KonnectorTable = ({ title }: Props) => {
    const { token } = useAuth();
    const [isDialogueNewUser, setIsDialogueNewUser] = useState<boolean>(false);
    const [isDialogue, setIsDialogue] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState('');
    const [activePage, setActivePage] = useState<number>(1);
    const [conformationDialogue, setConformationDialogue] = useState<boolean>(false);
    const [sendData, setSendData] = useState<{ unSignedVendor: any | null, interId: number }>({ unSignedVendor: null, interId: 0 });



    const toggleDialogueNewUser = () => { setIsDialogueNewUser((prevValue) => !prevValue) };
    const toggleDialogueSearch = () => { setIsDialogue((prevValue) => !prevValue) };
    const toggleDialogueDelete = () => { setConformationDialogue((prevValue) => !prevValue) };

    // Query 
    const { data, isLoading, isSuccess, refetch, isError } = useGetAllInternalsQuery({ page: activePage, search: searchValue, accessToken: token });
    const { data: AllInternalData, refetch: InternalRefetch } = useInternalsWithoutPaginationQuery({ accessToken: token })
    const { data: unSingedVendor, refetch: VendorRefetch } = useVendorUnsignedChatsQuery({ accessToken: token })
    const [vendorAssign] = useVendorAssignChatMutation();
    console.log(unSingedVendor);
    

    const handleSelectChange = (e: any) => {
        const selectedInterId = parseInt(e.target.value, 10);
        setSendData({ ...sendData, interId: selectedInterId });
    };

    const message_ids: any = [];
    const handleCheckboxChange = (messageId: string) => {
        const index = message_ids.indexOf(messageId);
        if (index !== -1) { message_ids.splice(index, 1) }
        else { message_ids.push(messageId) }
    }

    const handleAssign = async () => {
        const formData = {
            message_ids: message_ids,
            internal_id: sendData.interId,
        }
        const response: ApiResponse = await vendorAssign({ formData, accessToken: token });

        if (response.error && response.error.status === 500) { return toast.error("Server is busy", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true }) }
        if (response.error && response.error.status === 403) { return toast.error("Forbidden - Limited access.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true }) }
        if (response.error && response.error.status === 400) { return toast.error("Credentials required.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true }) }
        else {
            return toast.success("Assigned successfully.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true })
            VendorRefetch();
            InternalRefetch();
        }
    }

    return (
        <div className="w-full p-4 bg-white-300 rounded-2xl shadow-md">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold text-brand-primary">{title}</h1>
                <div className="flex justify-end items-center gap-2">
                    <button onClick={handleAssign} className='px-4 py-1 bg-brand-primary rounded-full text-white-600'>Assign To</button>
                    <div className='w-[300px]'>
                        <select
                            name="" id=""
                            onChange={handleSelectChange}
                            value={sendData.interId}
                            className='w-full h-[32px] border rounded-xl pl-2'>
                            {Array.isArray(AllInternalData) ? (
                                AllInternalData.map((item: any, index: any) => (
                                    <option key={index} value={item.id}>
                                        {item.first_name}
                                    </option>
                                ))
                            ) : (
                                <option value="">No Internal exist.</option>
                            )}
                        </select>
                    </div>
                </div>
            </div>

            <div className="w-full h-[300px] mt-2 overflow-auto rounded-tl-xl rounded-tr-xl">
                <TableHeader headers={["select", "Company Name", "Locaiton"]} />
                <div className="w-full h-[calc(100%-50px)] md:overflow-auto">
                    {isLoading && [1, 2, 3, 4, 5, 6].map((i) => <WaveSkeleton key={i} styles='h-[35px] mt-1' />)}
                    {isSuccess && <TableRow data={unSingedVendor?.chats} refetch={refetch} onCheckboxChange={handleCheckboxChange} />}
                    {(isError || data?.internals?.length === 0) &&
                        <div className='w-full flex justify-center items-center flex-col text-[18px] font-semibold text-brand-primary my-10' >
                            <PiSmileySad className='text-[100px] text-center' /> Nothing to show
                        </div>}
                </div>
            </div>


            <div className="flex justify-center lg:justify-end">
                <Pagination color="primary" count={data?.totalPages} page={data?.currentPage} variant="outlined" shape="rounded" onChange={(event: ChangeEvent<unknown>, page: number): void => { setActivePage(page) }} />
            </div>
            {/* Add New  */}
            <Dialogue show={isDialogueNewUser} onClose={toggleDialogueNewUser} style="max-w-[700px]  bg-brand-primary " >
                <UserTableDialog title='Add New User' buttonName="Add" onSearch={() => { }} refetch={refetch} onClose={toggleDialogueNewUser} />
            </Dialogue>
            {/* Search  */}
            <Dialogue show={isDialogue} onClose={toggleDialogueSearch} style="max-w-[350px] bg-brand-primary " >
                <UserTableDialog title='Search User' buttonName="Search" onSearch={() => { }} refetch={refetch} onClose={toggleDialogueSearch} />
            </Dialogue>
            {/* Delete Dialoge box  */}
            <Dialogue
                show={conformationDialogue}
                onClose={toggleDialogueDelete}
                style="max-w-[400px] bg-brand-primary flex flex-col justify-center items-center p-6 gap-6" >
                <h4 className="w-full text-xl font-bold text-left text-white-600">Are you sure to delete the user?</h4>
                <div className='w-full flex justify-end items-center gap-4'>
                    <Button style="bg-black-600 font-medium md:text-[16px] text-[14px] h-[20px]" onClick={toggleDialogueDelete} text="Sure" type="submit" />
                    <Button style="bg-black-600 font-medium md:text-[16px] text-[14px] h-[20px]" onClick={toggleDialogueDelete} text="Cancel" type="submit" />
                </div>
            </Dialogue>

        </div>
    );
};

export default KonnectorTable;
