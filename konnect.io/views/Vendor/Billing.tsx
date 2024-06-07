'use client'
import React, { Fragment, useState } from 'react'
import CompanyMetrics from '@/components/Vendor/Snippets/CompanyMetrics'
import Button from '@/components/shared/Button'
import FormIkInput from "@/components/shared/FormikInput";
import { BillingInformation } from "@/types/types";
import { Formik, Form } from 'formik';
import { useAuth } from '@/hooks/useAuth'
import {
    useCancelSubscriptionMutation, useGetBillingInformationQuery,
    useGetCurrentSubScriptionQuery, useReActivateSubscriptionMutation,
    useSaveNewBillingMutation, useUpdateBillingMutation, useVendorStatsSnippetsQuery
} from '@/Redux/RTK_API/Auth_Api'
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import RingLoader from "react-spinners/RingLoader";
import { BsArrowRight } from "react-icons/bs";
import { LogError, LogWarning } from '@/lib/LogFiles';
import WaveSkeleton from '@/components/shared/WaveSkeleton';
import { Tooltip } from '@mui/material';
import Link from 'next/link';

type UserData = {
    firstName: string;
    lastName: string;
    number: string;
    cardName: string;
    cardType: string;
    expiryDate: string;
    cvv: string;
};
type ApiResponse = {
    data?: any;
    error?: { status?: any } & (FetchBaseQueryError | SerializedError);
    status?: any;
};


