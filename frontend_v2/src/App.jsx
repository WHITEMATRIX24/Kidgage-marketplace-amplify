import "./App.css";
import ActivityPage from "./pages/Activity/Activity";
import Landing from "./pages/landing/landing";
import MainLayout from "./utils/mainLayout";
import { Routes, Route } from "react-router";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/activites/:category" element={<ActivityPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
