import { Fragment } from "react";
import Navigation from "@/components/Shared/Navigation";
import Footer from "@/components/Shared/Footer"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <Fragment>
            <Navigation />
            {children}
            <Footer />
        </Fragment>
    )
}