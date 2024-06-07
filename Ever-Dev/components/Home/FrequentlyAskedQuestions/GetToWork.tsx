import React from "react";
import RoundedButton from "@/components/Shared/RoundedButton";
import Image from "next/image";
import { Slide, Zoom } from "react-awesome-reveal";

const GetToWork = () => {
  return (
    <section className=" w-full relative flex items-center justify-start rounded-[44px] bg-[#FFD600] md:px-10 px-6 py-20 md:mt-8">
      <div className="w-full flex flex-col lg:items-start items-center justify-start gap-6">
        <p className="md:max-w-[70%] font-primary font-[300] text-black-off md:text-[70px] text-[32px] md:leading-[70px] leading-[32px]">
          Let’s get to work.
        </p>
        <p className="md:max-w-[70%] font-primary font-[400] text-black-off text-[18px] md:text-start text-center">
          Subscribe to a plan to request as many designs as you’d like for money
          monthly fee.
        </p>
        <RoundedButton
          url="https://calendly.com/jurgensiegel/30min"
          text="Schedule meeting"
          style="w-[200px] h-[48px] bg-black-main"
        />
      </div>

      {/* Vector */}
      <Slide direction="up" className="lg:block hidden absolute lg:w-[420px] lg:h-[390px] right-0 bottom-0 pointer-events-none z-10">
        <Image
          alt=""
          src={"/faqsVector.png"}
          fill
          sizes=""
          className="object-contain"
        />
      </Slide>
    </section>
  );
};

export default GetToWork;
