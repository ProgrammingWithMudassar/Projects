import React from 'react'
import Image from "next/image";
import Why_KonnectData from '@/json/Why_Konnect.json'


const Why_Konnect = () => {
    return (
        <section className='w-[80%] xl:w-[1200px] m-auto'>
            <div className='w-full flex justify-center items-center flex-col my-8 md:my-16'>
                <h2 className='text-3xl md:text-7xl font-bold text-center '>Why <span className='text-brand-primary'>Konnect.io?</span></h2>
                <hr className='w-[150px] border-black-400  mt-2' />
                </div>

                {Why_KonnectData.map((item, key) => {
                    return key % 2 === 0 ?
                        <div key={item.id} className='w-full h-[500px] md:h-[400px] flex flex-col md:flex-row my-16 sm:my-8 md:my-4 gap-6'>
                            <div className="w-[100%] md:w-[50%] h-full flex justify-center items-start flex-col">
                                <h5 className='w-full text-xl my-2 text-brand-primary'>{item.title}</h5>
                                <p>{item.desc}</p>
                            </div>
                            <div className="w-[100%] md:w-[50%] m-auto relative">
                                <aside className="w-[90%] md:w-[100%] ml-[-30px] flex justify-center items-center" >
                                    <div className="w-[220px] h-[220px] md:w-[300px] md:h-[300px] overflow-hidden rounded-[15px] absolute lg:left-[5%] sm:left-[10%] left-[2%] blur-sm pointer-events-none" >
                                        <Image src={`/Why_Konnect/${item.image}`} alt={`Konnect. io quote by ${item.image}`} fill sizes='' className="object-cover" />
                                    </div>
                                    <div className="relative lg:left-[5%] sm:left-[10%] left-[20%] w-[250px] h-[250px] md:w-[350px] md:h-[350px] overflow-hidden rounded-[15px] pointer-events-none" >
                                        <Image src={`/Why_Konnect/${item.image}`} alt={`Konnect. io quote by ${item.image}`} sizes='' fill className="object-cover" />
                                    </div>
                                </aside>
                            </div>
                        </div>
                        :
                        <div key={item.id} className='w-full h-[500px] md:h-[400px] flex  md:flex-row flex-col-reverse my-16 sm:my-8 md:my-4 gap-6'>
                            <div className="w-[100%] md:w-[50%] m-auto relative">
                                <aside className="w-[90%] md:w-[100%] ml-[-30px] flex justify-center items-center" >
                                    <div className="w-[220px] h-[220px] md:w-[300px] md:h-[300px]  overflow-hidden rounded-[15px] absolute lg:left-[5%] sm:left-[10%] left-[2%] blur-sm pointer-events-none" >
                                        <Image src={`/Why_Konnect/${item.image}`} alt={`Konnect. io quote by ${item.image}`} fill sizes='' className="object-cover" />
                                    </div>
                                    <div className="relative lg:left-[5%] sm:left-[10%] left-[20%] w-[250px] h-[250px] md:w-[350px] md:h-[350px]  overflow-hidden rounded-[15px] pointer-events-none" >
                                        <Image src={`/Why_Konnect/${item.image}`} alt={`Konnect. io quote by ${item.image}`} sizes='' fill className="object-cover" />
                                    </div>
                                </aside>
                            </div>
                            <div className="w-[100%] md:w-[50%] h-full flex justify-center items-start flex-col">
                                <h5 className='w-full text-xl my-2 text-brand-primary'>{item.title}</h5>
                                <p>{item.desc}</p>
                            </div>
                        </div>
                })}
        </section>
    )
}

export default Why_Konnect