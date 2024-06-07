import { Fragment } from 'react'
import TopNavigation from "@/components/shared/Navigation/TopNavigation"
import Footer from "@/components/shared/Footer";
import About from '@/views/Why_Konnect/Why_Konnect';

export const metadata = {
    title: 'About | Konnect.io',
    description: 'About | Konnect.io',
}

export default function page() {
    return (
        <Fragment>
            <TopNavigation />
            <About />
            <Footer additionMenu={true} />
        </Fragment>
    )
}
