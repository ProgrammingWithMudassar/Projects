import { Fragment } from "react";
import Footer from "@/components/shared/Footer";
import INavigation from "@/components/shared/Navigation/Internal/INavigation";
import Authorize from "@/hooks/Authorize";


export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <Authorize role="internal" >
            <INavigation>
                {children}
            </INavigation>
            <Footer additionMenu={false} />
        </Authorize>
    )
}