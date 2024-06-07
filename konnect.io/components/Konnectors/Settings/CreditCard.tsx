"use client"
import Button from "@/components/shared/Button"
import InputField from "@/components/shared/InputField"
import { ISettings } from "@/types/types"
import { Fragment } from "react"

type Props = {
    input: ISettings
    inputHandler: (e: any) => void
}

const CreditCard = ({ inputHandler, input }: Props) => {
    return (
        <Fragment>
            <h1 className="text-[24px] text-brand-primary">Billing Information</h1>
            <div className="lg:w-[50%] w-full h-full gap-3 mt-4" >
                <div className="w-full flex gap-3" >
                    <InputField label="Name on Credit Card" type="text" id="creditCardName" name="creditCardName" value={input?.creditCardName} onChange={inputHandler} inputStyle="w-[100%]" labelStyle="text-brand-primary font-medium" />
                    <InputField label="Card Type" type="text" id="cardType" name="cardType" value={input?.cardType} onChange={inputHandler} inputStyle="w-[100%]" labelStyle="text-brand-primary font-medium" />
                </div>
                <InputField label="Credit Card Number" type="text" id="cardNo" name="cardNo" value={input?.cardNo} onChange={inputHandler} inputStyle="w-[100%]" labelStyle="text-brand-primary font-medium" outerContainerStyle="mt-4" />
                <div className="w-full flex gap-3 mt-4" >
                    <InputField label="Exp Date" type="text" id="expDate" name="expDate" value={input?.expDate} onChange={inputHandler} inputStyle="w-[100%]" labelStyle="text-brand-primary font-medium" />
                    <InputField label="Card Type" type="text" id="cardType" name="cardType" value={input?.cardType} onChange={inputHandler} inputStyle="w-[100%]" labelStyle="text-brand-primary font-medium" />
                </div>
            </div>
            <Button
                style="bg-brand-primary font-medium mt-8 md:text-[16px] text-[14px]"
                onClick={() => { }}
                text="Save"
                type="submit"
            />
        </Fragment>
    )
}

export default CreditCard