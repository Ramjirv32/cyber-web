import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignIn';
import EmailSubscribe from "./components/email-from"
import VisionMission from './pages/about/VisionMission';
import OurTeam from './pages/about/OurTeam';
import Contact from './pages/about/Contact';
import FeaturedCards from "./components/featured-card";
import Stats from './components/Stats';
import Conference from './pages/about/conferences';
import ResearchPage from './pages/about/Research';
import Overview from './pages/about/Overview';
import Technology from "./pages/about/Technology"
import Solutions from "./pages/about/Solutions"
import Mou from "./pages/about/Mou"
import Policies from "./pages/about/Policy"
import Reports from "./pages/about/report"
import Help from "./pages/about/Help" ;
import Fdp from "./pages/about/fdp"
import Event from "./pages/about/event"
import Award from "./pages/about/Awards"
import Board from "./pages/about/Board"
import ScrollProgress from './components/ScrollProgress';
import Forgotpass from "./pages/auth/ForgotPassword";
import PrivacyPolicy from './pages/about/PrivacyPolicy';
import TermsConditions from './pages/about/TermsConditions';
import Carrier from "./link/Carrier"
import Service from "./link/Service"
import ScrollToTop from './components/ScrollToTop';
import LoadingWrapper from './components/LoadingWrapper';
import MedalsAwards from './pages/MedalsAwards';
import AnniversaryDay from './pages/AnniversaryDay';
import ScienceBookPrize from './pages/ScienceBookPrize';
import ResearchInitiatives from './pages/ResearchInitiatives';
import InnovationHub from './pages/InnovationHub';
import EducationPrograms from './pages/EducationPrograms';
import MembershipForm from './link/MembershipForm';
import RouteTransitionLoader from './components/RouteTransitionLoader';
import IDCard from './components/IDCard';
import IDCardLoader from './components/IDCardLoader'; // Add this import
import  H from './components/H'; // Add this import
// Create a wrapper component with configurable loading time
const RouteChangeHandler = ({ children, loadingTime = 200 }: { children: React.ReactNode, loadingTime?: number }) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadingTime);

    return () => clearTimeout(timer);
  }, [location, loadingTime]);

  return (
    <>
      {isLoading && <RouteTransitionLoader />}
      {children}
    </>
  );
};

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

  // Define routes that need longer loading time
  const longLoadingRoutes = [
    '/science-book-prize',
    '/research-initiatives',
    '/innovation-hub',
    '/education-programs',
    '/membership-form',
    '/id-card/:id'  // Add this one
  ];

  return (
    <Router>
      <RouteChangeHandler loadingTime={
        longLoadingRoutes.includes(window.location.pathname) ? 500 : 200
      }>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen font-sans">
          <ScrollProgress />
          <Navbar />
          <Routes>
            <Route path="/research" element={
              <LoadingWrapper>
                <ResearchPage />
              </LoadingWrapper>
            } />
            <Route path="/solutions" element={
              <LoadingWrapper>
                <Solutions />
              </LoadingWrapper>
            } />
            <Route path="/board" element={
              <LoadingWrapper>
                <Board />
              </LoadingWrapper>
            } />
            <Route path="/id-card/:id" element={
              <LoadingWrapper>
                <IDCardLoader />
              </LoadingWrapper>
            } />
            <Route path="/technology" element={
              <LoadingWrapper>
                <Technology />
              </LoadingWrapper>
            } />
            <Route path="/contact" element={
              <LoadingWrapper>
                <Contact />
              </LoadingWrapper>
            } />

            {/* Routes without loading */}
            <Route path="/" element={
              <>
                <Home />
                <FeaturedCards />
                <EmailSubscribe />
                <Stats />
              </>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/login/:token" element={<Login />} />
<Route path ="/Home" element={<H />} />
            <Route path="/signIn" element={<SignUp />} />
            <Route path="/featured" element={<FeaturedCards />} />
            <Route path="/board" element={<Board />} />
            <Route path="/subscribe" element={<EmailSubscribe />} />
            <Route path="/vision-mission" element={<VisionMission />} />
            <Route path="/fdp" element={<Fdp />} />
            <Route path="/our-team" element={<OurTeam />} />
            <Route path="/forgot-password" element={<Forgotpass />} />
            <Route path="/help" element={<Help />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/conferences" element={<Conference />} />
            
            <Route path="/mou" element={<Mou />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/awards" element={<Award />} />
            <Route path="/events" element={<Event />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} /> 
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/carrier" element={<Carrier />} />
            <Route path="/service" element={<Service />} />
            <Route path="/medals-and-awards" element={<MedalsAwards />} />
            <Route path="/anniversary-day" element={<AnniversaryDay />} />
            <Route path="/science-book-prize" element={
              <LoadingWrapper loadingTime={500}>
                <ScienceBookPrize />
              </LoadingWrapper>
            } />
            <Route path="/research-initiatives" element={
              <LoadingWrapper loadingTime={500}>
                <ResearchInitiatives />
              </LoadingWrapper>
            } />
            <Route path="/innovation-hub" element={
              <LoadingWrapper loadingTime={500}>
                <InnovationHub />
              </LoadingWrapper>
            } />
            <Route path="/education-programs" element={
              <LoadingWrapper loadingTime={500}>
                <EducationPrograms />
              </LoadingWrapper>
            } />
            <Route path="/membership-form" element={
              <LoadingWrapper loadingTime={500}>
                <MembershipForm />
              </LoadingWrapper>
            } />

          </Routes>
          <Footer data-aos="fade-up" data-aos-delay="300" />
        </div>
      </RouteChangeHandler>
    </Router>
  );
}

export default App;