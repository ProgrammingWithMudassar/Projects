import React from 'react';

interface CheckboxFieldProps {
  label: string;
  name: any;
  checked?: boolean;
  onChange?: (name: keyof FormData, checked: boolean) => void;
}

const defaultOnChange: CheckboxFieldProps['onChange'] = () => {
  console.error('onChange function not provided for CheckboxField');
};

const CheckBoxField: React.FC<CheckboxFieldProps> = ({ label, name, checked, onChange = defaultOnChange }) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(name, event.target.checked);
  };

  return (
    <div className="w-[100%] mt-3 md:mt-0 flex items-start mb-1">
      <input
        type="checkbox"
        name={name as string} 
        checked={checked || false} 
        onChange={handleCheckboxChange}
        className="min-w-[18px] min-h-[18px] cursor-pointer"
      />
      <label className="text-brand-primary font-medium ml-2 mt-[-2px]">{label}</label>
    </div>
  );
};

export default CheckBoxField;
