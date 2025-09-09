import { TextField } from "@mui/material";
import { Controller, type Control } from "react-hook-form";
import type { PatientFormValues } from "../types";

type Props = { control: Control<PatientFormValues> };

const AddressField = ({ control }: Props) => {
  return (
    <Controller
      name="address"
      control={control}
      defaultValue=""
      rules={{ required: "Address is required" }}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          label="Address"
          margin="normal"
          fullWidth
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
};

export default AddressField;
