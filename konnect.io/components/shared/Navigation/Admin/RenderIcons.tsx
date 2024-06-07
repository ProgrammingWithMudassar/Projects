import { BsPersonCheck, BsPersonVcard } from "react-icons/bs";

type Props = {
    navItem: string
    route: string;
}

const RenderIcons = ({ navItem, route }: Props) => {
    switch (navItem) {
        case "vendor":
            return <BsPersonVcard size={26} />
        case "users":
            return <BsPersonCheck size={26} />
        default:
            return <></>
    }
}

export default RenderIcons