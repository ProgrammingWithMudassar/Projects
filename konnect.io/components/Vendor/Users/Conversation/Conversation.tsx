import { ReactNode } from "react";
import Image from "next/image";
import { BiSolidUser } from "react-icons/bi";
import { IMessages } from "@/types/types";

type Props = {
    title: string;
    searchBar: ReactNode;
    contactList: Array<any>;
    getActiveChat: (c: any) => void
}

const Contacts = ({ title, searchBar, contactList, getActiveChat }: Props) => {
    function findFirstUserMessage(messages: any): string {
        const reversedMessages = [...messages].reverse();
        const firstUserMessage = reversedMessages.find((message) => message.isUser);
        return firstUserMessage ? firstUserMessage.messageText : '';
    }
    return (
        <aside className="w-full h-full max-h-[calc(100vh-94px)] bg-white-300 rounded-[20px] lg:p-4 p-2 overflow-auto flex justify-start items-start flex-col gap-3 hide-scrollbar" >
            <h3 className="text-[20px] font-medium text-black-500 capitalize lg:block hidden" >{title}</h3>
            <div className="w-full lg:block hidden" >
                {searchBar}
            </div>
            {
                contactList?.map((c: IMessages, index: number) =>
                    <button key={index} onClick={() => getActiveChat(c)} className="w-full grid lg:grid-cols-[1fr,4fr] justify-center items-center p-1 lg:shadow-light lg:border-[1px] border-gray-200 rounded-full group" >
                        <div className="w-full" >
                            <div className="w-[40px] h-[40px] rounded-full overflow-hidden relative bg-brand-primary flex justify-center items-center" >
                                {
                                    // c?.conceal ? <Image src={c?.user_profile_icon} alt={c?.user_profile_icon} fill sizes="" className="object-contain" /> : <BiSolidUser className="text-white-600 text-[24px]" />
                                    <BiSolidUser className="text-white-600 text-[24px]" />
                                }

                            </div>
                        </div>
                        <div className="w-full h-[40px] overflow-hidden transition-all duration-300 group-hover:scale-[1.03] lg:flex hidden justify-center items-start flex-col" >
                            <strong className="font-semibold text-[14px] text-brand-primary whitespace-nowrap text-left capitalize" >{c?.conceal ? c?.user_company : "Konnector"}</strong>
                            <p className="text-[12px] text-brand-primary text-left" >{findFirstUserMessage(c?.message).slice(0, 30)}</p>
                        </div>
                    </button>)
            }
        </aside>
    )
}

export default Contacts