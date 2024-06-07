import React, { Fragment } from 'react'
import PrivacyPolicy from '@/views/Policy/PrivacyPolicy'
import TopNavigation from "@/components/shared/Navigation/TopNavigation"
import Footer from "@/components/shared/Footer";

export const metadata = {
    title: 'Policy | Konnect.io',
    description: 'Policy | Konnect.io',
}

const page = () => {
    return (
        <Fragment>
            <TopNavigation />
            <PrivacyPolicy />
            <Footer additionMenu={true} />
        </Fragment>
    )
}

export default page