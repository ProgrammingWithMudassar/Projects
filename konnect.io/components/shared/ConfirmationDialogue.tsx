'use client'
import React, { useState } from 'react'
import Dialogue from '@/components/shared/Dialogue'
import Button from './Button'

const ConfirmationDialogue = () => {
    const [isDialogue, setIsDialogue] = useState<boolean>(true);
    const toggleDialogue = () => {
        setIsDialogue((prevValue) => !prevValue);
    };

    return (
        <Dialogue
            show={isDialogue}
            onClose={toggleDialogue}
            style="max-w-[400px] bg-white-600 flex justify-center items-center flex-col py-6"
        >
            <div className='w-full px-4'>
                <p className='text-left text-[20px]'>Are you sure?</p>
                <div className='w-full flex justify-end gap-2'>
                    <Button
                        type={"submit"} 
                        style="w-[100px] bg-brand-primary rounded-full md:text-[16px] text-[14px]  mt-8 max-h-[20px] "
                        text="Confirm"
                        onClick={() => { }}
                    />
                    <Button
                        type={"submit"}
                        style="w-[100px] bg-brand-primary rounded-full md:text-[16px] text-[14px] mt-8 max-h-[20px]"
                        text="Cancel"
                        onClick={() => { }}
                    />
                </div>
            </div>
        </Dialogue>
    )
}

export default ConfirmationDialogue
