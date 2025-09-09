import { useState } from "react";
import { Container, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { usePatientDetails } from "../hooks/usePatientDetails";
import AppointmentForm from "../components/Appointments/AppointmentForm";
import { PatientDetailsPageFab } from "./styled";
import { PageError, PageLoader } from "../components/common/utils";
import { PatientInfoCard } from "../components/Patients/PatientsDetailsCard";
import { AppointmentsList } from "../components/Appointments/AppointmentsList";

const PatientDetailsPage = () => {
  const { patientId, patient, isLoading, isError, error } = usePatientDetails();
  const [open, setOpen] = useState(false);

  if (isLoading) return <PageLoader />;
  if (isError) return <PageError message={(error as Error).message} />;
  if (!patient) return null;

  return (
    <Container>
      <Typography variant="h4" gutterBottom pt={"20px"}>
        Patient Details
      </Typography>

      <PatientInfoCard patient={patient} />

      <Typography variant="h5" gutterBottom pt={"20px"}>
        Appointments
      </Typography>

      <AppointmentsList appointments={patient.appointments} />

      <PatientDetailsPageFab onClick={() => setOpen(true)}>
        <AddIcon />
      </PatientDetailsPageFab>

      <AppointmentForm
        open={open}
        onClose={() => setOpen(false)}
        patientId={patientId}
      />
    </Container>
  );
};

export default PatientDetailsPage;
