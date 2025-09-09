import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useCreatePatient } from "../hooks/usePatients";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PatientFormButton } from "./styled";

type PatientFormData = {
  fullName: string;
  address: string;
  photoUrl?: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function PatientForm({ open, onClose }: Props) {
  const { control, handleSubmit, reset } = useForm<PatientFormData>();
  const createPatientMutation = useCreatePatient();
  const navigate = useNavigate();
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const onSubmit = async (data: PatientFormData) => {
    try {
      const patient = await createPatientMutation.mutateAsync({
        ...data,
        photoUrl: filePreview || "",
      });

      reset();
      onClose();
      navigate(`/patients/${patient.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFilePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Patient</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} id="patient-form">
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
          <PatientFormButton variant="contained" component="label">
            Upload Photo
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </PatientFormButton>
          {filePreview && (
            <img
              src={filePreview}
              alt="Preview"
              style={{ width: 100, marginTop: 10, display: "block" }}
            />
          )}
        </form>
      </DialogContent>
      <DialogActions>
        <PatientFormButton variant="contained" onClick={onClose}>
          Cancel
        </PatientFormButton>
        <PatientFormButton
          type="submit"
          form="patient-form"
          variant="contained"
        >
          Create
        </PatientFormButton>
      </DialogActions>
    </Dialog>
  );
}
