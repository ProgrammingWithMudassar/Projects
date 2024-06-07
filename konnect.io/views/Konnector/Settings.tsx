"use client"
import CreditCard from "@/components/Konnectors/Settings/CreditCard";
import Password from "@/components/Konnectors/Settings/Password";
import Personal from "@/components/Konnectors/Settings/Personal";
import SettingsSwitcher from "@/components/Konnectors/Settings/SettingsSwitcher";
import SocialMedia from "@/components/Konnectors/Settings/SocialMedia";
import { ISettings, ISettingsTabs } from "@/types/types";
import { useState } from "react";

const Settings = () => {

    const [input, setInput] = useState<ISettings>({
        firstName: "", lastName: "", phoneNumber: "", company: "",
        HQLocation: "", companyEmail: "", recoveryEmail: "", bio: "",
        password: "", rPassword: "", currentPassword: "", creditCardName: "",
        cardType: "", cardNo: "", expDate: ""
    });

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput({ ...input, [name]: value });
    };

    const [settingTabs, setSettingTabs] = useState<ISettingsTabs>({
        personal: true,
        password: false,
        socialMedia: false
    })

    return (
        <section className="w-full h-full grid lg:grid-cols-[300px,calc(100%-316px)] grid-cols-[70px,calc(100%-86px)] gap-4" >
            <SettingsSwitcher title="Settings" tabs={settingTabs} tabHandler={setSettingTabs} />
            <aside className="w-full lg:min-h-auto min-h-screen" >
                <div className="flex justify-start items-start flex-col" >
                    {settingTabs.personal && <Personal />}
                    {settingTabs.password && <Password />}
                    {/* {settingTabs.creditCard && <CreditCard input={input} inputHandler={inputHandler} />} */}
                    {settingTabs.socialMedia && <SocialMedia input={input} inputHandler={inputHandler} />}
                </div>
            </aside>
        </section>
    )
}

export default Settings