import { HiOutlineUsers } from 'react-icons/hi';
import { CgNotes } from 'react-icons/cg';
import { BsEye } from "react-icons/bs";
import { AiOutlineMessage, AiOutlineSetting } from "react-icons/ai";

type Props = {
    navItem: string
}

const RenderIcons = ({ navItem }: Props) => {
    switch (navItem) {
        case "dashboard":
            return <BsEye size={28} />
        case "konnects":
            return <AiOutlineMessage size={28} />
        case "users":
            return <HiOutlineUsers size={26} />
        case "billing":
            return <CgNotes size={26} />
        case "settings":
            return <AiOutlineSetting size={26} />
        default:
            return <></>
    }
}

export default RenderIcons