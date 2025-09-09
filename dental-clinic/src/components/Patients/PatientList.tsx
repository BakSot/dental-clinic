import { List, Typography } from "@mui/material";
import PatientListItem from "./PatientListItem";
import type { Patient } from "../../hooks/types";

type Props = { patients: Patient[] };

const PatientList = ({ patients }: Props) => (
  <List>
    {!!patients.length ? (
      patients?.map((p) => <PatientListItem key={p.id} patient={p} />)
    ) : (
      <Typography>No patients yet.</Typography>
    )}
  </List>
);

export default PatientList;
