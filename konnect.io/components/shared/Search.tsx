import React from 'react'


type Props = {
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ value, onChange }: Props) => {
    return (
        <form className="flex justify-center items-center bg-brand-primary w:[90%] lg:w-[250px] h-[40px] p-1 rounded-full overflow-hidden">
            <input placeholder={"Search here..."}
                value={value}
                onChange={onChange}
                className='w-full h-full px-3 rounded-full outline-none text-black-600'
            />
        </form>
    )
}

export default Search