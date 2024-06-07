import { Eye, Laptop, Message, Settings,SavedVendor } from "@/components/assets/Icon";
import { usePathname } from "next/navigation";

type Props = {
    navItem: string
    route: string;
}

const RenderIcons = ({ navItem, route }: Props) => {
    const pathname = usePathname();
    switch (navItem) {
        case "explore":
            return <Eye className={`w-[30px] h-[18.6px] ${pathname === route ? "fill-white-600" : "fill-black-400"}`} />
        case "konnects":
            return <Message className={`w-[25px] h-[25px] ${pathname === route ? "fill-white-600" : "fill-black-400"}`} />
        case "new":
            return <Laptop className={`w-[30px] h-[20px] ${pathname === route ? "fill-white-600" : "fill-black-400"}`} />
        case "Saved Vendors":
            return <SavedVendor className={`w-[40px] h-[40px] mt-4 mr-[-5px] ${pathname === route ? "fill-white-600" : "fill-black-400"}`} />
        case "settings":
            return <Settings className={`w-[26px] h-[26px] ${pathname === route ? "fill-white-600" : "fill-black-400"}`} />
        default:
            return <></>
    }
}

export default RenderIcons