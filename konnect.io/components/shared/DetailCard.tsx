import React, { useEffect, useState } from 'react';
import { FaLinkedin, FaFacebook, FaGlobe } from 'react-icons/fa';
import Image from 'next/image';

type Props = {
  website: string;
  description: string;
  img: string;
  cardInnerStyle?: string;
  companyName: string;
  LinkedIn: string;
};

const DetailCard = ({
  website,
  description: initialDescription,
  img,
  cardInnerStyle,
  companyName,
  LinkedIn,
}: Props) => {
  const selectedImage = '/Company/PAlto1.png';

  const [showFullDescription, setShowFullDescription] = useState(false);
  const [description, setDescription] = useState(initialDescription);

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  useEffect(() => {
    if (showFullDescription) {
      setDescription(initialDescription);
    } else {
      setDescription(initialDescription.slice(0, 400));
    }
  }, [showFullDescription, initialDescription]);

  return (
    <div className="max-h-[calc(100vh-100px)] py-2 px-4 w-[100%] flex flex-col justify-between text-center overflow-y-scroll hide-scrollbar">
      <div>
        <div className="bg-brand-primary_light w-[100px] h-[100px] mb-2 rounded-2xl mx-auto">
          <div className="w-[100px] h-[100px] flex justify-center items-center overflow-hidden pointer-events-none m-auto">
            <Image
              src={img}
              alt=""
              width={100}
              height={100}
              sizes=""
              className="object-cover w-[80%] lg:w-[60%] m-auto"
            />
          </div>
        </div>
        <p className="text-[20px] font-semibold m-auto bg-opacity-80 bg-brand-primary w-[70%] rounded-2xl h-10 flex items-center justify-center text-white-600">
          {companyName}
        </p>
        <p className="text-[12px] lg:text-[14px]  pr-3 mt-4">
          {description}
          {initialDescription.length > 200 && (
            <button className="text-brand-primary cursor-pointer" onClick={toggleDescription}>
              {showFullDescription ? 'Read less' : 'Read more'}
            </button>
          )}
        </p>
      </div>

      <div className="m-auto w-[80%] flex justify-end items-center gap-4 flex-col pt-2 mt-6">
        <div className="flex gap-4">
          <a href={`${LinkedIn}`} target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={30} className="text-brand-primary" />
          </a>
          <a href={`${website}`} target="_blank" rel="noopener noreferrer">
            <FaGlobe size={30} className="text-brand-primary" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default DetailCard;
