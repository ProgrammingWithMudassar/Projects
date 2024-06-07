'use client'
import React, { useState } from 'react'
import { Switch } from '@headlessui/react';

type Props = {
    active: boolean;
    setActive: (e: boolean) => void
}

const SwitchBtn = ({ active, setActive }: Props) => {

    return (
        <div>
            <Switch
                checked={active}
                onChange={setActive}
                className={`${active ? 'bg-success-300 bg-opacity-50 border-2 border-success-600 p-[1.2px] ' : 'bg-error-300 bg-opacity-50 border-2 border-error-600 p-[1.2px]'}
                relative inline-flex h-[20.6px] w-[36px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
                <span
                    aria-hidden="true"
                    className={`${active ? 'translate-x-4' : 'translate-x-0'}
                    pointer-events-none inline-block h-[15px] w-[15px] transform rounded-full bg-white-600 shadow-lg ring-0 
                    transition duration-200 ease-in-out mx-[0.7px]`}  />
            </Switch>
        </div>
    )
}

export default SwitchBtn
