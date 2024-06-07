import Navigation from "@/components/Shared/Navigation"
import { Fragment } from "react";
import Footer from "@/components/Shared/Footer";

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <Fragment>
            <Navigation />
            {children}
            <Footer />
        </Fragment>
    )
}