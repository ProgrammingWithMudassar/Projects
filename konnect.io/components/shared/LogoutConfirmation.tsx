import React, { useState } from "react";
import Dialogue from "./Dialogue";
import { AiOutlineWarning } from 'react-icons/ai';
import { BsCheck2 } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Button from "./Button";
import RingLoader from "react-spinners/RingLoader";
import { BsArrowRight } from "react-icons/bs";

type Props = {
  show: boolean;
  onClose: () => void;
  style?: string;
  title: string;
  route?: string;
}


const LogoutConfirmation = ({ show, onClose, style, title, route }: Props) => {
  const router = useRouter()
  const { logout } = useAuth()
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = () => {
    setIsLoading(true);
    logout();
    router.replace(`${route}`)
  }
  return (
    <Dialogue
      show={show}
      onClose={onClose}
      style="max-w-[500px] bg-white-600 flex justify-center items-center flex-col py-6"
    >
      <div className="w-full flex items-center justify-start gap-2 px-4">
        <AiOutlineWarning className="text-error-300" size={25} />
        <p className="text-[20px]">{title}</p>
      </div>
      <div className="w-full flex justify-end items-center gap-2 px-4 mt-4">
        <Button
          text=""
          disabled={isLoading}
          icon={
            !isLoading ?
            <BsCheck2 className="text-brand-primary" size={25} />
              :
              <RingLoader color={"#07689F"} loading={true} size={30} />
          }
          type="button"
          onClick={handleClick}
          style="bg-white-600 hover:bg-white-600 border text-[14px] h-[40px]"
        />

        <button className="px-8 py-[5px] border rounded-full" onClick={onClose}>
          <RxCross2 className="text-error-300" size={25} />
        </button>
      </div>
    </Dialogue>
  );
};

export default LogoutConfirmation;
