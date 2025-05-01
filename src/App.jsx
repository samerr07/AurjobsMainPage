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
import CompanyRegistration from './components/CompanyRegistration';
import CompanyLogin from './components/CompanyLogin';
import { ToastContainer } from 'react-toastify';
import Dashboard from './components/EmployerDashboard/Dashboard'
import AIScreeningResult from './components/EmployerDashboard/section/AIScreeningResult'
import AppRouter from './AppRouter';

const App = () => {
  return (
    <>

      <BrowserRouter>
      <ToastContainer/>
      
      
        <AppRouter/>
        {/* <Footer/> */}
      </BrowserRouter>


    </>
  )
}

export default App;