'use client'
import React, { useState } from 'react';
import { useDeleteVendorMutation } from "@/Redux/RTK_API/Auth_Api";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { useAuth } from '@/hooks/useAuth';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { AiOutlineWarning } from 'react-icons/ai';
import { BsCheck2 } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import Dialogue from "@/components/shared/Dialogue";
import { PiSmileySad } from 'react-icons/pi';

interface InternalUser {
    id: number;
    company_name: string;
    address: string;
    email: string;
}

type Props = {
    data: InternalUser[];
    refetch: () => void;
};
type saveVendor = {
    Internal_id: number;
};

const TableRow = ({ data, refetch }: Props) => {
    const { token } = useAuth();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number>(0);
    const handleConfirmBox = (id: number) => {
        setSelectedUserId(id);
        setIsConfirmOpen(true);
    }
    const handleCloseConfirm = () => setIsConfirmOpen(false);

    const [deleteInternal] = useDeleteVendorMutation();
    type ApiResponse = {
        data?: any; status?: any;
        error?: { status?: any } & (FetchBaseQueryError | SerializedError);
    };

    const handleRemoveInternal = async (id: number) => {
        const formData: saveVendor = { Internal_id: +id }

        const response: ApiResponse = await deleteInternal({ formData, accessToken: token });
        if (response.error && response.error.status === 500) { return toast.error("Server is busy", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true }) }
        if (response.error && response.error.status === 403) { return toast.error("Forbidden - Limited access.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true }) }
        if (response.error && response.error.status === 404) { return toast.error("User not found", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true }) }
        if (response.error && response.error.status === 400) { return toast.error("Invalid saved vendor ID.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true }) }
        refetch();
        setIsConfirmOpen(false);
        return toast.success("User deleted successfully.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true })
    }

    return (
        <div className='w-full  bg-white-cool/10 items-center bg-white-600'>
            {data?.map((user: InternalUser) => (
                <div key={user.id} className='w-full h-[35px] flex items-center border-b-[1px] border-b-white-cool/10 px-4'>
                    <p className='w-[100px] md:w-[33%] text-black-600 text-[13px]'>{user.company_name}</p>
                    <p className='w-[100px] md:w-[34%] text-black-600 text-[13px]'>{user.address}</p>
                    <p className='w-[100px] md:w-[33%] text-black-600 text-[13px] font'>
                        <button onClick={() => handleConfirmBox(user.id)}><RiDeleteBin6Line size={16} className='text-red-600' /></button>
                    </p>
                </div>
            ))}


            <Dialogue show={isConfirmOpen} onClose={handleCloseConfirm}
                style="max-w-[500px] bg-white-600 flex justify-center items-center flex-col py-6">
                <div className="w-full flex items-center justify-start gap-2 px-4">
                    <AiOutlineWarning className="text-error-300" size={25} />
                    <p className="text-[20px]">Do you really want to delete?</p>
                </div>
                <div className="w-full flex justify-end items-center gap-2 px-4 mt-4">
                    <button className="px-8 py-[5px] border rounded-full" onClick={() => handleRemoveInternal(selectedUserId)}>
                        <BsCheck2 className="text-brand-primary" size={25} />
                    </button>
                    <button className="px-8 py-[5px] border rounded-full" onClick={handleCloseConfirm}>
                        <RxCross2 className="text-error-300" size={25} />
                    </button>
                </div>
            </Dialogue>
        </div>
    );
};

export default TableRow;
