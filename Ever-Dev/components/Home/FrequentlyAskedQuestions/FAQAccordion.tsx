import React from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import Static from "../../../constant/Static.json";

const FAQAccordion = () => {
  const { faqs } = Static;
  return (
    <Accordion className="lg:w-[60%] w-full" allowZeroExpanded>
      {faqs.map((item: any, index: number) => (
        <AccordionItem
          className="bg-transparent border-b-[1px] border-b-white/60"
          key={index}
        >
          <AccordionItemHeading>
            <AccordionItemState>
              {({ expanded }) => (
                <AccordionItemButton className="flex items-center justify-between py-4">
                  <p className="font-primary text-white md:text-[22px] text-[16px] font-semibold">
                    {item.heading}
                  </p>
                  {expanded ? (
                    <AiOutlineMinus size={20} className="text-brand-tertiary" />
                  ) : (
                    <AiOutlinePlus size={20} className="text-brand-tertiary" />
                  )}
                </AccordionItemButton>
              )}
            </AccordionItemState>
          </AccordionItemHeading>
          <AccordionItemPanel className="w-full py-4">
            <p className="font-primary text-white/60 md:text-[18px] text-[14px] font-[400]">
              {item.content}
            </p>
          </AccordionItemPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FAQAccordion;
