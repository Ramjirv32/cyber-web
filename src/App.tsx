import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import EmailSubscribe from "./components/email-from"
import VisionMission from './pages/about/VisionMission';
import OurTeam from './pages/about/OurTeam';
import Contact from './pages/about/Contact';
import FeaturedCards from "./components/featured-card"
import Stats from './components/Stats';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 100,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Home />
              <FeaturedCards />
              <EmailSubscribe />
              <Stats />
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/featured" element={<FeaturedCards />} />
          <Route path="/subscribe" element={<EmailSubscribe />} />
          <Route path="/vision-mission" element={<VisionMission />} />
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer data-aos="fade-up" data-aos-delay="300"/>
      </div>
    </Router>
  );
}

export default App;