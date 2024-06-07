"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import RecommendationCard from '@/components/shared/RecommendationCard';
import { ArrowRight } from '@/components/assets/Icon';
import { useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';

type Props = {}

const Recommendation = (props: Props) => {
    const { token, user } = useAuth();
    const swiperRef: any = useRef(null);
    const Next = () => { if (swiperRef.current && swiperRef.current?.swiper) { swiperRef?.current?.swiper.slideNext() } }
    const Prev = () => { if (swiperRef.current && swiperRef.current?.swiper) { swiperRef?.current?.swiper.slidePrev() } }


    return (
        <div className='w-full flex justify-center items-center flex-col gap-4' >
            <h4 className="lg:text-[18px] text-[16px] text-white-600 font-medium bg-brand-primary px-4 py-2 rounded-full">Recommendations for {user?.first_name}</h4>
            <div className='w-full relative'>
                <div className='w-full mx-auto' >
                    <Swiper
                        ref={swiperRef}
                        modules={[Pagination, Autoplay]}
                        pagination={{ clickable: true, dynamicBullets: true, }}
                        autoplay={{ delay: 2000 }}
                        loop={true}
                        slidesPerView={1}
                        spaceBetween={10}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 20,
                            },
                        }}
                    >
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((vendor: any, index: number) => <SwiperSlide key={index} className='mb-12'>
                                <RecommendationCard />
                            </SwiperSlide>)
                        }
                    </Swiper>
                </div>
                <button onClick={Prev} className='absolute -bottom-[5.5%] left-[20%] sm:left-[35%] md:left-[38%] lg:left-[41%] group z-50' >
                    <ArrowRight className="w-[48px] h-[68px] cursor-pointer transition-all duration-500 group-hover:-translate-x-2 rotate-180" />
                </button>
                <button onClick={Next} className='absolute -bottom-[5.5%] right-[20%] sm:right-[35%] md:right-[38%] lg:right-[41%]  group z-50' >
                    <ArrowRight className="w-[48px] h-[68px] cursor-pointer transition-all duration-500 group-hover:translate-x-2" />
                </button>
            </div>
        </div>
    )
}

export default Recommendation