import React from "react";
import RoundedButton from "@/components/Shared/RoundedButton";
import { Tick } from "../../../svg/svg";
import Static from "../../../constant/Static.json";

const CustomPrice = () => {
  const { whatsIncluded } = Static.MemberShips;
  return (
    <div className="w-full flex flex-col items-start justify-start md:rounded-none rounded-[18px] md:bg-transparent bg-white">
      <div className="w-full h-[180px] flex flex-col items-start justify-start gap-4 border-b-[1px] border-black-off/10 p-6">
        <p className="font-primary font-[400] text-brand-tertiary md:text-[18px] text-[16px]">
          Custom offer
        </p>
        <p className="font-primary font-[500] text-black-off md:text-[34px] text-[28px]">
          Custom pricing
        </p>
        <p className="font-primary font-[400] text-black-off/60 md:text-[16px] text-[15px]">
          Discuss requirements
        </p>
      </div>
      <div className="w-full h-[230px] flex flex-col items-center justify-center gap-6 p-6 border-b-[1px] border-black-off/10">
        <RoundedButton
          text="Book call"
          style="bg-brand-tertiary h-[60px] w-[280px]"
          url="https://calendly.com/jurgensiegel/30min"
        />
      </div>

      <div className="w-full h-[320px] flex flex-col items-start justify-start gap-4 p-6">
        <p className="font-primary font-semibold text-black-off md:text-[22px] text-[20px]">
          What’s included:
        </p>
        <div className="w-full flex flex-col items-start justify-start gap-4">
          {["Requirement discussion", "Custom offer", "Unlimited revisions","Easy credit card payments","Unlimited users"].map((item: string, index: number) => {
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
  );
};

export default CustomPrice;
