import React from 'react';
import './Styles.css'
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  title: string,
  description: string,
  logo: string,
  route: string,
}


const Card = ({ title, description, logo, route }: Props) => {
  return (
    <div className="parent">
      <div className="card">
        <div className="logo">
          <span className="circle circle1"></span>
          <span className="circle circle2"></span>
          <span className="circle circle3"></span>
          <span className="circle circle4"></span>
          <span className="circle circle5">
            <Image src={`/${logo}`} alt="My Image" sizes="" fill className="object-contain p-2" />
          </span>
        </div>
        <div className="glass"></div>
        <div className="content">
          <span className="title">{title}</span>
          <span className="text">{description}</span>
        </div>
        <div className="bottom">
          <Link href={`${route}`} target="_blank" rel="noopener noreferrer">
            <button className="view-more-button">View more</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
