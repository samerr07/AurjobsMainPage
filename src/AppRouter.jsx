import React from 'react'
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import MainPage from './page/MainPage';
import { Route, Routes } from 'react-router-dom';
// import ContactPage from './page/ContactPage';

import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsofService from './components/TermsofService';
import Pricing from './components/Pricing';
import AboutUsPage from './page/AboutUsPage';

import ContactPages from './page/ContactPages';
import CompanyRegistration from './components/CompanyRegistration';
import CompanyLogin from './components/CompanyLogin';
import Dashboard from './components/EmployerDashboard/Dashboard'
import AIScreeningResult from './components/EmployerDashboard/section/AIScreeningResult'

const AppRouter = () => {

    const location = useLocation();
  
    // Define routes where Navbar should not appear
    const routesWithoutNavbar = [
      '/candidate_login',
      '/candidate_register',
      '/company_login',
      '/company_register',
      '/ai_screening_result'
    ];
  
    // Check if current path should have navbar
    const shouldShowNavbar = !routesWithoutNavbar.includes(location.pathname);
  
    return (
      <>
        {shouldShowNavbar && <Navbar />}
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
          <Route path='/company_login' element={<CompanyLogin/>}/>
          <Route path='/company_register' element={<CompanyRegistration/>}/>
          <Route path='/employer_dashboard' element={<Dashboard />} />
          <Route path='/ai_screening_result' element={<AIScreeningResult/>}/>

        </Routes>
      </>
    )
  }
  
  export default AppRouter
