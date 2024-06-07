import React from 'react'
import { BsArrowRight } from 'react-icons/bs'

type Props = {
    title: string,
    text: string,
    style?: string
}

const List = ({ title, text, style }: Props) => {
    return (
        <div className={`w-full md:pl-6 flex justify-start items-start gap-2 ${style}`} >
            <BsArrowRight className="text-[22px] min-w-[22px] text-brand-tertiary mt-1.5" />
            <p className="font-primary text-[17px] text-black-off mt-1" >
                <span className="font-bold font-inter" >{title}</span>
                {text}
            </p>
        </div>
    )
}

export default List