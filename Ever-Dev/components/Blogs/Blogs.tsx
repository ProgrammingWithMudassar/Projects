"use client"
import Link from "next/link";
import Wrapper from "../Shared/Wrapper";
import Image from "next/image";
import Static from "@/constant/Static.json"

const Blogs = () => {
    return (
        <Wrapper id="Blogs" style="py-10" >
            <section className="w-full h-full grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 bg-white rounded-[32px]" >
                {
                    Static?.blogs?.map((item: any, index: number) => {
                        return <div key={index} className="w-full overflow-hidden rounded-xl border-[1px] border-gray-300 hover:drop-shadow-md transition-all duration-300" >
                            <div className="w-full sm:h-[150px] h-[180px] relative" >
                                <Image src={item?.img} alt="" sizes="" fill className="object-cover" />
                            </div>
                            <div className="w-full p-4 flex justify-center items-center flex-col bg-white" >
                                <h2 className="font-primary font-semibold text-[16px] leading-[24px] text-center select-none" >
                                    {item?.title}
                                </h2>
                                <hr className="w-[100px] my-2" />
                                <p className="font-primary font-normal text-[14px] text-center select-none" >
                                    {item?.des}
                                </p>
                                <Link href={item?.url} className="px-5 md:py-2 py-1 rounded-[8px] bg-brand-secondary font-primary text-white cursor-pointer text-[12px] mt-3" >
                                    Read
                                </Link>
                            </div>
                        </div>
                    })
                }

            </section>
        </Wrapper>
    )
}

export default Blogs;