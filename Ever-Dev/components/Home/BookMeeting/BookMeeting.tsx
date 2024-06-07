"use client";
import RoundedButton from "@/components/Shared/RoundedButton";
import Wrapper from "@/components/Shared/Wrapper";
import React from "react";
import Image from "next/image";
import { Zoom } from "react-awesome-reveal";

const BookMeeting = () => {
  return (
    <Wrapper
      id="BookMeeting"
      style="bg-[url(/bookmeeting.png)] bg-center bg-cover bg-no-repeat overflow-hidden"
    >
      <section className="w-full h-[600px] flex md:items-center items-start justify-center py-10 relative">
        <div className="lg:w-[70%] md:relative flex items-start justify-center flex-col gap-4 bg-black-main md:py-10 md:pr-6 md:pl-40 p-6">
          <p className="text-white md:text-[32px] text-[22px] font-primary font-[500] select-none">
            Need a custom website or software?
          </p>
          <RoundedButton
            url="https://calendly.com/jurgensiegel/30min"
            text="Book Meeting"
            style="md:w-[170px] w-[120px] md:h-[44px] h-[36px] bg-brand-secondary md:text-[16px] text-[14px]"
          />
          <Zoom className="absolute md:w-[530px] w-[450px] md:h-[450px] h-[380px] lg:-left-[6rem] md:-left-[4.5rem] -left-10 md:-bottom-[7.5rem] bottom-8 pointer-events-none z-10" >
            <Image
              alt=""
              src={"/meetingVector.png"}
              fill
              sizes=""
              className="object-contain"
            />
          </Zoom>
        </div>
      </section>
    </Wrapper>
  );
};

export default BookMeeting;
