import { useState } from "react";
import { useParams } from "react-router";
import { usePatient } from "../hooks/usePatients";
import {
  Container,
  Typography,
  CardContent,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import AppointmentForm from "../components/AppointmentForm";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";
import {
  PatientDetailsPageFab,
  PatientImage,
  PatientsDetailsCard,
} from "./styled";

const PatientDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const patientId = Number(id);
  const { data: patient, isLoading, isError, error } = usePatient(patientId);

  const [open, setOpen] = useState(false);

  if (isLoading)
    return (
      <Container>
        <CircularProgress />
      </Container>
    );

  if (isError)
    return (
      <Container>
        <Typography color="error">Error: {(error as Error).message}</Typography>
      </Container>
    );

  if (!patient) return null;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Patient Details
      </Typography>

      <PatientsDetailsCard>
        {patient?.photoUrl && (
          <PatientImage
            component="img"
            image={patient?.photoUrl}
            // alt={patient?.fullName}
          />
        )}
        <CardContent>
          <Typography variant="h5">{patient?.fullName}</Typography>
          <Typography variant="body1">{patient?.address}</Typography>
        </CardContent>
      </PatientsDetailsCard>

      <Typography variant="h5" gutterBottom>
        Appointments
      </Typography>

      {patient?.appointments.length === 0 ? (
        <Typography>No appointments yet.</Typography>
      ) : (
        <List>
          {patient?.appointments.map((a) => {
            const start = dayjs(a.dateTime);
            const end = a.duration ? start.add(a.duration, "minute") : null;
            return (
              <ListItem key={a.id}>
                <ListItemText
                  primary={`${a.treatment} with ${a.dentist}`}
                  secondary={
                    end
                      ? `${start.format("DD/MM/YYYY")}  ${start.format(
                          "HH:mm"
                        )} – ${end.format("HH:mm")}`
                      : start.format("DD/MM/YYYY HH:mm")
                  }
                />
              </ListItem>
            );
          })}
        </List>
      )}

      <PatientDetailsPageFab onClick={() => setOpen(true)}>
        <AddIcon />
      </PatientDetailsPageFab>

      {/* Appointment Form Dialog */}
      <AppointmentForm
        open={open}
        onClose={() => setOpen(false)}
        patientId={patientId}
      />
    </Container>
  );
};

export default PatientDetailsPage;
