import React from 'react';

type Props = {
  label?: string;
  value?: string;
  styles?: string;
  checked: boolean,
  onCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CheckBox = ({ checked, onCheck, label, value, styles }: Props) => {
  return (
    <div className='flex justify-start items-center gap-2' >
      <label className={`container w-[1.2em] h-[1.2em] bg-gray-300`}>
        <input name={value} type="checkbox" checked={checked} onChange={onCheck} />
        <div className="checkmark w-[1.2em] h-[1.2em]"></div>
        <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg" className="celebrate">
          <polygon points="0,0 10,10"></polygon>
          <polygon points="0,25 10,25"></polygon>
          <polygon points="0,50 10,40"></polygon>
          <polygon points="50,0 40,10"></polygon>
          <polygon points="50,25 40,25"></polygon>
          <polygon points="50,50 40,40"></polygon>
        </svg>
      </label>
      <label htmlFor='checkbox' className={`text-[14px]  ${styles}`}>{label}</label>
    </div>
  );
};

export default CheckBox