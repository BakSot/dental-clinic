import { CircularProgress, MenuItem, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";
import type { AppointmentOptions } from "../../hooks/types";

type TreatmentFieldProps = {
  control: Control<any>;
  options: AppointmentOptions | undefined;
  isLoading: boolean;
  isError: boolean;
};

export const TreatmentField = ({
  control,
  options,
  isLoading,
  isError,
}: TreatmentFieldProps) => {
  return (
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
          ) : !options?.treatments.length ? (
            <MenuItem disabled>No treatments available</MenuItem>
          ) : (
            options.treatments.map((t) => (
              <MenuItem key={t.name} value={t.name}>
                {t.name} ({t.duration} min)
              </MenuItem>
            ))
          )}
        </TextField>
      )}
    />
  );
};
