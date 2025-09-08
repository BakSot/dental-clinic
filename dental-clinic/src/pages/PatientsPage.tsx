import { useState } from "react";
import {
  Button,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Box,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import PatientForm from "../components/PatientForm";
import { usePatients } from "../hooks/usePatients";
import { useNavigate } from "react-router-dom";

export default function PatientsPage() {
  const [open, setOpen] = useState(false);
  const { data: patients = [], isLoading } = usePatients();
  const navigate = useNavigate();

  if (isLoading)
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center", // vertical centering
          justifyContent: "center", // horizontal centering
          width: "100vw",
          height: "100vh", // full viewport height
          position: "fixed", // keep it on top
          top: 0,
          left: 0,
          zIndex: 1300, // above other content
          backgroundColor: "rgba(255,255,255,0.7)", // optional overlay
        }}
      >
        <LinearProgress sx={{ width: "50%" }} />
      </Box>
    );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Patients
      </Typography>
      <Button variant="contained" onClick={() => setOpen(true)} sx={{ mb: 2 }}>
        Create New Patient
      </Button>
      

      <List>
        {patients.map((p) => (
          <ListItem key={p.id}>
            <ListItemButton onClick={() => navigate(`/patients/${p.id}`)}>
              <ListItemText primary={p.fullName} secondary={p.address} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <PatientForm open={open} onClose={() => setOpen(false)} />
    </Container>
  );
}
