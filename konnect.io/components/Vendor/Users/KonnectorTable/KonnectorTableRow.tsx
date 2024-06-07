import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import CheckBox from '@/components/shared/CheckBox';

interface InternalUser {
    id: number;
    user_id: number;
    company_name: string;
    hq_location: string;
    message_id: string;
}

type Props = {
    data: InternalUser[];
    refetch: () => void;
    onCheckboxChange?: (userId: any) => void;
};

const KonnectorTableRow = ({ data, refetch, onCheckboxChange }: Props) => {
    const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

    const handleCheckBoxClick = (userId: number) => {
        const updatedCheckedItems = {
            ...checkedItems,
            [userId]: !checkedItems[userId]
        };
        setCheckedItems(updatedCheckedItems);
            const user = data.find(item => item.id === userId);
            onCheckboxChange && onCheckboxChange(user?.message_id);
    };


    

    return (
        <div className='w-full bg-white-cool/10 items-center bg-white-600'>
            {data?.map((user: InternalUser) => (
                <div key={user.id} className='w-full h-[35px] grid grid-cols-[0.4fr,1fr,1fr] justify-start items-center border-b-[1px] border-b-white-cool/10 px-4'>
                    <CheckBox label='' checked={checkedItems[user.id] || false} onCheck={() => handleCheckBoxClick(user.id)} />
                    <p className='w-full text-black-600 text-[13px] text-left'>{user.company_name}</p>
                    <p className='w-full text-black-600 text-[13px] text-left flex'>{user.hq_location}</p>
                </div>
            ))}
        </div>
    );
};

export default KonnectorTableRow;
