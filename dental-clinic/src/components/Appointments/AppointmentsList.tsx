import { List, ListItem, ListItemText, Typography } from "@mui/material";
import dayjs from "dayjs";
import type { AppointmentProps } from "../types";

export const AppointmentsList = ({ appointments }: AppointmentProps) => {
  if (!appointments.length) {
    return <Typography>No appointments yet.</Typography>;
  }

  return (
    <List>
      {appointments?.map((a) => {
        const start = dayjs(a.dateTime);
        const end = a.duration ? start.add(a.duration, "minute") : null;
        return (
          <ListItem key={a.id}>
            <ListItemText
              primary={`${a.treatment} with ${a.dentist}`}
              secondary={
                end
                  ? `${start.format("DD/MM/YYYY")} ${start.format(
                      "HH:mm"
                    )} – ${end.format("HH:mm")}`
                  : start.format("DD/MM/YYYY HH:mm")
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
};
