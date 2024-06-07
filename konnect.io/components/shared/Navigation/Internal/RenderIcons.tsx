import { AiOutlineMessage } from "react-icons/ai";

type Props = {
    navItem: string
    route: string;
}

const RenderIcons = ({ navItem, route }: Props) => {
    switch (navItem) {
        case "Konnects":
            return <AiOutlineMessage size={28} />
        default:
            return <></>
    }
}

export default RenderIcons