import { CardContent, Typography } from "@mui/material";
import { PatientImage, PatientsDetailsCard } from "../../pages/styled";
import type { Patient } from "../../hooks/types";

type Props = { patient: Patient };

export const PatientInfoCard = ({ patient }: Props) => (
  <PatientsDetailsCard>
    {patient?.photoUrl && (
      <PatientImage component="img" image={patient?.photoUrl} />
    )}
    <CardContent>
      <Typography variant="h5">{patient?.fullName}</Typography>
      <Typography variant="body1">{patient?.address}</Typography>
    </CardContent>
  </PatientsDetailsCard>
);
