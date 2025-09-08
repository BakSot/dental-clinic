import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ textAlign: "center", mt: 6 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the Dental Clinic
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Manage patients and appointments with ease
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ mr: 2 }}
          onClick={() => navigate("/patients")}
        >
          View Patients
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/appointments")}
        >
          View Appointments
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
