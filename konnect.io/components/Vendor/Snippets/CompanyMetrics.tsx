import WaveSkeleton from '@/components/shared/WaveSkeleton';
import React, { Fragment } from 'react';

type Props = {
    title: string;
    number?: number;
    percentage?: number;
    style?: string;
    loading: boolean
}

const CompanyMetrics = ({ title, number,  style, loading }: Props) => {
    return (
        <Fragment>
            {
                loading ? <WaveSkeleton styles='h-[90px] rounded-2xl shadow-md' /> :
                    <div className={`w-full flex justify-between items-center bg-white-300 px-4 h-[90px] rounded-2xl shadow-md lg:gap-4 gap-0 ${style}`}>
                        <h4 className='text-[16px] lg:text-[12px] xl:text-[16px] text-brand-primary text-center md:text-left'>{title}</h4>
                        <div className='text-center'>
                            <div>
                                <p className='w-[45px] m-auto text-center text-white-600 bg-brand-primary  rounded-2xl text-[10px] p-1 '>{number ? number : 0}</p>
                            </div>
                        </div>
                    </div>

            }
        </Fragment>
    );
};

export default CompanyMetrics;
