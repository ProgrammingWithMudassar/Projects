"use client"
import React, { Fragment } from 'react'
import Wrapper from '../Shared/Wrapper';
import Image from 'next/image';
import * as Svg from "@/svg/svg"
import { Zoom } from "react-awesome-reveal";

const Hero = () => {
    return (
        <Wrapper id="Home" style="md:h-[calc(100vh-62px)]" >
            <div className='relative w-full h-full flex justify-center items-center flex-col lg:py-0 py-8' >
                <h1 className='relative font-primary font-[300] uppercase lg:text-[130px] text-[60px] lg:leading-[130px] leading-[70px] text-black-off pointer-events-none md:ml-12' >
                    <span className='md:-ml-24' >UNLEASH</span><br />
                    <span>YOUR</span><br />
                    <span className='md:ml-28' >DIGITAL</span><br />
                    <span className='md:ml-6' >POTENTIAL</span>
                    <span className='absolute bottom-[30%] right-[10%] md:w-[250px] w-[150px] md:h-[250px] h-[150px] transform-[rotate(161.99deg)] opacity-30 bg-brand-main shadow-circle rounded-full md:blur-[100px] blur-[50px] pointer-events-none' />
                    <span className='absolute -bottom-[5%] right-[0%] md:w-[200px] w-[150px] md:h-[250px] h-[100px] transform-[rotate(161.99deg)] opacity-30 bg-brand-secondary shadow-circle rounded-full md:blur-[100px] blur-[50px] pointer-events-none' />
                    <span className='lg:absolute lg:inline-block hidden bottom-[28%] -left-[35%] max-w-[350px] font-primary text-[16px] leading-[24px] capitalize font-normal text-black-off md:mt-0 mt-4 pointer-events-none' >
                        Ignite digital possibilities with EverDev. Elevate your online presence and drive success with our innovative solutions. Let us bring your digital vision to life.
                    </span>
                </h1>
                <p className='lg:absolute lg:hidden block bottom-[32%] left-0 max-w-[350px] font-primary text-[16px] text-black-off md:mt-0 mt-4 pointer-events-none' >
                    Ignite digital possibilities with EverDev. Elevate your online presence and drive success with our innovative solutions. Let us bring your digital vision to life.
                </p>
                <Zoom className='absolute lg:w-[320px] md:w-[210px] w-[180px] lg:h-[280px] md:h-[200px] h-[170px] lg:mt-0 md:mt-10 mt-9 lg:ml-0 md:ml-[7.5rem] ml-10 pointer-events-none' >
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

export default Hero