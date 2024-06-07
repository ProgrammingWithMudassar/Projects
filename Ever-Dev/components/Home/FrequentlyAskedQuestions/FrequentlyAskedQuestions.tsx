"use client";
import Wrapper from "@/components/Shared/Wrapper";
import React from "react";
import FAQAccordion from "./FAQAccordion";
import GetToWork from "./GetToWork";

const FrequentlyAskedQuestions = () => {
  return (
    <Wrapper
      id="FrequentlyAskedQuestions"
      style="relative py-20 bg-black-off lg:mt-0 -mt-16"
    >
      <div className="w-full flex flex-col items-center justify-center lg:gap-16 gap-8 overflow-hidden">
        <p className="lg:w-[60%] font-primary font-[300] text-white md:text-[70px] text-[32px] md:leading-[70px] leading-[32px]">
          Frequently asked questions
        </p>
        <FAQAccordion />
        <GetToWork />
      </div>

      {/* Gradients */}
      <span className="md:block hidden absolute top-[30%] -left-8 w-[250px] h-[250px] transform-[rotate(161.99deg)] opacity-40 bg-brand-main shadow-circle rounded-full md:blur-[100px] blur-[100px] pointer-events-none" />
      <span className="md:block hidden absolute top-[50%] -left-8 w-[250px] h-[250px] transform-[rotate(161.99deg)] opacity-40 bg-brand-secondary shadow-circle rounded-full md:blur-[100px] blur-[100px] pointer-events-none" />
    </Wrapper>
  );
};

export default FrequentlyAskedQuestions;
