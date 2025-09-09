import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import { useCreateAppointment } from "../../hooks/useAppointments";
import { useAppointmentOptions } from "../../hooks/useAppointmentOptions";
import { CreateNewPatientButton } from "../../pages/styled";
import type { AppointmentFormProps, AppointmentFormValues } from "../types";
import { useAvailableDentists } from "../../hooks/useAvailableDentists";
import { TreatmentField } from "./TreatmentField";
import { DentistField } from "../fields/DentistsField";
import { DateTimeField } from "../fields/DateTimeField";

const AppointmentForm = ({
  open,
  onClose,
  patientId,
  onSuccess,
}: AppointmentFormProps) => {
  const { control, handleSubmit, reset } = useForm<AppointmentFormValues>({
    defaultValues: { dateTime: null, dentist: "", treatment: "" },
  });

  const mutation = useCreateAppointment(patientId);

  const { data: options, isLoading, isError } = useAppointmentOptions(open);

  const selectedDateTime = useWatch({ control, name: "dateTime" });

  const availableDentists = useAvailableDentists(
    options?.dentists,
    options?.appointments,
    selectedDateTime
  );

  const onSubmit: SubmitHandler<AppointmentFormValues> = (data) => {
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
          <DateTimeField control={control} />

          <DentistField
            control={control}
            availableDentists={availableDentists}
            isLoading={isLoading}
            isError={isError}
          />

          <TreatmentField
            control={control}
            options={options}
            isLoading={isLoading}
            isError={isError}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} sx={{ color: "#006338" }}>
            Cancel
          </Button>

          <CreateNewPatientButton
            type="submit"
            variant="contained"
            disabled={mutation.isPending}
          >
            Save
          </CreateNewPatientButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AppointmentForm;
