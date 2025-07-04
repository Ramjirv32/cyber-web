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
import IDCardLoader from './components/IDCardLoader';
import H from './components/H';
import { LoadingProvider, useLoading } from './contexts/LoadingContext';
import FullScreenLoader from './components/FullScreenLoader';
import ProgramRegistration from './pages/about/ProgramRegistration';
import SeminarDetails from './pages/about/seminarDetails';
import Benefits from './pages/about/Benefits';
import Webinars from './pages/about/webinars';
import WebinarProposal from './pages/about/WebinarProposal';
import SecurityAssessment from './pages/about/SecurityAssessment';
import History from './pages/about/History';
// Policy-related pages
import PolicyWhitepaper from './pages/policies/PolicyWhitepaper';
import PolicyDemo from './pages/policies/PolicyDemo';
import EmergencySupport from './pages/policies/EmergencySupport';
// Research-related pages
import MastersDegreeProgram from './pages/research/MastersDegreeProgram';
import ResearchPaperDetails from './pages/research/ResearchPaperDetails';
import ResearcherProfile from './pages/research/ResearcherProfile';
// Overview-related pages
import ResearchPapers from './pages/overviews/ResearchPapers';
import ResearchPrograms from './pages/overviews/ResearchPrograms';
import IntelligenceExchange from './pages/overviews/IntelligenceExchange';
import AdvancedAnalytics from './pages/overviews/AdvancedAnalytics';
import RequestAccess from './pages/overviews/RequestAccess';
import ScheduleDemo from './pages/overviews/ScheduleDemo';
// Award-related pages
import AwardFAQ from './pages/awards/AwardFAQ';
import AwardWinners from './pages/awards/AwardWinners';
import AwardNominations from './pages/awards/AwardNominations';
import AwardDetails from './pages/awards/AwardDetails';

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

// Component to show full screen loader
const AppContent = () => {
  const { isLoading } = useLoading();
  
  return (
    <>
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
          <Route path="/security-assessment" element={
            <LoadingWrapper>
              <SecurityAssessment />
            </LoadingWrapper>
          } />

          {/* Award Related Routes */}
          <Route path="/awards" element={
            <LoadingWrapper>
              <Award />
            </LoadingWrapper>
          } />
          <Route path="/awards/faq" element={
            <LoadingWrapper>
              <AwardFAQ />
            </LoadingWrapper>
          } />
          <Route path="/awards/winners" element={
            <LoadingWrapper>
              <AwardWinners />
            </LoadingWrapper>
          } />
          <Route path="/awards/nominate" element={
            <LoadingWrapper>
              <AwardNominations />
            </LoadingWrapper>
          } />
          <Route path="/awards/details/:category/:id" element={
            <LoadingWrapper>
              <AwardDetails />
            </LoadingWrapper>
          } />

          {/* Benefits and Webinars Routes */}
          <Route path="/benefits" element={
            <LoadingWrapper>
              <Benefits />
            </LoadingWrapper>
          } />
          <Route path="/webinars" element={
            <LoadingWrapper>
              <Webinars />
            </LoadingWrapper>
          } />
          <Route path="/webinar-proposal" element={
            <LoadingWrapper>
              <WebinarProposal />
            </LoadingWrapper>
          } />

          {/* Research-related routes */}
          <Route path="/masters-degree-program" element={
            <LoadingWrapper>
              <MastersDegreeProgram />
            </LoadingWrapper>
          } />
          <Route path="/research-paper/:id" element={
            <LoadingWrapper>
              <ResearchPaperDetails />
            </LoadingWrapper>
          } />
          <Route path="/researcher/:id" element={
            <LoadingWrapper>
              <ResearcherProfile />
            </LoadingWrapper>
          } />

          {/* Overview-related routes */}
          <Route path="/research-papers" element={
            <LoadingWrapper>
              <ResearchPapers />
            </LoadingWrapper>
          } />
          <Route path="/research-programs" element={
            <LoadingWrapper>
              <ResearchPrograms />
            </LoadingWrapper>
          } />
          <Route path="/intelligence-exchange" element={
            <LoadingWrapper>
              <IntelligenceExchange />
            </LoadingWrapper>
          } />
          <Route path="/advanced-analytics" element={
            <LoadingWrapper>
              <AdvancedAnalytics />
            </LoadingWrapper>
          } />
          <Route path="/request-access" element={
            <LoadingWrapper>
              <RequestAccess />
            </LoadingWrapper>
          } />
          <Route path="/schedule-demo" element={
            <LoadingWrapper>
              <ScheduleDemo />
            </LoadingWrapper>
          } />

          {/* Policy-related routes */}
          <Route path="/policy-whitepaper" element={
            <LoadingWrapper>
              <PolicyWhitepaper />
            </LoadingWrapper>
          } />
          <Route path="/policy-demo" element={
            <LoadingWrapper>
              <PolicyDemo />
            </LoadingWrapper>
          } />
          <Route path="/emergency-support" element={
            <LoadingWrapper>
              <EmergencySupport />
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
          <Route path="/subscribe" element={<EmailSubscribe />} />
          <Route path="/vision-mission" element={<VisionMission />} />
          <Route path="/fdp" element={<Fdp />} />
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/forgot-password" element={<Forgotpass />} />
          <Route path="/help" element={<Help />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/history" element={<History />} />
          <Route path="/conferences" element={<Conference />} />
          
          <Route path="/mou" element={<Mou />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/reports" element={<Reports />} />
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
          <Route path="/program-registration" element={
            <LoadingWrapper>
              <ProgramRegistration />
            </LoadingWrapper>
          } />
          <Route path="/seminar-details/:id" element={
            <LoadingWrapper>
              <SeminarDetails />
            </LoadingWrapper>
          } />
        </Routes>
        <Footer data-aos="fade-up" data-aos-delay="300" />
      </div>
      {isLoading && <FullScreenLoader />}
    </>
  );
};

// Standardize to use consistent loading patterns
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
    <LoadingProvider>
      <Router>
        <RouteChangeHandler>
          <AppContent />
        </RouteChangeHandler>
      </Router>
    </LoadingProvider>
  );
}

export default App;