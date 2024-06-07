"use client"
import { Fragment, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { LogInfo } from "@/lib/LogFiles";

interface props {
    children: ReactNode;
    role: string
}

const Authorize = ({ children, role }: props) => {
    const router = useRouter()
    const cookies = parseCookies();
    const token = cookies.accessToken;
    useEffect(() => {
        const user = JSON.parse(cookies.userData || "{}");
        if (!token && !user) { return router.push("/") }
        if (user?.role === "vendor" && !user.subscriptionStatus) {
            return router.push("/subscription");
        }
        if (user && user?.role !== role) {
            return router.push("/");
        }
    }, [cookies.userData, role, router, token])

    return (
        <Fragment>
            {children}
        </Fragment>
    )
}

export default Authorize