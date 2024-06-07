import { Fragment } from "react";
import Footer from "@/components/shared/Footer";
import ANavigation from "@/components/shared/Navigation/Admin/ANavigation";
import Authorize from "@/hooks/Authorize";


export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <Authorize role="admin" >
            <ANavigation>
                {children}
            </ANavigation>
            <Footer additionMenu={false} />
        </Authorize>
    )
}