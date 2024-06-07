"use client";
import React, { useState } from "react";
import Wrapper from "../shared/Wrapper";
import Image from "next/image";
import Button from "../shared/Button";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";


const ExploreTechnologies = () => {
  const [isDialogue, setIsDialogue] = useState<boolean>(false);
  const toggleDialogue = () => {
    setIsDialogue((prevvalue) => !prevvalue);
  };
  return (
    <Wrapper id="ExploreTechnologies" outerContainerStyle="lg:py-24 py-10">
      <div className="w-full grid lg:grid-cols-2 place-items-center lg:gap-16 gap-10">
        <aside className="lg:w-full sm:w-[90%] w-full bg-white-600 p-4 rounded-xl shadow-light">
          <div className="relative w-full xl:h-[330px] lg:h-[280px] md:h-[380px] sm:h-[350px] h-[200px]">
            <Image src="/LandingPage/Dashboard.png" className="h-full w-full object-fill" alt="Konnect.io buying or exploring technology?" fill sizes="" />
          </div>
        </aside>
        <aside className="w-full flex justify-center items-start flex-col">
          <h2 className="text-black-600 md:text-5xl text-3xl font-semibold ">
            Buying or exploring technology?
          </h2>
          <p className="md:text-[18px] text-[14px] text-left text-brand-primary mt-2">
            Konnect on your terms.
          </p>
          <Link href={"/register/konnector"} >
          <Button
            style="bg-brand-primary font-medium mt-8 rounded-full md:text-[16px] text-[14px]"
            onClick={toggleDialogue}
            text="Get Konnected"
            icon={<BsArrowRight className="text-2xl text-white-600" />}
          />
          </Link>
        </aside>
      </div>
    </Wrapper>
  );
};

export default ExploreTechnologies;
