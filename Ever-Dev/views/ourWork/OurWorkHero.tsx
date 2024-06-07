'use client'
import React from 'react'
import Wrapper from '@/components/Shared/Wrapper';
import Image from 'next/image';
import * as Svg from "@/svg/svg"
import { Zoom } from "react-awesome-reveal";


const OurWorkHero = () => {
  return (
    <Wrapper id="OurWork" style="md:h-[calc(100vh-70px)]" >
      <div className='relative w-full h-full flex justify-center items-center flex-col lg:py-0 py-8' >
        <h1 className='relative font-primary font-[300] uppercase lg:text-[220px] text-[60px] lg:leading-[180px] leading-[70px] text-black-off pointer-events-none md:ml-12' >
          <span className='md:-ml-24' >Our</span><br /><span >Work</span><br />
          <span className='absolute bottom-[30%] right-[10%] md:w-[250px] w-[150px] md:h-[250px] h-[150px] transform-[rotate(161.99deg)] opacity-30 bg-brand-main shadow-circle rounded-full md:blur-[100px] blur-[50px] pointer-events-none' />
          <span className='absolute -bottom-[5%] right-[0%] md:w-[200px] w-[150px] md:h-[250px] h-[100px] transform-[rotate(161.99deg)] opacity-30 bg-brand-secondary shadow-circle rounded-full md:blur-[100px] blur-[50px] pointer-events-none' />
        </h1>
        <Zoom className='absolute lg:w-[350px] md:w-[210px] w-[180px] lg:h-[320px] md:h-[200px] h-[170px] lg:mt-0 md:mt-12 mt-9 lg:ml-[3.4rem] md:ml-[7.5rem] ml-10 pointer-events-none' >
          <Image alt='' src={"/heroVector.png"} fill sizes='' className='object-contain' priority />
        </Zoom>

        {/* Stars */}
        <Svg.Star className='md:w-[27px] w-[12px] md:h-[30px] h-[15px] fill-brand-main absolute md:top-[10%] top-0 md:right-[12%] right-[50%] pointer-events-none animate-pulse' />
        <Svg.Star className='md:w-[27px] w-[12px] md:h-[30px] h-[15px] fill-brand-secondary absolute md:bottom-[17%] bottom-[70%] right-[4%] pointer-events-none animate-pulse' />
        <Svg.Star className='md:w-[27px] w-[12px] md:h-[30px] h-[15px] fill-brand-tertiary absolute md:bottom-[15%] bottom-[0%] left-[4%] pointer-events-none animate-pulse' />
      </div>
    </Wrapper>

  )
}

export default OurWorkHero