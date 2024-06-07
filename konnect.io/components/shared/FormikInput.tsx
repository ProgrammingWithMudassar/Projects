import React from 'react';
import { useField } from 'formik';
import WaveSkeleton from './WaveSkeleton';

interface FormIkInputProps {
  label?: string;
  placeholder?: string;
  id?: string;
  name: string;
  type?: string;
  outerContainerStyle?: string;
  labelStyle?: string;
  inputStyle?: string;
  required?: boolean;
  mendatory?: boolean;
  maximumLength?: number;
  isLoading?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  desc?: string;
}

const FormIkInput: React.FC<FormIkInputProps> = ({
  label,
  type = 'text',
  id,
  mendatory,
  name,
  outerContainerStyle,
  required = false,
  inputStyle,
  labelStyle,
  placeholder,
  maximumLength,
  isLoading,
  desc
}) => {
  const [field, meta] = useField(name);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'numeric') {
      let value = event.target.value.replace(/\s/g, '');
      value = value.substring(0, 16);
      value = value.match(/.{1,4}/g)?.join(' ') ?? '';
      event.target.value = value;
    } else if (type === 'ExpDate') {
      let expDate = event.target.value.replace(/\s/g, '').replace(/[^0-9]/g, '');
      if (expDate.length > 2) {
        expDate = expDate.substring(0, 2) + '/' + expDate.substring(2, 4);
      }
      event.target.value = expDate;
    }


    field.onChange(event);
  };


  return (
    <div className={`w-full flex flex-col items-start ${outerContainerStyle}`}>
      {label && (
        isLoading ? < WaveSkeleton styles='h-[24px] mb-4' /> : <label
          htmlFor={id}
          className={`block md:text-[16px] text-[14px] text-black-300 mb-1 ${labelStyle}`}>
          {label} {mendatory ? <span className="text-error-300 ml-[-3px]">*</span> : null} {desc ? <span className='text-[10px]'>{desc}</span> : null}
        </label>
      )}
      {
        isLoading ? <WaveSkeleton styles='h-[41.6px] rounded-2xl' /> : <input
          {...field}
          type={type === 'numeric' ? 'text' : type}
          id={id}
          placeholder={placeholder}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          maxLength={maximumLength}
          className={`w-full px-3 py-2 border rounded-2xl focus:outline-none focus:ring focus:border-blue-500 text-black-600 placeholder:text-black-400/50 ${inputStyle
            } ${meta.touched && meta.error ? 'border border-red-600' : ''}`}
          onChange={handleChange}
        />
      }
      {meta.touched && meta.error ? (
        <div className="text-red-600 text-[14px] mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default FormIkInput;
