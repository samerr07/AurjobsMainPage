import React from 'react';
import MainPage from './page/MainPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ContactPage from './page/ContactPage';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <>

      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/contact' element={<ContactPage />} />

        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App;