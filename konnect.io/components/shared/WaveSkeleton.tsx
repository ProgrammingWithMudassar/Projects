"use client"

interface props {
    styles: string
}

const WaveSkeleton = ({ styles }: props) => {
    return <div className={`w-full bg-gray-300 animate-pulse ${styles}`} />;
};

export default WaveSkeleton;
