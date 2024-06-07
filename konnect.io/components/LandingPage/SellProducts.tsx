"use client"
import { BsArrowRight, BsArrowRightCircleFill } from "react-icons/bs";
import Button from "../shared/Button";
import Link from "next/link";
import Wrapper from "../shared/Wrapper";
import Image from "next/image";

const sellingStats = [
    "Protect user personal information",
    "No more cold calls",
    "Unbiased exposure",
    "Search, compare, and Konnect directly",
];

const SellProducts = () => {
    return (
        <Wrapper id="Team" outerContainerStyle="lg:py-24 py-10 bg-brand-primary" innerContainerStyle="flex justify-center items-center gap-8 md:flex-row flex-col">
            <aside className="lg:w-[50%] w-full sm:h-[400px] h-[280px] relative pointer-events-none" >
                <Image alt="Konnect.io sell stats" src={"/LandingPage/Sell_Products.png"} fill sizes="" className="object-contain" />
            </aside>
            <aside className="lg:w-[50%] w-full flex justify-center items-start flex-col" >
                <h3 className="md:text-[18px] text-[14px] text-left text-white-600 select-none">
                    Selling products or services?
                </h3>
                <h2 className="text-white-600 md:text-5xl text-3xl font-semibold mt-4 select-none">
                    Konnect with 90,000+ users directly.
                </h2>
                <Link href={"/register/vendor"} >
                    <Button
                        style="bg-black-600 font-medium lg:mt-10 my-7 rounded-full md:text-[16px] text-[14px]"
                        onClick={() => { }}
                        text="As a Vendor"
                        icon={<BsArrowRight className="md:text-2xl text-[16px] text-white-600" />}
                    />
                </Link>
                <div className="w-full flex flex-col items-start justify-start md:gap-4 gap-3">
                    {sellingStats?.map((item: string, index: number) => (
                        <div
                            key={index}
                            className="w-full flex items-center justify-start md:gap-4 gap-2"
                        >
                            <BsArrowRightCircleFill className="md:text-2xl text-xl text-white-600" />
                            <p className="md:text-lg text-[16px] text-white-600 font-light">{item}</p>
                        </div>
                    ))}
                </div>
            </aside>
        </Wrapper>
    )
}

export default SellProducts