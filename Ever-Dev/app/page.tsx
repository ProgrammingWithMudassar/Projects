import Navigation from "@/components/Shared/Navigation";
import { Fragment } from "react";
import Hero from "@/components/Home/Hero";
import Carousel from "@/components/Carousel/Carousel";
import Features from "@/components/Home/Features";
import Services from "@/components/Home/Services/Services";
import Work from "@/components/Home/OurWork/Work";
import Plans from "@/components/Home/Plans/Plans";
import MemberShips from "@/components/Home/Memberships/MemberShips";
import TrustedBy from "@/components/Home/TrustedBy";
import BookMeeting from "@/components/Home/BookMeeting/BookMeeting";
import FrequentlyAskedQuestions from "@/components/Home/FrequentlyAskedQuestions/FrequentlyAskedQuestions";
import Footer from "@/components/Shared/Footer";
import HowMemberShipWorks from "@/components/Home/HowMemberShipWorks/HowMemberShipWorks";

export const metadata = {
  title: 'Welcome | EverDev - The Software and Digital Marketing Company',
  description: 'Unlocking Digital Success with the best software: Your one-stop solution for cutting-edge software development, strategic digital marketing, and SEO expertise. Elevate your online presence and drive growth with our tailored solutions. Discover the power of innovation, efficiency, and results with everdev.',
  metadata: {
    title: "EverDev - The Software and Digital Marketing Company",
    description: "Unlocking Digital Success with the best software: Your one-stop solution for cutting-edge software development, strategic digital marketing, and SEO expertise. Elevate your online presence and drive growth with our tailored solutions. Discover the power of innovation, efficiency, and results with everdev.",
    m: "https://everdev.co/logoDark.png"
  },
  generator: 'EverDev - The Software and Digital Marketing Company',
  applicationName: 'EverDev - The Software and Digital Marketing Company',
  keywords: ['software company', 'web development', 'ai model train', 'everdev', 'digital marketing company']
}


export default function Home() {
  return (
    <Fragment>
      <Navigation />
      <Hero />
      <Carousel />
      <Features />
      <Services />
      <Work />
      <Plans />
      <HowMemberShipWorks />
      <MemberShips />
      <TrustedBy />
      <BookMeeting />
      <FrequentlyAskedQuestions />
      <Footer />
    </Fragment>
  );
}
