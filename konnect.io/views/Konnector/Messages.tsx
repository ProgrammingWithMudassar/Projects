"use client"
import Contacts from "@/components/Konnectors/Messages/Contacts"
import InputField from "@/components/shared/InputField"
import { Fragment, useEffect, useRef, useState } from "react";
import Profile from "@/components/shared/Chat/Profile";
import SendTab from "@/components/shared/Chat/SendTab";
import SwitchBtn from "@/components/shared/SwitchBtn";
import { IMessages, IRating } from "@/types/types";
import Feedback from "@/components/shared/Feedback";
import { useSearchParams } from 'next/navigation'
import { db, chatCollection } from "@/firebase/config";
import {
    addDoc,
    query,
    where,
    updateDoc,
    getDoc,
    getDocs,
    onSnapshot,
    doc,
} from "firebase/firestore";
import { uploadBytes, ref, getDownloadURL, getStorage } from "firebase/storage";
import { LogError } from "@/lib/LogFiles";
import { useAuth } from "@/hooks/useAuth";
import { PiSmileySad } from "react-icons/pi";
import { toast } from "react-toastify";
import Image from "next/image";
import { useKonnectorFeedbackMutation, useKonnectorUpdateConcealMutation, useIsFeedbackAddedMutation, useInternalIdMutation, useInteractionInfoMutation } from "@/Redux/RTK_API/Auth_Api";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import ShowAsset from "@/components/shared/Chat/ShowAsset";
import { } from "@/Redux/RTK_API/Auth_Api";
import { BiSolidUser } from "react-icons/bi";


type FeedBackData = {
    vendor_id: string;
    communication: number;
    service: number;
    support: number;
};

