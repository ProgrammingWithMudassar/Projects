"use client";
import Image from "next/image";
import { useVendorStatsGlobalInteractionQuery } from "@/Redux/RTK_API/Auth_Api";
import { useAuth } from '@/hooks/useAuth'
import { FaUserCircle } from "react-icons/fa";


type Props = {
    header?: Array<string>
}

const GlobalInteractions = ({ header = ["Company Name", "Location"] }: Props) => {
    const { token } = useAuth();
    const { data, isLoading, isSuccess, refetch } = useVendorStatsGlobalInteractionQuery({ accessToken: token });
    return (
        <section className="w-full h-full overflow-auto" >
            <div className={`w-full min-w-[400px] h-[36px] bg-brand-primary grid grid-cols-2 justify-center items-center px-4`} >
                {
                    header?.map((h: string, index: number) => (
                        <h5 key={index} className={`text-left w-full text-[14px] font-medium text-white-600`}>
                            {h}
                        </h5>
                    ))
                }
            </div>

            <div className={`w-full min-w-[400px] h-[calc(100%-36px)] md:overflow-auto hide-scrollbar`} >
                {
                    isSuccess && data?.interactions?.map((item: any, index: number) => <div key={index} className={`border-b-[1px] border-gray-300`} >
                        <div className={`w-full h-[30px] grid grid-cols-2 justify-center items-center px-4`} >
                            <div className="text-left text-[14px] text-black-500 flex gap-2 justify-start items-center" >
                                {
                                    item?.logo ? <div className="w-[20px] h-[20px] relative" >
                                        <Image
                                            fill
                                            sizes="(max-width: 768px) 100vw, 100vw"
                                            alt="Profile picture"
                                            src="/chat.jpg"
                                            priority
                                            placeholder="blur"
                                            blurDataURL="blur"
                                            quality={100}
                                            className="overflow-hidden rounded-full relative pointer-events-none"
                                        />
                                    </div> :
                                        <FaUserCircle className="text-[22px] text-black-500" />
                                }

                                {/* company logo will come here  */}
                                <p className="text-left text-[11px] text-black-500 capitalize" >
                                    {item?.company_name}
                                </p>
                            </div>
                            <p className="text-left text-[11px] text-black-500 capitalize" >
                                {item?.hq_location}
                            </p>
                        </div>
                    </div>)
                }
            </div>
        </section>
    )
}

export default GlobalInteractions