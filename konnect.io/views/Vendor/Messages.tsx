"use client"
import ConversationList from '@/components/Vendor/Users/Conversation/Conversation';
import InputField from "@/components/shared/InputField"
import { Fragment, useEffect, useRef, useState } from "react";
import Profile from "@/components/shared/Chat/Profile";
import SendTab from "@/components/shared/Chat/SendTab";
import { useAuth } from '@/hooks/useAuth';
import { IMessages } from '@/types/types';
import { chatCollection, db } from '@/firebase/config';
import { doc, onSnapshot, query, where } from 'firebase/firestore';
import Image from 'next/image';
import { BiSolidUser } from 'react-icons/bi';
import ShowAsset from '@/components/shared/Chat/ShowAsset';
import { PiSmileySad } from 'react-icons/pi';


const VendorMessages = () => {
    const { user, token } = useAuth();
    const [contactList, setContactList] = useState([]);
    const messagesContainerRef = useRef<HTMLDivElement | null>(null);
    const [messages, setMessages] = useState<IMessages>({
        conceal: false,
        id: "",
        interaction_type: "",
        user_company: "",
        user_first_name: "",
        user_last_name: "",
        user_id: 0,
        user_profile_icon: "",
        message: [],
        vendor_company: "",
        vendor_id: 0,
        vendor_profile_icon: "",
        internal_id: 0
    });

    // ===========================================
    // Listen to chats collection for contact list
    // ===========================================
    useEffect(() => {
        if (user && user.id) {
            const userChatsQuery = query(chatCollection, where('vendor_id', '==', user.id));
            // Set up a real-time listener
            const unsubscribe = onSnapshot(userChatsQuery, (snapshot) => {
                const records: any = [];
                snapshot.forEach((doc) => {
                    records.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
                setContactList(records);
            });
            return () => {
                unsubscribe();
            };
        }
    }, [user]);
    const [input, setInput] = useState({
        search: "",
        message: ""
    });
    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput({
            ...input,
            [name]: value
        });
    };

    // ==========================
    // Listen to updated messages
    // ==========================
    useEffect(() => {
        if (!messages.id) return;
        const docRef = doc(db, "chats", messages.id);

        // Set up a real-time listener for the document
        const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const data = docSnapshot.data();
                const messageArray = data.message || [];

                setMessages((prevData) => ({
                    ...prevData,
                    message: messageArray,
                }));
            }
        });

        return () => {
            unsubscribe();
        };
    }, [messages.id]);

    // Scroll to bottom for messages
    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);
    return (
        <section className="w-full h-full grid lg:grid-cols-[300px,calc(100%-316px)] grid-cols-[70px,calc(100%-86px)] gap-4" >
            <ConversationList
                title="Messaging"
                searchBar={<InputField placeHolder={"Search here..."} id="Search" type="text" name="search" value={input.search} onChange={inputHandler} required inputStyle={"rounded-full w-full"} />}
                contactList={contactList}
                getActiveChat={(c) => setMessages(c)}
            />
            <aside className="w-full h-[calc(100vh-94px)] overflow-hidden" >
                <aside className="w-full h-[calc(100vh-94px)] overflow-hidden" >
                    {
                        messages?.id ? (
                            <Fragment>
                                <div className="w-full h-[70px] p-4 bg-brand-primary flex justify-between items-center rounded-[20px]">
                                    <Profile
                                        name={messages?.conceal ? `${messages?.user_first_name + " " + messages?.user_last_name} - ${messages?.user_company}` : "Konnector"}
                                        // img={messages?.conceal ? messages?.user_profile_icon : <BiSolidUser className="text-brand-primary text-[24px]" />}
                                        img={<BiSolidUser className="text-brand-primary text-[24px]" />}
                                        active status={messages.interaction_type}
                                    />
                                </div>
                                <div ref={messagesContainerRef} className="w-full h-[calc(100%-90px)] bg-white-600 rounded-[20px] mt-4 overflow-auto hide-scrollbar p-6 flex flex-col gap-6" >
                                    {
                                        messages.message?.map((m: any, index: number) => m.media ? <div key={index} className={`flex justify-start items-center flex-col gap-2 rounded-lg ${!m.isUser && "self-end"} max-w-[50%] bg-brand-primary p-2`} >
                                            <ShowAsset assetUrl={m.media} />
                                            {m?.messageText && <p className="text-white-600 font-light" >
                                                {m?.messageText}
                                            </p>}
                                        </div> : <div key={index} className={`flex justify-start items-center gap-2 ${!m.isUser && "self-end flex-row-reverse"} max-w-[400px]`} >
                                            <div className="min-w-[50px] w-[50px] h-[50px] overflow-hidden rounded-full relative bg-black-300" >
                                                {
                                                    !m.isUser ?
                                                        <Image
                                                            fill
                                                            sizes="(max-width: 768px) 100vw, 100vw"
                                                            alt="Profile picture"
                                                            src={messages.vendor_profile_icon}
                                                            priority
                                                            className="object-contain pointer-events-none"
                                                        /> :
                                                        // messages?.conceal ? <Image
                                                        //     fill
                                                        //     sizes="(max-width: 768px) 100vw, 100vw"
                                                        //     alt="Profile picture"
                                                        //     src={messages.user_profile_icon}
                                                        //     priority
                                                        //     className="object-contain pointer-events-none"
                                                        // />
                                                        //     :
                                                        <div className='w-[50px] h-[50px] flex justify-center items-center' >
                                                            <BiSolidUser className="text-white-600 text-[24px]" />
                                                        </div>
                                                }
                                            </div>
                                            <p className="px-4 py-1 text-white-600 bg-brand-primary rounded-lg font-light" >
                                                {m?.messageText}
                                            </p>
                                        </div>)
                                    }
                                </div>
                            </Fragment>
                        ) : (
                            <div className='w-full h-[calc(100%-152px)] flex justify-center items-center flex-col text-[18px] font-semibold text-brand-primary my-10'>
                                <PiSmileySad className='text-[100px] text-center' />
                                {/* Content when messages.conceal is false */}
                            </div>
                        )
                    }
                </aside>
            </aside>
        </section>
    )
}

export default VendorMessages