"use client"
import Wrapper from "./Wrapper";
import Image from "next/image";
import Link from "next/link";
import KonnectMetaData from "@/json/Footer/Konnect.io.json";
import CompanyMetaData from "@/json/Footer/Company.json";
import PolicesMetaData from "@/json/Footer/Polices.json";
import SocialMedia from "./SocialMedia";
import { Fragment } from "react";

type Props = {
    additionMenu?: boolean;
}

const Footer = ({ additionMenu = true }: Props) => {
    return (
        <Fragment>
            {
                additionMenu && <Wrapper id="Footer" outerContainerStyle="lg:py-16 py-10 bg-brand-secondary" innerContainerStyle="grid lg:grid-cols-5 grid-cols-2  lg:gap-8 sm:gap-16 gap-8">
                    <aside className="w-full flex justify-start items-start gap-6 flex-col" >
                        <div className="relative sm:w-[185px] w-[130px] sm:h-[60px] h-[40px]" >
                            <Image src={"/black-white-text.svg"} priority alt="konnect.io logo" fill sizes="" className="object-contain pointer-events-none" />
                        </div>
                        <p className="md:text-[16px] text-[14px] text-white-600 font-light" >
                            Lorem ipsum dolor sit amet consectetur adipiscing elit ridiculus euismod, proin montes porta nisl dis vestibulum
                        </p>
                    </aside>
                    <aside className="w-full flex justify-start items-start gap-6 flex-col" >
                        <div className="flex justify-center items-center gap-2 text-[20px] text-white-600 font-medium" >
                            <Image src={"/logo.svg"} alt="konnect.io logo" width={24} height={27} sizes="" className="object-contain pointer-events-none" />
                            Konnect.io
                        </div>
                        <div className="flex justify-start items-start gap-3 flex-col" >
                            {KonnectMetaData?.map((item: any, index: number) => <Link key={index} href={item?.route} className="md:text-[16px] text-[14px] font-light text-white-600" >
                                {item?.name}
                            </Link>)}
                        </div>
                    </aside>
                    <aside className="w-full flex justify-start items-start gap-6 flex-col" >
                        <div className="flex justify-center items-center gap-2 text-[20px] text-white-600 font-medium" >
                            <Image src={"/logo.svg"} alt="konnect.io logo" width={24} height={27} sizes="" className="object-contain pointer-events-none" />
                            Company
                        </div>
                        <div className="flex justify-start items-start gap-3 flex-col" >
                            {CompanyMetaData?.map((item: any, index: number) => <Link key={index} href={item?.route} className="md:text-[16px] text-[14px] font-light text-white-600" >
                                {item?.name}
                            </Link>)}
                        </div>
                    </aside>
                    <aside className="w-full flex justify-start items-start gap-6 flex-col" >
                        <div className="flex justify-center items-center gap-2 text-[20px] text-white-600 font-medium" >
                            <Image src={"/logo.svg"} alt="konnect.io logo" width={24} height={27} sizes="" className="object-contain pointer-events-none" />
                            Polices
                        </div>
                        <div className="flex justify-start items-start gap-3 flex-col" >
                            {PolicesMetaData?.map((item: any, index: number) => <Link key={index} href={item?.route} className="md:text-[16px] text-[14px] font-light text-white-600" >
                                {item?.name}
                            </Link>)}
                        </div>
                    </aside>
                    <aside className="w-full flex justify-start items-start gap-6 flex-col" >
                        <div className="flex justify-center items-center gap-2 text-[20px] text-white-600 font-medium" >
                            <Image src={"/logo.svg"} alt="konnect.io logo" width={24} height={27} sizes="" className="object-contain pointer-events-none" />
                            Social Media
                        </div>
                        <SocialMedia />
                    </aside>
                </Wrapper>
            }
            <Wrapper id="Footer" outerContainerStyle="py-4 bg-brand-tertiary" innerContainerStyle="flex justify-center items-center font-normal text-white-600 md:text-[16px] text-[14px]">
                ⓒ 2023 <span className="font-bold ml-1" >Konnect.io</span>, All rights reserved
            </Wrapper>
        </Fragment>
    )
}

export default Footer;