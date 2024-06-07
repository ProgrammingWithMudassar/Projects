'use client'
import React from 'react'
import Button from '@/components/shared/Button'
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";


const NotFound = () => {
    return (
        <div className='w-full h-[100vh] flex justify-center items-center flex-col'>
            <h2 className='text-[40px] md:text-[80px] font-bold text-brand-primary'>404</h2>
            <p className="font-bold text-3xl md:text-[40px] text-black-300">  This page does not exist</p>

            <Link href={"/"} >
                <Button
                    type={"submit"}
                    style="bg-brand-primary my-6 rounded-full md:text-[16px] text-[14px] m-auto  mt-10 "
                    text="Go Back Home"
                    onClick={() => { }}
                    icon={<BsArrowRight className="md:text-2xl text-[16px] text-white-600" />}
                />
            </Link>
        </div>
    )
}

export default NotFound