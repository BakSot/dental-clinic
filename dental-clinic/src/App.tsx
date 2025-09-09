import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientsPage from "./pages/PatientsPage";
import PatientDetailsPage from "./pages/PatientDetailsPage";
import { Box, styled } from "@mui/material";
import HomePage from "./pages/HomePage";
import NavBar from "./components/common/NavBar";
import Footer from "./components/common/Footer";

const AppBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

const App = () => {
  return (
    <Router>
      <AppBox>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/patients/:id" element={<PatientDetailsPage />} />
        </Routes>
        <Footer />
      </AppBox>
    </Router>
  );
};

export default App;
