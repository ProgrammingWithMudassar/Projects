'use client'
import React, { ChangeEvent, useState } from 'react';
import Pagination from "@mui/material/Pagination";
import Button from '@/components/shared/Button'
import Dialogue from '@/components/shared/Dialogue';
import UserTableDialog from '../Snippets/UserTableDialog';
import Search from '@/components/shared/Search';
import TableHeader from './TableHeader'
import TableRow from './TableRow'
import { useGetAllInternalsQuery } from "@/Redux/RTK_API/Auth_Api";
import { useAuth } from '@/hooks/useAuth'
import { PiSmileySad } from 'react-icons/pi';
import { RingLoader } from 'react-spinners';
import WaveSkeleton from '@/components/shared/WaveSkeleton';


interface User {
    id: number;
    name: string;
    Territory: string;
    setups?: string[];
}

type Props = {
    title?: string
}

const UserTable = ({ title }: Props) => {
    const { token } = useAuth();
    const [isDialogueNewUser, setIsDialogueNewUser] = useState<boolean>(false);
    const [isDialogue, setIsDialogue] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState('');
    const [activePage, setActivePage] = useState<number>(1);
    const [conformationDialogue, setConformationDialogue] = useState<boolean>(false);


    const toggleDialogueNewUser = () => { setIsDialogueNewUser((prevValue) => !prevValue) };
    const toggleDialogueSearch = () => { setIsDialogue((prevValue) => !prevValue) };
    const toggleDialogueDelete = () => { setConformationDialogue((prevValue) => !prevValue) };

    // Query 
    const { data, isLoading, isSuccess, refetch, isError } = useGetAllInternalsQuery({
        page: activePage,
        search: searchValue,
        accessToken: token
    });

    return (
        <div className="w-full p-4 bg-white-300 rounded-2xl shadow-md">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold text-brand-primary">{title}</h1>
                <div className="flex justify-end items-center gap-2">
                    <Button style="bg-brand-primary font-medium md:text-[16px] text-[14px] h-[20px]" onClick={toggleDialogueNewUser} text="New" type="submit" />
                    <Search value={searchValue} onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)} />
                </div>
            </div>

            <div className="w-full h-[300px] mt-2 overflow-auto rounded-tl-xl rounded-tr-xl">
                <TableHeader headers={["First Name", "Last Name", "Email", "Action", "Chats"]} />
                <div className="w-full h-[calc(100%-50px)] md:overflow-auto">
                    {isLoading && [1, 2, 3, 4, 5, 6].map((i) => <WaveSkeleton key={i} styles='h-[35px] mt-1' />)}
                    {(isError || data?.internals?.length === 0) &&
                        <div className='w-full flex justify-center items-center flex-col text-[18px] font-semibold text-brand-primary my-10' >
                            <PiSmileySad className='text-[100px] text-center' /> Nothing to show
                        </div>}
                    {isSuccess && <TableRow data={data?.internals} refetch={refetch} />}
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

export default UserTable;