type ApiResponse = {
    data?: any;
    error?: { status?: any, data?: any } & (FetchBaseQueryError | SerializedError);
    status?: any;
};
const Messages = () => {
    const storage = getStorage();
    const { token, user } = useAuth();
    const searchParams = useSearchParams();
    const [feedback, setFeedback] = useState<boolean>(false)
    const [contactList, setContactList] = useState([]);
    const messagesContainerRef = useRef<HTMLDivElement | null>(null);
    const [addKonnectorFeedback] = useKonnectorFeedbackMutation();
    const [updateConceal] = useKonnectorUpdateConcealMutation();
    const [messages, setMessages] = useState<IMessages>({
        conceal: false,
        id: "",
        interaction_type: "",
        user_first_name: "",
        user_last_name: "",
        user_company: "",
        user_id: 0,
        user_profile_icon: "",
        message: [],
        vendor_company: "",
        vendor_id: 0,
        vendor_profile_icon: "",
        internal_id: 0
    });
    const [rating, setRating] = useState<IRating>({
        communication: 0,
        service: 0,
        support: 0
    })
    const [input, setInput] = useState<{
        search: string, message: string, rawFile: File | null
    }>({ search: "", message: "", rawFile: null });
    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput({
            ...input,
            [name]: value
        });
    };
    const checkOpenFeedbackType = () => {
        if (rating.communication !== 0 && rating.service === 0) return "service";
        if (rating.service !== 0 && rating.support === 0) return "support";
        if (rating.support !== 0) return "support"
    }
    // ==============
    // Start new chat
    // ==============
    const [getInternalID] = useInternalIdMutation();
    const [postInteractionInfo] = useInteractionInfoMutation();
    function getLastWordAfterComma(inputString: string): string | undefined {
        const parts = inputString.split(',');
        if (parts.length > 1) {
            // Use trim to remove any leading/trailing spaces
            return parts[parts.length - 1].trim();
        }
        // Return undefined if there is no comma in the input string
        return undefined;
    }
    const fetchInternalID = async (vendor_id: number, cb: any) => {
        const territory = getLastWordAfterComma(user.hq_location)
        try {
            const response: ApiResponse = await getInternalID({ vendor_id, territory, accessToken: token });
            if (response.error) {
                return cb();
            }
            return cb(response.data.selectedInternalId);
        } catch (error) {
            return cb()
        }
    }
    const startNewChat = async (user_id: number, user_profile_icon: string, vendor_id: number, vendor_profile_icon: string, interaction_type: string, conceal: boolean, user_company: string, vendor_company: string, internal_id: number | null) => {
        const chatQuery = query(
            chatCollection,
            where('user_id', '==', user_id),
            where('vendor_id', '==', vendor_id)
        );
        const data = {
            user_id,
            user_first_name: user?.first_name,
            user_last_name: user?.last_name,
            user_company,
            user_profile_icon,
            vendor_id,
            internal_id,
            vendor_company,
            vendor_profile_icon,
            interaction_type,
            conceal,
            message: [],
        };
        const existingChats = await getDocs(chatQuery);
        if (existingChats.empty) {
            try {
                const docRef = await addDoc(chatCollection, data);
                const message_id = docRef.id;
                const formData = { vendor_id, interaction_type, message_id, internal_id };
                const response: ApiResponse = await postInteractionInfo({ formData, accessToken: token });
                if (response.error && response.error.status === 500) {
                    // Delete doc from firebase
                    return toast.error("Server", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
                }
            } catch (error) {
                LogError("Konnector(messages)", error);
                return toast.error("Unable to start chat.", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    hideProgressBar: true,
                });
            }
        }
        else {
            // console.log('Chat already exists with user_id and vendor_id.');
        }
    }
    useEffect(() => {
        if (!user) return;
        const user_id = searchParams.get('user_id')
        const user_profile_icon = searchParams.get('user_profile_icon');
        const vendor_id = searchParams.get('vendor_id')
        const vendor_profile_icon = searchParams.get('vendor_profile_icon');
        const interaction_type = searchParams.get('interaction_type');
        const user_company = searchParams.get('user_company');
        const vendor_company = searchParams.get('vendor_company');
        if (user_id && vendor_id && interaction_type && user_profile_icon && vendor_profile_icon && user_company && vendor_company) {
            fetchInternalID(+vendor_id, (internal_id: number) => {
                startNewChat(+user_id, user_profile_icon, +vendor_id, vendor_profile_icon, interaction_type, true, user_company, vendor_company, internal_id ? internal_id : 0)
            })

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams])

    // ===========================================
    // Listen to chats collection for contact list
    // ===========================================
    useEffect(() => {
        if (user && user.id) {
            const userChatsQuery = query(chatCollection, where('user_id', '==', user.id));
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

    const uploadAssetsToFirebase = async (file: File) => {
        try {
            const storageRef = ref(storage, "konnect.io/" + file.name);
            await uploadBytes(storageRef, file);
            const mediaURL = await getDownloadURL(storageRef);
            return mediaURL;
        } catch (error) {
            LogError("Konnector(messages)", error);
            return toast.error(`Unable to upload ${file.name}.`, {
                position: toast.POSITION.BOTTOM_RIGHT,
                hideProgressBar: true,
            });
        }
    }

    const sendMessage = async (documentId: string, messageText: string) => {
        const newMessage = {
            messageText,
            timestamp: new Date(), // Use a valid timestamp here, e.g., new Date() or Firebase's FieldValue.serverTimestamp()
            isUser: true,
            media: "",
        };
        if (input.rawFile) {
            const attachment = await uploadAssetsToFirebase(input.rawFile) as string
            newMessage.media = attachment;
        }
        if (!input.message && !input.rawFile) return toast.warn("Type something to send.", {
            position: toast.POSITION.BOTTOM_RIGHT,
            hideProgressBar: true,
        });
        try {
            const docRef = doc(db, "chats", documentId);
            const docSnapshot = await getDoc(docRef);

            if (docSnapshot.exists()) {
                const documentData = docSnapshot.data();

                const existingMessages = documentData.message || [];
                existingMessages.push(newMessage);

                await updateDoc(docRef, {
                    message: existingMessages,
                });

            } else {
                return toast.warn("No chat exist", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    hideProgressBar: true,
                });
            }
        } catch (error) {
            LogError("Konnector(messages)", error);
            return toast.error("Unable to send message.", {
                position: toast.POSITION.BOTTOM_RIGHT,
                hideProgressBar: true,
            });
        }
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

    // Update conceal status
    const updateConcealStatus = async (e: boolean) => {
        if (!messages.id && !messages.vendor_id) return toast.error("Unable to update status, try again.", {
            position: toast.POSITION.BOTTOM_RIGHT,
            hideProgressBar: true,
        });

        const response: ApiResponse = await updateConceal({
            formData: {
                message_id: messages.id,
                conceal: e
            }, accessToken: token
        });
        if (response.error && response.error.status === 500) return toast.error("Server is busy", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
        if (response.error && response.error.status === 404) return toast.warn("Mis matched in Postgres and Firebase chat.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
        const docRef = doc(db, "chats", messages.id);
        try {
            await updateDoc(docRef, {
                conceal: e,
            });
            setMessages({ ...messages, conceal: e })
        } catch (error) {
            return toast.error("Unable to update status", {
                position: toast.POSITION.BOTTOM_RIGHT,
                hideProgressBar: true,
            });
        }
    };

    const postFeedbackHandler = async () => {
        if (rating.support === 0 || rating.communication === 0 || rating.support === 0) return;
        const formData: FeedBackData = {
            vendor_id: user?.id,
            communication: rating.communication,
            service: rating.service,
            support: rating.support,
        };

        const response: ApiResponse = await addKonnectorFeedback({ formData, accessToken: token });
        if (response.error && response.error.status === 500) {
            return toast.error("Server is busy", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
        }
        if (response.error && response.error.status === 409) {
            return toast.error("Somthing is wrong", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
        }
        setFeedback(false);
        toast.success("Thanks for letting us know.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true })
    }

    // Query 
    const [IsFeedbackAdded] = useIsFeedbackAddedMutation();

    const IsFeedbackExist = async (c: any) => {
        const { vendor_id } = c;
        const VendorID = { vendor_id }
        const response: any = await IsFeedbackAdded({ VendorID, accessToken: token })
        if (!response?.data?.isExist && messages.message.length > 20) {
            setFeedback(true)
        }
    }

    return (
        <Fragment>
            <section className="w-full h-full grid lg:grid-cols-[300px,calc(100%-316px)] grid-cols-[70px,calc(100%-86px)] gap-4" >
                <Contacts
                    title="Messaging"
                    searchBar={<InputField placeHolder={"Search here..."} id="Search" type="text" name="search" value={input.search} onChange={inputHandler} required inputStyle={"rounded-full w-full"} />}
                    contactList={contactList}
                    getActiveChat={(c) => { setMessages(c); IsFeedbackExist(c) }}
                />
                <aside className="w-full h-[calc(100vh-94px)] overflow-hidden" >
                    {
                        messages?.id ? <Fragment>
                            <div className="w-full h-[70px] p-4 bg-brand-primary flex justify-between items-center rounded-[20px]" >
                                <Profile name={messages.vendor_company} img={messages?.vendor_profile_icon} active status={messages.interaction_type} />
                                <div className="text-[14px] text-white-600 flex gap-2" >
                                    Konceal: <SwitchBtn active={messages.conceal} setActive={updateConcealStatus} />
                                </div>
                            </div>
                            <div ref={messagesContainerRef} className="w-full h-[calc(100%-152px)] bg-white-600 rounded-[20px] mt-4 overflow-auto hide-scrollbar p-6 flex flex-col gap-6" >
                                {
                                    messages.message?.map((m: any, index: number) => m.media ? <div key={index} className={`flex justify-start items-center flex-col gap-2 rounded-lg ${m.isUser && "self-end"} max-w-[400px] bg-brand-primary p-2`} >
                                        <ShowAsset assetUrl={m.media} />
                                        {m?.messageText && <p className="text-white-600 font-light" >
                                            {m?.messageText}
                                        </p>}
                                    </div> : <div key={index} className={`flex justify-start items-center gap-2 ${m.isUser && "self-end flex-row-reverse"} max-w-[400px]`} >
                                        <div className="min-w-[50px] w-[50px] h-[50px] overflow-hidden rounded-full relative bg-black-300" >
                                            {
                                                m.isUser ?
                                                    <div className='w-[50px] h-[50px] flex justify-center items-center' >
                                                        <BiSolidUser className="text-white-600 text-[24px]" />
                                                    </div>
                                                    :
                                                    <Image
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, 100vw"
                                                        alt="Profile picture"
                                                        src={m.isUser ? messages.user_profile_icon : messages.vendor_profile_icon}
                                                        priority
                                                        className="object-contain pointer-events-none"
                                                    />
                                            }
                                        </div>
                                        <p className="px-4 py-1 text-white-600 bg-brand-primary rounded-lg font-light" >
                                            {m?.messageText}
                                        </p>
                                    </div>)
                                }
                            </div>
                            <SendTab value={input.message} inputHandler={inputHandler} id={messages?.id} isAttached={input?.rawFile?.name} attachmentHandler={(file: File) => setInput({ ...input, rawFile: file })} messageSendHandler={(id: string) => {
                                sendMessage(id, input.message); // Assuming this is a user message
                                setInput({ ...input, message: "", rawFile: null });
                            }} />
                        </Fragment> : <div className='w-full h-[calc(100%-152px)] flex justify-center items-center flex-col text-[18px] font-semibold text-brand-primary my-10' >
                            <PiSmileySad className='text-[100px] text-center' /> Nothing to show
                        </div>
                    }
                </aside>
            </section>
            <Feedback
                show={feedback}
                onClose={() => setFeedback(false)}
                rating={checkOpenFeedbackType() === "service" ? rating.service : checkOpenFeedbackType() === "support" ? rating.support : rating.communication}
                setRating={(e: number) => {
                    checkOpenFeedbackType() === "service" ?
                        setRating({ ...rating, service: e }) :
                        checkOpenFeedbackType() === "support" ?
                            setRating({ ...rating, support: e }) :
                            setRating({ ...rating, communication: e })
                }}
                title={
                    checkOpenFeedbackType() === "service" ?
                        "How was the service?" :
                        checkOpenFeedbackType() === "support" ?
                            "How was the support?" : "How was the communication?"
                }
                disable={checkOpenFeedbackType() !== "support"}
                submit={() => postFeedbackHandler()}
            />
        </Fragment>
    )
}

export default Messages