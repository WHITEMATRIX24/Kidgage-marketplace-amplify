import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CourseContext from "./context/courseContext.jsx";
import BookingContext from "./context/bookingContext.jsx";
import LoginUserContext from "./context/LoginUserContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CourseContext>
        <BookingContext>
          <LoginUserContext>
            <GoogleOAuthProvider clientId="962413704686-0i6cs18b3cfgv7c1mlhc7njfd739nsu1.apps.googleusercontent.com">
              <App />
            </GoogleOAuthProvider>
          </LoginUserContext>
        </BookingContext>
      </CourseContext>
    </BrowserRouter>
  </StrictMode>
);
