import { useState } from "react";
import {
  Button,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import PatientForm from "../components/PatientForm";
import { usePatients } from "../hooks/usePatients";
import { useNavigate } from "react-router-dom";

export default function PatientsPage() {
  const [open, setOpen] = useState(false);
  const { data: patients = [], isLoading } = usePatients();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;

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
