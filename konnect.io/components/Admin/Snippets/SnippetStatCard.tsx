import WaveSkeleton from '@/components/shared/WaveSkeleton';
import React, { Fragment } from 'react';

type Props = {
    title: string;
    stat: number;
    style?: string;
    loading: boolean
}

const SnippetStatCard = ({ title, stat, style, loading }: Props) => {
    return (
        <Fragment>
            {
                loading ? <WaveSkeleton styles='h-[90px] rounded-2xl shadow-md' />
                    :
                    <div className={`w-full flex justify-between items-center bg-white-300 px-4 h-[90px] rounded-2xl shadow-md lg:gap-4 gap-0 ${style}`}>
                        <h4 className='text-[16px] lg:text-[12px] xl:text-[16px] text-brand-primary text-center md:text-left'>{title}</h4>
                        <div className='w-[120px] h-[50px] bg-brand-primary rounded-full text-white-600 flex justify-center items-center'>
                            <p className='text-[8px] lg:text-[18px] text-center'>{stat}</p>
                        </div>
                    </div>
            }
        </Fragment>
    );
};

export default SnippetStatCard;
