

type Props = {
    label?: string;
    placeHolder?: string
    id?: string;
    value: string;
    onChange: (e: any) => void;
    name: string;
    required?: boolean
}

const Textarea = ({ label, placeHolder, onChange, id, value, name, required }: Props) => {
    return (
        <div className="w-full flex flex-col items-start " >
            <label htmlFor={id} className={`block md:text-[16px] text-[14px] text-brand-primary`}>
                {label}
            </label>
            <textarea
                placeholder={placeHolder}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                autoComplete="off"
                autoCapitalize="off"
                className="w-full h-[200px] px-3 py-2 border rounded-2xl focus:outline-none hide-scrollbar focus:ring focus:border-blue-500 text-black-600 mt-1 resize-none" />
        </div>
    )
}

export default Textarea