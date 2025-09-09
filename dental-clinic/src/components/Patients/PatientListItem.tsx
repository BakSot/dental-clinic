import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PatientAvatar } from "../../pages/styled";
import type { Patient } from "../../hooks/types";

type Props = { patient: Patient };

const PatientListItem = ({ patient }: Props) => {
  const navigate = useNavigate();
  return (
    <ListItem>
      <ListItemButton onClick={() => navigate(`/patients/${patient.id}`)}>
        <PatientAvatar alt={patient.fullName} src={patient.photoUrl} />
        <ListItemText primary={patient.fullName} secondary={patient.address} />
      </ListItemButton>
    </ListItem>
  );
};

export default PatientListItem;
