import VNavigation from "@/components/shared/Navigation/Vendor/VNavigation";
import Footer from "@/components/shared/Footer";
import Authorize from "@/hooks/Authorize";


export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <Authorize role="vendor" >
            <VNavigation>
                {children}
            </VNavigation>
            <Footer additionMenu={false} />
        </Authorize>
    )
}