"use client";
import { ReactNode } from "react";

type Props = {
  text: string;
  style?: string;
  onClick: () => void;
  type?: "submit" | "button"
};

const ChartButton = ({ text, style, onClick, type = "button" }: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-.5 whitespace-nowrap bg-brand-primary text-white-600 text-[12px] rounded-full hover:bg-black-500 transition-all duration-200 ${style}`}
    >
      {text}
    </button>
  );
};

export default ChartButton;
