"use client";
import React from "react";
import Wrapper from "@/components/Shared/Wrapper";
import WeeklyCard from "./WeeklyCard";
import MonthlyCard from "./MonthlyCard";
import QuarterlyCard from "./QuarterlyCard";
import YearlyCard from "./YearlyCard";
import CustomPrice from "./CustomPrice";

const MemberShips = () => {
  return (
    <Wrapper id="MemberShips" style="relative py-20">
      <div className="w-full h-full flex flex-col gap-10 relative">
        <p className="font-primary font-light text-black-off md:text-[70px] text-[32px] md:leading-[70px] leading-[32px]">
          Pricing
        </p>
        <div className="w-full flex flex-col gap-8 md:gap-0 items-center justify-start md:grid md:grid-cols-3 md:bg-white z-20 md:rounded-[32px] rounded-none">
          {/* <WeeklyCard /> */}
          <MonthlyCard />
          {/* <QuarterlyCard />  */}
          <YearlyCard />
          <CustomPrice />
        </div>

        {/* Top Gradients */}
        <span className="absolute bottom-[10%] left-[5%] md:w-[150px] w-[100px] md:h-[150px] h-[100px] transform-[rotate(161.99deg)] opacity-30 bg-brand-main shadow-circle rounded-full md:blur-[100px] blur-[50px] pointer-events-none" />
        <span className="absolute bottom-[10%] left-[10%] md:w-[150px] w-[100px] md:h-[150px] h-[100px] transform-[rotate(161.99deg)] opacity-30 bg-brand-secondary shadow-circle rounded-full md:blur-[100px] blur-[50px] pointer-events-none" />
        {/* bottom gradient */}
        <span className="absolute top-[10%] right-[20%] md:w-[150px] w-[100px] md:h-[150px] h-[100px] transform-[rotate(161.99deg)] opacity-30 bg-brand-main shadow-circle rounded-full md:blur-[100px] blur-[50px] pointer-events-none" />
        <span className="absolute top-[10%] right-[25%] md:w-[150px] w-[100px] md:h-[150px] h-[100px] transform-[rotate(161.99deg)] opacity-30 bg-brand-secondary shadow-circle rounded-full md:blur-[100px] blur-[50px] pointer-events-none" />
      </div>
    </Wrapper>
  );
};

export default MemberShips;
