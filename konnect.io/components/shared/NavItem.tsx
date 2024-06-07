"use client"
import Link from "next/link"    
import { ReactNode } from "react";

type Props = {
    href: string;
    text: string;
    icon: ReactNode;
    active: boolean
}

const NavItem = ({ href, text, icon, active }: Props) => {
    return (
        <Link href={href} className={`w-full h-[40px] mx-auto px-3 rounded-full overflow-hidden flex justify-between items-center capitalize font-medium text-[14px] border-white-600 border-2 transition-all duration-300 ${active ? "text-white-600 bg-black-600" : "text-black-400 bg-white-600"}`} >
            {text}
            {icon}
        </Link>
    )
}

export default NavItem