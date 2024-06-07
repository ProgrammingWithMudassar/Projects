import React from 'react';

type Props = {
  title: string;
  number: any;
  style?: string;
};

const InteractionCard = ({ title, number, style }: Props) => {
  // Check if number is NaN
  const isNumberNaN = isNaN(number);

  return (
    <div className={`w-full p-4 text-center bg-white-300 rounded-2xl flex justify-center items-center flex-col gap-4 ${style}`}>
      <h3 className='text-xl text-brand-primary font-bold'>{title}</h3>
      {isNumberNaN ? (
        <div className='w-[50%] p-4 mx-auto text-xl rounded-full bg-brand-primary_light'>
          <p className='text-brand-primary font-bold text-center'>No Record</p>
        </div>
      ) : (
        <div className='w-[50%] p-4 mx-auto text-xl rounded-full bg-brand-primary_light'>
          <p className='text-brand-primary font-bold text-center'>{number}</p>
        </div>
      )}
    </div>
  );
};

export default InteractionCard;
