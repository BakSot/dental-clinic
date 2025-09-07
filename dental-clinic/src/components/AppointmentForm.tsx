import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Controller, useForm } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";
import { useCreateAppointment } from "../hooks/useAppointments";
import { useQuery } from "@tanstack/react-query";

type AppointmentFormProps = {
  open: boolean;
  onClose: () => void;
  patientId: number;
  onSuccess?: () => void; // optional callback
};

type FormValues = {
  dateTime: Dayjs | null;
  dentist: string;
  treatment: string; // only treatment name is stored in the form
  duration: number;
};

const dentists = ["Dr. John", "Dr. Jane", "Dr. Smith"];

const treatments = [
  { name: "Cleaning", duration: 30 },
  { name: "Filling", duration: 45 },
  { name: "Extraction", duration: 60 },
  { name: "Checkup", duration: 20 },
];

const AppointmentForm = ({
  open,
  onClose,
  patientId,
  onSuccess,
}: AppointmentFormProps) => {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      dateTime: null,
      dentist: "",
      treatment: "",
    },
  });

  const mutation = useCreateAppointment(patientId);

  const onSubmit = (data: FormValues) => {
    const selectedTreatment = treatments.find((t) => t.name === data.treatment);

    mutation.mutate(
      {
        dateTime: data.dateTime ? data.dateTime.toISOString() : null,
        dentist: data.dentist,
        treatment: data.treatment,
        duration: selectedTreatment?.duration ?? 30, // pass duration too
      },
      {
        onSuccess: () => {
          reset();
          onClose();
          if (onSuccess) onSuccess(); // trigger external callback if provided
        },
      }
    );
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Appointment</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          {/* Date & Time */}
          <Controller
            name="dateTime"
            control={control}
            render={({ field }) => (
              <DateTimePicker
                label="Date & Time"
                value={field.value}
                onChange={field.onChange}
                minDateTime={dayjs()}
                slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
              />
            )}
          />

          {/* Dentist */}
          <Controller
            name="dentist"
            control={control}
            rules={{ required: "Please select a dentist" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Dentist"
                fullWidth
                margin="normal"
                select
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              >
                {dentists.map((d) => (
                  <MenuItem key={d} value={d}>
                    {d}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          {/* Treatment */}
          <Controller
            name="treatment"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Treatment"
                fullWidth
                margin="normal"
                select
              >
                {treatments.map((t) => (
                  <MenuItem key={t.name} value={t.name}>
                    {t.name} ({t.duration} min)
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={mutation.isPending}
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AppointmentForm;
