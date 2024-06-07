import React from 'react'
import Image from "next/image";
import { GrMail } from 'react-icons/gr';
import { FaLinkedinIn } from 'react-icons/fa';




type Props = {
    role: string;
    name: string;
    img: string;
    linkedIn: string,
    mail: string
}

const TeamCard = ({ role, name, img, linkedIn, mail }: Props) => {
    return (
        <div className='w-full h-auto p-2 bg-brand-primary_light rounded-2xl text-center shadow-2xl flex justify-center items-center flex-col'>
            <div className="w-[100%] md:h-[400px] sm:h-[300px] custom:h-[250px] h-[160px] overflow-hidden relative rounded-2xl ">
                <Image src={`/Team/${img}`} alt="" fill sizes="" className="object-cover rounded-2xl group transition-grayscale  duration-1000  hover:scale-105 grayscale hover:grayscale-0" />
            </div>
            <h3 className='sm:text-[18px] text-[14px] font-semibold text-brand-primary uppercase mt-4'>{name}</h3>
            <h2 className='md:text-[14px] text-[12px] uppercase md:tracking-widest tracking-wide'>{role}</h2>
            <hr className='w-[30px] border-black-400 my-3' />
            <div className='w-full flex justify-center items-center gap-2 sm:mb-2'>
                <a href={linkedIn}>
                    <FaLinkedinIn className='m-1 hover:text-brand-primary cursor-pointer md:text-[20px]' />
                </a>
                <a href={`mailto:${mail}`}>
                    <GrMail className='m-1 hover:text-brand-primary cursor-pointer md:text-[20px]' />
                </a>
            </div>
        </div>
    )
}

export default TeamCard