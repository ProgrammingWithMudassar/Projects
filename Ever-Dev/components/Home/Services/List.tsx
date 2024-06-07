import React from 'react';
import { HiArrowNarrowRight } from "react-icons/hi"

type Props = {
    title: string;
    description?: string
}

const List = ({ title, description }: Props) => {
    return (
        <div className='w-full flex justify-center items-start flex-col gap-4' >
            <div className='flex justify-center items-center gap-2' >
                <HiArrowNarrowRight className='text-white text-[20px] min-w-[30px]' />
                <h3 className='font-primary font-semibold md:text-[18px] text-[16px] leading-[18px] text-white select-none' >
                    {title}
                </h3>
            </div>
            {
                description &&
                <p className='font-primary font-light text-[16px] leading-[24px] text-white/70 select-none md:pl-10' >
                    {description}
                </p>
            }
        </div>
    )
}

export default List