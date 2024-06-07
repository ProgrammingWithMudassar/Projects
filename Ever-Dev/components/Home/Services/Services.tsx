"use client"
import Wrapper from '../../Shared/Wrapper';
import Image from 'next/image';
import List from './List';
import Static from "@/constant/Static.json"
import Marquee from "react-fast-marquee";
import { Zoom } from 'react-awesome-reveal';

const Services = () => {
    return (
        <div className='w-full bg-black-off' >
            <Wrapper id="Services" style="pb-8" >
                <section className='w-full grid lg:grid-cols-2 gap-36 pt-28' >
                    <div className='w-full' >
                        <h2 className='font-primary font-light md:text-[70px] text-[32px] md:leading-[70px] leading-[32px] text-white select-none' >We’re an agency with unlimited possibilities</h2>
                        <div className='w-full flex justify-start items-start flex-col gap-10 md:mt-24 mt-10' >
                            {/* Heading */}
                            <div className='relative font-primary font-light md:text-[100px] text-[60px] leading-[100px] text-white select-none uppercase pointer-events-none' >
                                <p className='lg:ml-0 ml-8' >Dev</p>
                                <Zoom className='absolute md:w-[120px] w-[80px] md:h-[160px] h-[120px] md:-top-[50%] -top-[20%] md:-left-[22%]' >
                                    <Image alt='' src={"/dev.png"} fill sizes='' className='object-contain' />
                                </Zoom>
                            </div>
                            <p className='font-primary font-light text-[16px] leading-[24px] text-white/70 select-none' >HTML. CSS, Boostrap, JS, React, Java, .Net, Visual studio, NetBeans, Database, SQL, XAMPP, PHP...</p>
                            {/* List */}
                            <div className='w-full flex justify-center items-start flex-col gap-10' >
                                <List title='Wordpress' description='Visual Builders (Beaver Builder & Elementor), Custom Theme and Plugin development, Custom Post Type, Custom Fields, WooCommerce, Any plugin integration' />
                                <List title='Pure Code' description='HTML, CSS, SCSS, JavaScript, JQuery, AJAX, PHP, Laravel Framework, MySQL, Animations with AOS and GSAP' />
                                <List title='Webflow' description='Creative interactive and animated websites' />
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex justify-start items-start flex-col md:gap-14 gap-10' >
                        {/* Heading */}
                        <div className='relative font-primary font-light md:text-[100px] text-[60px] md:leading-[100px] text-white select-none uppercase pointer-events-none' >
                            Services
                            <Zoom className='absolute md:w-[120px] w-[80px] md:h-[120px] h-[80px] md:-top-[75%] -top-[48%] right-0' >
                                <Image alt='' src={"/skills.png"} fill sizes='' />
                            </Zoom>
                        </div>
                        <p className='font-primary font-light text-[16px] leading-[24px] text-white/70 select-none' >Harnessing the collective expertise of the top 1% engineering talent worldwide, we deliver a versatile array of capabilities to transform your digital vision into reality.</p>
                        <div className='w-full grid grid-cols-2 gap-10' >
                            {
                                Static?.companyServices?.map((item: any, index) => {
                                    return <List key={index} title={item} />
                                })
                            }
                        </div>
                    </div>
                </section>
            </Wrapper>
            <Marquee className='py-8' >
                {Static?.clients?.map((item: any, index: number) => {
                    return <div key={index} className='px-4 h-[90px] flex justify-center items-center' >
                        <Image alt='' src={item.img} width={item?.w} height={item?.h} className='object-contain mx-2' />
                    </div>
                })}
            </Marquee>
        </div>
    )
}

export default Services