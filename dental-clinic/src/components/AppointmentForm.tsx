// AppointmentForm.tsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Controller, useForm, useWatch } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";
import { useCreateAppointment } from "../hooks/useAppointments";
import {
  useAppointmentOptions,
  type DentistAvailability,
} from "../hooks/useAppointmentOptions";
import { useMemo } from "react";

type AppointmentFormProps = {
  open: boolean;
  onClose: () => void;
  patientId: number;
  onSuccess?: () => void;
};

type FormValues = {
  dateTime: Dayjs | null;
  dentist: string;
  treatment: string;
  duration: number;
};

const AppointmentForm = ({
  open,
  onClose,
  patientId,
  onSuccess,
}: AppointmentFormProps) => {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { dateTime: null, dentist: "", treatment: "" },
  });

  const mutation = useCreateAppointment(patientId);

  // Fetch options when dialog is open
  const { data: options, isLoading, isError } = useAppointmentOptions(open);
 
  const selectedDateTime = useWatch({ control, name: "dateTime" });

  const availableDentists: string[] = useMemo(() => {
    if (!options) return [];
    if (!selectedDateTime) return options?.dentists;

    return options.dentists.filter((d) => {
      const appointments: DentistAvailability[] =
        options?.appointments[d] ?? [];
      if (appointments?.length === 0) return true; // no appointments => available

      const selected = selectedDateTime?.toDate().getTime();
      if (!selected) return true;

      return !appointments?.some((a) => {
        const start = new Date(a.dateTime).getTime();
        const end = start + a.duration * 60 * 1000;
        const selected = selectedDateTime?.toDate().getTime();
        return selected >= start && selected < end;
      });
    });
  }, [options, selectedDateTime]);

  const onSubmit = (data: FormValues) => {
    if (!options) return;

    const selectedTreatment = options.treatments.find(
      (t) => t.name === data.treatment
    );

    mutation.mutate(
      {
        dateTime: data.dateTime?.toISOString() ?? null,
        dentist: data.dentist,
        treatment: data.treatment,
        duration: selectedTreatment?.duration ?? 30,
      },
      {
        onSuccess: () => {
          reset();
          onClose();
          onSuccess?.();
        },
      }
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Appointment</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          {/* Date & Time */}
          <Controller
            name="dateTime"
            control={control}
            rules={{ required: "Please select date & time" }}
            render={({ field, fieldState }) => (
              <DateTimePicker
                label="Date & Time"
                {...field}
                value={field.value ?? null}
                onChange={(value) => field.onChange(value ?? null)} //
                minDateTime={dayjs()}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: "normal",
                    error: !!fieldState.error,
                    helperText: fieldState.error?.message,
                  },
                }}
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
                {isLoading ? (
                  <MenuItem disabled>
                    <CircularProgress size={20} /> Loading...
                  </MenuItem>
                ) : isError ? (
                  <MenuItem disabled>Error loading dentists</MenuItem>
                ) : availableDentists.length === 0 ? (
                  <MenuItem disabled>No available dentists</MenuItem>
                ) : (
                  availableDentists.map((d) => (
                    <MenuItem key={d} value={d}>
                      {d}
                    </MenuItem>
                  ))
                )}
              </TextField>
            )}
          />

          {/* Treatment */}
          <Controller
            name="treatment"
            control={control}
            rules={{ required: "Please select a treatment" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Treatment"
                fullWidth
                margin="normal"
                select
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              >
                {isLoading ? (
                  <MenuItem disabled>
                    <CircularProgress size={20} /> Loading...
                  </MenuItem>
                ) : isError ? (
                  <MenuItem disabled>Error loading treatments</MenuItem>
                ) : options?.treatments.length === 0 ? (
                  <MenuItem disabled>No treatments available</MenuItem>
                ) : (
                  options?.treatments.map((t) => (
                    <MenuItem key={t.name} value={t.name}>
                      {t.name} ({t.duration} min)
                    </MenuItem>
                  ))
                )}
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
