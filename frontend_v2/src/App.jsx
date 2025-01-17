import "./App.css";
import OrderSummeryPage2 from "./components/OrderSummaryPage/OrderSummeryPage2";
import SignInOtp from "./components/SignInOtp/SignInOtp";
import SignInPage from "./components/Signpage/SignInPage";
import ActivityPage from "./pages/Activity/Activity";
import ActivityDetails1 from "./pages/ActivityDetails/ActivityDetails1";
import ContactForm from "./pages/ContactForm/ContactForm";
import KidgageNews from "./pages/KidgageNews/KidgageNews";
import Landing from "./pages/landing/landing";
import SigninSuccess from "./pages/SigninSuccess/SigninSuccess";
import PrivacyPolicy from "./pages/TermsAndConditions/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions/TermsAndConditions";
import Thankyou from "./pages/Thankyou/Thankyou";
import MainLayout from "./utils/mainLayout";
import { Routes, Route } from "react-router";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/kidgage-news" element={<KidgageNews />} />
          <Route path="/activites/:category" element={<ActivityPage />} />
          <Route
            path="/activity-detail/:activityId"
            element={<ActivityDetails1 />}
          />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signin-otp" element={<SignInOtp />} />
          <Route path="/signin-success" element={<SigninSuccess />} />
          <Route path="/order-summary" element={<OrderSummeryPage2 />} />
          <Route path="/thankyou" element={<Thankyou />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-condition" element={<TermsAndConditions />} />
          <Route path="/contact-form" element={<ContactForm />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
