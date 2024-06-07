"useClient"
import Image from "next/image"
import Wrapper from "./Wrapper"
import { FiInstagram } from "react-icons/fi"
import { FaTwitter } from "react-icons/fa"
import Link from "next/link"

const Footer = () => {
  return (
    <Wrapper id="Footer" style="bg-black-off" >
      <section className="w-full grid md:grid-cols-[2fr,1fr,1fr,1fr] gap-12 py-16 border-b-[1px] border-t-[1px] border-white/30" >
        {/* About Company */}
        <div className="w-full flex justify-center items-start flex-col gap-6" >
          <div className="relative md:w-[200px] w-[120px] md:h-[57px] h-[27.79px]" >
            <Image src={"/logoDark.png"} alt="" fill sizes="" priority className="object-contain" />
          </div>
          <p className="font-primary text-[14px] leading-[22px] text-[#999999]" >
            {`Our mission is to empower businesses and individuals by turning their digital visions into reality. We strive to provide innovative, tailor-made solutions that not only meet our clients' needs but exceed their expectations. By leveraging the latest technologies, our aim is to unlock new opportunities and fuel growth for our partners.`}
            <br /><br />
            {`We approach every project with a blend of creativity, expertise, and collaboration. Our dynamic team of skilled developers thrives on turning complex challenges into elegant solutions. We take the time to understand your unique goals, ensuring that our tailored approach aligns with your vision and objectives. Together, we'll explore possibilities, navigate technological landscapes, and deliver results that exceed expectations.`}
          </p>
          <a href="mailto:support@everdev.co " className="font-primary text-[14px] leading-[22px] text-[#999999]" >
            Email: support@everdev.co
          </a>
          <div className="flex justify-center items-center gap-4" >
            <a href="https://www.instagram.com/everdev.co/" target="_blank" className="w-[36px] h-[36px] rounded-full overflow-hidden flex justify-center items-center bg-[#1D1D1D]" >
              <FiInstagram className="text-white text-[18px]" />
            </a>
            <a href="https://twitter.com/EverDevdotco" target="_blank" className="w-[36px] h-[36px] rounded-full overflow-hidden flex justify-center items-center bg-[#1D1D1D]" >
              <FaTwitter className="text-white text-[18px]" />
            </a>
          </div>
        </div>
        {/* Services */}
        <div className="w-full flex justify-start items-start flex-col gap-6" >
          <h3 className="font-primary md:text-[24px] text-[18px] leading-[24px] text-white font-bold" >
            Services
          </h3>
          <div>
            {
              ["Web development", "App development", "Software development", "Site traffic enhancement", "Web design", "App design"].map((item: string, index: number) => {
                return <p key={index} className="font-primary text-[16px] leading-[34px] text-[#999999] font-light" >
                  {item}
                </p>
              })
            }
          </div>
        </div>
        {/* Industries */}
        <div className="w-full flex justify-start items-start flex-col gap-6" >
          <h3 className="font-primary md:text-[24px] text-[18px] leading-[24px] text-white font-bold" >
            Industries
          </h3>
          <div>
            {
              ["Fintech", "IoT", "Software development", "Real estate", "Retail", "Construction", "Logistics", "Travel", "Healthcare", "Insurance"].map((item: string, index: number) => {
                return <p key={index} className="font-primary text-[16px] leading-[34px] text-[#999999] font-light" >
                  {item}
                </p>
              })
            }
          </div>
        </div>
        {/* Hire Experts */}
        <div className="w-full flex justify-start items-start flex-col gap-6" >
          <h3 className="font-primary md:text-[24px] text-[18px] leading-[24px] text-white font-bold" >
            Hire Experts
          </h3>
          <div>
            {
              ["Web designers", "Digital marketer", "Digital SEO", "Web developer"].map((item: string, index: number) => {
                return <p key={index} className="font-primary text-[16px] leading-[34px] text-[#999999] font-light" >
                  {item}
                </p>
              })
            }
          </div>
        </div>
      </section>
      <section className="w-full flex justify-between items-center py-6" >
        <p className="font-primary text-[14px] leading-[28px] text-[#999999] font-normal" >
          © 2023 EverDev,  All rights reserved.
        </p>
        <div className="flex justify-center items-center gap-2 font-primary text-[14px] leading-[28px] text-[#999999] font-normal" >
          <Link href={"https://everdev.gitbook.io/everdev/policies/policies/privacy-policy"} target="_blank">
            Privacy Policy
          </Link>
          •
          <Link href={"https://everdev.gitbook.io/everdev/policies/policies/terms-and-conditions"} target="_blank">
            Terms & Conditions
          </Link>
        </div>
      </section>
    </Wrapper>
  )
}

export default Footer
