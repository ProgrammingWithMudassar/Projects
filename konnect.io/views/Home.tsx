"use client"
import ExploreTechnologies from '@/components/LandingPage/ExploreTechnologies'
import Hero from '@/components/LandingPage/Hero'
import SellProducts from '@/components/LandingPage/SellProducts'
import Team from '@/components/LandingPage/Team'
import React, { FormEvent, Fragment, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import { useSendVerificationLinkMutation, useVerifyUserMutation } from '@/Redux/RTK_API/Auth_Api'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit'
import { LogError } from '@/lib/LogFiles'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import Dialogue from '@/components/shared/Dialogue'
import InputField from '@/components/shared/InputField'
import Button from '@/components/shared/Button'
import { RingLoader } from 'react-spinners'
import { BiMailSend } from 'react-icons/bi'

type ApiResponse = {
    data?: {
        message: string;
        verification_type: string
    };
    error?: { status?: any } & (FetchBaseQueryError | SerializedError);
    status?: any;
};

const Home = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [loading, setLoading] = useState({
        verify: false,
        sendLink: false
    })
    const [email, setEmail] = useState("")
    const [reSendLink, setReSendLink] = useState(false)
    const id = searchParams.get('id');
    const verification_type = searchParams.get('verification_type')
    const [verifyUser] = useVerifyUserMutation()
    const [SendVerificationLink] = useSendVerificationLinkMutation()

    const getUserType = () => {
        switch (verification_type) {
            case "konnector_registration" || "konnector_password_recover":
                return "konnector"
            case "admin_registration" || "admin_password_recover":
                return "admin"
            case "internal_registration" || "internal_password_recover":
                return "internal"
            case "vendor_registration" || "vendor_password_recover":
                return "vendor"
        }
    }

    const sendLinkAgain = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading({ ...loading, sendLink: true })
        const user_type = getUserType() as string;
        const formData = { email, verification_type, user_type };
        try {
            const response: ApiResponse = await SendVerificationLink(formData);
            setLoading({ ...loading, sendLink: false })
            if (response.error && response.error.status === 500) return toast.error("Server is busy", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
            if (response.error && response.error.status === 400) return toast.warn("Email is required to send verification link.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
            if (response.error && response.error.status === 404) return toast.error("Email not exist.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
            if (response.error && response.error.status === 550) return toast.error("Unable to send verification link.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
            setEmail("");
            setReSendLink(false);
            return toast.success(response?.data?.message, { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
        } catch (error) {
            LogError("views/Home.tsx(sendLinkAgain)", error)
            toast.error("Unable to verify, try again later!", { position: toast.POSITION.BOTTOM_RIGHT });
            setLoading({ ...loading, sendLink: false })
        }
    }


    const Verify = async () => {
        try {
            const formData = { id, verification_type }
            const response: ApiResponse = await verifyUser(formData);
            if (response.error && (response.error.status === 400 || response.error.status === 401)) {
                setLoading({ ...loading, verify: false })
                setReSendLink(true);
                return toast.warn("Link Expired.", { position: toast.POSITION.BOTTOM_RIGHT });
            }
            if (response?.data?.verification_type === "vendor_registration") {
                return router.push('/auth/login/?user_type=vendor')
            }
            else {
                return router.push('/auth/login/?user_type=konnector')
            }
        } catch (error) {
            LogError("views/Home.tsx(Verify)", error)
            toast.error("Unable to verify, try again later!", { position: toast.POSITION.BOTTOM_RIGHT });
            setLoading({ ...loading, verify: false })
        }
    }

    useEffect(() => {
        if (!id || !verification_type) return;
        setLoading({ ...loading, verify: true })
        Verify()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, verification_type]);

    return (
        <Fragment>
            {
                loading.verify ? <div className='w-full absolute left-0 top-0 bg-white-300 z-[100] h-screen flex justify-center items-center overflow-hidden' >
                    <RingLoader color={"#07689F"} loading={true} size={150} />
                </div> : <>
                    <Hero />
                    <ExploreTechnologies />
                    <Team />
                    <SellProducts />
                </>
            }

            {/* Re send Verification link */}
            <Dialogue show={reSendLink} onClose={() => setReSendLink(false)} style='max-w-[400px]'>
                <form onSubmit={sendLinkAgain} className='bg-white-300 px-6 pt-8 pb-4' >
                    <InputField
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        value={email}
                        label="Type your email"
                        name={"email"}
                        type={'email'}
                        required
                        labelStyle="text-brand-primary font-medium"
                        inputStyle="w-full"
                    />
                    <Button text="Send Link" disabled={loading.sendLink}
                        icon={!loading.sendLink ? <BiMailSend className="text-2xl text-white-600 rounded-full" />
                            :
                            <RingLoader color={"#FFFFFF"} loading={true} size={30} />}
                        type="submit" onClick={() => { }} style="bg-brand-primary text-[14px] h-[40px] mx-auto mt-4"
                    />
                </form>
            </Dialogue>
        </Fragment>
    )
}

export default Home;