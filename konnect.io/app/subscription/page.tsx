import { Fragment } from 'react'
import Subscription from '@/views/Vendor/Subscription'
import TopNavigation from "@/components/shared/Navigation/TopNavigation"
import Footer from "@/components/shared/Footer";

export const metadata = {
  title: 'Subscription | Konnect.io',
  description: 'Subscription | Konnect.io',
}

export default function page() {
  return (
    <Fragment>
      <TopNavigation />
      <Subscription />
      <Footer additionMenu={false} />
    </Fragment>
  )
}
