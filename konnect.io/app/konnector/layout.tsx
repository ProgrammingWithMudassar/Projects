
import Footer from "@/components/shared/Footer";
import KNavigation from "@/components/shared/Navigation/Konnector/KNavigation";
import Authorize from "@/hooks/Authorize";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {


    return (
        <Authorize role="konnector" >
            <KNavigation>
                {children}
            </KNavigation>
            <Footer additionMenu={false} />
        </Authorize>
    )
}