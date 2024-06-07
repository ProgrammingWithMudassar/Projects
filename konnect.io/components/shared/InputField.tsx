import { Skeleton } from "@mui/material";

type Props = {
  label?: string;
  placeHolder?: string
  id?: string;
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  type: string | number | any;
  outerContainerStyle?: string;
  labelStyle?: string;
  inputStyle?: string;
  required?: boolean
  isDisabled?: boolean,
  isLoading?: boolean,
  maximumLength?: any
};

const InputField = ({
  label, type = "text", id, value, onChange, name, outerContainerStyle, required = false,
  inputStyle, labelStyle, placeHolder, isDisabled, isLoading, maximumLength
}: Props) => {
  return (
    <div className={`w-full flex flex-col items-start ${outerContainerStyle}`}>
      {isLoading ? <Skeleton sx={{ width: "100%" }} /> : label &&
        <label htmlFor={id} className={`w-full block font-medium md:text-[16px] text-[14px] text-black-300 mb-1 ${labelStyle}`}>
          {label}
        </label>
      }
      {
        isLoading ? <Skeleton sx={{ borderRadius: "16px" }} width={"100%"} height={70} /> : <input
          autoCorrect="off"
          placeholder={placeHolder}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-3 py-2 border rounded-2xl focus:outline-none focus:ring focus:border-blue-500 text-black-600 ${inputStyle}`}
          type={type}
          required={required}
          autoComplete="off"
          autoCapitalize="off"
          disabled={isDisabled}
          maxLength={ maximumLength }
        />
      }


    </div>
  );
};

export default InputField;
