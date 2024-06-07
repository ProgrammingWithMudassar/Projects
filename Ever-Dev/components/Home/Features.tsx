"use client"
import React from 'react'
import Wrapper from '../Shared/Wrapper'
import { Best, Fast, Star, Unlimited } from '@/svg/svg';
import { Zoom } from 'react-awesome-reveal';



const Features = () => {
    return (
        <Wrapper id="Features" style='relative py-28' >
            <div className='w-full relative z-20 bg-white grid md:grid-cols-[1fr,.2fr,1fr,.2fr,1fr] overflow-hidden rounded-[32px] gap-6' >
                <div className='w-full flex justify-center items-start flex-col gap-10 p-6' >
                    <Zoom>
                        <Unlimited className='w-[38px] h-[38px] fill-[#F9A13F]' />
                    </Zoom>
                    <div className='w-full h-[115px] flex justify-start items-start flex-col gap-2' >
                        <h2 className='font-primary text-[24px] leading-[24px] text-black-off text-start' >Unlimited Services</h2>
                        <p className='font-primary text-[16px] leading-[26px] text-black-off text-start' >Subscribe to a plan and request as many designs as you like for a flat monthly fee. No extra charges!</p>
                    </div>
                </div>
                <div className='h-full flex justify-center items-end' ><div className='md:w-[1px] w-full md:h-[40%] h-[1px] bg-black-off/10 md:mb-8' /></div>
                <div className='w-full flex justify-center items-start flex-col gap-10 p-6' >
                    <Zoom>
                        <Fast className='w-[37.98px] h-[38px] fill-[#F04636]' />
                    </Zoom>
                    <div className='w-full h-[115px] flex justify-start items-start flex-col gap-2' >
                        <h2 className='font-primary text-[24px] leading-[24px] text-black-off text-start' >Fast Delivery</h2>
                        <p className='font-primary text-[16px] leading-[26px] text-black-off text-start' >We’ll complete your task in approximately fifteen business days.</p>
                    </div>
                </div>
                <div className='h-full flex justify-center items-end' ><div className='md:w-[1px] w-full md:h-[40%] h-[1px] bg-black-off/10 md:mb-8' /></div>
                <div className='w-full flex justify-center items-start flex-col gap-10 p-6' >
                    <Zoom>
                        <Best className='w-[37.98px] h-[30.6px] fill-[#0204E6]' />
                    </Zoom>
                    <div className='w-full h-[115px] flex justify-start items-start flex-col gap-2' >
                        <h2 className='font-primary text-[24px] leading-[24px] text-black-off text-start' >Superb Quality</h2>
                        <p className='font-primary text-[16px] leading-[26px] text-black-off text-start' >{`We'll do whatever it takes to meet your requirements until you are 100% satisfied.`}</p>
                    </div>
                </div>
            </div>

            {/* Gradients */}
            <span className='absolute bottom-[10%] left-[10%] md:w-[200px] w-[150px] md:h-[200px] h-[150px] transform-[rotate(161.99deg)] opacity-30 bg-brand-main shadow-circle rounded-full md:blur-[100px] blur-[50px] pointer-events-none' />
            <span className='absolute bottom-[10%] left-[25%] md:w-[200px] w-[150px] md:h-[200px] h-[100px] transform-[rotate(161.99deg)] opacity-30 bg-brand-secondary shadow-circle rounded-full md:blur-[100px] blur-[50px] pointer-events-none' />

            {/* Star */}
            <Star className='md:w-[27px] w-[12px] md:h-[30px] h-[15px] fill-brand-main absolute top-2 left-[20%] pointer-events-none animate-pulse' />
            <Star className='md:w-[24px] w-[12px] md:h-[27px] h-[15px] fill-brand-tertiary absolute md:bottom-[25%] bottom-[5%] right-[5%] pointer-events-none animate-pulse' />
        </Wrapper>
    )
}

export default Features;