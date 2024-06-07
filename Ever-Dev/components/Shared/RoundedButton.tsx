import React from "react";

interface Props {
  text: string;
  event?: any;
  style?: string;
  url?: string
}

const RoundedButton: React.FC<Props> = ({
  text,
  event,
  style = "w-[280px] h-[60px] bg-black-off",
  url
}) => {
  return url ? <a href={url} target="_blank" className={`flex items-center justify-center font-primary font-semibold text-white md:text-[16px] text-[14px] rounded-[90px] ${style}`} >
    {text}
  </a> : (
    <button
      onClick={event}
      className={`flex items-center justify-center font-primary font-semibold text-white md:text-[16px] text-[14px] rounded-[90px] ${style}`}
    >
      {text}
    </button>
  );
};

export default RoundedButton;
