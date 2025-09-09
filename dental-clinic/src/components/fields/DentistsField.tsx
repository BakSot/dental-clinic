import { CircularProgress, MenuItem, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";
import type { AppointmentFormValues } from "./DateTimeField";

type DentistFieldProps = {
  control: Control<AppointmentFormValues>;
  availableDentists: string[];
  isLoading: boolean;
  isError: boolean;
};

export const DentistField = ({
  control,
  availableDentists,
  isLoading,
  isError,
}: DentistFieldProps) => {
  return (
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
          ) : !availableDentists.length ? (
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
  );
};
