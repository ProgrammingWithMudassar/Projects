import { Fragment } from 'react'
import TopNavigation from "@/components/shared/Navigation/TopNavigation"
import Footer from "@/components/shared/Footer";
import Team from '@/views/Team/Team';

export const metadata = {
  title: 'Team | Konnect.io',
  description: 'Team | Konnect.io',
}

export default function page() {
  return (
    <Fragment>
      <TopNavigation />
      <Team />
      <Footer additionMenu={true} />
    </Fragment>
  )
}
