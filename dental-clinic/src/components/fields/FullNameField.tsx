import { Controller, type Control } from "react-hook-form";
import { TextField } from "@mui/material";
import type { PatientFormValues } from "../types";

type Props = {
  control: Control<PatientFormValues>;
};

const FullNameField = ({ control }: Props) => (
  <Controller
    name="fullName"
    control={control}
    defaultValue=""
    rules={{ required: "Full Name is required" }}
    render={({ field, fieldState }) => (
      <TextField
        {...field}
        label="Full Name"
        margin="normal"
        fullWidth
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
      />
    )}
  />
);

export default FullNameField;
