"use client";
import Image from "next/image";
import BlogWrapper from "../Shared/BlogWrapper";
import { BsArrowRight } from "react-icons/bs";
import List from "../Shared/List";
import { FiInstagram } from "react-icons/fi";
import { FaTwitter } from "react-icons/fa";

const WebDesignTrends2023 = () => {
    return (
        <BlogWrapper id="SeoImageOptimization" style="py-8" >
            <section className="w-full flex justify-center items-start flex-col" >
                <p className="font-primary text-[18px] text-black-off/60" >
                    August 08, 2023
                </p>
                <h1 className="font-primary font-bold text-[38px] leading-[40px] mt-2" >
                    Web Design Trends to Watch in
                    2023: Stay Ahead of the
                    Competition with These CuttingEdge Designs
                </h1>
                <div className="w-full flex justify-between items-center mt-2" >
                    <p className="font-primary text-[18px] text-brand-tertiary" >
                        By EverDev
                    </p>
                    <div className="flex justify-center items-center gap-2" >
                        <a href="https://www.instagram.com/everdev.co/" target="_blank" className="w-[36px] h-[36px] rounded-full overflow-hidden flex justify-center items-center bg-[#1D1D1D]" >
                            <FiInstagram className="text-white text-[18px]" />
                        </a>
                        <a href="https://twitter.com/EverDevdotco" target="_blank" className="w-[36px] h-[36px] rounded-full overflow-hidden flex justify-center items-center bg-[#1D1D1D]" >
                            <FaTwitter className="text-white text-[18px]" />
                        </a>
                    </div>
                </div>
                <div className="w-full lg:h-[550px] md:h-[400px] sm:h-[300px] h-[200px] relative mt-6" >
                    <Image alt="" src={"/blogs/2.png"} sizes="" fill className="object-fill" />
                </div>
                <h2 className="font-primary font-semibold text-[30px] leading-[36px] mt-10" >
                    Introduction
                </h2>
                <p className="font-primary text-[17px] text-black-off mt-1" >
                    {`For businesses trying to leave a lasting impression on their consumers in the fast-paced world of
web design, keeping up with the most recent trends is essential. Web design trends continue to
emerge and modify the digital world as technology advances and consumer tastes shift. Here are
the top web design trends to look out for in 2023 to help you keep one step ahead of the
competition:`}
                </p>
                <h2 className="font-primary font-semibold text-[30px] leading-[36px] mt-6" >
                    Dark Mode Dominance
                </h2>
                <p className="font-primary text-[17px] text-black-off mt-1" >
                    {`Dark mode has become incredibly popular recently and isn't going
anywhere. Dark mode provides a sleek, contemporary look while easing eye strain and improving
visual contrast, especially in dimly lit areas. To give users a more individualized and immersive
browsing experience, businesses might integrate dark mode alternatives.`}
                </p>
                <div className="w-full lg:h-[550px] md:h-[400px] sm:h-[300px] h-[200px] relative my-4" >
                    <Image alt="" src={"/blogs/image-002.jpg"} sizes="" fill className="object-fill" />
                </div>
                <p className="font-primary text-[17px] text-black-off" >
                    {`online designers now have easier access to 3D images and features because to developments in
online technologies. Users can be captivated, interactive storytelling experiences can be provided,
and websites can become more memorable by using 3D images and animations. This trend gives
the online environment more depth and reality, which makes it an effective instrument for
engagement and branding.
`}
                </p>

                <h2 className="font-primary font-semibold text-[30px] leading-[36px] mt-6" >
                    Integration of Augmented Reality (AR):
                </h2>
                <p className="font-primary text-[17px] text-black-off mt-1 mb-6" >
                    {`In 2023, AR is predicted to completely transform web
experiences. AR gives people interactive and interesting experiences by fusing digital content with
the real environment. Businesses may use augmented reality (AR) technology to make product
demos, virtual try-on experiences, and interactive storytelling experiences that will increase
customer engagement and increase conversion rates.`}
                </p>

                <h2 className="font-primary font-semibold text-[30px] leading-[36px]" >
                    Speech User Interface (VUI):
                </h2>
                <p className="font-primary text-[17px] text-black-off mt-1 mb-6" >
                    {` As speech technology develops, it is increasingly important to
incorporate VUI into web design. Voice assistants have revolutionized how people use technology,
including Siri, Alexa, and Google Assistant. Voice-activated elements can be designed in a way that
improves accessibility, user engagement, and results in more dynamic and intuitive user
experiences.`}
                    <br /><br />
                    <strong>Neumorphism</strong>{` is a design approach that blends aspects of flat design and`} <strong>skeuomorphism</strong>. {`It uses
delicate shadows and highlights to make user interfaces that are supple, realistic, and tactile. This
style offers a novel interpretation of minimalism and a visually arresting design that directs users'
attention to particular page elements.
`}
                    <br /><br />
                    {`Web designers are experimenting with inventive methods to engage users with interactive cursors
and hovers. The user experience can be enhanced by personalized cursors, animations, and hover
effects, which can encourage additional browsing and interaction with the website's content. Sustainability and eco-friendly web design are becoming more popular among businesses as
environmental awareness rises. Sustainable design components can appeal to environmentally
sensitive customers and improve a brand's reputation. Examples include eco-friendly color
schemes, energy-efficient animations, and carbon offset commitments.
`}
                </p>

                <h2 className="font-primary font-semibold text-[30px] leading-[36px]" >
                    Gradients and colorful Colors:
                </h2>
                <p className="font-primary text-[17px] text-black-off mt-1 mb-6" >
                    In web design, bold gradients and colorful color schemes are
                    returning. These striking color choices can elicit a feeling of excitement and vitality, making an
                    impression on guests that will last. Gradients can enhance the overall design by adding depth and
                    dimension when utilized carefully.
                </p>

                <h2 className="font-primary font-semibold text-[30px] leading-[36px]" >
                    Data visualization and infographics:
                </h2>
                <p className="font-primary text-[17px] text-black-off mt-1 mb-6" >
                    Including interactive infographics and data visualization can
                    improve the presentation of content. These components facilitate quick knowledge absorption for
                    users and encourage more engaged and memorable interaction with the material.
                </p>

                <h2 className="font-primary font-semibold text-[30px] leading-[36px]" >
                    Microinteractions and Microanimations:
                </h2>
                <p className="font-primary text-[17px] text-black-off mt-1" >
                    Subtle animations that react to user input and give
                    immediate feedback are known as microinteractions and microanimations. These minor animations,
                </p>
                <div className="w-full lg:h-[580px] md:h-[400px] sm:h-[300px] h-[200px] relative my-4" >
                    <Image alt="" src={"/blogs/image-003.jpg"} sizes="" fill className="object-fill" />
                </div>
                <p className="font-primary text-[17px] text-black-off mt-1 mb-6" >
                    when implemented carefully, can enhance user pleasure and foster a sense of engagement, making
                    the user experience more pleasurable overall.
                    <br /><br />
                    In summary, keeping up with current web design trends can give companies a competitive edge in
                    2023. Businesses can build immersive and compelling web experiences that leave a lasting impact
                    on their consumers, encourage brand loyalty, and promote business success in the constantly changing digital landscape by combining these cutting-edge design components. Adopt these trends
                    to make your website stand out from the competition and set the stage for future success.
                </p>

            </section>

            <div className="flex justify-center items-center flex-col" >
                <h2 className="font-primary font-normal text-[22px] leading-[36px] mt-6 mb-2" >
                    Follow us for more
                </h2>
                <div className="flex justify-center items-center gap-2" >
                    <a href="https://www.instagram.com/everdev.co/" target="_blank" className="w-[24px] h-[24px] rounded-full overflow-hidden flex justify-center items-center bg-[#1D1D1D]" >
                        <FiInstagram className="text-white text-[14px]" />
                    </a>
                    <a href="https://twitter.com/EverDevdotco" target="_blank" className="w-[24px] h-[24px] rounded-full overflow-hidden flex justify-center items-center bg-[#1D1D1D]" >
                        <FaTwitter className="text-white text-[14px]" />
                    </a>
                </div>
            </div>
        </BlogWrapper>
    )
}

export default WebDesignTrends2023