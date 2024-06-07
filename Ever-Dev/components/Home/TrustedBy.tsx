"use client"
import React from "react";
import Image from "next/image";
import Wrapper from "../Shared/Wrapper";
import Static from "../../constant/Static.json";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSwiper } from 'swiper/react';
import { IoIosArrowForward } from 'react-icons/io';
import { Autoplay, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const TrustedBy = () => {
  const swiper = useSwiper();
  return (
    <Wrapper id="TrustedBy" style="py-16">
      <section className="relative w-full flex items-center justify-center gap-8 flex-col">
        <p className="font-primary font-[500] text-black-off md:text-[32px] text-[28px]">
          Trusted by hundred of companies
        </p>
        <div className="w-full" >
          <Swiper
            slidesPerView={3}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            modules={[Autoplay, Navigation]}
            navigation={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
          >
            {
              Static?.companiesWorkWith?.map((item: any, index: number) => {
                return <SwiperSlide key={index} >
                  <div className='relative w-full h-[60px] overflow-hidden pointer-events-none' >
                    <Image alt='' src={item?.img} fill sizes="" className='object-cover' />
                  </div>
                </SwiperSlide>
              })
            }
          </Swiper>
        </div>
      </section>
    </Wrapper>
  );
};

export default TrustedBy;
