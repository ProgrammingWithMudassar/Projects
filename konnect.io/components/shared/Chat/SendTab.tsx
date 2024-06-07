"use client";
import { IoIosDoneAll, IoMdAttach } from "react-icons/io"
import { AiOutlineSend } from "react-icons/ai";
import { ChangeEvent, FormEvent, useRef } from "react";

type Props = {
    messageSendHandler: (id: string) => void;
    attachmentHandler: (file: File) => void;
    inputHandler: (e: ChangeEvent<HTMLInputElement>) => void;
    value: string;
    style?: string;
    id: string;
    isAttached?: string
}

const SendTab = ({ messageSendHandler, isAttached, attachmentHandler, inputHandler, value, style = "h-[50px] mt-4", id }: Props) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    return (
        <form onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            messageSendHandler(id)
        }} className={"w-full grid grid-cols-[1fr,10fr,1fr] md:gap-2 gap-4 rounded-[20px] ".concat(style)} >
            <div className='relative flex justify-center items-center' >
                {
                    isAttached ? <IoIosDoneAll className='text-[28px] text-black-500' /> : <>
                        <button
                            type='button'
                            onClick={() => {
                                if (fileInputRef.current) {
                                    fileInputRef.current.click();
                                }
                            }} className="w-full h-full flex justify-center items-center">
                            <IoMdAttach className="text-[28px] text-black-500 cursor-pointer" />
                        </button>
                        <input ref={fileInputRef}
                            type="file"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const selectedFile = event.target.files?.[0];
                                if (selectedFile) {
                                    attachmentHandler(selectedFile)
                                }
                            }}
                            accept=".pdf, .png, .jpeg, .jpg" className="hidden" />
                    </>
                }

            </div>
            <input value={value} onChange={inputHandler} name="message" autoComplete="off" autoCorrect="off" type="text" id="vendorSend" className="w-full h-full outline-none border-none rounded-full px-4 font-light text-[14px]" placeholder="Send message..." />
            <div className="w-full flex justify-center items-center" >
                <button type="submit" className="w-[50px] h-full rounded-full flex justify-center items-center bg-brand-primary" >
                    <AiOutlineSend className="text-white-600 text-[22px]" />
                </button>
            </div>
        </form>
    )
}

export default SendTab