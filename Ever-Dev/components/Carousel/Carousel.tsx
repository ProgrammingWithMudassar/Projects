"use client"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Static from "@/constant/Static.json"
import Image from "next/image";

const settings = {
  centerMode: true,
  infinite: true,
  centerPadding: "60px",
  slidesToShow: 3,
  speed: 1000,
  autoplay: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ] 
};

const Carousel = () => {
  return (
    <section className="w-full relative overflow-hidden md:-mt-[5rem]" >
      <Slider {...settings} className="w-full" >
        {
          Static.animations.map((item, index) => {
            return <div key={index} className="p-3"  >
              <div className="relative lg:h-[300px] sm:h-[200px] h-[160px] rounded-2xl overflow-hidden" >
                {
                  item.type === "gif" ? <Image alt="" src={item?.url} sizes="" fill className="object-fill" /> : <video
                    loop
                    playsInline
                    autoPlay
                    muted
                    className={`w-full h-full pointer-events-none object-cover`}
                  >
                    <source src={item?.url} type={"video/mp4"} />
                  </video>
                }
              </div>
            </div>
          })
        }
      </Slider>
    </section>
  )
}

export default Carousel