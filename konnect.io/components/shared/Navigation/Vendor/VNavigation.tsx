"use client"
import { Fragment, ReactNode, useState } from "react"
import Link from "next/link";
import Image from "next/image";
import NavItemMetaData from "@/json/NavItem.json";
import VNavItem from "@/json/VendorNavItems.json"
import Button from "../../Button";
import { Divide as Hamburger } from 'hamburger-react'
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css'
import NavItem from "../../NavItem";
import { usePathname } from "next/navigation";
import RenderIcons from "./RenderIcons";
import { BsArrowRight } from "react-icons/bs";
import Dialogue from "@/components/shared/Dialogue";
import LogoutConfirmation from "../../LogoutConfirmation";


type Props = {
    children: ReactNode
}

const KNavigation = ({ children }: Props) => {
    const pathname = usePathname();
    const [isMenu, setMenu] = useState<boolean>(false)
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isDialogue, setIsDialogue] = useState<boolean>(false);

    const handleLogout = () => setIsConfirmOpen(true);
    const handleCloseConfirm = () => setIsConfirmOpen(false);
    const toggleDialogue = () => {
        setIsDialogue((prevValue) => !prevValue);
    };

    return (
        <Fragment>
            <nav className="w-full bg-brand-primary/20 grid" >
                <nav className="px-4 h-[70px] bg-brand-primary rounded-b-[20px] flex justify-between items-center" >
                    {/* Logo */}
                    <Link href={"/"} className="relative sm:w-[200px] w-[130px] sm:h-[60px] h-[40px]" >
                        <Image src={"/brand-color-no-background.svg"} priority alt="konnect.io logo" fill sizes="" className="object-contain pointer-events-none" />
                    </Link>

                    {/* NavItems */}
                    <aside className="lg:flex hidden justify-center items-center gap-6" >
                        {NavItemMetaData?.map((item: any, index: number) => <Link key={index} href={item.route} className={`font-normal text-white-600 text-[16px] leading-[20px] break-words relative before:transition-all before:duration-500 before:absolute before:left-[50%] before:bottom-[-1px] before:bg-white-600 hover:before:w-[47%] before:h-[1.5px] before:w-0 before:rounded-r-full after:transition-all after:duration-500 after:absolute after:right-[47%] after:bottom-[-1px] after:bg-white-600 hover:after:w-[50%] after:h-[1.5px] after:w-0 after:rounded-l-full`} >
                            {item?.name}
                        </Link>)}
                        <Button
                            text="Diskonnect"
                            style="bg-black-600 rounded-full md:text-[16px] text-[14px]"
                            onClick={handleLogout}
                        />
                    </aside>
                    {/* Hamburger */}
                    <div className="lg:hidden" ><Hamburger toggled={isMenu} toggle={setMenu} rounded color="white" /></div>
                </nav>
            </nav>
            <section className="w-full bg-brand-primary/20 grid lg:grid-cols-[250px,calc(100%-250px)] py-3" >
                <aside className="w-full min-h-[calc(100vh-95px)] h-full bg-brand-primary rounded-tr-[20px] rounded-br-[20px] px-6 py-4 lg:flex hidden justify-between items-center flex-col" >
                    <div className="w-full flex justify-center items-center flex-col gap-4" >
                        <h2 className="font-bold text-[28px] text-center text-white-600" >Welcome Back</h2>
                        {VNavItem?.map((item: any, index: number) => <NavItem key={index} text={item?.name} active={pathname === item?.route || pathname.includes(`vendor/${item?.name}`)} href={item?.route} icon={<RenderIcons navItem={item?.name} />} />)}
                    </div>
                </aside>
                <aside className="px-4" >
                    {children}
                </aside>
            </section>

            {/* Hamburger Drawer */}
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
                        {[...NavItemMetaData, ...VNavItem]?.map((item: any, index: number) => <Link onClick={() => setMenu(!isMenu)} key={index} href={item.route} className="w-full h-[46px] text-[16px] text-white-600 border-b-[1px] border-white-600 tracking-wider flex justify-start items-end pb-1 capitalize" >
                            {item?.name}
                        </Link>)}
                        <Button
                            text="Diskonnect"
                            style="bg-black-600 mt-6 w-full rounded-full md:text-[16px] text-[14px]"
                            onClick={() => setMenu(!isMenu)}
                        />
                    </div>
                </aside>
            </Drawer>


            <LogoutConfirmation show={isConfirmOpen} onClose={handleCloseConfirm} title="Do you really wish to LogOut?" route={"/auth/login/?user_type=vendor"} />
        </Fragment>
    )
}

export default KNavigation