import Footer from "@/components/shared/Footer";
import TopNavigation from "@/components/shared/Navigation/TopNavigation";
import Home from "@/views/Home";
import { Fragment } from "react";

export const metadata = {
  title: 'Welcome | Konnect.io',
  description: 'Welcome | Konnect.io',
}

export default function page() {
  return (
    <Fragment>
      <TopNavigation />
      <Home />
      <Footer />
    </Fragment>
  )
}
