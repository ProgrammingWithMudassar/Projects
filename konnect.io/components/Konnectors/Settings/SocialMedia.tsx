"use client"

import Button from "@/components/shared/Button"
import InputField from "@/components/shared/InputField"
import { ISettings } from "@/types/types"
import { Fragment } from "react"
import { BiLogoFacebook, BiLogoLinkedin, BiLogoTwitter } from "react-icons/bi"

type Props = {
    input: ISettings
    inputHandler: (e: any) => void
}

const SocialMedia = ({ inputHandler, input }: Props) => {
    return (
        <Fragment>
            <h1 className="text-[24px] text-brand-primary">Social Media</h1>
            <div className="flex justify-center items-center gap-4 mt-4" >
                <a href={""} target="_blank" className="w-[40px] h-[40px] rounded-full overflow-hidden bg-[#4267B2] flex justify-center items-center transition-all duration-300 hover:scale-[1.2]" >
                    <BiLogoFacebook className="text-white-600 text-[18px]" />
                </a>
                <a href={""} target="_blank" className="w-[40px] h-[40px] rounded-full overflow-hidden bg-[#4267B2] flex justify-center items-center transition-all duration-300 hover:scale-[1.2]" >
                    <BiLogoLinkedin className="text-white-600 text-[16px]" />
                </a>
                <a href={""} target="_blank" className="w-[40px] h-[40px] rounded-full overflow-hidden bg-[#1DA1F2] flex justify-center items-center transition-all duration-300 hover:scale-[1.2]" >
                    <BiLogoTwitter className="text-white-600 text-[18px]" />
                </a>
            </div>
        </Fragment>
    )
}

export default SocialMedia