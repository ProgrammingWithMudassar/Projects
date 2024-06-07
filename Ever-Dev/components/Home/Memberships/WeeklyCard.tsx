import React from 'react'
import RoundedButton from "@/components/Shared/RoundedButton";
import { Tick } from "../../../svg/svg";
import Static from "../../../constant/Static.json";

const WeeklyCard = () => {
  const { whatsIncluded } = Static.MemberShips;
  return (
    <div className="w-full flex flex-col items-start justify-start md:border-r-[1px] md:border-black-off/10 md:rounded-none rounded-[18px] md:bg-transparent bg-white">
      <div className="w-full h-[180px] flex flex-col items-start justify-start gap-4 border-b-[1px] border-black-off/10 p-6">
        <p className="font-primary font-[400] text-black-off md:text-[18px] text-[16px]">
          Starter
        </p>
        <p className="font-primary font-[500] text-black-off md:text-[34px] text-[28px]">
          Weekly
        </p>
        <p className="font-primary font-[400] text-black-off/60 md:text-[16px] text-[15px]">
          Fixed price. no commitment{" "}
        </p>
      </div>
      <div className="w-full h-[230px] flex flex-col items-center justify-start gap-6 p-6 border-b-[1px] border-black-off/10">
        <div className="w-full flex justify-between items-center">
          <p className="font-primary font-[500] text-black-off md:text-[32px] text-[26px]">
            $1,145/w
          </p>
          <p className="font-primary font-[400] text-black-off/60 text-[14px]">
            Paid weekly
          </p>
        </div>
        <RoundedButton text="Get Started" url='https://buy.stripe.com/5kAbII9W156Z8b6dQQ' />

      </div>

      <div className="w-full h-[320px] flex flex-col items-start justify-start gap-4 p-6">
        <p className="font-primary font-semibold text-black-off md:text-[22px] text-[20px]">
          What’s included:
        </p>
        <div className="w-full flex flex-col items-start justify-start gap-4">
          {whatsIncluded.map((item: string, index: number) => {
            return (
              <div
                key={index}
                className="w-full flex items-center justify-start gap-2"
              >
                <Tick className="" />
                <p className="font-primary font-[400] text-black-off/60 md:text-[16px] text-[15px]">
                  {item}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default WeeklyCard