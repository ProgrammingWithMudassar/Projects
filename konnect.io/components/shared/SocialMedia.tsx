"use client";
import { BiLogoFacebook, BiLogoLinkedin, BiLogoTwitter } from "react-icons/bi";
import SocialMediaMetaData from "@/json/SocialMedia.json"


const SocialMedia = () => {
    return (
        <div className="flex justify-start items-start gap-4" >
            <a href={SocialMediaMetaData?.facebook} target="_blank" className="w-[24px] h-[24px] rounded-full overflow-hidden bg-[#4267B2] flex justify-center items-center transition-all duration-300 hover:scale-[1.2]" >
                <BiLogoFacebook className="text-white-600 text-[18px]" />
            </a>
            <a href={SocialMediaMetaData?.linkedIn} target="_blank" className="w-[24px] h-[24px] rounded-full overflow-hidden bg-[#4267B2] flex justify-center items-center transition-all duration-300 hover:scale-[1.2]" >
                <BiLogoLinkedin className="text-white-600 text-[16px]" />
            </a>
            <a href={SocialMediaMetaData?.twitter} target="_blank" className="w-[24px] h-[24px] rounded-full overflow-hidden bg-[#1DA1F2] flex justify-center items-center transition-all duration-300 hover:scale-[1.2]" >
                <BiLogoTwitter className="text-white-600 text-[18px]" />
            </a>
        </div>
    )
}

export default SocialMedia