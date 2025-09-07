import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientsPage from "./pages/PatientsPage";
import PatientDetailsPage from "./pages/PatientDetailsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PatientsPage />} />
        <Route path="/patients/:id" element={<PatientDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
