import { Controller, type Control } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import type { AppointmentFormValues } from "../types";

type Props = {
  control: Control<AppointmentFormValues>;
};

export const DateTimeField = ({ control }: Props) => (
  <Controller
    name="dateTime"
    control={control}
    rules={{ required: "Please select date & time" }}
    render={({ field, fieldState }) => (
      <DateTimePicker
        label="Date & Time"
        {...field}
        value={field.value ?? null}
        onChange={(value) => field.onChange(value ?? null)}
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
);
