import React from 'react';
import MainPage from './page/MainPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import ContactPage from './page/ContactPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsofService from './components/TermsofService';
import Pricing from './components/Pricing';
import AboutUsPage from './page/AboutUsPage';
import ScrollToTop from './components/ScrollToTop';
import ContactPages from './page/ContactPages';

const App = () => {
  return (
    <>

      <BrowserRouter>
      <Navbar/>
      <ScrollToTop/>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/home' element={<MainPage/>}/>
          <Route path='/contact' element={<ContactPages />} />
          <Route path='/privacy_policy' element={<PrivacyPolicy/>}/>
          <Route path='/terms_and_conditions' element={<TermsofService/>}/>
          {/* <Route path='/contact' element={<ContactPages />} /> */}
          <Route path='/pricing' element={<Pricing/>}/>
          <Route path='/about_us' element={<AboutUsPage/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>


    </>
  )
}

export default App;