const Billing = () => {
    const { user, token } = useAuth()
    const [Loading, setLoading] = useState(false);

    // Query 
    const { data, isLoading, isSuccess, refetch } = useGetBillingInformationQuery({ accessToken: token })
    const subscription = useGetCurrentSubScriptionQuery({ accessToken: token })
    const [saveNewBilling] = useSaveNewBillingMutation();
    const [updateBilling] = useUpdateBillingMutation();
    const { data: VSData, isLoading: VSLoading, isSuccess: VSSuccess, refetch: VSRetch } = useVendorStatsSnippetsQuery({ accessToken: token });
  
  
    const dummyData = [
      { title: 'Total Konnects', number: VSData?.allRecordsCount },
      { title: 'Konnects this quarter', number: VSData?.lastMonthCount },
      { title: 'Expired Konnects', number: VSData?.lastThreeMonthsCount },
      { title: 'Total Views', number: VSData?.viewCount },
    ]; 
    


    const initialValues: BillingInformation = {
        FirstName: data?.cards?.firstName,
        LastName: data?.cards?.lastName || '',
        CardName: data?.cards?.cardName || '',
        CardType: data?.cards?.cardType || '',
        CardNumber: data?.cards?.number || '',
        CardExpDate: data?.cards?.expiryDate || '',
        CVV: data?.cards?.cvv || '',
    };

    const validationSchema = Yup.object().shape({
        FirstName: Yup.string().required('First Name is required'),
        LastName: Yup.string().required('Last Name is required'),
        CardType: Yup.string().required('Card Type is required'),
        CardName: Yup.string().required('Card Name is required'),
        CardNumber: Yup.string().required('Card Number is required').required('Invalid Card Number format'),
        CardExpDate: Yup.string().required('Exp Date is required').matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid Exp Date format (MM/YY)'),
        CVV: Yup.string().required('CVV is required').matches(/^\d{3,4}$/, 'Invalid CVV format'),
    });

    const handleSubmit = async (values: BillingInformation, { setSubmitting }: any) => {
        setLoading(true);
        const formData: UserData = {
            firstName: values.FirstName,
            lastName: values.LastName,
            number: values.CardNumber,
            cardType: values.CardType,
            cardName: values.CardName,
            expiryDate: values.CardExpDate,
            cvv: values.CVV,
        };
        const formattedData = { cards: formData };

        if (!data) {
            const saveResponse: ApiResponse = await saveNewBilling({ formattedData, accessToken: token });
            if (saveResponse.error && saveResponse.error.status === 500) {
                setLoading(false);
                return toast.error("Server is busy", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
            }
            if (saveResponse.error && saveResponse.error.status === 404) {
                setLoading(false);
                return toast.error("Billing information not exists, add Billing to update them.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
            }
            if (saveResponse.error && saveResponse.error.status === 403) {
                setLoading(false);
                return toast.error("Forbidden - Limited access.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
            }
            refetch();
            setLoading(false);
            return;
        }
        else {
            const updateResponse: ApiResponse = await updateBilling({ formattedData, accessToken: token });
            if (updateResponse.error && updateResponse.error.status === 500) {
                setLoading(false);
                return toast.error("Server is busy", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
            }
            if (updateResponse.error && updateResponse.error.status === 404) {
                setLoading(false);
                return toast.error("Billing information not exists, add Billing to update them.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
            }
            if (updateResponse.error && updateResponse.error.status === 403) {
                setLoading(false);
                return toast.error("Forbidden - Limited access.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
            }
            refetch();
            setLoading(false);
            return;
        }
    };

    function addMonths(inputDate: string, billing_cycle_month: number) {
        if (!inputDate) return;
        // Parse the input date string
        const originalDate = new Date(inputDate);

        // Add 3 months to the original date
        const newDate = new Date(originalDate);
        newDate.setUTCMonth(newDate.getUTCMonth() + billing_cycle_month);

        // Format the result
        const result = {
            date: newDate?.toISOString()?.split('T')[0], // Extract date part
            time: newDate?.toISOString()?.split('T')[1].split('.')[0], // Extract time part without milliseconds
        };

        return result;
    }

    const [cancelSubscription] = useCancelSubscriptionMutation()

    const cancelSubscriptionHandler = async (subscriptionId: string) => {
        if (!subscriptionId) return toast.warn("Oops, Try again!", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
        try {
            const response: ApiResponse = await cancelSubscription({ accessToken: token, body: { subscriptionId } });
            if (response.error && response.error.status === 500) return toast.error("Server is busy", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
            if (response.error && response.error.status === 400) return toast.error("Invalid subscription id", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
            if (response.error && response.error.status === 404) return toast.error("Subscription missing!", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
            subscription.refetch();
            return toast.error(`Your subscription is set to conclude on ${response?.data?.validTill}.`, { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
        } catch (error) {
            LogError("/views/vendor/billing.tsx", error);
            toast.error("Unable to cancel, try again!", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
        }
    }
    const [activateSubscription] = useReActivateSubscriptionMutation()
    const reActivateSubscriptionHandler = async (subscriptionId: string) => {
        if (!subscriptionId) return toast.warn("Oops, Try again!", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
        try {
            const response: ApiResponse = await activateSubscription({ accessToken: token, body: { subscriptionId } });
            if (response.error && response.error.status === 500) return toast.error("Server is busy", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
            if (response.error && response.error.status === 404) return toast.error("You have a active subscription.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
            subscription.refetch();
            return toast.error(`Reactivated successfully.`, { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
        } catch (error) {
            LogError("/views/vendor/billing.tsx", error);
            toast.error("Unable to cancel, try again!", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
        }
    }

    return (
        <section className="w-full h-full flex justify-start items-center flex-col gap-4">
            <div className="w-full grid lg:grid-cols-5 gap-1 lg:gap-4">
                {dummyData.map((data, index) => (<CompanyMetrics key={index} loading={false} title={data.title} number={data.number} />))}
            </div>
            <div className='w-full flex justify-between items-center'>
                {
                    isLoading ? <WaveSkeleton styles='h-[39px]' /> : <h2 className='w-[70%] lg:text-[26px] text-[18px] text-brand-primary text-left'>Billing Information</h2>
                }
            </div>

            <section className='w-full grid lg:grid-cols-3 gap-8'>
                <div className='w-full flex justify-between items-start flex-col col-span-2'>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize   >
                        {({ isSubmitting }) => (
                            <Form className="w-full flex justify-start items-start flex-col gap-4">
                                {
                                    isLoading ? <WaveSkeleton styles='h-[33px]' /> : <h3 className='lg:text-[22px] text-[18px] text-left'>Add your card</h3>
                                }
                                <div className='w-full flex flex-col md:flex-row  gap-4'>
                                    <FormIkInput isLoading={isLoading} label="First Name" type="text" id="FirstName" name="FirstName" inputStyle="border p-2" labelStyle="text-brand-primary font-medium" mendatory />
                                    <FormIkInput isLoading={isLoading} label="Last Name" type="text" id="LastName" name="LastName" inputStyle="border p-2" labelStyle="text-brand-primary font-medium" mendatory />
                                    <FormIkInput isLoading={isLoading} label="Card Nick Name" type="text" id="CardName" name="CardName" inputStyle="border p-2" labelStyle="text-brand-primary font-medium" mendatory />
                                </div>
                                <div className='w-full flex flex-col md:flex-row gap-4 '>
                                    <FormIkInput isLoading={isLoading} label="Card Type" type="text" id="CardType" name="CardType" inputStyle="border p-2" labelStyle="text-brand-primary font-medium" mendatory />
                                    <FormIkInput isLoading={isLoading} label="Card Number" type="numeric" id="CardNumber" name="CardNumber" inputStyle="border p-2" labelStyle="text-brand-primary font-medium" mendatory maximumLength={19} />
                                    <div className='w-full flex gap-2'>
                                        <FormIkInput isLoading={isLoading} label="Exp Date" type="ExpDate" id="CardExpDate" name="CardExpDate" inputStyle="border p-2" labelStyle="text-brand-primary font-medium" desc={"(MM/YY)"} mendatory maximumLength={5} />
                                        <div className='w-[100px]'>
                                            <FormIkInput isLoading={isLoading} label="CVV" type="text" id="CVV" name="CVV" inputStyle="border p-2" labelStyle="text-brand-primary font-medium" mendatory maximumLength={3} />
                                        </div>
                                    </div>
                                </div>
                                {
                                    isLoading ? <WaveSkeleton styles='h-[40px] w-[194.6px] rounded-full mx-auto' /> : <Button
                                        text="Save Changes"
                                        disabled={isSubmitting}
                                        icon={!Loading ?
                                            <BsArrowRight className="text-2xl text-white-600 rounded-full" />
                                            :
                                            <RingLoader color={"#FFFFFF"} loading={true} size={30} />}
                                        type="submit"
                                        style=" bg-brand-primary text-[14px] h-[40px] mx-auto mt-4" />
                                }

                            </Form>
                        )}
                    </Formik>
                </div>
                <div className='w-full flex justify-start items-start flex-col col-span-2 lg:col-span-1 gap-4'>
                    {
                        subscription?.isLoading ? <WaveSkeleton styles='h-[33px]' /> : <h2 className='w-full text-center lg:text-[22px] text-[18px] text-brand-primary my-2'>Current Subscription</h2>
                    }
                    {
                        subscription?.isLoading ? <WaveSkeleton styles='h-[191.2px] rounded-3xl' /> : <div className='w-full border-2 border-brand-primary rounded-3xl bg-white-300 flex justify-center items-center flex-col lg:p-8 p-4'>
                            <h6 className='w-full text-center lg:text-[22px] text-[18px] text-black-300'>
                                {subscription?.data?.subscription_nickname}
                            </h6>
                            <h4 className='text-center text-[14px] text-brand-primary font-medium' >
                                Next billing cycle:
                                <span className='font-norma' > {addMonths(subscription?.data?.start_time, subscription?.data?.billing_cycle_month)?.date}</span>
                            </h4>
                            <Tooltip sx={{
                                fontFamily: "inter"
                            }} title={`To update your plan, you must first cancel your current subscription. Please note that your next billing cycle is scheduled for ${addMonths(subscription?.data?.start_time, subscription?.data?.billing_cycle_month)?.date}. If you attempt to update before this cycle ends, you will forfeit the remaining time in your current plan, and the plan update will be applied afterward.`} placement="top" arrow>
                                <strong className='text-black-300 text-[14px] mb-4 mt-2 text-center' >
                                    Want to update subscription?
                                </strong>
                            </Tooltip>
                            {
                                subscription?.data?.status ?
                                    <Button style="h-[30px] mx-auto bg-red-600 hover:bg-red-700 text-[12px]" onClick={() => cancelSubscriptionHandler(subscription?.data?.subscription_id)} text="Cancel" type="button" />
                                    :
                                    <Fragment>
                                        <Button style="h-[30px] w-[150px] mx-auto bg-green-600 hover:bg-green-700 text-[12px]" onClick={() => reActivateSubscriptionHandler(subscription?.data?.subscription_id)} text="Re-Subscribe" type="button" />
                                        <Link href={"/subscription"} >
                                            <Button style="h-[30px] w-[150px] mx-auto bg-brand-primary text-[12px] mt-2" onClick={() => { }} text="Change plan" type="button" />
                                        </Link>
                                    </Fragment>
                            }

                        </div>
                    }
                </div>
            </section >
            {/* <ConfirmationDialogue /> */}
        </section >
    )
}

export default Billing;


