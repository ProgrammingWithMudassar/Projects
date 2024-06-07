"use client"
import ConversationList from '@/components/Vendor/Users/Conversation/Conversation';
import Profile from '@/components/shared/Chat/Profile';
import InputField from '@/components/shared/InputField';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { doc, getDoc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { chatCollection, db } from '@/firebase/config';
import { IMessages } from '@/types/types';
import { PiSmileySad } from 'react-icons/pi';
import { BiSolidUser } from 'react-icons/bi';
import Image from 'next/image';
import ShowAsset from '@/components/shared/Chat/ShowAsset';
import SendTab from '@/components/shared/Chat/SendTab';
import { toast } from 'react-toastify';
import { LogError } from '@/lib/LogFiles';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const dummyData = [
  { title: 'Total Konnects', number: 123, percentage: 45.6 },
  { title: 'Konnects this quarter', number: 456, percentage: -78.5 },
  { title: 'Metric Company 4', number: 321, percentage: 0 },
  { title: 'Total Views', number: 456, percentage: -78.5 },
  { title: 'Metric Company 5', number: 555, percentage: -25 },
];

const MemberConversation = () => {
  const storage = getStorage();
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
  const [input, setInput] = useState<{
    search: string, message: string, rawFile: File | null
  }>({ search: "", message: "", rawFile: null })
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({
      ...input,
      [name]: value
    });
  };

  // ===========================================
  // Listen to chats collection for contact list
  // ===========================================
  useEffect(() => {
    if (user && user.id) {
      const userChatsQuery = query(chatCollection, where('internal_id', '==', user.id));
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


  // Listen to updated conceal status
  useEffect(() => {
    if (!messages.id) return;
    const docRef = doc(db, "chats", messages.id);

    // Set up a real-time listener for the document
    const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const conceal = data.conceal;
        setMessages((prevData) => ({ ...prevData, conceal, }));
      }
    });
    return () => {
      unsubscribe();
    };
  }, [messages.conceal, messages.id]);

  // Upload assets to firebase
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

  // Send Message
  const sendMessage = async (documentId: string, messageText: string) => {
    const newMessage = {
      messageText,
      timestamp: new Date(),
      isUser: false,
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

  return (
    <section className='w-full h-full grid lg:grid-cols-[300px,calc(100%-316px)] grid-cols-[70px,calc(100%-86px)] gap-4'>
      <ConversationList
        title="Messaging"
        searchBar={<InputField placeHolder={"Search here..."} id="Search" type="text" name="search" value={input.search} onChange={inputHandler} required inputStyle={"rounded-full w-full"} />}
        contactList={contactList}
        getActiveChat={(c) => setMessages(c)}
      />
      <aside className="w-full h-[calc(100vh-94px)] overflow-hidden" >
        {
          messages?.id ? (
            <Fragment>
              <div className="w-full h-[70px] p-4 bg-brand-primary flex justify-between items-center rounded-[20px]">
                <Profile
                  name={messages?.conceal ? `${messages?.user_first_name + " " + messages?.user_last_name} - ${messages?.user_company}` : `Konnector - ${messages?.user_company}`}
                  // img={messages?.conceal ? messages?.user_profile_icon : <BiSolidUser className="text-brand-primary text-[24px]" />}
                  img={<BiSolidUser className="text-brand-primary text-[24px]" />}
                  active status={messages.interaction_type}
                />
              </div>
              <div ref={messagesContainerRef} className="w-full h-[calc(100%-152px)] bg-white-600 rounded-[20px] mt-4 overflow-auto hide-scrollbar p-6 flex flex-col gap-6" >
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
                          messages?.conceal ? <Image
                            fill
                            sizes="(max-width: 768px) 100vw, 100vw"
                            alt="Profile picture"
                            src={messages.user_profile_icon}
                            priority
                            className="object-contain pointer-events-none"
                          />
                            :
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
              <SendTab value={input.message} inputHandler={inputHandler} id={messages?.id} isAttached={input?.rawFile?.name} attachmentHandler={(file: File) => setInput({ ...input, rawFile: file })} messageSendHandler={(id: string) => {
                sendMessage(id, input.message); // Assuming this is a user message
                setInput({ ...input, message: "", rawFile: null });
              }} />
            </Fragment>
          ) : (
            <div className='w-full h-[calc(100%-152px)] flex justify-center items-center flex-col text-[18px] font-semibold text-brand-primary my-10'>
              <PiSmileySad className='text-[100px] text-center' />
              {/* Content when messages.conceal is false */}
            </div>
          )
        }
      </aside>
    </section>
  )
}

export default MemberConversation
