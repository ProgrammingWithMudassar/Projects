"use client";
import Image from "next/image";
import { ReactNode } from "react";

type Props = {
    name: string;
    img: string | ReactNode;
    active?: boolean;
    status?: string
}

const Profile = ({ name, img, active = false, status }: Props) => {
    const getStatus = (status?: string) => {
        switch (status) {
            case 'active_project':
                return "- Active Project"
            case 'more_information':
                return "- More Information"
            case 'exploring':
                return "Exploring";
        }
    }
    return (
        <div className="flex justify-center items-center gap-3 pointer-events-none" >
            <div className="w-[40px] h-[40px] rounded-full relative" >
                {typeof img === "string" ? <Image src={img} alt="konnect.io chat profile" fill sizes="" className="object-contain pointer-events-none rounded-full overflow-hidden" />
                    :
                    <div className="w-[40px] h-[40px] rounded-full flex justify-center items-center bg-white-600" >
                        {img}
                    </div>}
                <div className={`w-[8px] h-[8px] overflow-hidden rounded-full absolute bottom-1 right-0 z-50 ${active ? "animate-pulse bg-success-600" : "bg-success-300"}`} />
            </div>
            <div>
                <h3 className="text-white-600 text-[14px] capitalize" >{name}</h3>
                <p className="text-white-600 text-[12px] font-light capitalize  " >{active ? "Online" : "Offline"} <span>{getStatus(status)}</span> </p>
            </div>
        </div>
    )
}

export default Profile