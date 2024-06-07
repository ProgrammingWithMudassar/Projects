import { ISettingsTabs } from "@/types/types";
import { RiUserSettingsLine } from "react-icons/ri"
import { SiGnuprivacyguard } from "react-icons/si"
import { RiSecurePaymentLine } from "react-icons/ri"
import { BsShare } from "react-icons/bs"

type Props = {
    title: string;
    tabs: ISettingsTabs;
    tabHandler: (e: ISettingsTabs) => void
}

const SettingsSwitcher = ({ title, tabs, tabHandler }: Props) => {
    return (
        <aside className="w-full h-full min-h-[calc(100vh-94px)] bg-white-300 rounded-[20px] lg:p-4 p-2 overflow-auto flex justify-start items-start flex-col gap-3 hide-scrollbar" >
            <h3 className="text-[20px] font-medium text-black-500 capitalize lg:block hidden" >{title}</h3>
            <button onClick={() => {
                tabHandler({
                    personal: true,
                    password: false,
                    creditCard: false,
                    socialMedia: false
                })
            }} className={`w-full lg:h-[46px] h-[54px] flex justify-between items-center p-1 lg:shadow-light lg:border-[1px] px-4 border-gray-200 rounded-full group text-brand-primary ${tabs.personal && "bg-brand-primary text-white-600 "}`} >
                <strong className="font-semibold text-[14px] whitespace-nowrap text-left lg:inline-block hidden" >Personal</strong>
                <RiUserSettingsLine className="text-[20px]" />
            </button>
            <button onClick={() => {
                tabHandler({
                    personal: false,
                    password: true,
                    creditCard: false,
                    socialMedia: false
                })
            }} className={`w-full lg:h-[46px] h-[54px] flex justify-between items-center p-1 lg:shadow-light lg:border-[1px] px-4 border-gray-200 rounded-full group text-brand-primary ${tabs.password && "bg-brand-primary text-white-600"}`} >
                <strong className="font-semibold text-[14px] whitespace-nowrap text-left lg:inline-block hidden" >Security</strong>
                <SiGnuprivacyguard className="text-[20px]" />
            </button>
            {/* <button onClick={() => {
                tabHandler({
                    personal: false,
                    password: false,
                    creditCard: true,
                    socialMedia: false
                })
            }} className={`w-full lg:h-[46px] h-[54px] flex justify-between items-center p-1 lg:shadow-light lg:border-[1px] px-4 border-gray-200 rounded-full group text-brand-primary ${tabs.creditCard && "bg-brand-primary text-white-600"}`} >
                <strong className="font-semibold text-[14px] whitespace-nowrap text-left lg:inline-block hidden" >Billing</strong>
                <RiSecurePaymentLine className="text-[20px]" />
            </button> */}
            <button onClick={() => {
                tabHandler({
                    personal: false,
                    password: false,
                    creditCard: false,
                    socialMedia: true
                })
            }} className={`w-full lg:h-[46px] h-[54px] flex justify-between items-center p-1 lg:shadow-light lg:border-[1px] px-4 border-gray-200 rounded-full group text-brand-primary ${tabs.socialMedia && "bg-brand-primary text-white-600"}`} >
                <strong className="font-semibold text-[14px] whitespace-nowrap text-left lg:inline-block hidden" >Social media</strong>
                <BsShare className="text-[20px]" />
            </button>
        </aside>
    )
}

export default SettingsSwitcher