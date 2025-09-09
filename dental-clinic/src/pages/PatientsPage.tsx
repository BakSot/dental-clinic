import { useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Avatar,
} from "@mui/material";
import PatientForm from "../components/PatientForm";
import { usePatients } from "../hooks/usePatients";
import { useNavigate } from "react-router-dom";
import {
  CreateNewPatientButton,
  PatientAvatar,
  PatientPageContainer,
  PatientPageLinearProgress,
  PatientsPageBox,
} from "./styled";

export default function PatientsPage() {
  const [open, setOpen] = useState(false);
  const { data: patients = [], isLoading } = usePatients();
  const navigate = useNavigate();

  if (isLoading)
    return (
      <PatientsPageBox>
        <PatientPageLinearProgress />
      </PatientsPageBox>
    );

  return (
    <PatientPageContainer>
      <Typography variant="h4" gutterBottom>
        Patients
      </Typography>
      <CreateNewPatientButton variant="contained" onClick={() => setOpen(true)}>
        Create New Patient
      </CreateNewPatientButton>

      <List>
        {patients.map((p) => (
          <ListItem key={p.id}>
            <ListItemButton onClick={() => navigate(`/patients/${p.id}`)}>
              <PatientAvatar alt={p.fullName} src={p?.photoUrl} />
              <ListItemText primary={p.fullName} secondary={p.address} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <PatientForm open={open} onClose={() => setOpen(false)} />
    </PatientPageContainer>
  );
}
