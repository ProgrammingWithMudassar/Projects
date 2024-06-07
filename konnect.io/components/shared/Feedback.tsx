import { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import Dialogue from './Dialogue';
import Button from './Button';

interface props {
    show: boolean
    onClose: () => void;
    title: string;
    rating: number;
    setRating: (e: number) => void;
    disable: boolean;
    submit: () => void
}

const Feedback = ({ show, onClose, title, rating, setRating, disable, submit }: props) => {
    const [hoveredRating, setHoveredRating] = useState<number>(0);

    const handleStarClick = (value: number) => {
        setRating(value);
        setHoveredRating(0);
    };

    const handleStarHover = (value: number) => { setHoveredRating(value) };
    const handleStarLeave = () => { setHoveredRating(0) };

    return (
        <Dialogue onClose={onClose} show={show} style='max-w-[600px]' >
            <div className='w-full h-[] bg-white-600 flex justify-center items-center flex-col' >
                <div className='w-full h-[40px] bg-brand-primary flex justify-start items-center p-4' >
                    <h3 className='text-white-300 text-[18px]' >
                        How was your experience?
                    </h3>
                </div>
                <div className='w-full p-8 flex justify-center items-center flex-col' >
                    <h2 className='text-black-500 text-[24px]' >
                        {title}
                    </h2>
                    <div className='flex mt-4' >
                        {[1, 2, 3, 4, 5].map((value) => (
                            <div
                                key={value}
                                className={`cursor-pointer text-3xl ${(hoveredRating >= value || rating >= value) ? 'text-yellow-400' : 'text-gray-400'
                                    }`}
                                onMouseEnter={() => handleStarHover(value)}
                                onMouseLeave={handleStarLeave}
                                onClick={() => handleStarClick(value)}
                            >
                                <AiFillStar />
                            </div>
                        ))}
                    </div>
                    <Button text="Submit" disabled={disable} type="submit" onClick={submit} style="bg-brand-primary font-medium mt-6 md:text-[16px] text-[14px]" />
                </div>
            </div>
        </Dialogue>
    );
};

export default Feedback;
