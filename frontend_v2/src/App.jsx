import "./App.css";
import Landing from "./pages/landing/landing";
import MainLayout from "./utils/mainLayout";

function App() {
  return (
    <>
      <MainLayout>
        <Landing />
      </MainLayout>
    </>
  );
}

export default App;
