import { Skeleton } from "@mui/material";
import Select, { GroupBase } from "react-select";

interface props {
    selectedOption: { value: string; label: string } | null;
    setSelectedOption: (e: { value: string; label: string } | null) => void;
    dropdownItems: (| { value: string; label: string } | GroupBase<{ value: string; label: string }>)[];
    placeholder?: string;
    required?: boolean;
    height?: string;
    backgroundColor?: string;
    placeholderColor?: string;
    label?: string;
    id?: string;
    labelStyle?: string;
    isLoading?: boolean;
    menuHeight?: string;
}

const SelectDropDown = ({
    selectedOption,
    setSelectedOption,
    dropdownItems,
    placeholder,
    required = false,
    height = "36px",
    backgroundColor = "transparent",
    placeholderColor = "#000000",
    label,
    labelStyle, id,
    isLoading,
    menuHeight

}: props) => {
    return (
        <div className="w-full flex flex-col mb-2">
            {isLoading ? <Skeleton sx={{ width: "100%" }} /> : label &&
                <label htmlFor={id} className={`w-full block md:text-[16px] text-[14px] text-brand-primary font-medium mb-1 ${labelStyle}`}>
                    {label}
                </label>
            }
            {
                isLoading ? <Skeleton sx={{ borderRadius: "16px" }} width={"100%"} height={70} /> :
                    <Select
                        value={selectedOption}
                        onChange={setSelectedOption}
                        options={dropdownItems}
                        placeholder={placeholder}
                        required={required}
                        components={{ IndicatorSeparator: () => null }}
                        styles={{
                            valueContainer: (provided, state) => ({ ...provided, height: height, }),
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                border: "1px solid rgba(207, 219, 213, 0.2)",
                                fontFamily: "",
                                fontWeight: 500,
                                fontSize: "14px",
                                "&:hover": {
                                    border: state.isFocused ? "1px solid rgba(207, 219, 213, 0.2)" : "",
                                },
                                boxShadow: "none",
                                background: backgroundColor,
                                borderRadius: "15px",
                                width: "100%",
                                height: "40px",
                                minHeight: "unset",
                            }),
                            menu: (base) => ({
                                ...base,
                                borderRadius: "15px",
                                overflow: "hidden",
                                border: "1px solid rgb(207, 219, 213, 0.2)",
                                background: "#f7f7f7",
                                color: "#000000",
                            }),
                            menuList: (base) => ({
                                ...base, 
                                padding: 0,
                                maxHeight: menuHeight,
                            }),
                            option: (provided, state) => ({
                                ...provided,
                                backgroundColor: state.isSelected ? "#07689F" : "inherit",
                                "&:hover": { backgroundColor: state.isSelected ? "#07689F" : "rgb(70, 73, 222,0.2)" },
                            }),
                            singleValue: (provided) => ({ ...provided, color: "#000000" }),
                            placeholder: (defaultStyles) => {
                                return { ...defaultStyles, color: placeholderColor }
                            },
                            dropdownIndicator: (provided, state) => ({
                                ...provided,
                                color: state.isFocused ? "white" : "rgba(207, 219, 213, 0.8)",
                            }),
                        }}

                        className='w-full border rounded-2xl focus:outline-none focus:ring focus:border-blue-500 h-[41px]'
                    />
            }
        </div>
    );
};

export default SelectDropDown;