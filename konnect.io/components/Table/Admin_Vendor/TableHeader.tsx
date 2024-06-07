import React from 'react'

type Props = {
    headers: Array<string>
}

const TableHeader = ({ headers }: Props) => {
    return (
        <div className='w-full h-[35px] bg-white-cool/10 grid grid-cols-[1fr,1fr,1fr] items-center px-4 bg-brand-primary' >
            {
                headers?.map((item: any, index: number) => <p key={index} className={`min-w-[100px] text-white-600 capitalize text-[14px] font-semibold text-left`}  >
                    {item}
                </p>)
            }
        </div>
    )
}

export default TableHeader