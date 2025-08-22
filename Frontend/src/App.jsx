import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminPanel from "./components/AdminPanel";
import Package from "./components/Package";
import Bookingform from "./components/BookingForm";
import FoodForm from "./components/FoodForm";
import Summary from "./components/BookingSummary"
import AddDecorationPackage from "./components/AddDecorationPackage";
import DecorationForm from "./components/DecorationForm";
import Decopages from "./components/Decopages"
import ReviewForm from "./components/FoodReview";
import AdminDashboard from "./components/AdminDashboard";
import BookingConfirmation from "./components/BookingConformation";
import BookingHistory from "./components/BookingHistory";
import Home from "./components/Main";
import RSignupForm from "./components/RSignupForm";
import RLoginForm from "./components/RLoginForm";
import RResetPasswordForm from "./components/RResetPasswordForm";
import RUpdatePasswordForm from "./components/RUpdatePasswordForm"; // Import UpdatePasswordForm
import Profile from "./components/Profile"; // Import Profile component
import AddPackageForm from "./components/AddPackageForm"; // Import AddPackageForm
import PackageList from "./components/PackageList"; // Import UserPackages component
import BookingPage from "./components/BookingPage"; // Import BookingPage component
import RHome from "./components/RHome"; // Import Home component
import UserCategory from "./components/UserCategory"; 
import RBookForm from "./components/RBookForm"; 
import About from "./components/AboutUs"
import Contact from "./components/Contact"
import Login from './components/Login';
import Offers from './components/Offers';
import Footer from './components/Footer';
import Final from './components/Final'


function App() {


   const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookingform" element={< Bookingform/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/food" element={<FoodForm />} />
        <Route path="/package" element={<Package />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/deco" element={<AddDecorationPackage />} />
        <Route path="/decoForm" element={<DecorationForm/>} />
        <Route path="/deForm" element={<Decopages/>} />
        <Route path="/dash" element={<AdminDashboard/>} />
        <Route path="/review" element={<ReviewForm />} />
        <Route path="booking-confirmation" element={<BookingConfirmation/>}/>
        <Route path="booking-history" element={<BookingHistory/>}/>
         <Route path="/rsignup" element={<RSignupForm />} /> {/* Signup route */}
        <Route path="/rlogin" element={<RLoginForm />} /> {/* Login route */}
        <Route path="/reset-password" element={<RResetPasswordForm />} /> 
        <Route path="/update-password" element={<RUpdatePasswordForm />} /> 
        <Route path="/" element={<Navigate to="/rlogin" />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-package" element={<AddPackageForm />} /> 
        <Route path="/packages" element={<PackageList />} />
        <Route path="/booking/:category" element={<BookingPage />} /> 
        <Route path="/rhome" element={<RHome />} /> 
        <Route path="/user-category" element={<UserCategory />} /> 
        <Route path="/book/:packageId" element={<RBookForm />} />
        <Route path='/footer' element={<Footer/>}/>
        <Route path='/final' element={<Final/>}/>
        <Route path="/rr" element={isLoggedIn ? <Navigate to="/offers" /> : <Login onLoginSuccess={() => setIsLoggedIn(true)} />}/>
        <Route path="/offers" element={isLoggedIn ? <Offers /> : <Navigate to="/" />}/>
      </Routes>
    </Router>
  );
}

export default App;
