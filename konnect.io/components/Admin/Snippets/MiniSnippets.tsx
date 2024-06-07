import { useEffect, useState } from "react";
import SnippetStatCard from "./SnippetStatCard"
import { useSuperAdminSnippetsStatsQuery } from "@/Redux/RTK_API/Auth_Api";
import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";

type Props = {}

const MiniSnippets = (props: Props) => {
    const pathname = usePathname()
    const router = useRouter()
    const { token } = useAuth()
    const [snippetData, setSnippetData] = useState({
        totalVendor: 0,
        subscribedVendors: 0,
        totalKonnector: 0
    });
    const { data, isLoading, isSuccess, refetch } = useSuperAdminSnippetsStatsQuery({
        accessToken: token
    });
    useEffect(() => {
        if (isSuccess) {
            return setSnippetData(data);
        }
    }, [data, isSuccess, pathname]);
    return (
        <div className="w-full grid lg:grid-cols-3 gap-1 lg:gap-4 mb-4">
            <SnippetStatCard stat={snippetData?.totalVendor} loading={isLoading} title='Total Vendor' />
            <SnippetStatCard stat={snippetData?.subscribedVendors} loading={isLoading} title='Subscribed vendor' />
            <SnippetStatCard stat={snippetData?.totalKonnector} loading={isLoading} title='Total Konnector ' />
        </div>
    )
}

export default MiniSnippets