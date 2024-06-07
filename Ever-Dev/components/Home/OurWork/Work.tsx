import Wrapper from "@/components/Shared/Wrapper"
import Marquee from "react-fast-marquee";
import Image from "next/image";
import { Fragment } from "react";

const Work = () => {
    return (
        <Fragment>
            <Wrapper id="OurWork" style='pt-16 md:mb-12 mb-4' >
                <h2 className="font-primary font-light text-black-off md:text-[70px] text-[32px] md:leading-[70px] leading-[32px]" >See the work we’ve done</h2>
            </Wrapper>
            <Marquee className="py-4" direction={"right"} pauseOnHover>
                {[1, 2, 3, 4, 4].map((item: any, index: number) => {
                    return <div key={index} className='relative mx-4 md:w-[400px] w-[200px] md:h-[300px] h-[150px] overflow-hidden rounded-[25px] transition-all duration-300 hover:scale-[1.05]' >
                        <Image alt='' src={`/Work/${item}.png`} fill sizes="" className='object-cover' />
                    </div>
                })}
            </Marquee>
            <Marquee className="py-6" pauseOnHover>
            {[6, 7, 8, 9].map((item: any, index: number) => {
                    return <div key={index} className='relative mx-4 md:w-[400px] w-[200px] md:h-[300px] h-[150px] overflow-hidden rounded-[25px] transition-all duration-300 hover:scale-[1.05]' >
                        <Image alt='' src={`/Work/${item}.png`} fill sizes="" className='object-cover' />
                    </div>
                })}
            </Marquee>
        </Fragment>
    )
}

export default Work