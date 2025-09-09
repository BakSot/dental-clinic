import { Typography } from "@mui/material";
import { usePatients } from "../hooks/usePatients";
import {
  CreateNewPatientButton,
  PatientPageContainer,
  PatientPageLinearProgress,
  PatientsPageBox,
} from "./styled";
import PatientForm from "../components/Patients/PatientForm";
import { useState } from "react";
import PatientList from "../components/Patients/PatientList";

const PatientsPage = () => {
  const [open, setOpen] = useState(false);
  const { data: patients = [], isLoading } = usePatients();

  if (isLoading)
    return (
      <PatientsPageBox>
        <PatientPageLinearProgress />
      </PatientsPageBox>
    );

  return (
    <PatientPageContainer>
      <Typography variant="h4" gutterBottom pt={"20px"}>
        Patients
      </Typography>
      <CreateNewPatientButton variant="contained" onClick={() => setOpen(true)}>
        Create New Patient
      </CreateNewPatientButton>
      <PatientList patients={patients} />
      <PatientForm open={open} onClose={() => setOpen(false)} />
    </PatientPageContainer>
  );
};

export default PatientsPage;
