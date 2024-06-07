"use client";
import Wrapper from "../Wrapper";
import Image from "next/image";
import Link from "next/link";
import NavItem from "@/json/NavItem.json"
import Button from "../Button";
import { Divide as Hamburger } from 'hamburger-react'
import { Fragment, useState } from "react";
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css'
import { usePathname } from 'next/navigation'
import { useAuth } from "@/hooks/useAuth";
import Dialogue from "../Dialogue";
import { BsArrowRight } from "react-icons/bs";

const TopNavigation = () => {
    const { user } = useAuth()
    const pathname = usePathname();
    const [isDialogue, setIsDialogue] = useState<boolean>(false);
    const toggleDialogue = () => {
        setIsDialogue((prevValue) => !prevValue);
    };
    const [isMenu, setMenu] = useState<boolean>(false)
    const redirect = () => {
        switch (user?.role) {
            case "konnector":
                return "/konnector/explore";
            case "vendor":
                if (!user.subscriptionStatus)
                    return "/subscription";
                return "/vendor/dashboard";
            case "admin":
                return "/admin/vendor";
            case "internal":
                return "/internal/konnects";
            default:
                return "/auth/login";
        }
    }
    return (
        <Fragment>
            <Wrapper
                id="TopNavigation"
                outerContainerStyle={`h-[70px] bg-brand-primary rounded-b-[20px] 
                ${(pathname === "/" || pathname === "/auth/login" || pathname === "/auth/vendor" || pathname === "/register/konnector" || pathname === "/auth/forgetpassword") && "sticky top-0 z-[100]"}`}
                innerContainerStyle="flex justify-between items-center"
            >
                {/* Logo */}
                <Link href={"/"} className="relative sm:w-[200px] w-[130px] sm:h-[60px] h-[40px]" >
                    <Image src={"/brand-color-no-background.svg"} priority alt="konnect.io logo" fill sizes="" className="object-contain pointer-events-none" />
                </Link>

                {/* NavItems */}
                <aside className="lg:flex hidden justify-center items-center gap-6" >
                    {NavItem?.map((item: any, index: number) => <Link key={index} href={item.route} className={`font-normal text-white-600 text-[16px] leading-[20px] break-words relative before:transition-all before:duration-500 before:absolute before:left-[50%] before:bottom-[-1px] before:bg-white-600 hover:before:w-[47%] before:h-[1.5px] before:w-0 before:rounded-r-full after:transition-all after:duration-500 after:absolute after:right-[47%] after:bottom-[-1px] after:bg-white-600 hover:after:w-[50%] after:h-[1.5px] after:w-0 after:rounded-l-full`} >
                        {item?.name}
                    </Link>)}
                    {
                        user?.role ? <Link href={redirect()} >
                            <Button text={"Dashboard"} style="bg-black-600 rounded-full md:text-[16px] text-[14px]" onClick={() => { }} />
                        </Link> : <Button text={"Konnect"} style="bg-black-600 rounded-full md:text-[16px] text-[14px]" onClick={toggleDialogue} />
                    }

                </aside>

                {/* Hamburger */}
                <div className="lg:hidden" ><Hamburger toggled={isMenu} toggle={setMenu} rounded color="white" /></div>
            </Wrapper>

            <Drawer
                open={isMenu}
                onClose={() => setMenu(!isMenu)}
                direction='left'
                style={{ width: "80%", background: "transparent" }}
            >
                <aside className="w-full h-full bg-brand-secondary flex justify-start items-center flex-col" >
                    <div className="w-full h-[70px] flex justify-start items-center md:px-10 px-4" >
                        <Link onClick={() => setMenu(!isMenu)} href={"/"} className="relative w-[130px] h-[40px]" >
                            <Image src={"/brand-color-no-background.svg"} priority alt="konnect.io logo" fill sizes="" className="object-contain pointer-events-none" />
                        </Link>
                    </div>
                    <div className="w-full flex justify-center items-start flex-col mt-4 px-4" >
                        {NavItem?.map((item: any, index: number) => <Link onClick={() => setMenu(!isMenu)} key={index} href={item.route} className="w-full h-[46px] text-[16px] text-white-600 border-b-[1px] border-white-600 tracking-wider flex justify-start items-end pb-1" >
                            {item?.name}
                        </Link>)}
                        <Link href={redirect()} >
                            <Button text="Konnect" style="bg-black-600 mt-6 w-full rounded-full md:text-[16px] text-[14px]" onClick={() => setMenu(!isMenu)} />
                        </Link>
                    </div>
                </aside>
            </Drawer>

            <Dialogue
                show={isDialogue}
                onClose={toggleDialogue}
                style="max-w-[400px] bg-white-600 flex justify-center items-center flex-col py-6"
            >
                <div className="relative w-[300px] h-[90px]">
                    <Image
                        src={"/black-no-background.svg"}
                        alt="konnect.io logo"
                        fill
                        sizes=""
                        className="object-contain pointer-events-none"
                    />
                </div>
                <div className="flex justify-center items-center flex-col gap-3 mt-6">
                    <Link href={"/auth/login/?user_type=konnector"} >
                        <Button
                            text="Konnector"
                            style="bg-brand-primary w-[210px] rounded-full md:text-[16px] text-[14px]"
                            onClick={toggleDialogue}
                        />
                    </Link>
                    <Link href={"/auth/login/?user_type=vendor"} >
                        <Button
                            text="Vendor"
                            style="bg-brand-primary w-[210px] rounded-full md:text-[16px] text-[14px]"
                            onClick={toggleDialogue}
                        />
                    </Link>
                    <Link href={"/auth/login/?user_type=internal"} >
                        <Button
                            text="Vendor - internal"
                            style="bg-brand-primary w-[210px] rounded-full md:text-[16px] text-[14px]"
                            onClick={toggleDialogue}
                        />
                    </Link>
                </div>
            </Dialogue>
        </Fragment>
    )
}

export default TopNavigation