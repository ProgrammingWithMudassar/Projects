import React, { Fragment, useState } from 'react'
import { BsArrowRight } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import Dialogue from "@/components/shared/Dialogue";
import Image from "next/image";
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { LogError } from '@/lib/LogFiles';
import Button from '@/components/shared/Button';
import { RingLoader } from 'react-spinners';
import { useAuth } from '@/hooks/useAuth';
import { useCreateSubscriptionMutation } from '@/Redux/RTK_API/Auth_Api';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useRouter } from 'next/navigation';

type ApiResponse = {
    data?: any;
    error?: { status?: any, data?: any; } & (FetchBaseQueryError | SerializedError);
    status?: any;
};

type Props = {
    title: string;
    Qprice: string;
    BAprice: string;
    Aprice: string;
    enterPrice: string;
    count: string;
    cardStyle: string;
    btnStyle: string;
}
const SubscriptionCard = ({ title, Qprice, BAprice, Aprice, enterPrice, count, cardStyle, btnStyle }: Props) => {
    const router = useRouter()
    const [createSubscription] = useCreateSubscriptionMutation()
    const { user, token, logout } = useAuth()
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [plan, setPlan] = useState("");
    const [subscriptionType, setSubscriptionType] = useState("");
    const [isDialogue, setIsDialogue] = useState<boolean>(false);
    const toggleDialogue = () => { setIsDialogue((prevValue) => !prevValue) };
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        setLoading(true);
        try {
            const cardElement = elements.getElement(CardNumberElement);
            const cvcElement = elements.getElement(CardCvcElement);
            const expiryElement = elements.getElement(CardExpiryElement);

            if (!cardElement || !cvcElement || !expiryElement) return toast.error("Invalid card details", { position: toast.POSITION.BOTTOM_RIGHT })

            const { paymentMethod, error } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: {
                    name: user?.company_name,
                    email: user?.email,
                }
            });

            if (error) {
                LogError("components/vendor/subscription/SubscriptionCard.tsx", error)
                return toast.error(`Stripe - ${error.message}`, { position: toast.POSITION.BOTTOM_RIGHT })
            }
            // Call your backend API to create the subscription
            const formData = {
                accessToken: token,
                body: {
                    paymentMethodId: paymentMethod.id,
                    priceId: plan,
                    subscription_type: subscriptionType
                }
            }
            const response: ApiResponse = await createSubscription(formData);
            if (response.error && response.error.status === 500) return toast.error("Server is busy", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
            if (response.error && response.error.status === 400) return toast.error(response.error.data.message, { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
            toast.success("Successfully subscribed. Please login again to continue, Thanks!", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
            toast.info("Redirecting...", { position: toast.POSITION.BOTTOM_RIGHT });
            setTimeout(() => {
                logout()
                return router.push("/");
            }, 3000);
        } catch (error: any) {
            LogError("components/vendor/subscription/SubscriptionCard.tsx", error)
            toast.error("Unable to register, try again later!", { position: toast.POSITION.BOTTOM_RIGHT })
        } finally {
            setLoading(false);
        }
    };


    const getSubscriptionType = () => {
        return "5001+"
    }

    return (
        <Fragment>
            <div className={`w-full h-full rounded-3xl shadow-xl flex flex-col gap-8 py-8 px-6 ${cardStyle}`}>
                <h2 className='text-[22px]  font-medium text-left'>{title}</h2>
                <hr className='w-full h-[5px] mt-[-10px] ' />
                {/* Quarterly section*/}
                <div>
                    <p className='text-[26px] text-center mb-4'>Quarterly: <span className='font-bold'>${Qprice}</span></p>
                    <p className='flex items-center gap-2 my-[2px]'><TiTick size={25} />{enterPrice}-enterprise exposure</p>
                    <p className='flex items-center gap-2 my-[2px]'><TiTick size={25} />Unlimited Konnections</p>
                    <p className='flex items-center gap-2 my-[2px]'><TiTick size={25} />3-month billing cycle</p>
                    <button
                        disabled={user?.role !== "vendor"}
                        className={`w-full mt-8 mb-2 py-4 rounded-full flex justify-center items-center font-semibold ${btnStyle}`}
                        onClick={() => {
                            setPlan("price_1OAoTFKvPSZHTWck0ZM3gqd2");
                            const s_type = getSubscriptionType()
                            setSubscriptionType(s_type);
                            toggleDialogue()
                        }}>
                        Buy it Now
                        <BsArrowRight className={`ml-2`} />
                    </button>
                </div>
                <hr className='w-full h-[5px] mt-[-10px] ' />

                {/* Bi-Annual section*/}
                <div>
                    <p className='text-[26px] text-center mb-4'>Bi-Annual: <span className='font-bold'>${BAprice}</span></p>
                    <p className='flex items-center gap-2 my-[2px]'><TiTick size={25} />{enterPrice}-enterprise exposure</p>
                    <p className='flex items-center gap-2 my-[2px]'><TiTick size={25} />Unlimited Konnections</p>
                    <p className='flex items-center gap-2 my-[2px]'><TiTick size={25} />6-month billing cycle</p>
                    <button
                        disabled={user?.role !== "vendor"}
                        className={`w-full mt-8 mb-2 py-4 rounded-full flex justify-center items-center font-semibold ${btnStyle}`}
                        onClick={() => {
                            setPlan("price_1OAoUeKvPSZHTWckqzEcX3b8");
                            const s_type = getSubscriptionType()
                            setSubscriptionType(s_type);
                            toggleDialogue()
                        }}>
                        Buy it Now <BsArrowRight className={`ml-2`} />
                    </button>
                </div>
                <hr className='w-full h-[5px] mt-[-10px] ' />
                {/* Annual section*/}
                <div>
                    <p className='text-[26px] text-center mb-4'>Annual: <span className='font-bold'>${Aprice}</span></p>
                    <p className='flex items-center gap-2 my-[2px]'> <TiTick size={25} />{enterPrice}-enterprise exposure</p>
                    <p className='flex items-center gap-2 my-[2px]'> <TiTick size={25} />Unlimited Konnections</p>
                    <p className='flex items-center gap-2 my-[2px]'> <TiTick size={25} />1 year billing cycle</p>
                    <button
                        disabled={user?.role !== "vendor"}
                        className={`w-full mt-8 mb-2 py-4 rounded-full flex justify-center items-center font-semibold ${btnStyle}`}
                        onClick={() => {
                            setPlan("price_1OAoVeKvPSZHTWckgWPvenv3");
                            const s_type = getSubscriptionType()
                            setSubscriptionType(s_type);
                            toggleDialogue()
                        }}>
                        Buy it Now
                        <BsArrowRight className={`ml-2`} />
                    </button>
                </div>
            </div>
            <Dialogue
                show={isDialogue}
                onClose={toggleDialogue}
                style="max-w-[600px] bg-white-600 flex justify-center items-center flex-col py-6 px-2 md:px-8 ">
                <p className='w-full text-left font-medium ml-4'>Pay With</p>
                <div className="relative left-0 w-[350px] xl:h-[37px] lg:h-[37px] md:h-[37px] sm:h-[37px] h-[37px] text-left">
                    <Image src="/PayVia.png" className="h-full object-fill ml-[0px] md:ml-[-80px]" alt="Konnect.io buying or exploring technology?" fill sizes="" />
                </div>
                <form className='w-full mt-6 flex justify-center items-center gap-4 flex-col' onSubmit={handleSubmit}>
                    <div className='w-full flex justify-center items-start flex-col' >
                        <label htmlFor={"CardNumberElement"} className={`block md:text-[16px] text-[14px] font-medium text-black-300 mb-1`} >
                            Card number*
                        </label>
                        <CardNumberElement
                            className={`w-full px-3 py-2.5 border rounded-2xl focus:outline-none focus:ring focus:border-blue-500 text-black-600`}
                        />
                    </div>
                    <div className='w-full flex justify-center items-start flex-col' >
                        <label htmlFor={"CardNumberElement"} className={`block font-medium md:text-[16px] text-[14px] text-black-300 mb-1`} >
                            CVC*
                        </label>
                        <CardCvcElement
                            className={`w-full px-3 py-2.5 border rounded-2xl focus:outline-none focus:ring focus:border-blue-500 text-black-600`}
                        />
                    </div>
                    <div className='w-full flex justify-center items-start flex-col' >
                        <label htmlFor={"CardNumberElement"} className={`block font-medium md:text-[16px] text-[14px] text-black-300 mb-1`} >
                            Expiry date*
                        </label>
                        <CardExpiryElement
                            className={`w-full px-3 py-2.5 border rounded-2xl focus:outline-none focus:ring focus:border-blue-500 text-black-600`}
                        />
                    </div>
                    <Button text="Subscribe" disabled={!stripe || loading}
                        icon={!loading ? <BsArrowRight className="text-2xl text-white-600 rounded-full" />
                            :
                            <RingLoader color={"#FFFFFF"} loading={(!stripe || loading)} size={30} />}
                        type="submit" onClick={() => { }} style="bg-brand-primary text-[14px] h-[40px] mx-auto mt-4"
                    />
                </form>
            </Dialogue >
        </Fragment>
    )
}

export default SubscriptionCard