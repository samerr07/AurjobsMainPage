import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import ChooseUs from '../components/ChooseUs'
import News from '../components/News'
import FaqSection from '../components/FaqSection'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import Advisors from '../components/Advisors'
import Services from '../components/Services'
import OurOfferings from '../components/OurOfferings'

const MainPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 font-inter">
      {/* <Navbar/> */}
      <HeroSection/>
      <OurOfferings/>
      <Services/>
      <ChooseUs/>
      {/* <Advisors/> */}
      <News/>
      <FaqSection/>
      <Contact/>
      {/* <Footer/> */}
     </div>
  )
}

export default MainPage
