import Wrapper from "@/components/Shared/Wrapper"

const HowMemberShipWorks = () => {
    return (
        <Wrapper id="HowMemberShipWorks" style="">
            <div className="w-full h-full flex justify-center items-start flex-col gap-10 relative">
                <p className="font-primary font-light text-black-off md:text-[70px] text-[32px] md:leading-[70px] leading-[32px]">
                    How it works?
                </p>
                <div className="lg:w-[850px] w-full sm:h-[480px] h-[200px] mx-auto overflow-hidden rounded-xl" >
                    <iframe className="w-full h-full object-cover" src="https://www.youtube.com/embed/GvPnYQm8q-E" title="Everdev - How To Use Our Services" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true} />
                </div>
            </div>
        </Wrapper>
    )
}

export default HowMemberShipWorks