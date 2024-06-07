"use client"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment, ReactNode } from "react";
import { AiFillCloseCircle } from "react-icons/ai"

type Props = {
    show: boolean;
    onClose: () => void;
    children: ReactNode;
    style?: string
}

const Dialogue = ({ show, onClose, children, style }: Props) => {
    return (
        <Transition appear show={show} as={Fragment}>
            <Dialog as="section" className="relative z-[999]" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black-600 backdrop-blur-sm bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center text-center px-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className={`w-full border-[1px] border-black-600 transform overflow-hidden rounded-[20px] shadow-2xl transition-all group ${style} `}>
                                <AiFillCloseCircle onClick={onClose} className="text-[20px] cursor-pointer absolute right-[10px] top-[10px] transition-all duration-300" />
                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default Dialogue