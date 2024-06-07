"use client"
import SubscriptionCard from '@/components/Vendor/Subscription/SubscriptionCard'

const Subscription = () => {
  return (
    <section className='w-[100%] h-full px-2 py-6 md:py-12'>
      <h3 className='w-full text-center text-3xl md:text-5xl font-bold leading-2 px-6'><span className='text-brand-primary'>Konnect.io</span> Plans &amp; Pricing</h3>
      <p className="font-normal text-gray-500 text-2xl text-center w-full mt-4 px-4 ">Find the plan that’s right for you.</p>
      <div className='w-full lg:w-[1200px] grid grid-cols-12 gap-2 md:gap-8 p-4 mt-6 m-[auto]'>
        {/* <div className='col-span-12 md:col-span-4 '>
          <SubscriptionCard
            title='Konnect Starter'
            Qprice={"799"} BAprice={"1,499"} Aprice={"2,999"}
            enterPrice={'Small'} count={"0-2,000"}
            cardStyle={'bg-brand-primary text-white-600'}
            btnStyle={'bg-white-600  text-black-600'}
          />
        </div>
        <div className='col-span-12 md:col-span-4' >
          <SubscriptionCard
            title='Konnect Pro'
            Qprice={"1,499"} BAprice={"2,999"} Aprice={"5,999"}
            enterPrice={'Medium'} count={"2,001-5,000"}
            cardStyle={'bg-white-600 text-black-600'}
            btnStyle={'bg-brand-primary text-white-600'}
          />
        </div> */}
        <div className='col-span-12 md:col-span-4'></div>
        <div className='col-span-12 md:col-span-4'>
          <SubscriptionCard
            title='Konnect Elite'
            Qprice={"2,999"} BAprice={"5,999"} Aprice={"9,999"}
            enterPrice={'Large'} count={"5,001+"}
            cardStyle={'bg-brand-primary text-white-600'}
            btnStyle={'bg-white-600  text-black-600'}
          />
        </div>
        <div className='col-span-12 md:col-span-4'></div>
      </div>
    </section>
  )
}

export default Subscription
