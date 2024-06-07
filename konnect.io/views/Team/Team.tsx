import React, { Fragment } from 'react'
import TeamCard from './TeamCard'
import TeamData from '@/json/TeamData.json'
import Wrapper from '@/components/shared/Wrapper'

const Team = () => {
  return (
    <Wrapper
      id="Konnect.io Team"
      outerContainerStyle='py-16'
      innerContainerStyle='flex justify-center items-center flex-col'>
      <div className='w-full flex justify-center items-center flex-col'>
        <h2 className='text-3xl md:text-7xl font-bold text-center mt-4'>Meet Our <span className='text-brand-primary'>Team</span></h2>
        <hr className='w-[100px] border-black-400 my-3' />
        <p className='w-[100%] md:w-[80%] text-center my-4 lg:text-[16px] text-[14px]'>We are a diverse coalition of visionaries who paused, recognized an industry gap, and
          innovatively pieced together a solution. Comprising technologists, engineers, seasoned entrepreneurs, and industry mavens, we united under a shared mission: to redefine
          industry norms and create a transformative solution. Our collective expertise and passion drive us to elevate the landscape, one Konnection at a time.</p>
      </div>
      <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-2 md:gap-12 gap-4 mt-16">
        {TeamData.map((data, index) => {
          return (
            <TeamCard
              key={index}
              role={data.role}
              name={data.name}
              img={data.img}
              linkedIn={data.linkedIn}
              mail={data.mail}
            />
          );
        })}
      </div>


      <div className='w-full h-auto flex justify-center items-center flex-col py-8 mt-24'>
        <h2 className='text-xl md:text-3xl font-bold text-black-600 mt-4 text-center'>Mission <span className='text-brand-primary'>Statement?</span></h2>
        <hr className='w-[100px] border-black-400 my-3' />
        <p className='w-[95%] md:w-[80%] text-center mt-8 lg:text-[16px] text-[14px]'>We are a diverse coalition of visionaries who paused, recognized an industry gap, and
          innovatively pieced together a solution. Comprising technologists, engineers, seasoned
          entrepreneurs, and industry mavens, we united under a shared mission: to redefine
          industry norms and create a transformative solution. Our collective expertise and
          passion drive us to elevate the landscape, one Konnection at a time.</p>
      </div>


      <h2 className='text-xl md:text-3xl font-bold text-black-600 mt-12 text-center'>The Konnect.io <span className='text-brand-primary'> Promise?</span></h2>
      <hr className='w-[100px] border-black-400 mt-3' />
      <p className='w-[95%] md:w-[80%] text-center mt-8 lg:text-[16px] text-[14px]'>
        We&rsquo;re committed to fostering an unbiased platform, offering equal opportunities for all
        vendors. Our system is not a &rsquo;pay-to-play&rsquo;; we believe in the quality of services, not the
        size of budgets. <br />
        - Kodie Kennedy, Founder & CEO</p>
    </Wrapper>


  )
}

export default Team