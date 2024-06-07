"use client";
import { Fragment, useState } from "react";
import Image from "next/image";
import Wrapper from "../shared/Wrapper";
import Button from "../shared/Button";
import { BsArrowRight, BsArrowRightCircleFill } from "react-icons/bs";
import Dialogue from "../shared/Dialogue";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";




const features = [
  "Protect user personal information",
  "No more cold calls",
  "Unbiased exposure",
  "Search, compare, and Konnect directly",
];

const Hero = () => {
  const { user } = useAuth()
  const [isDialogue, setIsDialogue] = useState<boolean>(false);
  const toggleDialogue = () => {
    setIsDialogue((prevValue) => !prevValue);
  };

  return (
    <Fragment>
      <Wrapper id="Home"
        outerContainerStyle="lg:h-[calc(100vh+90px)] lg:py-0 pt-32 pb-24 bg-[url('/LandingPage/HeroBackground.png')] 
        bg-center bg-cover bg-no-repeat bg-white-600 lg:-mt-[120px] -mt-[70px] relative"
        innerContainerStyle="flex lg:flex-row flex-col justify-start items-center lg:gap-4 gap-6">
        <aside className="lg:w-[60%] w-full h-full flex flex-col justify-center items-start">
          <h1 className="text-black-500 text-left md:text-[56px] text-[30px] md:leading-[70px] leading-[40px] font-semibold">
            Welcome to Konnect.io
          </h1>
          <h3 className="md:text-[18px] text-[14px] text-left text-black-300">
            Separate the good from the great. Join Now!
          </h3>
          {
            !user?.role &&
            <Button
              style="bg-brand-primary font-medium mt-8 rounded-full md:text-[16px] text-[14px]"
              onClick={toggleDialogue}
              text="Join Now"
              icon={<BsArrowRight className="md:text-2xl text-[16px] text-white-600" />}
            />
          }
          <div className="w-full flex flex-col items-start justify-start md:gap-5 gap-4 mt-8">
            {features?.map((item: string, index: number) => (
              <div
                key={index}
                className="w-full flex items-center justify-start md:gap-4 gap-2">
                <BsArrowRightCircleFill className="md:text-2xl text-xl text-brand-primary" />
                <p className="md:text-lg text-[16px] text-brand-primary">{item}</p>
              </div>
            ))}
          </div>
        </aside>
        <aside className="lg:w-[40%] w-[90%] lg:h-full h-[280px] relative lg:mt-16">
          <Image
            src={"/LandingPage/MacScreen.png"}
            alt="User Portal of Konnect.io"
            className="object-contain pointer-events-none"
            fill
          />
        </aside>

        {/* indicator */}
        <a href="#ExploreTechnologies" className="absolute lg:left-[48.6%] top-[91%] transform-[translate(-50%,-50%)] h-[60px] w-[40px] flex flex-col items-center justify-center rounded-t-[24px] rounded-b-[24px] border-2 border-brand-primary cursor-pointer group">
          <span className="h-[12px] w-[12px] rounded-full bg-brand-primary animate-bounce"></span>
        </a>
      </Wrapper>

      <Dialogue
        show={isDialogue}
        onClose={toggleDialogue}
        style="max-w-[400px] bg-white-600 flex justify-center items-center flex-col py-6"
      >
        <div className="relative w-[300px] h-[90px]">
          <Image
            src={"/black-no-background.svg"}
            alt="konnect.io logo"
            fill
            sizes=""
            className="object-contain pointer-events-none"
          />
        </div>
        <div className="flex justify-center items-center flex-col gap-3 mt-6">
          <Link href={"/register/konnector"} >
            <Button
              text="New Konnector"
              style="bg-brand-primary w-[210px] rounded-full md:text-[16px] text-[14px]"
              onClick={toggleDialogue}
              icon={<BsArrowRight className="text-white-600" />}
            />
          </Link>
          <Link href={"/auth/vendor"} >
            <Button
              text="New Vendor"
              style="bg-brand-primary w-[210px] rounded-full md:text-[16px] text-[14px]"
              onClick={toggleDialogue}
              icon={<BsArrowRight className="text-white-600" />}
            />
          </Link>
        </div>
      </Dialogue>

    </Fragment>
  );
};

export default Hero;
