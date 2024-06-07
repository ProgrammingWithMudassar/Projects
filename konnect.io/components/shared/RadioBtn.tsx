import React, { useState } from 'react';

type Props = {
  label?: string;
  styles?: string;
};

const RadioBtn = ({ label, styles }: Props) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className='w-full flex items-start gap-2' onClick={handleToggle}>
      <input type='radio' className='min-w-[18px] min-h-[18px] cursor-pointer' checked={isChecked} onChange={() => {}} />
      <p className={` mt-[-1px] text-[14px] ${styles}`}>{label}</p>
    </div>
  );
};

export default RadioBtn;
    