"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { ArrowRight, InvertedCommas } from "@/components/assets/Icon";
import TeamMetaData from "@/json/Team.json"
import { useRef } from "react";
import Wrapper from '../shared/Wrapper';

const Team = () => {
    const swiperRef: any = useRef(null);
    const Next = () => {
        if (swiperRef.current && swiperRef.current?.swiper) {
            swiperRef?.current?.swiper.slideNext();
        }
    }
    return (
        <Wrapper id="Team" outerContainerStyle="lg:py-24 py-10">
            <Swiper
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                ref={swiperRef}
                pagination={true}
                modules={[Pagination, Autoplay]}
                className="w-full">
                {
                    TeamMetaData?.map((member: any, index: number) => <SwiperSlide key={index} >
                        <section className="w-full flex justify-center items-center lg:flex-row flex-col" >
                            <aside className="md:w-[40%] w-[70%] mx-auto flex justify-center items-center" >
                                <div className="w-[270px] h-[300px] overflow-hidden rounded-[15px] absolute lg:left-[5%] sm:left-[20%] left-[10%] blur-sm pointer-events-none" >
                                    <Image src={`/Team/${member.img}`} alt={`Konnect. io quote by ${member.img}`} fill sizes='' className="object-cover" />
                                </div>
                                <div className="relative w-[293px] h-[343px] overflow-hidden rounded-[15px] pointer-events-none" >
                                    <Image src={`/Team/${member.img}`} alt={`Konnect. io quote by ${member.img}`} sizes='' fill className="object-cover" />
                                </div>
                            </aside>
                            <aside className="lg:w-[80%] w-full rounded-[24px] bg-white-300 lg:-ml-[20%] lg:mt-0 -mt-[100px] p-10 xl:pl-[15%] lg:pl-[18%] lg:pt-8 pt-[130px]">
                                <InvertedCommas className="md:w-[44px] w-[32px] md:h-[34px] h-[22px]" />
                                <p className="md:text-[18px] text-[16px] md:leading-[28px] leading-[24px] text-black-300 select-none md:mt-8 mt-4" >
                                    {member.description.slice(0, 200)}...
                                    <span className='text-[16px] cursor-pointer text-brand-primary' > Read more</span>
                                </p>
                                <div className="flex justify-start items-center gap-2 mt-4" >
                                    {[1, 2, 3, 4, 5].map((star: number, index: number) => <AiFillStar key={index} className="text-[#F5A623] text-[24px]" />)}
                                </div>
                                <div className="w-full flex justify-between items-end" >
                                    <div>
                                        <h2 className="md:text-[30px] text-[24px] md:leading-[36px] leading-[28px] text-black-500 capitalize font-semibold md:mt-24 mt-8" >
                                            {member.name}
                                        </h2>
                                        <h3 className="text-[16px] leading-[30px] text-black-400 capitalize" >
                                            {member.rank}
                                        </h3>
                                    </div>
                                    <button onClick={Next} >
                                        <ArrowRight className="w-[48px] h-[68px] cursor-pointer" />
                                    </button>
                                </div>
                            </aside>
                        </section>
                    </SwiperSlide>)
                }

            </Swiper>
        </Wrapper>
    )
}

export default Team