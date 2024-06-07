"use client";
import Image from "next/image";

type Props = {
    img: string;
    text: string
}

const ChatWidget = ({ img, text }: Props) => {
    return (
        <div className="flex justify-start items-center gap-2" >
            <div className="w-[30px] h-[30px] overflow-hidden rounded-full relative" >
                <Image
                    fill
                    sizes="(max-width: 768px) 100vw, 100vw"
                    alt="Profile picture"
                    src={img}
                    priority
                    className="overflow-hidden rounded-full relative pointer-events-none"
                />
            </div>
            <p className="px-4 py-1 text-white-600 bg-brand-primary_light" >
                {text}
            </p>
        </div>
    )
}

export default ChatWidget