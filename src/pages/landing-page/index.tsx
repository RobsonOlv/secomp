import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ContactUs from 'components/contactUs'
import Footer from 'components/footer'
import Schedule from 'components/schedule'
import SectionHeader from 'components/sectionHeader'
import About from 'components/about'

import Sponsorship from 'components/sponsorship'
import ScheduleContextProvider from 'utils/context/ScheduleContext'
import './styles.css'

function LandingPage() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash === '') {
      window.scrollTo(0, 0);
    }
    else {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
        }
      }, 0);
    }
  }, [pathname, hash, key]);

  return (
    <ScheduleContextProvider>
      <div className="App">
        <SectionHeader />
        <About/>
        <Schedule />
        <Sponsorship />
        <ContactUs />
        <Footer />
      </div>
    </ScheduleContextProvider>
  )
}

export default LandingPage
